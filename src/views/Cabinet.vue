<script setup>
import { computed } from 'vue'
import { useAuth } from "../stores/auth"
import { useCompany } from '../stores/company';
import { useRouter } from "vue-router"

const userStore = useAuth()
const companyStore = useCompany()
const router = useRouter()

let newReports = computed(() => {
  let result = []
  if (companyStore.employee) {
    result = companyStore.fetchedReports.filter((report) => report.actions[report.actions.length - 1].status == 'created')
  }
  return result
})

let sentToFix = computed(() => {
  let result = []
  if (companyStore.employee) {
    result = companyStore.fetchedReports.filter((report) => report.actions[report.actions.length - 1].status == 'sent_to_fix')
  }
  return result
})

let fixed = computed(() => {
  let result = []
  if (companyStore.employee) {
    result = companyStore.fetchedReports.filter((report) => report.actions[report.actions.length - 1].status == 'fixed')
  }
  return result
})

async function logout() {
  await userStore.logout()
  router.push('/login')
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <span @click="logout" class="mdi mdi-24px mdi-logout d-flex align-center" style="cursor: pointer; float: right">
        выход
      </span>
    </v-col>

    <v-col cols="12">
      <h2>Новые</h2>
      <span v-if="!newReports.length">
        Пусто
      </span>
      <v-row v-else type="flex">
        <v-col v-for="report of newReports" cols="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card style="cursor: pointer;" v-bind="props" :elevation="isHovering ? 4 : 0" class="pa-2"
              @click="router.push(`/problem-page?_id=${report._id}`)">
              <div>{{ report.place }}</div>
              <div class="text-grey-darken-2">
                {{ report.commentToPhoto }}
              </div>
              <!-- ((Date.now() - report.actions[report.actions.length - 1].date) / 1000 / 60 / 60).toFixed(0) < 24 -->
              <b v-if="(Date.now() - report.actions[report.actions.length - 1].date) < 60000" class="text-success">
                <!-- осталось: {{(24 - (Date.now() - report.actions[report.actions.length - 1].date) / 1000 / 60 /
                60).toFixed(0) }} ч. -->

                осталось: {{(60 - (Date.now() - report.actions[report.actions.length - 1].date) / 1000).toFixed(0) }} c.
              </b>
              <div v-else class="text-error">
                Просроченная задача
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <h2>Отправлено на исправление</h2>
      <span v-if="!sentToFix.length">
        Пусто
      </span>
      <v-row v-else type="flex">
        <v-col v-for="report of sentToFix" cols="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card style="cursor: pointer;" v-bind="props" :elevation="isHovering ? 4 : 0" class="pa-2"
              @click="router.push(`/problem-page?_id=${report._id}`)">
              <div>{{ report.place }}</div>
              <div class="text-grey-darken-2">
                {{ report.commentToPhoto }}
              </div>
              <!-- ((Date.now() - report.actions[report.actions.length - 1].date) / 1000 / 60 / 60).toFixed(0) < 24 -->
              <b v-if="(Date.now() - report.actions.find((a) => a.status == 'sent_to_fix').date) < 60000"
                class="text-success">
                <span>
                  <!-- осталось: {{(72 - (Date.now() - report.actions[report.actions.length - 1].date) / 1000 / 60 /
                  60).toFixed(0) }} ч. -->
                  осталось: {{(60 - (Date.now() - report.actions.find((a) => a.status == 'sent_to_fix').date) /
                  1000).toFixed(0) }}
                  c.
                </span>
              </b>
              <div v-else class="text-error">
                Просроченная задача
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <h2>Выполнено</h2>
      <span v-if="!fixed.length">
        Пусто
      </span>
      <v-row v-else type="flex">
        <v-col v-for="report of fixed" cols="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card style="cursor: pointer;" v-bind="props" :elevation="isHovering ? 4 : 0" class="pa-2"
              @click="router.push(`/problem-page?_id=${report._id}`)">
              <div>{{ report.place }}</div>
              <div class="text-grey-darken-2">
                {{ report.commentToPhoto }}
              </div>
              <b class="text-success">Задача выполнена</b>
              <span props:date="new Date(report.actions[report.actions.length -
              1].date)">
                {{ date }}
              </span>
              <!-- {{
              .getDate() + '.' + new Date(report.actions[report.actions.length -
  1].date).getMonth() + '.' + new Date(report.actions[report.actions.length - 1].date).getFullYear() + ' ' +
    new Date(report.actions[report.actions.length - 1].date).getHours() + ' часов'
              }} -->
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
