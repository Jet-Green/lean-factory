<script setup>
import { computed, ref } from 'vue'
import { useRoute } from "vue-router"
import { useCompany } from '../stores/company'

const route = useRoute()
const companyStore = useCompany()

const _id = route.query._id

const problemTypes = computed(() => companyStore.company?.problemTypes)
// empl id
let problemType = ref(null)

let currentProblem = computed(() => {
  let res = companyStore.employee?.reportsToFix.find((x) => x._id == _id)
  res.photos = ['https://is5-ssl.mzstatic.com/image/thumb/Purple122/v4/54/e1/f0/54e1f0e7-0f84-aa82-e03a-a7f57c28cae4/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png']
  return res
})

function sendToFix() {
  companyStore.sendProblemToFix({ emplId: problemType.value, problemId: currentProblem.value._id })
}
</script>
<template>
  <v-row type="flex" justify="center">
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12" md="6">
          <v-img v-for="img of currentProblem.photos" :src="img"></v-img>
        </v-col>
        <v-col cols="12" md="6" style="font-size: 16px; ">
          <div>
            Место: <b>{{ currentProblem.place.place }}</b>
          </div>
          <div>
            Ответственный: <b>{{ currentProblem.place.emplName }}</b>
          </div>
          <div style="overflow-wrap: break-word;">
            Комментарий к фото:
            <br /> {{ currentProblem.commentToPhoto }}
          </div>
        </v-col>
        <v-col cols="12" v-if="companyStore.employee?.roles.includes('territory_resp')">
          Выбрать тип проблемы
          <v-autocomplete v-model="problemType" hide-no-data variant="solo" placeholder="Выберите" :items="problemTypes"
            item-title="type" item-value="empl" clearable></v-autocomplete>
          <v-btn @click="sendToFix">отправить на выполнение</v-btn>
        </v-col>
        <!-- кнопки -->
      </v-row>
    </v-col>
  </v-row>
</template>