<template>
    <FormularioTarefas :tarefa="dadosCapturados" />
    <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxComponent v-if="listaVazia">
            Você não realizou nenhuma tarefa hoje...
        </BoxComponent>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import FormularioTarefas from './FormularioTarefas.vue';
import TarefaComponent from '@/components/TarefaComponent.vue';
import BoxComponent from '@/components/BoxComponent.vue';

export default defineComponent({
    name: "App",
    components: {
        FormularioTarefas,
        TarefaComponent,
        BoxComponent,
    },
    data() {
        return {
            dadosCapturados: {}
        }
    },
    computed: {
        listaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            tarefas: computed(() => store.state.tarefas)
        }
    }
});
</script>