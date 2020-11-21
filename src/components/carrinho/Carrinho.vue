<template>
  <v-row>
    <v-col cols="12" md="8">
      <CursoCarrinho v-for="curso in cursosCarrinho" :key="curso.id" :curso="curso" />
    </v-col>
    <v-col cols="12" md="4">
      <Checkout/>
    </v-col>
  </v-row>
</template>

<script>
import CursoCarrinho from './CursoCarrinho'
import Checkout from './Checkout'

export default {

  components: {
    CursoCarrinho, Checkout
  },

  computed: {
    cursosCarrinho() {
      return this.$store.getters.cursosCarrinho
    }
  }

}
</script>

<style>

</style>