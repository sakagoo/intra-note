import { defineStore } from "pinia";
import http from "@/http-common";

export type Airticle = {
  content_id: number;
  title: string;
  markdown: string;
  state: string;
  user_group: string;
  created_at: string;
  created_by: string;
  update_at: string;
  update_by: string;
};

export type User = {
  id: string;
  name: string;
  mail: string;
  icon: string;
  created_at: string;
  created_by: string;
  update_at: string;
  update_by: string;
};

export const useDatabaseStore = defineStore({
  id: "database",
  state: () => ({
    articles: [] as Airticle[],
    user_info: {
      id: "",
      name: "",
      mail: "",
    } as User,
  }),
  getters: {
    isAuthenticated(): boolean {
      const mail = localStorage.getItem("user_mail");
      const name = localStorage.getItem("user_name");
      const id = localStorage.getItem("user_id");
      const icon = localStorage.getItem("user_icon");
      this.user_info.mail = mail ? mail : "";
      this.user_info.name = name ? name : "";
      this.user_info.id = id ? id : "";
      this.user_info.icon = icon ? icon : "";
      return this.user_info.id !== "";
    },
  },
  actions: {
    async signin(id: string, pass: string): Promise<boolean> {
      this.user_info = { name: "" } as User;
      return await http
        .get(`/signin`, {
          params: {
            id: id,
            password: pass,
          },
        })
        .then((res) => {
          if (res.data) {
            const user = res.data as User;
            this.user_info = {
              id: user.id,
              name: user.name,
              mail: user.mail,
              icon: user.icon,
            } as User;
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("user_mail", user.mail);
            localStorage.setItem("user_name", user.name);
            localStorage.setItem("user_icon", user.icon);
            return true;
          } else {
            return false;
          }
        });
    },
    async loadAllArticles() {
      this.articles = [] as Airticle[];
      this.articles = await http
        .get("/read", {
          params: {
            user_id: this.user_info.id,
          },
        })
        .then((res) => {
          return res.data;
        });
    },
    async loadSearchArticles(search_word: string) {
      this.articles = [] as Airticle[];
      this.articles = await http
        //.get(`/search?search_word=${search_word}`)
        .get("/search", {
          params: {
            search_word: search_word,
            user_id: this.user_info.id,
          },
        })
        .then((res) => {
          return res.data;
        });
    },
    async loadDraftArticles() {
      this.articles = [] as Airticle[];
      this.articles = await http
        .get("/read_draft", {
          params: {
            user_id: this.user_info.id,
          },
        })
        .then((res) => {
          return res.data;
        });
    },
    async postArticles(article: Airticle): Promise<number> {
      return await http.post("/new_contents", { article }).then((res) => {
        console.log(res);
        return res.data[0].content_id as number;
      });
    },
    async loadArticle(id: number): Promise<Airticle> {
      return http.get(`/fetch?id=${id}`).then((res) => {
        return res.data as Airticle;
      });
    },
    async updateArticle(article: Airticle) {
      this.articles = await http.patch("/update", { article }).then((res) => {
        return res.data;
      });
    },
    async deleteArticle(id: number) {
      http.delete(`/delete?id=${id}`).then((res) => {
        return res.data as Airticle;
      });
    },
  },
});
