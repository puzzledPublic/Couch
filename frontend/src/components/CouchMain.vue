<template>
    <div class="content">
        <ul class="sidebar">
            <li><div @click="setType(0)">전체</div></li>
            <li><div @click="setType(1)">movie</div></li>
            <li><div @click="setType(2)">animation</div></li>
            <li><div @click="setType(3)">entertain</div></li>
            <li><div @click="setType(4)">music</div></li>
            <li><div @click="setType(5)">talk</div></li>
            <li><div @click="setType(6)">game</div></li>
            <li><div @click="setType(7)">goout</div></li>   
        </ul>
        <Broadcast-List :broadcastType="type" :broadcastList="broadcastList"></Broadcast-List>
    </div>  
</template>

<script>
import mainBroadcastList from '@/components/main/BroadcastList';
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
    name: 'MainContent',
    data() {
        return {
            type: 0,
        }
    },
    components: {
        'Broadcast-List': mainBroadcastList
    },
    computed: {
        broadcastList() {
            return this.$store.state.broadcast.broadcastList;
        }
    },
    created() {
        this.$store.dispatch('getBroadcastListAction', 0);
        
    },
    methods: {
        setType(typeNum) {
            this.requestList(typeNum);
            this.type = typeNum;
        },
        requestList(typeNum) {
            this.$store.dispatch('getBroadcastListAction', typeNum);
        }
    }
};
</script>

<style scoped>
/* Style the content */
.content {
    margin-top: 20px;
    padding: 0px;
    overflow: auto;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 15.5%;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
    overflow: auto;
}

li div {
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
}

li div.active {
    background-color: #4CAF50;
    color: white;
}

li div:hover:not(.active) {
    background-color: #555;
    color: white;
}

@media only screen and (max-width: 500px){
    .sidebar {
        display: none;
    }
}
</style>
