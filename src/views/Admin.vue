<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useCompany } from '../stores/company'
import { useAuth } from '../stores/auth';

let loadingUsers = ref(true)

const companyStore = useCompany()
const userStore = useAuth()

let employees = computed(() => {
  return companyStore.fetchedEmployees
})

// let employeesEmails = ref('')
let NEW_EMPLS = ref([
  {
    places: '',
    emplName: '',
    email: '',
    isConfirmed: false,
    roles: []
  }
])

let addEmplTab = ref()
let addEmployeeDialog = ref(false)
function addEmployees() {
  if (NEW_EMPLS.value.length == 1 && (!NEW_EMPLS.value[0].emplName || !NEW_EMPLS.value[0].places)) {
    delete NEW_EMPLS.value[0]
  }

  // let rawEmails = employeesEmails.value.split(',')

  // if (rawEmails.length !== 1 && rawEmails[0] !== '') {
  //   for (let e of rawEmails) {
  //     NEW_EMPLS.value.push({
  //       email: e.trim(), isConfirmed: false, places: '',
  //       emplName: '', roles: ['default_user']
  //     })
  //   }
  // }
  // employeesEmails.value = ''

  companyStore.addEmployees(NEW_EMPLS.value)

  NEW_EMPLS.value = [{
    places: '',
    emplName: '',
    email: '',
    isConfirmed: false,
    roles: ['territory_resp']
  }]

  addEmployeeDialog.value = false
}

let deleteEmplDialog = ref(false)
let emplToDelete = ref(null)
function openDeleteEmpl(employee, event) {
  deleteEmplDialog.value = true
  emplToDelete.value = employee
  event.stopPropagation();
}

function deleteEmpl() {
  if (emplToDelete.value && emplToDelete.value.email != userStore.user.email) {
    companyStore.deleteEmpl(emplToDelete.value._id)
    deleteEmplDialog.value = false
  }
}

let editEmplDialog = ref(false)
let emplToEdit = ref(null)
let loadingEdit = ref(false)
function openEditEmpl(empl, event) {
  editEmplDialog.value = true
  emplToEdit.value = empl
  event.stopPropagation();
}
async function editEmpl() {
  loadingEdit.value = true
  if (emplToEdit.value && emplToEdit.value.email != userStore.user.email) {
    companyStore.editEmpl(emplToEdit.value)
  }
  loadingEdit.value = false
  editEmplDialog.value = false
}

let showEmplDialog = ref(false)
let emplToShow = ref(null)
let fullEmplInfo = ref({})
async function openEmplInfo(empl) {
  emplToShow.value = empl
  showEmplDialog.value = true
  let { data } = await companyStore.getFullEmpl(emplToShow.value._id)
  console.log(data);
  fullEmplInfo.value = data
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
    <!-- <v-col cols="12">
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
    </v-col> -->



    <v-col cols="12">
      <h2>Сотрудники</h2>
      <span class="text-grey">
        всего: {{ employees.length }}
      </span>
    </v-col>

    <v-col cols="12">
      <v-btn size="small" variant="outlined" icon="mdi-plus" color="info" @click="addEmployeeDialog = true"></v-btn>
    </v-col>

    <v-col cols="12">
      <v-row type="flex">
        <v-col cols="12" md="6" v-for="empl of employees" class="mb-4" @click.stop="openEmplInfo(empl)"
          style="cursor: pointer">
          <span v-if="empl.isConfirmed">
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
            {{ empl.emplName }}
          </span>
          <span v-else-if="!empl.user">
            <v-icon color="info" class="mb-1">mdi-clock</v-icon>
            {{ empl.emplName }}
            <v-tooltip activator="parent" location="top">
              Пользователь получил письмо и скоро зарегистрируется, ждите...
            </v-tooltip>
          </span>
          <v-btn v-if="!empl.email" color="error" variant="text" @click="openEditEmpl(empl, $event)">
            Добавьте email!
          </v-btn>
          <v-btn icon="mdi-pen" size="small" variant="text" color="info" class="mb-1 mr-4"
            @click="openEditEmpl(empl, $event)">
          </v-btn>
          <v-btn icon="mdi-delete" size="small" variant="text" color="error" class="mb-1"
            @click="openDeleteEmpl(empl, $event)"></v-btn>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-col>

    <v-dialog v-model="showEmplDialog" scrollable>
      <v-row type="flex" justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-card class="pa-3" v-if="fullEmplInfo._id">
            <h2 class="text-center">
              {{ fullEmplInfo.emplName }}
            </h2>
            <div v-if="fullEmplInfo.places.length > 0">
              <span style="font-size: 20px;">
                Ответственный за:
              </span>
              <span v-for="place of fullEmplInfo.places">
                <b>
                  {{ place.place }}
                </b>
                <br />
              </span>
            </div>
            <div v-if="fullEmplInfo.problemType.length > 0">
              <span style="font-size: 20px;">
                Типы проблем:
              </span>
              <span v-for="problemType of fullEmplInfo.problemType">
                <b>
                  {{ problemType.type }}
                </b>
                <br />
              </span>
            </div>
            <v-card-actions>
              <v-btn @click="showEmplDialog = false">ок</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

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

    <!-- <v-dialog v-model="addEmployeeDialog" scrollable>
      <v-row type="flex" justify="center">
        <v-col cols="12" sm="12" md="8">
          <v-card class="pa-4">
            <h2 class="mb-2">
              Ответственный за:
            </h2>
            <v-tabs v-model="addEmplTab">
              <v-tab value="territory_resp">
                территорию
              </v-tab>
              <v-tab value="problem_fix">
                неисправность
              </v-tab>
            </v-tabs>
            <v-window v-model="addEmplTab" style="max-height: 60vh; overflow-y: scroll; ">
              <v-window-item value="territory_resp" class="ma-4">
                <div v-for="(empl, index) of NEW_EMPLS" cols="5">
                  <v-row type="flex">
                    <v-col cols="12" class="pb-0 pt-0">
                      {{ index + 1 }}
                    </v-col>
                    <v-col cols="12" xl="4" class="pb-0 pt-0">
                      <v-text-field placeholder="ФИО" variant="solo" density="compact"
                        v-model="NEW_EMPLS[index].emplName">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" xl="4" class="pb-0 pt-0">
                      <v-text-field placeholder="Ответственный за" variant="solo" density="compact"
                        v-model="NEW_EMPLS[index].places">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" xl="4" class="pt-0 pb-0">
                      <v-text-field placeholder="Email" variant="solo" density="compact"
                        v-model="NEW_EMPLS[index].email">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </div>
                <v-btn size="small"
                  @click="NEW_EMPLS.push({ places: '', emplName: '', email: '', roles: ['territory_resp'], isConfirmed: false })">
                  + ещё
                </v-btn>
              </v-window-item>
              <v-window-item value="problem_fix" class="ma-4">
                <div v-for="(empl, index) of NEW_EMPLS" cols="5">
                  <v-row type="flex">
                    <v-col cols="12" class="pb-0 pt-0">
                      {{ index + 1 }}
                    </v-col>
                    <v-col cols="12" xl="4" class="pb-0 pt-0">
                      <v-text-field placeholder="ФИО" variant="solo" density="compact"
                        v-model="NEW_EMPLS[index].emplName">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" xl="4" class="pb-0 pt-0">
                      <v-text-field label="Ответственный за" placeholder="введите через запятую" variant="solo"
                        density="compact" v-model="NEW_EMPLS[index].problemType">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" xl="4" class="pt-0 pb-0">
                      <v-text-field placeholder="Email" variant="solo" density="compact"
                        v-model="NEW_EMPLS[index].email">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </div>
                <v-btn size="small"
                  @click="NEW_EMPLS.push({ places: '', emplName: '', email: '', roles: ['territory_resp'], isConfirmed: false })">
                  + ещё
                </v-btn>
              </v-window-item>
            </v-window>
            <v-card-actions>
              <v-btn color="success" @click="addEmployees">добавить</v-btn>
              <v-btn color="error" @click="addEmployeeDialog = false">отмена</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog> -->
  </v-row>
</template>
