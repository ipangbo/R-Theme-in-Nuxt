<!--
 * The posts list with list style
 * @author: Bo Pang
 * @since: 2023-04-07
 * ListStyleList.vue
-->
<template>
    <div class="row post-card-row style-list">
        <div class="post-list-col col-xxs-12 col-xs-12 col-sm-6 col-lg-4" v-for="item in props.posts">
        <NuxtLink :to="`/article/${item.id}`" class="pf_list pd-ripple pd-ripple-trigger">
            <span class="post-thumbnail" :style="`background-image:url(${item.featuredmedia})`"></span>
            <span class="metas">
                    <h4>{{ item.title }}</h4>
                    <span class="infos">
                        <!-- <span class="m-reads">
                                                                <i class="pandastudio-icons-eye"></i>28</span>
                                                            <span class="m-likes">
                                                                <i class="pandastudio-icons-heart-o"></i>2</span> -->
                        <span class="m-comments">
                            <el-icon>
                                <Calendar />
                            </el-icon>{{ item.date }}
                        </span>
                    </span>
                </span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type PostsListItem } from '~/types';

const props = defineProps<{
    posts: PostsListItem[];
}>();
</script>

<style scoped>
.post-list-col .pf_list:hover .metas h4 {
    color: var(--primary_default)
}

.post-list-col .pf_list:hover .metas .infos .m-comments {
    color: var(--primary_default)
}
</style>
