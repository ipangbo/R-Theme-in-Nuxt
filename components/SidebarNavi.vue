<!--
 * Navigation component in sidebar
 * @author: Bo Pang
 * @since: 2023-04-07
 * SidebarNavi.vue
-->
<template>
    <div id="nav_menu-3" class="widget widget_nav_menu">
        <div class="r-widget-title r-container r-sm">
            <div class="r-content pd-ripple pd-ripple-trigger"><span class="widget-icon"></span>
                <h4>Navigation</h4>
            </div>
        </div>
        <div>
            <ul class="menu">
                <li v-for="item in naviItems">
                    <span class="link-wrapper r-container r-sm">
                        <span class="r-content">
                            <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type NaviItem } from '~/types/PostTypes'

const naviItems = useRuntimeConfig().public.sideNavigation as NaviItem[];
</script>

<style scoped></style>
