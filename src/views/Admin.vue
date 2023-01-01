<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCompany } from '../stores/company'
import { useAuth } from '../stores/auth';

let loadingUsers = ref(true)

const companyStore = useCompany()
const userStore = useAuth()

let defaultUsers = computed(() => {
  return companyStore.company.employees.filter((e) => e.roles.includes('default_user'))
})

// let admins = computed(() => {
//   return companyStore.company.employees.filter((e) => e.roles.includes('admin'))
// })

let territoryRespUsers = computed(() => {
  return companyStore.company.employees.filter((e) => e.roles.includes('territory_resp'))
})

let employeesEmails = ref('')

let addEmployeeDialog = ref(false)
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

let deleteEmplDialog = ref(false)
let emplToDelete = ref(null)
function openDeleteEmpl(employee) {
  deleteEmplDialog.value = true
  emplToDelete.value = employee
}

function deleteEmpl() {
  if (emplToDelete.value && emplToDelete.value.email != userStore.user.email) {
    companyStore.deleteEmpl(emplToDelete.value.email)
  }
}

let editEmplDialog = ref(false)
let emplToEdit = ref(null)
let loadingEdit = ref(false)
function openEditEmpl(empl) {
  editEmplDialog.value = true
  emplToEdit.value = empl
}
async function editEmpl() {
  loadingEdit.value = true
  if (emplToEdit.value && emplToEdit.value.email != userStore.user.email) {
    companyStore.editEmpl(emplToEdit.value)
  }
  loadingEdit.value = false
  editEmplDialog.value = false
}

onMounted(() => {
  // companyStore.getCompany(userStore.user.email).then(() => {
  //   loadingUsers.value = false
  // })
})
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h1>Моя компания - <span style="color: #1976D2"> {{ companyStore.company.companyName }} </span></h1>
    </v-col>
    <v-col cols="12">
      <h2>Обычные сотрудники</h2>
      <span class="text-grey">
        всего: {{ defaultUsers.length }}
      </span>
    </v-col>
    <v-col cols="12">
      <v-btn size="small" variant="outlined" icon="mdi-plus" color="info" @click="addEmployeeDialog = true"></v-btn>
    </v-col>
    <v-col cols="12" v-if="loadingUsers">
    </v-col>
    <v-col cols="12" v-else>
      <v-row type="flex">
        <v-col cols="12" md="6" v-for="empl of defaultUsers" class="mb-4">
          <span v-if="empl.email == userStore.user.email" class="text-grey">
            это вы
          </span>
          <span v-else-if="empl.isConfirmed" style="color: #4CAF50">
            <span>
              {{ empl.user.fullname }}
              <v-tooltip activator="parent" location="top">
                Пользователь зарегистрировался
              </v-tooltip>
            </span>
          </span>
          <span v-else-if="!empl.isConfirmed">
            <v-tooltip activator="parent" location="top">
              Пользователь получил письмо и скоро зарегистрируется, ждите...
            </v-tooltip>
            <v-icon color="warning" style="cursor: pointer">mdi-alert-outline</v-icon>
          </span>
          {{ empl.email }}
          <v-btn icon="mdi-pen" size="small" variant="text" color="info" class="mb-1 mr-4" @click="openEditEmpl(empl)">
          </v-btn>
          <v-btn icon="mdi-delete" size="small" variant="text" color="error" class="mb-1"
            @click="openDeleteEmpl(empl)"></v-btn>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-col>



    <v-col cols="12">
      <h2>Сотрудники, ответственные за территорию</h2>
      <span class="text-grey">
        всего: {{ territoryRespUsers.length }}
      </span>
    </v-col>

    <v-col cols="12">
      <v-btn size="small" variant="outlined" icon="mdi-plus" color="info" @click="addEmployeeDialog = true"></v-btn>
    </v-col>

    <v-col cols="12">
      <v-row type="flex">
        <v-col cols="12" md="6" v-for="empl of territoryRespUsers" class="mb-4">
          <span v-if="empl.isConfirmed">
            <span>
              {{ empl.place }} -
            </span>
            <span style="color: #4CAF50">
              {{ empl.emplName }}
              <v-tooltip activator="parent" location="top">
                Пользователь зарегистрировался
              </v-tooltip>
            </span>
            <span>
              {{ empl.email }}
            </span>
          </span>
          <span v-if="!empl.email">
            {{ empl.place }} -
            {{ empl.emplName }}
          </span>
          <span v-else-if="!empl.user">
            <v-icon color="info" class="mb-1">mdi-clock</v-icon>
            {{ empl.place }} -
            {{ empl.emplName }}
            <v-tooltip activator="parent" location="top">
              Пользователь получил письмо и скоро зарегистрируется, ждите...
            </v-tooltip>
          </span>
          <v-btn v-if="!empl.email" color="error" variant="text" @click="openEditEmpl(empl)">
            Добавьте email!
          </v-btn>
          <v-btn icon="mdi-pen" size="small" variant="text" color="info" class="mb-1 mr-4" @click="openEditEmpl(empl)">
          </v-btn>
          <v-btn icon="mdi-delete" size="small" variant="text" color="error" class="mb-1"
            @click="openDeleteEmpl(empl)"></v-btn>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-col>

    <v-dialog v-model="editEmplDialog">
      <v-row type="flex" justify="center">
        <v-col cols="12" sm="6" xl="4">
          <v-card class="pa-5 text-center">
            <h2 v-if="emplToEdit.isConfirmed" class="mb-4">Пользователь уже в вашей компании</h2>
            <v-text-field v-model="emplToEdit.email" label="Введите новый email" variant="solo"></v-text-field>

            <v-card-actions>
              <v-btn color="success" @click="editEmpl" :loading="loadingEdit" :disabled="loadingEdit">изменить</v-btn>
              <v-btn color="error" @click="editEmplDialog = false">отмена</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <v-dialog v-model="deleteEmplDialog">
      <v-row type="flex" justify="center">
        <v-col cols="auto">
          <v-card class="pa-5 text-center">
            <h2 v-if="emplToDelete.email == userStore.user.email" class="mb-4">
              Это вы. Не удаляйте - не получится)
            </h2>
            <h2 v-else-if="emplToDelete.isConfirmed" class="mb-4">
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
              <v-btn color="success" @click="addEmployees">добавить</v-btn>
              <v-btn color="error" @click="addEmployeeDialog = false">отмена</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-row>
</template>
