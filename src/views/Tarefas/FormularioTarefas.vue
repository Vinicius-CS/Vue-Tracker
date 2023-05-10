<template>
    <div class="box formulario m-3">
        <div class="columns">
            <div class="column" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" autocomplete="off" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" :disabled="camposDesabilitados">
            </div>
            <div class="column">
                <div class="select">
                    <select v-model="idProjeto" :disabled="camposDesabilitados">
                        <option value="0">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorComponent class=" is-pulled-right" @cronometroRodando="desabilitaCampos" @finalizarTemporizador="finalizarTarefa" :tarefa="{descricao, idProjeto}" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import TemporizadorComponent from '@/components/TemporizadorComponent.vue';

export default defineComponent({
    name: "FormularioTarefas",
    components: {
        TemporizadorComponent
    },
    data() {
        return {
            descricao: '',
            idProjeto: 0,
            camposDesabilitados: false
        }
    },
    methods: {
        desabilitaCampos(status: boolean): void {
            this.camposDesabilitados = status;
        },
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find(projeto => projeto.id == this.idProjeto);
            this.store.commit(ADICIONA_TAREFA, {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: projeto
            });
            this.idProjeto = 0;
            this.descricao = '';
        }
    },
    setup() {
        const store = useStore(key);
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style>
.formulario {
    color: #fff;
    background: #0d3b66;
}
</style>