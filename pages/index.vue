<!--
 * Index Page
 * @author: Bo Pang
 * @since: 2023-04-04
 * index.vue
-->
<template>
    <Head>
        <Title>Home</Title>
    </Head>

    <div class="main-column">
        <div class="main-container recent">
            <div class="pf-modal-title">
                <div class="title-text">
                    <el-icon color="#ff7800">
                        <Star />
                    </el-icon>Newest
                </div>
                <NuxtLink to="/timeline" class="read-more pd-ripple pd-ripple-trigger">
                    More
                    <el-icon>
                        <Right />
                    </el-icon>
                </NuxtLink>
            </div>
            <ListStyleList :posts="newestPosts"></ListStyleList>
        </div>


        <PostsByCategoryOnIndex v-for="(value, key) in postsByCategories" :title="key" :key="key" :posts="value"
            :slug="getSlugByName(key as string)">
        </PostsByCategoryOnIndex>


    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';
import { type Category } from '~/types/CategoryTypes';

const postsStore = usePostsStore();
await postsStore.getHomePageNewestSlides();
let newestPosts = postsStore.newestPages;


if (newestPosts.length > 6) {
    newestPosts = newestPosts.slice(0, 6);
}

await postsStore.getPostsByCategories();
const postsByCategories = postsStore.postsByCategories;

const getSlugByName = (name: string): string => {
    const tmp = useRuntimeConfig().public.categoriesOnIndexPage.find((item: any) => item.name === name) as Category;
    if (tmp) return tmp.slug; else return '';
}
</script>

<style scoped>
.main-container.recent {
    margin-bottom: 80px;
}

.main-column:not(.has-recommend) .main-container:nth-child(2n):not(.random) {
    background: #f0f2f7;
    background: var(--gray_9);
    border: 1px solid #cbd0da;
    border: 1px solid var(--gray_7);
    border-left: 0;
    border-right: 0;
    box-shadow: inset 0 -1px #fff, inset 0 1px #fff;
    box-shadow: 0 -1px var(--white_default) inset, 0 1px var(--white_default) inset;
}
</style>
