<template>
  <v-snackbar v-model="snackbar" top right :color="message.type" :multi-line="true" timeout="10000">

    <ul>
      <li v-for="(msg, index) in message.messages" :key="index"> {{ msg }}</li>
    </ul>
    
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="fechaMensagem">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";

export default {

  computed: {
    snackbar: {
      get: function() {
        return this.$store.getters.showMessage
      },
      set: function() {
        this.fechaMensagem()
      }
    },
    message() {
      return this.$store.getters.message
    }
  },

  methods: {
    ...mapActions(["fechaMensagem"]),
  },
};
</script>

<style>
</style>