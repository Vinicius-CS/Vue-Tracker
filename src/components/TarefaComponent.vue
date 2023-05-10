<template>
    <BoxComponent>
        <div class="columns is-flex is-vcentered">
            <div class="column">
                <i class="fas fa-tasks"></i>
                {{ tarefa.descricao }}
            </div>
            <div class="column is-3">
                <i class="fas fa-project-diagram"></i>
                {{ tarefa.projeto.nome }}
            </div>
            <div class="column is-2">
                <CronometroComponent class="cronometro" :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <div class="column is-2">
                <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
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
import { EXCLUI_TAREFA } from '@/store/tipo-mutacoes';
import { useStore } from '@/store';
import CronometroComponent from './CronometroComponent.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
    name: "TarefaComponent",
    components: {
        CronometroComponent,
        BoxComponent
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        excluir(id: number) {
            this.store.commit(EXCLUI_TAREFA, id);
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            tarefas: computed(() => store.state.tarefas)
        }
    }
})
</script>