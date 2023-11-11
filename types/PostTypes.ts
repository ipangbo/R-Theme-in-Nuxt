export interface Slide {
    id: number;
    link: string;
    title: string;
    featuredmedia: string;
    category: string[];
    badge: "new" | "pinned";
    date: string;
}

export interface NaviItem {
    name: string;
    link: string;
}

export interface MusicBoxItem {
    id: number;
    name: string;
    url: string;
    status?: "normal" | "is-loading" | "is-playing";
    currentTime?: number;
}

export interface PostsByCategories {
    [key: string]: PostWithCategories[];
}

export interface PostWithCategories {
    id: number;
    link: string;
    title: string;
    featuredmedia: string;
    categories: number[];
    date: string;
}

export interface PostDetails {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    },
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[];
    categories: number[];
    tags: number[];
    "_links": any;
    "_embedded": {
        author: any[];
        replies: any[];
        "wp:featuredmedia": any[];
        "wp:term": any[];
    }
}

export interface TimeLineCardDetails {
    id: number;
    date: string;
    slug: string;
    link: string;
    title: string;
    excerpt: string;
    featuredmedia: string;
}