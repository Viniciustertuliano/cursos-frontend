<template>
  <v-card class="mx-auto">
    <v-card-title>Detalhes da compra</v-card-title>

    <v-card-text>
      Confirmar compra no valor 
      <strong>Total de {{ valorTotal }}</strong> 
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn color="primary" dark>
        Confirmar Compra
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    valorTotal() {
      return this.$store.getters.valorTotal
    }
  }
}
</script>

<style>

</style>