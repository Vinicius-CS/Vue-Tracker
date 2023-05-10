<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateralComponent />
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacaoComponent />
      <ButtonTemaComponent @alterarTema="alterarTema" />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateralComponent from './components/BarraLateralComponent.vue';
import NotificacaoComponent from './components/NotificacaoComponent.vue';
import ButtonTemaComponent from './components/ButtonTemaComponent.vue';

export default defineComponent({
  name: "App",
  components: {
    BarraLateralComponent,
    NotificacaoComponent,
    ButtonTemaComponent
},
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
    alterarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --button-modo: #07213a;
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --button-modo: #fff;
  --bg-primario: #07213a;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
