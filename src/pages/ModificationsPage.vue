<script lang="ts">
import { defineComponent } from 'vue'
import ModificationsListComponent from 'components/ModificationsListComponent.vue'

export default defineComponent({
  name: 'ModificationsPage',
  components: {
    ModificationsListComponent
  }
})
</script>

<template>
  <ModificationsListComponent/>
</template>

<style scoped>

</style>
