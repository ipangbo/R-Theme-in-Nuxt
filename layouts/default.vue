<!--
 * Default Layout
 * @author: Bo Pang
 * @since: 2023-04-04
 * default.vue
-->
<template>
    <!-- todo: top nav -->
    <header>
        <HeadImage></HeadImage>
    </header>
    <div id="main" class="content-container r-container">
        <div class="r-content">
            <div class="top-slider-nav">
                <div class="pf-slider">
                    <PostsCarousel :slides="slides as any" v-if="routesHaveCarousel.includes(route.path)"></PostsCarousel>
                    <ArticleFeaturedImage v-else></ArticleFeaturedImage>
                </div>
                <nav>
                    <li :class="(route.path === '/') ? 'current-menu-item' : ''">
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>
                    <li :class="(route.path === '/timeline') ? 'current-menu-item' : ''">
                        <NuxtLink to="/timeline">Website Map</NuxtLink>
                    </li>
                    <li :class="(route.path === '/page/about') ? 'current-menu-item' : ''">
                        <NuxtLink to="/page/about">About</NuxtLink>
                    </li>
                    <li :class="(route.path === '/page/privacy-policy') ? 'current-menu-item' : ''">
                        <NuxtLink to="/page/privacy-policy">Privacy Policy</NuxtLink>
                    </li>
                </nav>

            </div>
            <div class="main-row-reverse">
                <NuxtPage></NuxtPage>
                <div class="sidebar-shadow" click="this.hide_mobile_sidebar()"></div>
                <aside class="sidebar-column">
                    <div class="pf_blogger">
                        <div class="r-container r-sm blogger_head">
                            <div class="r-content">
                                <div class="head-img"><img src="~/assets/img/avartar.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="blogger-name">{{ useRuntimeConfig().public.authorName }}</div>
                        <div class="blogger-description">{{ useRuntimeConfig().public.authorSlogan }}</div>
                    </div>
                    <TheSidebar></TheSidebar>
                </aside>
            </div>
        </div>
        <div class="float-tools-container">
            <div class="float-tools">
                <div class="float-tools-button">
                    <button class="scroll2top" @click="scrollToTop">
                        <el-icon color="#fff" :size="20">
                            <Upload />
                        </el-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <TheFooter></TheFooter>
    </footer>
</template>

<script setup lang="ts">
import PostsCarousel from '~/components/PostsCarousel.vue';
import { usePostsStore } from '~/stores/posts';
import { type Slide } from '~/types/PostTypes';

const route = useRoute();
const postsStore = usePostsStore();

const routesHaveCarousel = ref([
    '/',
    '/timeline',
]);

const slides = ref<Slide[]>([]);
if (routesHaveCarousel.value.includes(route.path)) {
    await postsStore.getHomePagePinnedSlides();
    const homePagePinnedSlides = postsStore.pinnedPages;

    await postsStore.getHomePageNewestSlides();
    const newestPosts = postsStore.newestPages;
    const newestAmountInCarousel = useRuntimeConfig().public.newestAmountInCarousel;
    let homePageNewestSlides;
    if (newestAmountInCarousel < 6) {
        homePageNewestSlides = newestPosts.slice(0, newestAmountInCarousel);
    } else {
        homePageNewestSlides = newestPosts;
    }


    slides.value = homePagePinnedSlides.concat(homePageNewestSlides);
}
watch(() => route.path, async () => {
    if (routesHaveCarousel.value.includes(route.path)) {
        await postsStore.getHomePagePinnedSlides();
        const homePagePinnedSlides = postsStore.pinnedPages;

        await postsStore.getHomePageNewestSlides();
        const newestPosts = postsStore.newestPages;
        const newestAmountInCarousel = useRuntimeConfig().public.newestAmountInCarousel;
        let homePageNewestSlides;
        if (newestAmountInCarousel < 6) {
            homePageNewestSlides = newestPosts.slice(0, newestAmountInCarousel);
        } else {
            homePageNewestSlides = newestPosts;
        }


        slides.value = homePagePinnedSlides.concat(homePageNewestSlides);
    }
})

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}



</script>

<style scoped>
/* .top-slider-nav nav li.current-menu-item {
    transition: .3s ease .2s;
} */
</style>