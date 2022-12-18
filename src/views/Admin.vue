<script setup>
import { ref } from 'vue'
import { useCompany } from '../stores/company'

const companyStore = useCompany()

let addEmployeeDialog = ref(false)
let employeesEmails = ref('')

function addEmployees() {
  let empls = []
  let rawEmails = employeesEmails.value.split(',')
  for (let e of rawEmails) {
    empls.push({ email: e.trim(), isConfirmed: false })
  }
  employeesEmails.value = ''

  companyStore.addEmployees(empls)

  addEmployeeDialog.value = false
} 
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h1>Моя компания</h1>
    </v-col>
    <v-col cols="12">
      <h2>Сотрудники</h2>
    </v-col>
    <v-col cols="12">
      <v-btn size="small" variant="outlined" icon="mdi-plus" color="info" @click="addEmployeeDialog = true"></v-btn>
    </v-col>
    <v-col cols="12">
      <div v-for="empl of companyStore.employees">{{ empl }}</div>
    </v-col>

    <v-dialog v-model="addEmployeeDialog">
      <v-row type="flex" justify="center">
        <v-col cols="12" sm="6" xl="4">
          <v-card class="pa-3">
            <v-textarea v-model="employeesEmails" label="Введите email сотрудников через запятую" variant="solo"
              auto-grow rows="3"></v-textarea>

            <v-card-actions>
              <v-btn color="error" @click="addEmployeeDialog = false">отмена</v-btn>
              <v-btn color="success" @click="addEmployees">Добавить</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-row>
</template>
