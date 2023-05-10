import { store } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacoes";
import { NOTIFICAR } from "@/store/tipo-mutacoes";

export function notificar(tipo: TipoNotificacao, titulo: string, texto: string) {
    store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
    });
}