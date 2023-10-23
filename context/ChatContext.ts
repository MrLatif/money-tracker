import { create } from "zustand";

interface PassingId {
    displayName: string;
    photoUrl: string;
    uid: string;
    setUser: (displayName: string, photoUrl: string, uid: string) => void;
}

export const useChatContext = create<PassingId>()((set) => ({
    displayName: "",
    photoUrl: "",
    uid: "",
    setUser(displayName, photoUrl, uid) {
        set({displayName, photoUrl, uid});
    },

}))