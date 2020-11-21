<template>
  <v-app>

    <Header />

    <v-main>
      <v-container fluid>
        <Alerta />
        <router-view></router-view>      
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from './components/template/Header'
import Footer from './components/template/Footer'
import Alerta from './components/template/Alerta'

export default {
  name: 'App',

  components: {
    Header, Footer, Alerta
  },

  data: () => ({
    //
  }),

  created() {
    this.$store.dispatch('carregarUsuario')
    this.$store.dispatch('carregarCursos')
  }

};
</script>
