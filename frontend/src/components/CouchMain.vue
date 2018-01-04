<template>
    <section class="container wrap">
        <div class="columns main-wrap">
            <div class="column is-2 broadcast-menu">
                <aside class="menu">
                    <p class="menu-label has-text-centered has-text-weight-bold">
                        방송주제
                    </p>
                    <ul class="menu-list">
                        <li v-for="(type, index) in typeListKOR" :key="index">
                            <router-link :to="'/?type='+typeList[index]">{{type}}</router-link>
                        </li>
                    </ul>
                    <p class="menu-label has-text-centered has-text-weight-bold">
                        커뮤니티
                    </p>
                    <ul class="menu-list">
                        <li @click="refreshBoardView"><router-link :to="'/board/free'">자유 게시판</router-link></li>
                        <li><a>PD 게시판</a></li>
                    </ul>
                </aside>
            </div>
            <div class="dropdown is-12">
                <div class="dropdown-trigger">
                    <button class="button drop-button">
                        <span>방송목록</span>
                    </button>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <router-link class="dropdown-item" :to="'/?type='+typeList[index]" v-for="(type, index) in typeListKOR" :key="index">{{type}}</router-link>
                    </div>
                </div>
            </div>
            <div class="column is-10 broadcast-list">
                <!--<Broadcast-List></Broadcast-List>-->
                <router-view></router-view>
            </div>
        </div>  
    </section>
</template>

<script>
import {mapMutations} from 'vuex';
import {typeList, typeListKOR} from '@/api/util/broadcastTypeList'

export default {
    name: 'MainContent',
    data() {
        return {
            typeList: typeList,
            typeListKOR: typeListKOR
        }
    },
    created() {
        this.$store.dispatch('getBroadcastListAction', 0);
    },
    mounted() {
        this.activeDropdown();
    },
    methods: {
        ...mapMutations([
            'setArticlePageViewName'
        ]),
        refreshBoardView() {
            this.setArticlePageViewName('Article-List');
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
.menu {
    position: sticky;
    top: 0;
}
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
    .dropdown {
        display: block;
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
.dropdown {
    display: none;
}
</style>
