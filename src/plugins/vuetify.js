// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
    theme: {
        themes: {
            light: {
                colors: {
                    // background: '#FFFFFF',
                    // surface: '#FFFFFF',
                    // primary: '#FF6600',
                    // 'primary-darken-1': '#3700B3',
                    // secondary: '#22B0D6',
                    // 'secondary-darken-1': '#018786',
                    // error: '#B00020',
                    // info: '#2196F3',
                    // success: '#4CAF50',
                    // warning: '#FB8C00',
                    primary: '#1976D2',
                    secondary: '#D8D8D8',
                    accent: '#FF6501',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                }
            },
        },
    },
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides