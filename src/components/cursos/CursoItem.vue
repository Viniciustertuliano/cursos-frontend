<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="curso.arquivoURL"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ curso.nome }}
    </v-card-title>

    <v-card-subtitle>
      {{ curso.preco }}
    </v-card-subtitle>

    <v-card-actions>
     <v-btn color="success" block @click="adicionarCarrinho">Adicionar ao Carrinho</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {

  props: {
    curso: Object
  },

  methods: {
    adicionarCarrinho() {
      this.$store.dispatch('adicionarAoCarrinho', this.curso)
    }
  }

}
</script>

<style>

</style>