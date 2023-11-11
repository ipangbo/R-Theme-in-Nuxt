import {type PageDetails } from "~/types/PagesTypes";

export const getPageDetailsRawBySlug = async (slug: string): Promise<any> => {
    const { data: postData } = await useAPIFetch(`/pages?slug=${slug}&_embed`, {
        method: 'GET',
    });
    if (Array.isArray(postData.value))
        return postData.value[0] as PageDetails;
}