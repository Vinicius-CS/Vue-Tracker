import { InjectionKey } from "vue";
import { notificar } from "@/notificacao/notificar";
import { useStore as vuexUseStore, Store, createStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO, ADICIONA_TAREFA, EXCLUI_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacoes, TipoNotificacao } from "@/interfaces/INotificacoes";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacoes[]
}

let ultimoIdProjeto = 0;
let ultimoIdTarefa = 0;
let ultimoIdNotificacao = 0;

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeProjeto: string) {
            ultimoIdProjeto += 1;
            const projeto = {
                id: ultimoIdProjeto,
                nome: nomeProjeto
            } as IProjeto;
            state.projetos.push(projeto);

            notificar(
                TipoNotificacao.SUCESSO,
                'Projeto Cadastrado',
                `O projeto <b>${projeto.nome}</b> foi cadastrado`
            );
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(projetoFind => projetoFind.id == projeto.id);
            state.projetos[index] = projeto;

            notificar(
                TipoNotificacao.SUCESSO,
                'Projeto Salvo',
                `Todas as alterações no projeto <b>${projeto.nome}</b> foram salvas`
            );
        },
        [EXCLUI_PROJETO](state, id: number) {
            const projetoExcluido = state.projetos.find(projeto => projeto.id == id);
            const projetoTarefas = state.tarefas.filter(projeto => projeto.projeto.id == id);
            if (projetoTarefas.length > 0) {
                notificar(
                    TipoNotificacao.FALHA,
                    'Ops!',
                    `O projeto <b>${projetoExcluido?.nome}</b> não pode ser excluído, existem ${projetoTarefas.length} tarefas vinculadas a este projeto`
                );
            } else {
                state.projetos = state.projetos.filter(projeto => projeto.id != id);

                notificar(
                    TipoNotificacao.SUCESSO,
                    'Projeto Excluído',
                    `O projeto <b>${projetoExcluido?.nome}</b> foi excluído`
                );
            }
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            ultimoIdTarefa += 1;
            tarefa.id = ultimoIdTarefa;
            state.tarefas.push(tarefa);

            notificar(
                TipoNotificacao.SUCESSO,
                'Tarefa Finalizada',
                `A tarefa <b>${tarefa.descricao}</b> foi finalizada`
            );
        },
        [EXCLUI_TAREFA](state, id: number) {
            const tarefaExcluida = state.tarefas.find(tarefa => tarefa.id == id);
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id != id);

            store.commit(NOTIFICAR, {
                titulo: 'Tarefa Excluída',
                texto: `A tarefa <b>${tarefaExcluida?.descricao}</b> foi excluída`,
                tipo: TipoNotificacao.SUCESSO
            });
        },
        [NOTIFICAR](state, novaNotificacao: INotificacoes) {
            novaNotificacao.id = ultimoIdNotificacao += 1;
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 6000);
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}