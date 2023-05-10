<template>
    <div class="tarefas">
        <h1 class="title display">Tarefas</h1>
        <ListaTarefas />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListaTarefas from './Tarefas/ListaTarefas.vue';

export default defineComponent({
    name: "TarefasView",
    components: {
        ListaTarefas
    }
})
</script>

<style scoped>
.tarefas {
    padding: 1.25rem;
}

.display {
    color: var(--texto-primario);
}
</style>