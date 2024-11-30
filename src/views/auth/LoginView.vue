<template>
  <div>
    <h2>Login to Vue TODO</h2>
    <h3>
      Don't have an account?
      <RouterLink to="/register">Register here</RouterLink>
    </h3>
    <form @submit.prevent>
      <label>
        E-mail
        <input v-model="email" name="email" type="email" />
      </label>
      <label>
        Password
        <input v-model="password" type="password" name="password" />
      </label>
      <button @click="handleSubmit">Sign In</button>
    </form>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    console.log('is auth', auth?.isAuthenticated)

    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSubmit = async () => {
      errorMessage.value = ''

      const result = await auth.emailAndPasswordSignIn(
        email.value,
        password.value,
      )

      if (result?.success) {
        router.push('/')
      } else {
        errorMessage.value = result?.response
      }
    }

    return {
      email,
      password,
      errorMessage,
      handleSubmit,
    }
  },
})
</script>

<style scoped></style>
