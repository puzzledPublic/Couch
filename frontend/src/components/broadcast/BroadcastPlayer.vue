<template>
    <div class="column is-9 broadcast-wrap">
        <div class="videoPlayer">
            <video :id="videoId" class="video-js vjs-16-9 vjs-big-play-centered" data-setup='{}'>
            </video>
        </div>
    </div>
</template>

<script>
//videojs-contrib-hls 모듈이 window에 있는 videojs와 자동 결합하는듯? 그래서 webpack설정에서 videojs를 window에 먼저 로드한다. 
const videojs = window.videojs //import videojs from 'video.js' 
import videocss from 'video.js/dist/video-js.css'
import 'videojs-contrib-hls/dist/videojs-contrib-hls.min.js'

export default {
    name: 'broadcastPage',
    props: ['username'],
    data() {
        return {
           videoId: 'couch-player',
           player: null,
      }
    },
    mounted() {
        if(!this.player) {
            this.initialize();
        }
    },
    beforeDestroy() {
        videojs(this.videoId).dispose();
    },
    methods: {
        initialize() {
            const options = {
                autoplay: false,
                controls: true,
                preload: 'auto',
                fluid: true,
                techOrder: ['html5'],
                
            }
            this.player = videojs(this.videoId, options);
            this.player.src({
                //src: '//vjs.zencdn.net/v/oceans.mp4',
                //type: 'video/mp4',
                src: 'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8',
                type: 'application/x-mpegURL',
                withCredentials: false,
            })
        }
    }

}
</script>

<style scoped>
.videoPlayer {
    padding: 0.75rem 0;
}
.main-wrap {
    height: 97%;
}
.broadcast-wrap {
    background-color: white;
}
@media screen and (min-width: 960px) {
    .main-wrap {
        padding: 0 20px 0 10px;
    }
    .broadcast-wrap {
        margin-top: 0 0.75rem;
        margin-right: 10px;
    }
}
@media screen and (min-width: 960px) {
    
    .broadcast-wrap {
        margin-right: 0;
    }
}

/*
@media only screen and (max-width:800px) {
    .column {
        padding: 0;
    }
    .videoPlayer {
        padding: 0 0.75rem;
    }
}*/
</style>

