<template>
    <div class="tema">
        <div class="has-text-centered">
            <button class="button buttonTema" @click="alterarTema">
                <i class="iconTema" :class="{ 'fa-solid fa-sun': modoEscuroAtivo, 'fa-solid fa-moon': !modoEscuroAtivo}"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ButtonTemaComponent',
    emits: ['alterarTema'],
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuroAtivo = !this.modoEscuroAtivo;
            this.$emit('alterarTema', this.modoEscuroAtivo);
        }
    }
});
</script>

<style scoped>
.buttonTema {
    background: var(--button-modo);
    border-radius: 50%;
    width: 45px;
    height: 45px;
}
.iconTema {
    color: var(--bg-primario);
}
.tema {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 8px;
    z-index: 1;
}
</style>