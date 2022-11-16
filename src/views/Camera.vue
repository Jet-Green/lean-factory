<script setup>
import { ref, onMounted } from 'vue'
import { WebCam } from 'vue-camera-lib'

let webcam = null
let cameras = []
let deviceId = ref('')
const emit = defineEmits(['init', 'photoTaken'])

async function takePhoto() {
    try {
        await webcam.takePhoto();
    } catch (err) {
        console.log(err)
    }
}
function loadCameras() {
    webcam.loadCameras()
    cameras = webcam.cameras;
}
function webcamInit(deviceId) {
    deviceId.value = deviceId
    emit('init', deviceId)
}
function setCamera() {
    webcam.changeCamera(deviceId.value === '' ? null : deviceId.value)
}

function photoTakenEvent({ blob, image_data_url }) {
    emit('photoTaken', { blob, image_data_url })
}

onMounted(() => {
    cameras = webcam.cameras;
    if (cameras.length === 0) {
        // if no camera found, we will try to refresh cameras list each second until there is some camera
        loadCameras()
        // let reloadCamInterval = setInterval(() => {
        //     if (cameras.length > 0) {
        //         clearInterval(reloadCamInterval)
        //     }
        // }, 1000);
    }
})
</script>
<template>
    <WebCam ref="webcam" @photoTaken="photoTakenEvent" @init="webcamInit" />
    <select @change="setCamera" v-model="deviceId">
        <option value="">-</option>
        <option v-for="camera in cameras" :value="camera.deviceId">{{ camera }}</option>
    </select>
    <button @click="takePhoto">Take a photo</button>
</template>