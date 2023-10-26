import { create } from "zustand";

interface ChatContentProp {
    chatId: string,
    user: any;
    setChatContent: (chatId: string, user: any) => void;
}

export const useChatContext = create<ChatContentProp>()((set) => ({
    chatId: "",
    user: {},
    setChatContent(chatId: string, user: any) {
        set({ chatId, user });
    },
}));