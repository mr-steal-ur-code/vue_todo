<template lang="">
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  data() {
    return {
      items: ref([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
      ]),
    }
  },
}
</script>
