<template>
  <div>
    <h2>Register with Vue TODO</h2>
    <h3>
      Already have an account? <RouterLink to="/login">Login here</RouterLink>
    </h3>
    <form @submit.prevent="handleSubmit">
      <label>
        E-mail
        <input v-model="email" name="email" type="email" />
      </label>
      <label>
        Password
        <input v-model="password" type="password" name="password" />
      </label>
      <button type="submit">Sign In</button>
    </form>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const auth = useAuthStore()
    const router = useRouter()

    watch(
      () => auth.isAuthenticated,
      newVal => {
        if (newVal) {
          router.push('/')
        }
      },
    )

    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSubmit = async () => {
      errorMessage.value = ''

      //const result =
      await auth.emailSignInCreate(email.value, password.value)

      // if (result?.success) {
      //   router.push('/')
      // } else {
      //   errorMessage.value = result?.response
      // }
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
