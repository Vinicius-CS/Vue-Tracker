<template>
    <div class="box formulario m-3">
        <div class="columns">
            <div class="column" role="form" aria-label="Formulário para criação de um novo projeto">
                <input type="text" class="input" autocomplete="off" placeholder="Qual projeto você deseja cadastrar?" v-model="nomeProjeto">
            </div>
            <div class="column">
                <button class="button is-success is-pulled-right" @click="salvar">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';

export default defineComponent({
    name: 'FormularioProjetos',
    emits: ['projetoEditado'],
    props: {
        id: {
            type: Number
        }
    },
    data() {
        return {
            nomeProjeto: ''
        }
    },
    watch: {
        id() {
            const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id);
            this.nomeProjeto = projeto?.nome || '';
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeProjeto
                });
                this.$emit('projetoEditado');
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeProjeto);
            }

            this.nomeProjeto = '';
            this.$router.push('/projetos');
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id);
            this.nomeProjeto = projeto?.nome || '';
        }
    },
    setup() {
        const store = useStore();
        return {
            store
        }
    }
})
</script>

<style scoped>
.display {
    color: var(--texto-primario);
}
</style>
