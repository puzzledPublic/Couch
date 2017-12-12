<template>
    <section class="container wrap">
        <div class="columns main-wrap">
            <div class="column is-2 broadcast-menu">
                <aside class="menu">
                    <p class="menu-label has-text-centered has-text-weight-bold">
                        방송주제
                    </p>
                    <ul class="menu-list">
                        <li v-for="(type, index) in typeList" :key="index">
                            <a @click="setType(index)">{{type}}</a>
                        </li>
                    </ul>
                    <p class="menu-label has-text-centered has-text-weight-bold">
                        커뮤니티
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
                            <a class="dropdown-item" @click="setType(index)" v-for="(type, index) in typeList" :key="index">{{type}}</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="column is-10 broadcast-list">
                <Broadcast-List :broadcastType="type" :broadcastList="broadcastList"></Broadcast-List>
            </div>
        </div>  
    </section>
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
.menu-label {
    background-color: royalblue;
    color: white;
}
.menu-list > li > a.is-active {
    background-color: lightgrey;
    color: #4a4a4a;
}
.wrap {
     height: 90%;
}
.main-wrap {
    height: 97%;
}
.broadcast-list, .broadcast-menu, .free-board {
    background-color: white;
}
.broadcast-list {
    overflow-y: auto;
}

@media screen and (min-width: 960px) {
    .main-wrap {
        padding: 0 20px 0 10px;
    }
    .broadcast-menu {
        margin-right: 10px;
       }
}
@media screen and (max-width: 960px) {
    .broadcast-menu {
        display: none;
    }
    .broadcast-list {
        overflow-y: unset;
    }
}

/*
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
*/
</style>
