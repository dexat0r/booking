import { defineStore } from "pinia";

export const store = defineStore({
    id: "store",
    state: () => {
        return {
            isLogin: false,
            userId: 0
        };
    },
    actions: {
        setLogin() {
            localStorage.setItem("login", this.isLogin.toString());
        },
        logout() {
            this.$patch({ isLogin: false });
            this.setLogin();
        },
        login() {
            this.$patch({ isLogin: true });
            this.setLogin();
        },
    },
});
