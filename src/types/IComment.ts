export interface IComment {
    by: string,
    id: number,
    kids?: number[] | IComment[],
    parent: number,
    text: string,
    time: number,
    type: string,
    deleted?: boolean,
    dead?: boolean,
}