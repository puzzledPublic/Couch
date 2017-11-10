<template>
    <div class="columns is-multiline">
        <div class="column is-3" v-for="item in broadcastListTest" :key="item.username" v-if="calcType(item.type)" >
            <a class="card-link" :href="'/broadcast/' + item.username">
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
            </a>
        </div>    
    </div>
    <!--
  <div class="roomlist">
      <div class="roomwapper" v-for="item in broadcastList" :key="item.username" v-if="calcType(item.type)">
          <div class="room">
              <a :href="'/broadcast/'+item.username">
                <img src="../../assets/logo.png">
                <div class="desc">
                    <p> 
                        {{item.roomname}}
                    </p>
                    <p>
                        {{item.username}}
                    </p>
                 </div>
              </a>
          </div>
      </div>
      <div class="emptyList" v-if="broadcastList.length == 0">
          방송 중인 목록이 없습니다.
      </div>
  </div>
  -->
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
/*
div.room {
    border: 1px solid #ccc;
    border-radius: 5px;
}
div.room:hover {
    border: 1px solid #777;
}

div.room img {
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 120px;
}
div.desc {
    padding: 5px;
    text-align: center;
}
div.desc p {
    padding: 0;
    margin: 0;
}
div a {
    color: #000000;
    text-decoration: none;
}
.roomwapper {

    padding: 6px 6px;
    float: left;
    width: 20%;
}
.roomlist{
    margin-left: 25%;
}
.emptyList {
    padding: 230px 320px;
}
@media only screen and (max-width: 700px){
    .roomwapper {
        width: 24.99999%;
        margin: 6px 0;
    }
    .roomlist {
        margin-left: 0;
    }
}

@media only screen and (max-width: 500px){
    .roomwapper {
        width: 45%;
    }
    .roomlist {
        margin-left: 0;
    }
}*/
</style>
