<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroComponent :tempo-em-segundos="tempoEmSegundos" />
        <ButtonPlayStopComponent class="ml-3" @clicado="iniciar" icone="fas fa-play" texto="Play" classColor="is-success" v-if="!cronometroRodando" />
        <ButtonPlayStopComponent class="ml-3" @clicado="finalizar" icone="fas fa-stop" texto="Stop" classColor="is-danger" v-else />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacoes';
import CronometroComponent from './CronometroComponent.vue';
import ButtonPlayStopComponent from './ButtonPlayStopComponent.vue';

export default defineComponent({
    name: "TemporizadorComponent",
    emits: ['finalizarTemporizador', 'cronometroRodando'],
    components: {
        CronometroComponent,
        ButtonPlayStopComponent
    },
    props: {
        tarefa: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        };
    },
    methods: {
        iniciar() {
            if (this.tarefa.descricao.length == 0 || this.tarefa.idProjeto == 0) {
                let msg = 'Insira uma descrição e selecione um projeto';
                if (this.tarefa.descricao.length == 0 && this.tarefa.idProjeto > 0) {
                    msg = 'Insira uma descrição';
                } else if (this.tarefa.idProjeto == 0 && this.tarefa.descricao.length > 0) {
                    msg = 'Selecione um projeto';
                }

                this.tarefa.descricao == null ? 'insira uma descrição' : '';
                this.tarefa.idProjeto == null ? 'selecione um projeto' : '';
                this.store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: `${msg} antes de iniciar uma tarefa.`,
                    tipo: TipoNotificacao.FALHA,
                });
            } else {
                this.$emit('cronometroRodando', true);
                this.cronometroRodando = !this.cronometroRodando;
                this.cronometro = setInterval(() => {
                    this.tempoEmSegundos += 1;
                }, 1000);
            }
        },
        finalizar() {
            this.cronometroRodando = !this.cronometroRodando;
            clearInterval(this.cronometro);
            this.$emit('finalizarTemporizador', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
            this.$emit('cronometroRodando', false);
        }
    },
    setup() {
        const store = useStore();
        return {
            store
        }
    }
})
</script>