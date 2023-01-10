<script setup>
import { ref } from 'vue'
import { useCompany } from '../stores/company'

let factory = ref(
  [
    { place: 'Участок очистки сточных вод', emplName: 'Волков Н.А.' },
    { place: 'Усреднитель', emplName: 'Волков Н.А.' },
    { place: 'Холодильник', emplName: 'Гаврилова С.С.' },
    { place: 'Материальный склад № 7', emplName: 'Васильченко С.В.' },
    { place: 'Токарная мастерская', emplName: 'Ведерников В.И.' },
    {
      place: 'Трансформаторная подстанция ТП-15',
      emplName: 'Казанцев А.В.'
    },
    { place: 'Раздевалка АХС', emplName: 'Вершинин А.С.' },
    { place: 'Гараж легковых автомобилей', emplName: 'Абуткин Р.Ш.' },
    { place: 'Помещение для тех.обслуживания', emplName: 'Абуткин Р.Ш.' },
    { place: 'Материальный склад № 8', emplName: 'Васильченко С.В.' },
    {
      place: 'Трансформаторная подстанция ТП-47',
      emplName: 'Казанцев А.В.'
    },
    { place: 'Материальный склад', emplName: 'Васильченко С.В.' },
    { place: 'Диспетчерская', emplName: 'Абуткин Р.Ш.' },
    { place: 'Материальный склад № 5', emplName: 'Васильченко С.В.' },
    { place: 'Помещение прачечной', emplName: 'Ведерников В.И.' },
    { place: 'Тепловой пункт', emplName: 'Ведерников В.И.' },
    { place: 'Склад готовой продукции', emplName: 'Гаврилова С.С.' },
    { place: 'Железный склад', emplName: 'Гаврилова С.С.' },
    { place: 'Бетонный склад', emplName: 'Гаврилова С.С.' },
    { place: 'Градирни', emplName: 'Ведерников В.И.' },
    {
      place: 'Трансформаторная подстанция РП-4',
      emplName: 'Казанцев А.В.'
    },
    { place: 'Здание распредпункта', emplName: 'Ведерников В.И.' },
    { place: 'Воздуходувная компрессорная', emplName: 'Ведерников В.И.' },
    { place: 'Склад СП ГПК СОМ', emplName: 'Чинюк Э.В.' },
    { place: 'Компрессорная АХУ', emplName: 'Ведерников В.И.' },
    {
      place: 'Электрощитовая к участку ледяной воды',
      emplName: 'Казанцев А.В.'
    },
    { place: 'Участок по производству СП', emplName: 'Чинюк Э.В.' },
    { place: 'Теплогазогенераторная', emplName: 'Савин П. В.' },
    { place: 'Помещение ВВУ', emplName: 'Чинюк Э.В.' },
    {
      place: 'Отделение баромембранных технологий',
      emplName: 'Чинюк Э.В.'
    },
    { place: 'Водоподготовка СИП №3', emplName: 'Чинюк Э.В.' },
    { place: 'Отделение хранения сыворотки', emplName: 'Чинюк Э.В.' },
    { place: 'Отделение хранения молока', emplName: 'Чинюк Э.В.' },
    { place: 'Приемка сыворотки', emplName: 'Чинюк Э.В.' },
    { place: 'Участок нормализации', emplName: 'Чинюк Э.В.' },
    { place: 'Приемка молока', emplName: 'Чинюк Э.В.' },
    { place: 'Здание АБК', emplName: 'Вершинин А.С.' },
    { place: 'Цех по производству ЦМП и КМП №1', emplName: '2' },
    {
      place: 'Цех по производству ЦМП и КМП №3',
      emplName: 'Главатских Л.Л.'
    },
    {
      place: 'Цех по производству ЦМП и КМП №4',
      emplName: 'Главатских Л.Л.'
    },
    {
      place: 'Цех по производству ЦМП и КМП №5',
      emplName: 'Главатских Л.Л.'
    },
    { place: 'СИП-станция цех ЦМП №1', emplName: '2' },
    {
      place: 'Склад вспом.материалов ЦМП № 1',
      emplName: 'Главатских Л.Л.'
    },
    {
      place: 'Склад вспом.материалов ЦМП № 2',
      emplName: 'Главатских Л.Л.'
    },
    { place: 'СИП-станция цех ЦМП № 3', emplName: '4' },
    { place: 'СИП-станция цех ЦМП № 5', emplName: 'Главатских Л.Л.' },
    { place: 'Мелкооптовый магазин', emplName: 'Вершинин А.С.' },
    { place: 'Раздевалка ОСЛ', emplName: 'Гаврилова С.С.' },
    { place: 'Котельная', emplName: 'Савин П. В.' },
    { place: 'Помещение для шиномонтажа', emplName: 'Юферев Д.А.' },
    { place: 'Склад № 3', emplName: 'Юферев Д.А.' },
    { place: 'Склад № 2', emplName: 'Юферев Д.А.' },
    { place: 'Склад № 1', emplName: 'Васильченко С.В.' },
    { place: 'Ремонтный бокс № 3', emplName: 'Юферев Д.А.' },
    { place: 'Ремонтный бокс № 2', emplName: 'Юферев Д.А.' },
    { place: 'Ремонтный бокс № 1', emplName: 'Юферев Д.А.' },
    { place: 'Сварочный пост', emplName: 'Юферев Д.А.' },
    { place: 'Ангар для хранения автомобилей', emplName: 'Абуткин Р.Ш.' },
    { place: 'Блок подсобных помещений', emplName: 'Ведерников В.И.' },
    { place: 'Здание проходной', emplName: 'Вершинин А.С.' },
    { place: 'Здание насосной станции', emplName: 'Савин П. В.' },
    {
      place: 'Канализационная насосная станция',
      emplName: 'Ведерников В.И.'
    },
    { place: 'Административный корпус', emplName: 'Вершинин А.С.' }
  ]
)
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
    status: "sent_to_fix"
  }

  // find place and empl object
  for (let p of factory.value) {
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
      <v-autocomplete v-model="place" hide-no-data variant="solo" placeholder="Выберите" :items="factory"
        item-title="place" item-value="place" clearable></v-autocomplete>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn @click="submit">Отправить</v-btn>
    </v-col>
  </v-row>
</template>