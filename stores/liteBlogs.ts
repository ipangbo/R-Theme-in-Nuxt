import { defineStore } from "pinia";
import {type LiteBlog } from "~/types/LightBlogTypes";
import { listLiteBlogs } from "~/utils/http/liteBlogs";

export const useLiteBlogsStore = defineStore('liteBlogs', () => {

    const liteBlogs = ref<LiteBlog[]>([])

    const getAllLiteBlogs = async () => {
        const resp: any[] = await listLiteBlogs();
        const res = ref<LiteBlog[]>([]);

        resp.forEach((orig) => {
            res.value.push({
                id: orig.id,
                date: orig.date,
                content: orig.content.rendered,
            });
        })

        liteBlogs.value = res.value;
    }

    return {
        liteBlogs,
        getAllLiteBlogs,
    }
})