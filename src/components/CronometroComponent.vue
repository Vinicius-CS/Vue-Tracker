<template>
    <section>
        <strong class="display">
            <i class="fas fa-clock"></i>
            {{ tempoDecorrido }}
        </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroComponent',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8)
        }
    }
})
</script>

<style scopped>
.display {
    color: #fff;
}
</style>