import { defineStore } from "pinia";
import axios from 'axios';

export const store = defineStore({
    id: "store",
    state: () => {
        return {
            isLogin: false,
            user: {},
        };
    },
    actions: {
        setLogin() {
            localStorage.setItem("login", this.isLogin.toString());
        },
        logout() {
            this.$patch({ isLogin: false, user: {} });
            this.setLogin();
        },
        async login(data: {email: string, password: string}) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
                console.log(res)
                if (res.data.id) {
                    this.$patch({ isLogin: true, user: res.data });
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
                console.log(12345)
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
                console.log(res)

                if (res.data.id) {
                    this.$patch({ isLogin: true, user: res.data });
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
        
    },
});
