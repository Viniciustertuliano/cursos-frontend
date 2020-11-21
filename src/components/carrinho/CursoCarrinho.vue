<template>
  <v-row align="center">
    <v-col cols="12" md="1">
      <img :src="curso.arquivoURL" width="80px">
    </v-col>

    <v-col cols="12" md="6">
      <h3>{{ curso.nome }}</h3>
      <h5>{{ curso.preco  }}</h5>
    </v-col>

    <v-col cols="12" md="1">
      <v-text-field label="Quantidade" type="number" 
        v-model="curso.quantidade"
        @input="alterarQuantidade"
        min="1"></v-text-field>
    </v-col>

    <v-col cols="12" md="3">
      <div class="d-flex justify-end">
        <span>Subtotal {{ subtotal  }}</span>
      </div>
    </v-col>

    <v-col cols="12" md="1">
      <v-btn icon class="error">
        <v-icon color="white">mdi-delete</v-icon>
      </v-btn>
    </v-col>

  </v-row>
</template>

<script>
export default {
  props: [
      'curso'
  ],
  data() {
    return {

    }
  },
  computed: {
    subtotal() {
      return this.curso.preco * this.curso.quantidade
    }
  },
  methods: {
    alterarQuantidade() {
      this.$store.dispatch('alterarQuantidade', this.curso)
    }
  }
}
</script>

<style>

</style>