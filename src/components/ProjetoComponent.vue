<template>
    <BoxComponent>
        <div class="columns is-flex is-vcentered">
            <div class="column">
                <i class="fas fa-project-diagram"></i>
                {{ projeto.nome }}
            </div>
            <div class="column is-2">
                <button class="button is-warning" @click="editar(projeto.id)">
                    <span class="icon is-small">
                        <i class="fas fa-pencil" style="color: #fff"></i>
                    </span>
                </button>
                <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </BoxComponent>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { EXCLUI_PROJETO } from '@/store/tipo-mutacoes';
import { useStore } from '@/store';
import IProjeto from '@/interfaces/IProjeto';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
    name: "ProjetoComponent",
    emits: ['editarProjeto'],
    components: {
        BoxComponent
    },
    props: {
        projeto: {
            type: Object as PropType<IProjeto>,
            required: true
        }
    },
    methods: {
        excluir(id: number) {
            this.store.commit(EXCLUI_PROJETO, id);
        },
        editar(id: number) {
            this.$emit('editarProjeto', id);
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>