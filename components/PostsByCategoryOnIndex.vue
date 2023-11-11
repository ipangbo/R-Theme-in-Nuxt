<!--
 * The Posts by category on Index page component
 * @author: Bo Pang
 * @since: 2023-04-08
 * PostsByCategoryOnIndex.vue
-->
<template>
    <div class="main-container category">
        <div class="pf-modal-title">
            <div class="title-text"><el-icon color="#ff7800">
                    <Folder />
                </el-icon>{{ props.title }}</div>
            <NuxtLink class="read-more pd-ripple pd-ripple-trigger" :to="`/category/${slug}`">
                More
                <el-icon>
                    <Right />
                </el-icon>
            </NuxtLink>
        </div>

        <ListStyleList :posts="props.posts"></ListStyleList>
    </div>
</template>

<script setup lang="ts">
import { type PostsListItem } from '~/types';

const props = defineProps<{
    title: string | number;
    posts: PostsListItem[];
    slug: string;
}>()


</script>

<style scoped></style>
