export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENÇÃO
}

export interface INotificacoes {
    titulo: string,
    texto: string,
    tipo: TipoNotificacao
    id: number
}