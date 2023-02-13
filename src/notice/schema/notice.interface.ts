

export interface INotice extends Document{
    readonly title:string;
    readonly category:string;
    readonly tags:string;
    status:string
}