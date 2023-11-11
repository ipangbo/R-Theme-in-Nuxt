<!--
 * The card in timeline page
 * @author: Bo Pang
 * @since: 2023-04-08
 * TimeLineArticleCard.vue
-->
<template>
    <div class="post-blog-col col-xxs-12 col-xs-12 col-xl-6">
        <NuxtLink :to="`/article/${props.card.id}`" class="pf_blog">
            <span class="blog-info">
                <span class="calendar">
                    <span class="calendar-wrapper">
                        <span class="year">
                            {{ props.card.date.split('-').map(part => part.replace(/^0+/, ''))[0] }}</span>
                        <span class="date">
                            {{ props.card.date.split('-').map(part => part.replace(/^0+/, ''))[2] }}/{{
                                props.card.date.split('-').map(part => part.replace(/^0+/, ''))[1] }}</span>
                    </span>
                </span>
            <span class="article pd-ripple pd-ripple-trigger">
                <h4>
                    {{ props.card.title }}</h4>
                <span class="excerpt" v-html="props.card.excerpt">
                </span>
                <!-- <span class="metas">
                        <span class="m-reads">
                                                                                    <i class="pandastudio-icons-eye"></i>34</span>
                                                                                <span class="m-likes">
                                                                                    <i class="pandastudio-icons-heart-o"></i>2</span>
                                                                                <span class="m-comments">
                                                                                    <i class="pandastudio-icons-comments-o"></i>0</span>
                                                                            </span> -->
                </span>
            </span>
            <span class="blog-thumbnail">
                <span class="r-container r-sm">
                    <span class="post-thumbnail" :style="`background-image:url(${props.card.featuredmedia})`"></span>
                </span>
            </span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { type TimeLineCardDetails } from '~/types/PostTypes';
const props = defineProps<{
    card: TimeLineCardDetails;
}>();

</script>

<style scoped>
.post-blog-col .blog-info .article .excerpt {
    max-height: 6em;
}
</style>
