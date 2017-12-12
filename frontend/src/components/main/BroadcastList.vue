<template>
    <div class="container is-fluid is-marginless">
        <div class="columns is-multiline" v-if="broadcastList.length > 0">
            <div class="column is-one-quarter" v-for="item in broadcastList" :key="item.username" v-if="calcType(item.type)">
                <router-link class="card-link" :to="'/broadcast/' + item.username">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-16by9">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content is-paddingless">
                            <div class="content is-small is-marginless room-name">
                                <strong>{{item.roomname}}</strong>
                            </div>
                            <div class="content is-small is-marginless room-name">
                                <a>{{item.username}}</a>
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
.room-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.card {
    border-radius: 5px;
}

/*
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
}*/
</style>
