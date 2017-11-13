<template>
    <div class="column is-9">
        <div class="videoPlayer">
            <video :id="videoId" class="video-js">
            </video>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js'
import videocss from 'video.js/dist/video-js.css'

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
            //this.initialize();
        }
    },
    methods: {
        initialize() {
            const options = {
                autoplay: false,
                controls: true,
                preload: 'auto',
                fluid: false,
                techOrder: ['html5'],
                
            }
            this.player = videojs(this.videoId, options);
            this.player.src({
                src: '//vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4'
            })
        }
    }

}
</script>

<style scoped>
.video-js {
    position: relative;
    width: 100%;
    height: 475px;
}
</style>

