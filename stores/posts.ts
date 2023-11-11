import { defineStore } from "pinia";
import {type PostsByCategories, type Slide, type PostWithCategories, type PostDetails, type TimeLineCardDetails } from "~/types/PostTypes";
import {
    getPostDetailsRawById,
    getTimeLineContentByPage,
    listAllPostsWithCategories,
    listNewestPosts,
    listPinnedPosts,
    getPostsCountRaw,
    listSearchResult
} from "@/utils/http/posts";
import {type Category } from "~/types/CategoryTypes";

export const usePostsStore = defineStore("posts", () => {
    const newestPages = ref<Slide[]>([]);
    const pinnedPages = ref<Slide[]>([]);
    const postsByCategories = ref<PostsByCategories>({});
    const currentArticle = ref<PostDetails>();
    const currentTimeLineCards = ref<TimeLineCardDetails[]>([]);
    const postsCount = ref<number>(0);

    const getHomePageNewestSlides = async () => {
        const respNew: any[] = await listNewestPosts();

        let res: Slide[] = [];

        respNew.forEach((orig) => {
            res.push({
                id: orig.id,
                link: orig.link,
                title: orig.title.rendered,
                featuredmedia: orig["_embedded"]["wp:featuredmedia"][0]["source_url"],
                category: orig["_embedded"]["wp:term"][0].map((item: any) => item.name).join('/'),
                badge: "new",
                date: orig["date"].split("T")[0],
            });

        })

        newestPages.value = res;
    }

    const getHomePagePinnedSlides = async () => {
        const respPinned: any[] = await listPinnedPosts();
        let res: Slide[] = [];

        respPinned.forEach((orig) => {
            res.push({
                id: orig.id,
                link: orig.link,
                title: orig.title.rendered,
                featuredmedia: orig["_embedded"]["wp:featuredmedia"][0]["source_url"],
                category: orig["_embedded"]["wp:term"][0].map((item: any) => item.name).join('/'),
                badge: "pinned",
                date: orig.date.split("T")[0],
            });

        })

        pinnedPages.value = res;
    }

    const getPostsByCategories = async () => {
        const categories: Category[] = useRuntimeConfig().public.categoriesOnIndexPage as Category[];

        let res: PostsByCategories = {};

        const all = await listAllPostsWithCategories();

        const tmp = all.map((orig): PostWithCategories => {
            return {
                id: orig.id,
                link: orig.link,
                title: orig.title.rendered,
                featuredmedia: orig["_embedded"]["wp:featuredmedia"][0]["source_url"],
                categories: orig.categories,
                date: orig.date.split("T")[0],
            }
        })

        categories.forEach((category) => {
            res[category.name] = tmp.filter((item) => item.categories.includes(category.id))
        })

        postsByCategories.value = res;
    }

    const getPostDetailsById = async (id: string) => {
        currentArticle.value = await getPostDetailsRawById(id);
    }

    const getTimeLineCardDetailsByPage = async (page: number) => {
        let res: TimeLineCardDetails[] = [];
        const resp = await getTimeLineContentByPage(page);
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

    const getPostsCount = async () => {
        postsCount.value = await getPostsCountRaw();
    }

    const getSearchResult = async (keyword: string) => {
        let res: TimeLineCardDetails[] = [];
        const resp = await listSearchResult(keyword);
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
        newestPages,
        pinnedPages,
        postsByCategories,
        currentArticle,
        currentTimeLineCards,
        postsCount,
        getHomePageNewestSlides,
        getHomePagePinnedSlides,
        getPostsByCategories,
        getPostDetailsById,
        getTimeLineCardDetailsByPage,
        getPostsCount,
        getSearchResult,
    }

})