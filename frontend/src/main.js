import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// // Check if the user is authenticated on initial page load
// const token = localStorage.getItem('token')
// if (token) {
//   // User is authenticated, redirect to the /todo route
//   router.push('/todo')
// } else {
//   // User is not authenticated, redirect to the /login route
//   router.push('/login')
// }

// app.use(router)
// app.mount('#app')