<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let drawer = ref(false)
const router = useRouter()

function move(route) {
    if (route) {
        router.push({ name: route.id ? route.id : route })
        drawer.value = false
    }
}

</script>

<template>
    <v-layout>
        <v-app-bar color="primary" class="d-none d-md-flex">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <!-- <v-app-bar-title>Photos</v-app-bar-title> -->

            <!-- <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template> -->
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary>
            <v-list density="compact" nav @click:select="move">
                <v-list-item color="red" prepend-icon="mdi-camera" title="Нарушение" value="Problem"></v-list-item>
                <v-list-item color="info" prepend-icon="mdi-help-circle-outline" title="Инструкция"
                    value="Instruction"></v-list-item>
                <v-list-item color="success" prepend-icon="mdi-account" title="Кабинет" value="Cabinet"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
        <v-bottom-navigation class="d-flex d-md-none" mode="shift" @update:modelValue="move">
            <v-btn value="Problem">
                <v-icon color="red">mdi-camera</v-icon>
                <span>
                    Нарушение
                </span>
            </v-btn>
            <v-btn value="Instruction">
                <v-icon color="info">mdi-help-circle-outline</v-icon>
                <span>
                    Инструкция
                </span>
            </v-btn>
            <v-btn value="Cabinet">
                <v-icon color="success">mdi-account</v-icon>
                <span>
                    Кабинет
                </span>
            </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>

<style scoped>

</style>
