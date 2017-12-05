<template>
    <div class="columns is-multiline" v-if="broadcastList.length > 0">
        <div class="column is-3" v-for="item in broadcastList" :key="item.username" v-if="calcType(item.type)">
            <router-link class="card-link" :to="'/broadcast/' + item.username">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-2by1">
                            <img src="https://bulma.io/images/placeholders/640x320.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>{{item.roomname}}</strong><br>
                                        <span><a>{{item.username}}</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>    
    </div>
    <div class="noBroadcast"v-else>
        <div>
            <p class="is-size-4 is-size-7-mobile">진행중인 방송이 없습니다.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BroadcastList',
    props: ['broadcastType','broadcastList'],
    data() {
        return {
    
        }
    },
    methods: {
        calcType(itemType) {
            if(this.broadcastType == 0){
                return true;
            }
            if(this.broadcastType == itemType){
                return true;
            }
            return false;
        }
    }
  
}
</script>

<style scoped>
@media only screen and (max-width: 500px){
    .card-image {
        display: none;
    }
}
.card-link:hover .card {
    border: solid;
    border-color: royalblue;
    box-shadow: 5px 5px royalblue;
} 
.card {
    border-radius: 5px;
}
.media {
    height:70px;
    overflow:hidden;
}
.card-content {
    border-top: 1px solid #ddd;
    padding: 10px;
}
.noBroadcast {
    padding-top:20%;
    margin: auto;
    width: 50%;
    height: 100;
}
.noBroadcast p {
    text-align: center;
}
</style>
