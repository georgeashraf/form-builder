export interface Success<TResult> {
    readonly rest: string | null;
    readonly value: TResult;
}

export interface Failure {
    readonly rest: string | null;
}