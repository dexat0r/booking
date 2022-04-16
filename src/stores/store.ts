import { defineStore } from "pinia";
import axios from 'axios';

export const store = defineStore({
    id: "store",
    state: () => {
        return {
            isLogin: false,
            watched: false,
            current_online: 0,
            user: {
                role: -1,
            },
            filters: {
                countryQuery: [],
                cityQuery: [],
                roomQuery: [],
                amenitiesQuery: []
            },
            posts: []
        };
    },
    actions: {
        getLogin() {
            const login = localStorage.getItem("login");
            const user = localStorage.getItem("user");
            const watched = localStorage.getItem("watched");
            if (!login || !user) {
                this.setLogin()
            } else {
                this.user = JSON.parse(user);
                this.isLogin = login === 'true';
                this.watched = watched === 'true'
            }
        },
        setLogin() {
            localStorage.setItem("login", this.isLogin.toString());
            localStorage.setItem("user", JSON.stringify(this.user));
            localStorage.setItem("watched", this.watched.toString());
        },
        logout() {
            this.$patch({ isLogin: false, user: {}, watched: false });
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
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);

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
        },
        async getPosts() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post`)

                if (res.data) {
                    this.$patch({ posts: res.data });
                }
                if (!this.watched) {
                    for (let i = 0; i < this.posts.length; i++) {
                        await this.addWatch(Number(i));
                    }
                    this.$patch({ watched: true });
                    this.setLogin();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getFilters() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/filters`)
                console.log(res)
                if (res.data) {
                    this.$patch({ filters: res.data });
                }
            } catch(error) {
                console.log(error);
            }
        },
        async addWatch(index: number) {
            try {
                if (!this.posts[index]) {

                } else {
                    const id = (this.posts[index] as any).id;
                    console.log(id)
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/watch?id=${id}`);
                    console.log(res.data);
                    (this.posts[index] as any).watches = res.data.toString();
                }
            } catch (error) {
                console.log(error)
            }
        },

    },
});
