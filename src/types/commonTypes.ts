export type IPreviousValueRed = {
    password: string;
    confirm: string;
}
export type IPreviousValueRedReg = {
    password: string;
    user: any;
}
export type TComments = {
    id: string;
    fullName: null | string;
    imageSrc: null | string;
    message: null | string;
    rating: number;
    createdAt: string;
}
export type TmodalInf = {
    src: string;
    topic: string;
    text?: string;
    btnText: string;
    btnTryAgain?: string;
    customStyle?: object;
}

