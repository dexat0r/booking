import { defineStore } from "pinia";
import axios from 'axios';

export const store = defineStore({
    id: "store",
    state: () => {
        return {
            isLogin: false,
            userId: 0,
        };
    },
    actions: {
        setLogin() {
            localStorage.setItem("login", this.isLogin.toString());
        },
        logout() {
            this.$patch({ isLogin: false, userId: 0 });
            this.setLogin();
        },
        async login(data: {email: string, password: string}) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
                if (res.data.ID) {
                    this.$patch({ isLogin: true, userId: res.data.ID });
                    this.setLogin();
                    return true;
                } else {
                    alert("Invalid credentials");
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async register(data: {email: string, password: string, role: number}) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
                if (res.data.ID) {
                    this.$patch({ isLogin: true, userId: res.data.ID });
                    this.setLogin();
                    return true;
                } else {
                    alert("Something went wrong");
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        async 
    },
});
