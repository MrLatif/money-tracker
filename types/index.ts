import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit"

}

export interface DataProps {
    data: [
        name: string,
        items: [
            priority: number,
            title: string,
            chat: number,
            attachment: number
        ]
    ]
}