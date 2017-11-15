<template>
    <div class="content columns">
        <div class="column is-2">
            <aside class="menu">
                <p class="menu-label">
                    방송주제
                </p>
                <ul class="menu-list">
                    <li><a @click="setType(0)">전체목록</a></li>
                    <li><a @click="setType(1)">영화</a></li>
                    <li><a @click="setType(2)">애니메이션</a></li>
                    <li><a @click="setType(3)">엔터테이먼트</a></li>
                    <li><a @click="setType(4)">음악</a></li>
                    <li><a @click="setType(5)">토크</a></li>
                    <li><a @click="setType(6)">게임</a></li>
                    <li><a @click="setType(7)">야외방송</a></li>
                </ul>
            </aside>
            <div class="dropdown is-12">
                <div class="dropdown-trigger">
                    <button class="button drop-button">
                        <span>방송목록</span>
                    </button>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <a @click="setType(0)" class="dropdown-item">전체목록</a>
                        <a @click="setType(1)" class="dropdown-item">영화</a>
                        <a @click="setType(2)" class="dropdown-item">애니메이션</a>
                        <a @click="setType(3)" class="dropdown-item">엔터테이먼트</a>
                        <a @click="setType(4)" class="dropdown-item">음악</a>
                        <a @click="setType(5)" class="dropdown-item">토크</a>
                        <a @click="setType(6)" class="dropdown-item">게임</a>
                        <a @click="setType(7)" class="dropdown-item">야외방송</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="column">
            <div></div>
            <Broadcast-List :broadcastType="type" :broadcastList="broadcastList"></Broadcast-List>
        </div>
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
    mounted() {
        this.activeDropdown();
    },
    methods: {
        setType(typeNum) {
            this.requestList(typeNum);
            this.type = typeNum;
            document.getElementsByClassName('dropdown')[0].classList.toggle('is-active');
        },
        requestList(typeNum) {
            this.$store.dispatch('getBroadcastListAction', typeNum);
        },
        activeDropdown() {
            document.getElementsByClassName('drop-button')[0].addEventListener('click',() => {
                document.getElementsByClassName('dropdown')[0].classList.toggle('is-active');
            });
        }
    }
};
</script>

<style scoped>
.content {
    margin: 20px 1px 0px 1px;
}
.menu-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.column {
    background-color: #fff;
}
.dropdown {
    display: none;
}

@media only screen and (max-width: 800px){
    .menu {
        display: none;
    }
    .dropdown {
        display: block;
    }
    .drop-button {
        padding: 0 41%;
    }
}

</style>
