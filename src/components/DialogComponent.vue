<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DialogComponent',
  props: {
    dialogConfirmText: String,
    dialogCancelText: String,
    dialogConfirmColor: String,
    dialogCancelColor: String,
    dialogText: String,
    dialogOpened: Boolean,
    dialogIcon: String
  },
  emits: ['onConfirmation'],
  data () {
    return {
      confirmText: this.dialogConfirmText as string,
      cancelText: this.dialogCancelText as string,
      confirmColor: this.dialogConfirmColor as string,
      cancelColor: this.dialogCancelColor as string,
      dialogMessage: this.dialogText as string,
      opened: this.dialogOpened as boolean,
      icon: this.dialogIcon as string
    }
  },
  methods: {
    onConfirm () {
      this.$emit('onConfirmation')
      this.opened = false
    },
    onCancel () {
      this.opened = false
    }
  }
})
</script>

<template>
  <q-dialog v-model="opened" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar flat :icon="icon" :text-color="confirmColor" />
        <span class="q-ml-sm">{{ dialogMessage }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="cancelText" :color="cancelColor" @click="onCancel" v-close-popup />
        <q-btn :label="confirmText" :color="confirmColor" @click="onConfirm" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
