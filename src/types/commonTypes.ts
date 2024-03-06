export type IPreviousValueRed = {
    password: string;
    confirm: string;
}
export type IPreviousValueRedReg = {
    password: string;
    user: object;
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
export type TValues = {
    password: string;
    remember: boolean;
    user: object;
}
export type TError = {
    status: number;
    error: string;
    message: string;
}
export type TValuesReg = {
    password: string;
    confirm: string;
    user: object;
}
export type TValuesPassword = {
    password: string;
    confirm: string;
}
export type TFeedBackBody = {
    message: string;
    rating: number;
}
export type TPostFeedbackArgs = {
    body: TFeedBackBody;
    token: string;
}
