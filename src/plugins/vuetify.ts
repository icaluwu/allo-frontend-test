/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#070b14',
          surface: '#0e1420',
          'surface-variant': '#182130',
          primary: '#ffb454',
          'on-primary': '#221300',
          secondary: '#38bdf8',
          'on-secondary': '#03283d',
        },
      },
    },
  },
})
