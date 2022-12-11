<script setup>
import { useAuth } from "../stores/auth"
const userStore = useAuth()

const reportsToFix = userStore.user.reportsToFix
const reports = userStore.user.reports

</script>
<template>
  <v-row>
    <v-col cols="12">
      <h2>Нужно исправить</h2>
      <span v-if="!reportsToFix.length">
        Пусто
      </span>
    </v-col>

    <v-col cols=" 12">
      <h2>Отправил на исправление</h2>
      <span v-if="!reports.length">
        Пусто
      </span>
    </v-col>
  </v-row>
</template>
