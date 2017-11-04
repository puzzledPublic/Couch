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
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'BroadcastList',
    props: ['broadcastType', 'brlist'],
    data() {
        return {
            broadcastList : [
                {username: 'tester',roomname: 'room1',type: 0},
                {username: 'tester2',roomname: 'room2',type: 1},
                {username: 'tester3',roomname: 'room3',type: 2},
                {username: 'tester4',roomname: 'room4',type: 3},
                {username: 'tester5',roomname: 'room5',type: 4},
                {username: 'tester6',roomname: 'room6',type: 5}
            ],
            
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
