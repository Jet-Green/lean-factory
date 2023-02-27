<script setup>
import { computed, ref } from 'vue'
import { useAuth } from "../stores/auth"
import { useCompany } from '../stores/company';
import { useRouter } from "vue-router"

const userStore = useAuth()
const companyStore = useCompany()
const router = useRouter()

let currentTab = ref('newReports')

let newReports = computed(() => {
  let result = []
  if (companyStore.employee) {
    result = companyStore.fetchedReports.filter((report) => report.actions[report.actions.length - 1].status == 'created')
  }
  return result.reverse()
})

let sentToFix = computed(() => {
  let result = []
  if (companyStore.employee) {
    result = companyStore.fetchedReports.filter((report) => report.actions[report.actions.length - 1].status == 'sent_to_fix')
  }
  return result.reverse()
})

let fixed = computed(() => {
  let result = []
  if (companyStore.employee) {
    result = companyStore.fetchedReports.filter((report) => report.actions[report.actions.length - 1].status == 'fixed')
  }
  return result.reverse()
})

let deleteReportDialog = ref(false)
async function deleteReport(_id) {
  let { data } = await companyStore.deleteReport(_id)
}

function downloadStats() {
  companyStore.downloadStats()
}

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
    <v-col cols="12" v-if="companyStore.employee">
      <h2>
        <span class="mdi mdi-account-outline">
        </span>
        {{ companyStore.employee?.emplName }}
      </h2>
    </v-col>
    <v-col cols="12">
      <v-btn @click="downloadStats">скачать статистку в формате excel</v-btn>
    </v-col>
    <v-col cols="12">
      <v-row type="flex">
        <v-col cols="12">
          <v-tabs v-model="currentTab">
            <v-tab value="newReports">Новые</v-tab>
            <v-tab value="sentToFix">Отправлено на исправление</v-tab>
            <v-tab value="fixed">Выполнено</v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12">
          <v-window v-model="currentTab">
            <v-window-item value="newReports">
              <span v-if="!newReports.length">
                Пусто
              </span>
              <v-row v-else class="pa-2">
                <v-col v-for="report of newReports" cols="12">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card style="cursor: pointer;" v-bind="props" :elevation="isHovering ? 4 : 0" class="px-2"
                      @click="router.push(`/problem-page?_id=${report._id}`)">
                      <v-row>
                        <v-col>
                          <div>
                            {{ report.commentToPhoto }}
                          </div>
                        </v-col>
                        <v-col v-if="(Date.now() - report.actions[report.actions.length - 1].date) < 60000">
                          <!-- ((Date.now() - report.actions[report.actions.length - 1].date) / 1000 / 60 / 60).toFixed(0) < 24 -->
                          <b class="text-success">
                            <!-- осталось: {{(24 - (Date.now() - report.actions[report.actions.length - 1].date) / 1000 / 60 /
                                                                                                                                                                                                                                                            60).toFixed(0) }} ч. -->
                            осталось: {{ (60 - (Date.now() - report.actions[report.actions.length - 1].date) /
                              1000).toFixed(0)
                            }} c.
                          </b>
                        </v-col>
                        <v-col v-else>
                          <div class="text-error">
                            просрочена {{
                              new Date(report.actions[report.actions.length -
                                1].date).toLocaleDateString('ru-RU', {
                                  month: 'long', day: 'numeric'
                                })
                            }}
                            {{
                              new Date(report.actions[report.actions.length -
                                1].date).toLocaleTimeString('ru-RU', {
                                  hour:
                                    "2-digit", minute: "2-digit"
                                })
                            }}
                          </div>
                        </v-col>
                        <v-col class="d-flex justify-end">
                          <v-btn icon variant="text" @click.stop="deleteReportDialog = true" type="flex" justify="end">
                            <span class="mdi mdi-delete text-error" style="font-size: 20px;">
                            </span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="text-grey-darken-2">
                          {{
                            new Date(report.actions[report.actions.length -
                              1].date).toLocaleDateString('ru-RU', {
                                month: 'long', day: 'numeric'
                              })
                          }}
                          {{
                            new Date(report.actions[report.actions.length -
                              1].date).toLocaleTimeString('ru-RU', {
                                hour:
                                  "2-digit", minute: "2-digit"
                              })
                          }}
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-hover>
                  <v-divider></v-divider>
                  <v-dialog v-model="deleteReportDialog">
                    <v-row type="flex" justify="center">
                      <v-col cols="auto">
                        <v-card class="px-6 py-1">
                          <v-card-title>
                            Удалить проблему?
                          </v-card-title>
                          <v-card-actions class="d-flex jusitfy-space-between">
                            <v-btn color="error" @click="deleteReport(report._id)">да</v-btn>
                            <v-btn @click="deleteReportDialog = false">нет</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="sentToFix">
              <span v-if="!sentToFix.length">
                Пусто
              </span>
              <v-row v-else type="flex" class="pa-2">
                <v-col v-for="report of sentToFix" cols="12">
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
                          осталось: {{ (60 - (Date.now() - report.actions.find((a) => a.status == 'sent_to_fix').date) /
                            1000).toFixed(0) }}
                          c.
                        </span>
                      </b>
                      <div v-else class="text-error">
                        просрочена
                        {{
                          new Date(report.actions[report.actions.length - 1].date)
                            .toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
                        }}
                        {{
                          ' ' + new Date(report.actions[report.actions.length - 1].date).toLocaleTimeString('ru-RU', {
                            hour:
                              "2-digit", minute: "2-digit"
                          })
                        }}
                      </div>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="fixed">
              <span v-if="!fixed.length">
                Пусто
              </span>
              <v-row v-else type="flex" class="pa-2">
                <v-col v-for="report of fixed" cols="12" sm="6" md="4">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card style="cursor: pointer;" v-bind="props" :elevation="isHovering ? 4 : 0" class="pa-2"
                      @click="router.push(`/problem-page?_id=${report._id}`)">
                      <div>{{ report.place }}</div>
                      <div class="text-grey-darken-2">
                        {{ report.commentToPhoto }}
                      </div>
                      <b class="text-success">Задача выполнена</b>
                      {{
                        new Date(report.actions[report.actions.length - 1].date)
                          .toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
                      }}
                      {{
                        ' ' + new Date(report.actions[report.actions.length - 1].date).toLocaleTimeString('ru-RU', {
                          hour:
                            "2-digit", minute: "2-digit"
                        })
                      }}
                      <!-- {{.getDate() + '.' + new Date(report.actions[report.actions.length -1].date).getMonth() + '.' + new Date(report.actions[report.actions.length - 1].date).getFullYear() + ' ' +new Date(report.actions[report.actions.length - 1].date).getHours() + ' часов'}} -->
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-col>



  </v-row>
</template>
<style lang="scss" scoped>
.reports-window {
  max-height: 50vh;
  overflow-y: scroll;
}
</style>