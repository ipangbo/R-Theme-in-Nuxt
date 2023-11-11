import { defineStore } from "pinia";
import {type PageDetails } from "~/types/PagesTypes";
import { getPageDetailsRawBySlug } from "~/utils/http/pages";

export const usePagesStore = defineStore('pages', () => {
    const currentPage = ref<PageDetails>();

    const getPageDetailsBySlug = async (slug: string) => {
        currentPage.value = await getPageDetailsRawBySlug(slug);
    }

    return {
        currentPage,
        getPageDetailsBySlug,
    }
})