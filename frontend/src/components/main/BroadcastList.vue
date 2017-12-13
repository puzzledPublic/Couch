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
        <div class="noBroadcast" v-else>
            <div>
                <p class="is-size-4 is-size-7-mobile">진행중인 방송이 없습니다.</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {typeList} from '@/api/util/broadcastTypeList'
import {mapMutations, mapActions} from 'vuex'
export default {
    name: 'BroadcastList',
    data() {
        return {
    
        }
    },
    computed: {
        broadcastList() {
            return this.$store.state.broadcast.broadcastList;
        },
        requestListType() {
            return this.$store.state.broadcast.requestListType;
        }
    },
    watch: {
        '$route' (to, from) {
            const typeNum = typeList.indexOf(to.query.type);
            if(typeNum >= 0) {
                this.setType(typeNum);
            }
        }
    },
    methods: {
        ...mapMutations([
            'setRequestListType'
        ]),
        ...mapActions([
            'getBroadcastListAction'
        ]),
        setType(typeNum) {
            this.setRequestListType(typeNum);
            this.getBroadcastListAction(typeNum);
        },
        calcType(itemType) {
            if(this.requestListType == 0){
                return true;
            }
            if(this.requestListType == itemType){
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
.noBroadcast {
    padding-top:20%;
    margin: auto;
    width: 50%;
    height: 100;
}
</style>
