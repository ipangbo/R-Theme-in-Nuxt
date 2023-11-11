<!--
 * The Music Box component in the sidebar
 * @author: Bo Pang
 * @since: 2023-04-07
 * MusicBox.vue
-->
<template>
    <div id="pf_music_box-widget-3" class="widget pf_music_box">
        <div class="r-widget-title r-container r-sm">
            <div class="r-content pd-ripple pd-ripple-trigger"><span class="widget-icon"></span>
                <h4>Music Box</h4>
            </div>
        </div>
        <div class="music_box_wrapper">
            <div class="player">
                <div class="album clearfix">
                    <div class="icon">
                        <img class="disc" src="~/assets/img/disc.png"
                            srcset="~/assets/img/disc@2x.png 2x, ~/assets/img/disc@3x.png 3x">
                        <img class="discbar" :class="playerStatus" src="~/assets/img/discbar.png"
                            srcset="~/assets/img/discbar@2x.png 2x, ~/assets/img/discbar@3x.png 3x">
                    </div>
                    <div class="info">
                        <div class="title">{{ currentPlaying ? currentPlaying.name : 'No Media' }}</div>
                        <div class="time">{{ currentPlaying ? displayTime(currentTimes[currentPlaying.id - 1]) : '--:--' }}
                        </div>
                    </div>
                </div>
                <div class="controls" :class="playerStatus">
                    <div class="pf_progress">
                        <div class="processing" :style="`width: ${getProgressBar}%`">
                            <div class="dragger"></div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="prev" disabled="true">
                            <el-icon>
                                <DArrowLeft />
                            </el-icon>
                        </button>
                        <button class="togglePlay" @click="pause">
                            <el-icon class="pandastudio-icons-music-play">
                                <VideoPlay />
                            </el-icon>
                            <el-icon class="pandastudio-icons-music-pause">
                                <VideoPause />
                            </el-icon>
                        </button>
                        <button class="next" disabled="true">
                            <el-icon>
                                <DArrowRight />
                            </el-icon>
                        </button>
                    </div>
                </div>
            </div>
            <!-- <ClientOnly> -->
            <ul class="songs">
                <li v-for="(item, index) in playList" @click="togglePlay(item)" :class="item.status" :key="index
                ">
                    <div class="song_name">{{ item.name }}</div>
                    <div class="song_state">
                        <div class="playing"></div>
                        <div class="error"></div>
                        <div class="loading"></div>
                    </div>
                </li>
            </ul>
            <!-- </ClientOnly> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { type MusicBoxItem } from '~/types/PostTypes'
const playList = useRuntimeConfig().public.musicBoxPlayList as MusicBoxItem[];
const currentPlaying: Ref<MusicBoxItem | undefined> = ref();
const currentTimes = ref<number[]>(Array(playList.length).fill(0));
const durations = ref<number[]>(Array(playList.length).fill(0));
const playerStatus = ref('normal');

let togglePlay: any;
let pause: any;
let getProgressBar: any;

if (!process.server) {
    const audioElements: HTMLAudioElement[] = playList.map(track => {
        const audio = new Audio(track.url);
        audio.addEventListener("ended", () => {
            audio.currentTime = 0;
        });
        audio.addEventListener("loadedmetadata", () => {
            durations.value[track.id - 1] = audio.duration;
        });
        return audio;
    });

    togglePlay = (track: MusicBoxItem) => {
        playList.forEach(track => track.status = 'normal');
        track.status = 'is-loading';
        audioElements.forEach((audio, index) => {
            if (index === track.id - 1) {
                if (audio.paused) {
                    // If click new music, play new music.
                    audio.currentTime = 0;
                    audio.play().then(() => {
                        track.status = 'is-playing';
                        playerStatus.value = 'is-playing';
                        currentPlaying.value = track;
                    });
                } else {
                    // If click playing music, pause.
                    audio.pause();
                    track.status = 'normal';
                }
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }

    pause = () => {
        if (playerStatus.value === 'is-playing') {
            playList.forEach(track => track.status = 'normal');
            audioElements.forEach((audio, index) => {
                audio.pause();
                playerStatus.value = 'normal';
            });
        } else if (playerStatus.value === 'normal') {
            audioElements.forEach((audio, index) => {
                if (currentPlaying.value && index === currentPlaying.value.id - 1) {
                    audio.play().then(() => {
                        playerStatus.value = 'is-playing';
                        if (currentPlaying.value)
                            currentPlaying.value.status = 'is-playing';
                    })
                }
            })
        }
    }

    const updateCurrentTimes = () => {
        currentTimes.value = audioElements.map(audio => audio.currentTime);
    };

    getProgressBar = computed(() => {
        if (currentPlaying.value) {
            return ((currentTimes.value[currentPlaying.value.id - 1] / durations.value[currentPlaying.value.id - 1]) * 100)
        }
    })

    let interval: number;

    onMounted(() => {
        interval = window.setInterval(() => {
            updateCurrentTimes();
        }, 1000);
    });

    onUnmounted(() => {
        clearInterval(interval);
    });

}

const displayTime = (time: number | undefined) => {
    if (time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
        return '0:00'
    }
}
</script>

<style scoped>
button.togglePlay {
    display: flex;
    align-items: center;
}
</style>
