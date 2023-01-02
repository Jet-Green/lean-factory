<script setup>
import { computed } from 'vue'
import { useAuth } from "../stores/auth"
import { useCompany } from '../stores/company';
import { useRouter } from "vue-router"

const userStore = useAuth()
const companyStore = useCompany()
const router = useRouter()

let reportsToFix = computed(() => {
  if (companyStore.employee) {
    return companyStore.employee.reportsToFix
  }
  return []
})

let sentToFix = computed(() => {
  if (companyStore.employee) {
    let res = []
    for (let r of companyStore.employee.reportsToFix) {
      if (r.sentToFix) {
        res.push(r)
      }
    }
    return res
  }
  return []
})

function logout() {
  userStore.logout()
  router.push('/')
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <span @click="logout" class="mdi mdi-24px mdi-logout" style="cursor: pointer; float: right">
      </span>
      <h2>Нужно исправить</h2>
      <div v-if="!reportsToFix.length">
        Пусто
      </div>
      <v-row type="flex">
        <v-col v-for="report of reportsToFix" cols="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card style="cursor: pointer; max-height: 50px" v-bind="props" :elevation="isHovering ? 4 : 0"
              class="pa-2" @click="router.push(`/problem-page?_id=${report._id}`)">
              <div>{{ report.place.place }}</div>
              <span class="text-grey-darken-2">
                {{ report.commentToPhoto }}
              </span>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols=" 12">
      <h2>Отправлено на исправление</h2>
      <span v-if="!sentToFix.length">
        Пусто
      </span>
    </v-col>
  </v-row>
</template>
