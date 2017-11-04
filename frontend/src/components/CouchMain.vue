<template>
    <div class="content">
        <ul class="sidebar">
            <li><div @click="getType(0)">전체</div></li>
            <li><div @click="getType(1)">movie</div></li>
            <li><div @click="getType(2)">animation</div></li>
            <li><div @click="getType(3)">entertain</div></li>
            <li><div @click="getType(4)">music</div></li>
            <li><div @click="getType(5)">talk</div></li>
            <li><div @click="getType(6)">game</div></li>
            <li><div @click="getType(7)">goout</div></li>   
        </ul>
        <Broadcast-List :broadcastType="type" :brlist="list"></Broadcast-List>
    </div>  
</template>

<script>
import mainBroadcastList from '@/components/main/BroadcastList';
import axios from 'axios';
export default {
    name: 'MainContent',
    data() {
        return {
            type: 0,
            list: '',
        }
    },
    components: {
        'Broadcast-List': mainBroadcastList
    },
    created() {
        this.$store.dispatch('getBroadcastListAction', 0);
    }
    ,
    methods: {
        getType(typeNum) {
            this.type = typeNum;
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
