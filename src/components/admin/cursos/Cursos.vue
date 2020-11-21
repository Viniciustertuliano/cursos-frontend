<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="5">
        <v-card-title> Detalhes do curso </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              
              <v-text-field label="Nome" v-model="cursoEdicao.nome"/>

              <vuetify-money
                v-model="cursoEdicao.preco"
                label="Preço"
                :options="options"/>

              <v-file-input
                accept="image/*"
                label="Imagem"
                v-model="imagem"
              ></v-file-input>

            </v-col>

            <v-col cols="12" md="6">
              <v-img max-width="200px" class="mx-auto" :src="imagemUrl"></v-img>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn class="success" @click="novoCurso">Novo</v-btn>
          <v-btn class="primary mr-3" @click="salvar">Salvar</v-btn>

          <v-dialog v-model="dialog" persistent max-width="450">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" dark v-bind="attrs" v-on="on">
                Excluir
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Confirmação de exclusão
              </v-card-title>
              <v-card-text
                >Confirmar exclusão do registro
                {{ this.cursoEdicao.nome }}?</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="excluir">
                  Confirmar
                </v-btn>
                <v-btn text @click="dialog = false">
                  Voltar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" md="12">
      <v-data-table
        :headers="headers"
        :items="cursosEdicao"
        :items-per-page="5"
        class="elevation-1"
      >

        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="carregarCurso(item)">mdi-pencil</v-icon>
        </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { salvarCurso, atualizarCurso, excluirCurso } from '@/services/curso.service'

export default {
  data() {
    return {
      cursoEdicao: {},
      imagem: null,
      imagemUrl: null,
      dialog: false,

      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Preço', value: 'preco' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],

      options: {
        locale: "pt-BR",
        prefix: "R$",
        suffix: "",
        length: 11,
        precision: 2
      }

    };
  },
  computed: {
    ...mapGetters(["cursosEdicao"]),
  },
  watch: {
    imagem() {
      if (this.imagem) {
        this.imagemUrl = URL.createObjectURL(this.imagem)
      }
    },
    cursoEdicao() {
      this.imagemUrl = this.cursoEdicao.arquivoURL
    }
  },
  methods: {
    // ...mapActions([
     
    // ]),
    async salvar() {
     
      const formData = new FormData();
      formData.append('curso',  new Blob([JSON.stringify(this.cursoEdicao)], { type: "application/json" }))
      if (this.imagem)
        formData.append('file', this.imagem)

      let response 

      try {
        if (this.cursoEdicao.id) {
          response = await atualizarCurso(this.cursoEdicao.id, formData)
        } else {
          response = await salvarCurso(formData)
        }
      
        if (response.status == 201 || response.status == 200) {
          this.$store.dispatch("carregarCursos");
          this.novoCurso()
          this.$store.dispatch("notificaSucesso", "Operação realizada com sucesso")
        }
      } catch (err) {
        this.$store.dispatch("notificaErro", err.response.data)
      }

    },
    async excluir() {
      const response = await excluirCurso(this.cursoEdicao.id)

      if (response.status == 204 ) {
        this.novoCurso()
        this.$store.dispatch("carregarCursos");
        this.$store.dispatch("notificaSucesso", "Registro removido")
      }
      this.dialog = false
    },
    carregarCurso(item) {
      this.cursoEdicao = item
    },
    novoCurso() {
      this.cursoEdicao = {};
      this.imagem = null;
      this.imagemUrl = null;
    },
  },
  mounted() {
    this.$store.dispatch("carregarCursos");
  },
};
</script>

<style>
</style>