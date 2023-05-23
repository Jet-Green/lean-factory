<script setup>
import { ref, computed } from 'vue'
import { useCompany } from '../stores/company'
import axios from 'axios'

const FACTORY_PLACES = computed(() => {
  if (!companyStore.company) return []
  return companyStore.fetchedPlaces
})

const companyStore = useCompany()
let photo = ref()
let filesToDB = []
let photosToShow = ref([])
let commentToPhoto = ref('')
let placeId = ref()

function addFile(file) {
  filesToDB.push(file[0])
  file = file[0]
  if (file) {
    photo.value = []
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      photosToShow.value.push({ name: file.name, img: reader.result })
    }, false);
  }
}

async function submit() {
  if (placeId.value) {
    let fullPlace;
    for (let pl of companyStore.fetchedPlaces) {
      if (pl._id == placeId.value) {
        fullPlace = pl
      }
    }

    let photosFromDB = []

    if (filesToDB.length) {
      let imagesFormData = new FormData()

      for (let photo of filesToDB) {
        imagesFormData.append('files', photo)
      }

      let { data } = await axios.post('http://51.250.120.102:3040/company/upload-problem-photos', imagesFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
      photosFromDB = data
    }

    let toSend = {
      photos: photosFromDB,
      commentToPhoto: commentToPhoto.value,
      placeId: placeId.value,
      actions: [{
        status: 'created',
        respEmpl: fullPlace.empl,
        date: Date.now()
      }]
    }

    await companyStore.reportProblem(toSend)

    commentToPhoto.value = ''
    placeId.value = null
  }
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h2> Сообщить о проблеме</h2>
    </v-col>
    <v-col cols="12">
      <v-file-input v-model="photo" label="Фото" variant="solo" prepend-icon="" prepend-inner-icon="mdi-camera"
        accept="image/*" @update:modelValue="addFile">
      </v-file-input>
      <v-card v-for="file of photosToShow" class="mb-2 pa-2">
        <div style="overflow-y: scroll; max-height: 50px">
          {{ file.name }}
        </div>
        <img :src="file.img" alt="" style="max-width: 100px">
      </v-card>
      <v-textarea v-model="commentToPhoto" variant="solo" rows="2" counter="500" auto-grow
        label="Комментарий к проблеме"></v-textarea>
    </v-col>
    <v-col cols="12">
      Где это произошло?
      <v-autocomplete v-model="placeId" hide-no-data variant="solo" placeholder="Выберите" :items="FACTORY_PLACES"
        item-title="place" item-value="_id" clearable></v-autocomplete>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn @click="submit">Отправить</v-btn>
    </v-col>
  </v-row>
</template>