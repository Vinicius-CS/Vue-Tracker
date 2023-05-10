<template>
    <section>
        <FormularioProjetos :id="idProjeto" @projetoEditado="salvo" />
        <div class="lista">
            <ProjetoComponent v-for="(projeto, index) in projetos" :key="index" :projeto="projeto" @editarProjeto="editar" />
            <BoxComponent v-if="listaVazia">
                Você não cadastrou nenhum projeto hoje...
            </BoxComponent>
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import BoxComponent from '@/components/BoxComponent.vue';
import FormularioProjetos from './FormularioProjetos.vue';
import ProjetoComponent from '@/components/ProjetoComponent.vue';

export default defineComponent({
    name: 'ListaProjetos',
    components: {
        BoxComponent,
        FormularioProjetos,
        ProjetoComponent
    },
    data() {
        return {
            idProjeto: 0
        }
    },
    methods: {
        editar(id: number) {
            this.idProjeto = id;
        },
        salvo() {
            this.idProjeto = 0;
        }
    },
    computed: {
        listaVazia(): boolean {
            return this.projetos.length === 0;
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