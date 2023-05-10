<template>
   <div class="notificacao">
    <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
        <div class="message-header">{{ notificacao.titulo}}</div>
        <div class="message-body" v-html="notificacao.texto"></div>
    </article>
   </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { TipoNotificacao } from '@/interfaces/INotificacoes';

export default defineComponent({
    name: 'NotificacaoComponent',
    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.FALHA]: 'is-danger',
                [TipoNotificacao.ATENÇÃO]: 'is-warning'
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacao {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 2;
}
</style>