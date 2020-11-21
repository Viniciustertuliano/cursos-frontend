<template>
  <v-card max-width="350px" class="mx-auto pa-5" elevation="5">
    <v-card-title primary-title>
      <h4>{{ showRegistrar ? 'Registrar usuário' : 'Acessar' }}</h4>
    </v-card-title>

    <v-text-field v-model="user.username" label="Nome" prepend-icon="mdi-account" required/>
    <v-text-field v-model="user.password" label="Senha" prepend-icon="mdi-lock" type="password"/>
    <v-text-field v-model="user.confirmPassword" v-show="showRegistrar" label="Confirmar" prepend-icon="mdi-lock" type="password"/>

    <v-card-actions class="d-flex justify-center">
      <v-btn v-if="showRegistrar" color="success" @click="signup(user)">Registrar</v-btn>
      <v-btn v-else color="success" @click="login(user)" >Acessar</v-btn>
    </v-card-actions>

    <v-card-actions class="d-flex justify-center">
      <a href @click.prevent="showRegistrar = !showRegistrar">
        <span v-if="showRegistrar">Já é cadastrado? Clique aqui!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </v-card-actions>

  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  data() {
    return {
      showRegistrar: false,
      user: {}
    }
  },

  methods: {
    // signup(user) {
    //   console.log(user)
    // },
    // login(user) {
    //   console.log(user)
    // }
    ...mapActions([
      'login',
      'signup'
    ])
  }


}
</script>

<style>

</style>