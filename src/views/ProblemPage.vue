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

let commentToFixedProblem = ref()
async function fixProblem() {
  await companyStore.fixProblem(currentProblem.value._id, commentToFixedProblem.value)
  commentToFixedProblem.value = ''
}

onMounted(async () => {
  let { data } = await companyStore.getFullProblem(curPrId)
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
            <br />
            <b>
              {{ currentProblem.commentToPhoto }}
            </b>
          </div>
        </v-col>
        <v-col cols="12"
          v-if="currentProblem.actions[currentProblem.actions.length - 1].status == 'created' && companyStore.employee.hierarchy.up.length">
          Выбрать тип проблемы
          <v-autocomplete v-model="problemType" hide-no-data variant="solo" placeholder="Выберите" :items="problemTypes"
            item-title="type" item-value="empl" clearable></v-autocomplete>
          <v-btn @click="sendToFix">отправить на выполнение</v-btn>
        </v-col>
        <v-col cols="12"
          v-if="currentProblem.actions[currentProblem.actions.length - 1].status == 'sent_to_fix' && companyStore.employee.hierarchy.up.length">
          <v-text-field variant=" solo" label="Комментарий" v-model="commentToFixedProblem"></v-text-field>
          <v-btn @click="fixProblem" color="success">Выполнить</v-btn>
        </v-col>
        <v-col cols="12" v-if="currentProblem.actions[currentProblem.actions.length - 1].status = 'fixed'">
          <b>
            Задача выполнена
            {{
              new Date(currentProblem.actions[currentProblem.actions.length - 1].date)
                .toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
            }}
            {{
              ' ' + new Date(currentProblem.actions[currentProblem.actions.length - 1].date).toLocaleTimeString('ru-RU', {
                hour:
                  "2-digit", minute: "2-digit"
              })
            }}
          </b>
          <div>
            {{ currentProblem.actions[currentProblem.actions.length - 1].comment }}
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style scoped>
b {
  font-size: 20px;
}
</style>