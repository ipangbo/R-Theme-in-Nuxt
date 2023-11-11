import { defineStore } from "pinia";
import {type TimeLineCardDetails } from '~/types/PostTypes'
import { listPostsByCategory } from "~/utils/http/posts";

export const useCategoriesStore = defineStore('categories', () => {
    const currentTimeLineCards = ref<TimeLineCardDetails[]>([]);

    const getPostsByCategory = async (category: number) => {
        const resp = await listPostsByCategory(category);

        let res: TimeLineCardDetails[] = [];
        resp.forEach((orig) => {
            res.push({
                id: orig.id,
                link: orig.link,
                title: orig.title.rendered,
                slug: orig.slug,
                excerpt: orig.excerpt.rendered,
                featuredmedia: orig["_embedded"]["wp:featuredmedia"][0]["source_url"],
                date: orig.date.split("T")[0],
            })
        })
        currentTimeLineCards.value = res;

    }

    return {
        currentTimeLineCards,
        getPostsByCategory,
    }

})