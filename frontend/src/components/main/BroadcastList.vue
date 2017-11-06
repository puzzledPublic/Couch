<template>
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
}
</style>
