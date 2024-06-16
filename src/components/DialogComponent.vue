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
    dialogIcon: String,
    dialogBackgroundColor: String,
    dialogTextColor: String
  },
  emits: ['onConfirm'],
  data () {
    return {
      confirmText: this.dialogCancelText as string,
      cancelText: this.dialogCancelText as string,
      confirmColor: this.dialogConfirmColor as string,
      cancelColor: this.dialogCancelColor as string,
      text: this.dialogText as string,
      opened: this.dialogOpened as boolean,
      icon: this.dialogIcon as string,
      backgroundColor: this.dialogBackgroundColor as string,
      textColor: this.dialogTextColor as string
    }
  },
  methods: {
    onConfirm () {
      this.$emit('onConfirm')
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
        <q-avatar :icon="icon" :color="backgroundColor" :text-color="textColor" />
        <span class="q-ml-sm">{{ text }}</span>
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
