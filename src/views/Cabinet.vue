<script setup>
import { useAuth } from "../stores/auth"
import { useRouter } from "vue-router"

const userStore = useAuth()
const router = useRouter()

const reportsToFix = []
// userStore.user.reportsToFix
const reports = []
// userStore.user.reports

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
      <span v-if="!reportsToFix.length">
        Пусто
      </span>
    </v-col>

    <v-col cols=" 12">
      <h2>Отправлено на исправление</h2>
      <span v-if="!reports.length">
        Пусто
      </span>
    </v-col>
  </v-row>
</template>
