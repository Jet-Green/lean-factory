<script setup>
import { ref } from 'vue'
import { useAuth } from "../stores/auth"
import { useRouter } from "vue-router"

const userStore = useAuth()
const router = useRouter()

let valid = ref(true)
let email = ref()
let password = ref()
let fullname = ref()

async function registration() {
  let company_id = router.currentRoute.value.query.company_id
  userStore.isAuth = true
  let result = await userStore.registration({ fullname: fullname.value, email: email.value, password: password.value, company: company_id ? company_id : "-1" })

  if (result.success) {
    valid.value = true
    router.push('/cabinet')
  }
}
</script>
<template>
  <v-row type="flex" justify="center">
    <v-col cols="11" md="6" xl="4">
      <v-row>
        <v-col cols="12">
          <v-form v-model="valid" @submit.prevent="registration">
            <v-row>
              <v-col cols="12" class="pa-0">
                <h1 class="text-center mb-8">Регистрация</h1>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="fullname" label="ФИО" variant="solo" autocomplete="name" required></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="email" label="Электронная почта" variant="solo" autocomplete="email"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="password" label="Пароль" variant="solo" type="password"
                  autocomplete="current-password" required></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0 d-flex justify-center">
                <v-btn type="submit">отправить</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-col cols="12" class="d-flex justify-center mt-4">
        <router-link to="/login" class="text-decoration-none" style="color: #2196F3">вход</router-link>
      </v-col>
    </v-col>
  </v-row>
</template>