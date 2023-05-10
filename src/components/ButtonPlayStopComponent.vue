<template>
    <button class="button" :class="classColor" @click="clicado">
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span>{{ texto }}</span>
    </button>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ButtonPlayStopComponent",
    emits: ['clicado'],
    props: {
        icone: {
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        },
        classColor: {
            type: String,
            requited: true
        }
    },
    methods: {
        clicado(): void {
            this.$emit('clicado')
        }
    }
});
</script>