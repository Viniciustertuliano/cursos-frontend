<template>
  <v-row>
      <v-col cols="12" md="4" sm="12" v-for="curso in cursos" :key="curso.id">
          <CursoItem :curso=" curso "/>
      </v-col>
  </v-row>
</template>

<script>
import CursoItem from '../cursos/CursoItem'

export default {

    data() {
        return {
            
        }
    },

    computed: {
        cursos() {
            return this.$store.getters.cursosAVenda
        }
    },

    components: {
        CursoItem
    }

}
</script>

<style>

</style>