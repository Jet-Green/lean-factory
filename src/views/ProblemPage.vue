<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import { useCompany } from '../stores/company'

const route = useRoute()
const companyStore = useCompany()

const curPrId = route.query._id

const problemTypes = computed(() => companyStore.fetchedProblemTypes)
// empl id
let problemType = ref(null)

let currentProblem = ref({})

function sendToFix() {
  companyStore.sendProblemToFix({
    problemId: curPrId,
    action: {
      status: 'sent_to_fix',
      respEmpl: problemType.value,
      date: Date.now()
    }
  })
  problemType.value = null
}

onMounted(async () => {
  let { data } = await companyStore.getFullProblem(curPrId)
  data.photos.push('https://is5-ssl.mzstatic.com/image/thumb/Purple122/v4/54/e1/f0/54e1f0e7-0f84-aa82-e03a-a7f57c28cae4/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png')
  currentProblem.value = data
  console.log(data);
})
</script>
<template>
  <v-row type="flex" justify="center">
    <v-col cols="12" md="8">
      <v-row v-if="currentProblem._id">
        <v-col cols="12" md="6">
          <v-img v-for="img of currentProblem.photos" :src="img"></v-img>
        </v-col>
        <v-col cols="12" md="6" style="font-size: 16px; ">
          <div>
            Место: <b>{{ currentProblem.fullPlace.place }}</b>
          </div>
          <div>
            Ответственный: <b>{{ currentProblem.fullPlace.emplName }}</b>
          </div>
          <div style="overflow-wrap: break-word;">
            Комментарий к фото:
            <br /> {{ currentProblem.commentToPhoto }}
          </div>
        </v-col>
        <v-col cols="12">
          Выбрать тип проблемы
          <v-autocomplete v-model="problemType" hide-no-data variant="solo" placeholder="Выберите" :items="problemTypes"
            item-title="type" item-value="empl" clearable></v-autocomplete>
          <v-btn @click="sendToFix">отправить на выполнение</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>