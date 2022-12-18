<script setup>
import { ref } from 'vue'
import { useAuth } from "../stores/auth"
import { useRouter } from "vue-router"

const userStore = useAuth()
const router = useRouter()

let valid = ref(true)
let email = ref('')
let password = ref('')

async function login() {
  let { success } = await userStore.login(email.value, password.value)
  if (success) {
    router.push('/cabinet')
  }
}
</script>
<template>
  <v-row type="flex" justify="center">
    <v-col cols="11" md="6" xl="4">
      <v-row>
        <v-col cols="12">
          <v-form v-model="valid" @submit.prevent="login">
            <v-row>
              <v-col cols="12" class="pa-0">
                <h1 class="text-center mb-8">Вход</h1>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="email" label="Электронная почта" variant="solo" autocomplete="email"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="password" label="Пароль" variant="solo" type="password" autocomplete="password"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0 d-flex justify-center">
                <v-btn type="submit">отправить</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-col cols="12" class="d-flex justify-center mt-4">
        <router-link to="/registration" class="text-decoration-none" style="color: #2196F3">регистрация</router-link>
      </v-col>
    </v-col>
  </v-row>
</template>