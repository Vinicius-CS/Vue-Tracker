<template>
    <div class="projetos">
        <h1 class="title display">Projetos</h1>
        <ListaProjetos />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListaProjetos from './Projetos/ListaProjetos.vue';

export default defineComponent({
    name: "ProjetosView",
    components: { ListaProjetos }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}

.display {
    color: var(--texto-primario);
}
</style>