<script setup>
import { ref, computed } from 'vue'
import { useCompany } from '../stores/company'

const FACTORY = computed(() => {
  if (!companyStore.company) return []
  return companyStore.fetchedPlaces
})

const companyStore = useCompany()
let photo = ref()
let photos = ref([])
let commentToPhoto = ref('')
let place = ref()

function addFile(file) {
  if (file.length) {
    file = file[0]
    console.log(file);
    photo.value = []
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      photos.value.push({ name: file.name, img: reader.result })
    }, false);
  }
}

async function submit() {
  let toSend = {
    photos: [],
    commentToPhoto: commentToPhoto.value,
    place: {},
    dateStart: Date.now(),
  }

  // find place and empl object
  for (let p of FACTORY.value) {
    if (p.place == place.value) {
      toSend.place = p
    }
  }
  await companyStore.reportProblem(toSend)
  commentToPhoto.value = ''
  place.value = null
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
      <v-textarea v-model="commentToPhoto" variant="solo" rows="2" counter="500" auto-grow
        label="Комментарий к проблеме"></v-textarea>

      <v-card v-for="file of photos" class="mb-2 pa-2">
        <div style="overflow-y: scroll; max-height: 50px">
          {{ file.name }}
        </div>
        <img :src="file.img" alt="" style="max-width: 100px">
      </v-card>
    </v-col>
    <v-col cols="12">
      Где это произошло?
      <v-autocomplete v-model="place" hide-no-data variant="solo" placeholder="Выберите" :items="FACTORY"
        item-title="place" item-value="place" clearable></v-autocomplete>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn @click="submit">Отправить</v-btn>
    </v-col>
  </v-row>
</template>