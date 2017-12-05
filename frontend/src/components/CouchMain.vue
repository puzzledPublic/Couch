<template>
    <div class="content columns">
        <div class="column is-2">
            <aside class="menu">
                <p class="menu-label">
                    방송주제
                </p>
                <ul class="menu-list">
                    <li v-for="(type, index) in typeList" v-key="index">
                        <a @click="setType(index)">{{type}}</a>
                    </li>
                </ul>
                <p class="menu-label">
                    게시판
                </p>
                <ul class="menu-list">
                    <li><a>자유 게시판</a></li>
                    <li><a>PD 게시판</a></li>
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
                        <a class="dropdown-item" @click="setType(index)" v-for="(type, index) in typeList" v-key="index">{{type}}</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="column">
            <Broadcast-List :broadcastType="type" :broadcastList="broadcastList"></Broadcast-List>
        </div>
    </div>  
</template>

<script>
import mainBroadcastList from '@/components/main/BroadcastList';
import {mapGetters} from 'vuex';
import {typeListKOR} from '@/api/util/broadcastTypeList'

export default {
    name: 'MainContent',
    data() {
        return {
            type: 0,
            typeList: typeListKOR
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
    height: 100vh;
    border-top: 3px solid royalblue;
}
.menu-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.column {
    background-color: #fff;
    border-right: 1px solid #ddd;
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
