<template>
    <header>
        <h1 class="title">
            Vue Tracker
        </h1>
        <nav class="panel mt-5 p-2">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateralComponent'
});
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}
@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
.title {
    font-family: 'Comfortaa';
    color: #fff;
    font-size: 50px;
}
.panel {
    background: #07213a;
}
.panel li {
    margin: 8px 0;
}
.link {
    color: #c0c0c0;
}
.link:hover {
    color: #c0c0c0;
}
.link.router-link-active {
    color: #fff;
}
</style>