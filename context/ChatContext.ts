import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { useUser } from "@clerk/nextjs";

export const ChatContext = createContext(null);


interface ChatContextProviderProps {
    children: ReactNode;
}

export const ChatContextProvider = ({
    children,
}: ChatContextProviderProps) => {
    const currentUser = useUser();
    
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    
        const chatReducer = (state: any, action: any) => {
            switch(action.type){
                case "CHANGE_USER":
                    return {
                        user: action.payload,
                        chatId:
                            currentUser.user?.id && action.payload.uid
                                ? currentUser.user.id > action.payload.uid
                                    ? currentUser.user.id + action.payload.uid
                                    : action.payload.uid + currentUser.user.id
                                : "null",
                    };
                default:
                    return state;
            }
        }


    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    
}