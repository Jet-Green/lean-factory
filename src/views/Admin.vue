<script setup>
import { ref } from 'vue'
import { useCompany } from '../stores/company'

const companyStore = useCompany()

let addEmployeeDialog = ref(false)
let deleteEmplDialog = ref(false)
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

let emplToDelete = ref(null)
function openDeleteEmpl(employee) {
  deleteEmplDialog.value = true
  emplToDelete.value = employee
}

function deleteEmpl() {
  if (emplToDelete.value) {
    companyStore.deleteEmpl({ email: emplToDelete.value.email, company: companyStore.company.identifier })
  }
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h1>Моя компания - <span style="color: #1976D2"> {{ companyStore.company.companyName }} </span></h1>

    </v-col>
    <v-col cols="12">
      <h2>Сотрудники</h2>
      <span class="text-grey">
        всего: {{ companyStore.company.employees.length }}
      </span>
    </v-col>
    <v-col cols="12">
      <v-btn size="small" variant="outlined" icon="mdi-plus" color="info" @click="addEmployeeDialog = true"></v-btn>
    </v-col>
    <v-col cols="12">
      <v-row type="flex">
        <v-col cols="12" md="6" v-for="empl of companyStore.company.employees" class="mb-4">
          <span v-if="empl.isConfirmed" style="color: #4CAF50">
            <span>
              {{ empl.user.fullname }}
              <v-tooltip activator="parent" location="top">
                Пользователь зарегистрировался
              </v-tooltip>
            </span>
          </span>
          <span v-else>
            <v-tooltip activator="parent" location="top">
              Пользователь получил письмо и скоро зарегистрируется, ждите...
            </v-tooltip>
            <v-icon color="warning" style="cursor: pointer">mdi-alert-outline</v-icon>
          </span>
          {{ empl.email }}
          <v-btn icon="mdi-delete" size="x-small" variant="text" color="error" class="mb-1"
            @click="openDeleteEmpl(empl)"></v-btn>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" style="font-size: 16px">
      <p>
        Добавляйте пользователей по email, строго через <b>запятую</b>.
      </p>
      <p>
        Если вы <b>правильно</b> ввели емейл, то человеку придёт письмо
        с ссылкой на регистрацию
      </p>
      <p>
        После регистрации у вас появится его <b>полное имя</b>.
      </p>
    </v-col>

    <v-dialog v-model="deleteEmplDialog">
      <v-row type="flex" justify="center">
        <v-col cols="auto">
          <v-card class="pa-5 text-center">
            <h2 v-if="emplToDelete.isConfirmed" class="mb-4">
              Пользователь уже в вашей компании!
            </h2>
            <h2 class="mb-4" v-else>Вы уверены?</h2>
            <v-btn variant="text" color="success" @click="deleteEmplDialog = false">
              отмена
            </v-btn>
            <v-btn variant="text" color="error" @click="deleteEmpl">
              Удалить
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

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
