<template>
    <div class="columns is-multiline">
        <div class="column is-3" v-for="item in broadcastListTest" :key="item.username" v-if="calcType(item.type)" >
            <router-link class="card-link" :to="'/broadcast/' + item.username">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-2by1">
                            <img src="https://bulma.io/images/placeholders/640x320.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <article class="media">
                            
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>{{item.roomname}}</strong><br>
                                         {{item.username}}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </router-link>
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
            broadcastListTest: [
                {username: 'hello', roomname: 'hello1gggggggg ggg ggggg gggdddddddd asd asd asd asd asd sadgggg', type: 1},
                {username: 'hello2', roomname: 'hello2', type: 2},
                {username: 'hello3', roomname: 'hello3', type: 3},
                {username: 'hello4', roomname: 'hello4', type: 4},
                {username: 'hello5', roomname: 'hello5', type: 5},
                {username: 'hello6', roomname: 'hello6', type: 6},
                {username: 'hello7', roomname: 'hello4', type: 4},
                {username: 'hello8', roomname: 'hello3', type: 3},
                {username: 'hello9', roomname: 'hello2', type: 2},
                {username: 'hello10', roomname: 'hello1', type: 1},
            ]
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
.card-link:hover .card-content {

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
</style>
