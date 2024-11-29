<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
const auth = useAuthStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" to="/login">Login</RouterLink>
        <button v-bind="auth.signOut()" v-if="auth.isAuthenticated">
          Logout
        </button>
      </nav>
    </div>
  </header>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  position: fixed;
}

.content {
  margin-top: 2rem;
}

button {
  border-radius: 5px;
  padding: 0.4rem;
  border: none;
  cursor: pointer;
  color: rgb(200, 40, 40);
  transition: color 0.3s ease;
  background: transparent;
  font-size: 1rem;
}

button:hover {
  color: rgb(250, 40, 40);
}

button:focus {
  outline: none;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  button {
    border-radius: 20px;
  }
}
</style>
