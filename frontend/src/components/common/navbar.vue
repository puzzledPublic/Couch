<template>
<div>
    <nav v-bind:class="active" v-on:click.prevent>
        <a href="#" class="home" v-on:click="makeActive('home')">Couch</a>
        <input type="text" class="search" placeholder="search..">
        <a href="#" class="login" v-if="!isLogined" @click="showModal = true" >Login</a>
        <div class="logined" v-if="isLogined">
            <span>{{username}} 님</span>
            <div class="dropdown-content">
            <a href="#"></a>
            <a href="#" class="broadcastConfig" @click="testAction">방송설정</a>
            <a href="#" class="logout" @click="logoutAction">로그아웃</a>
            </div>
        </div> 
        <login-modal v-if="showModal" @close="showModal = false" v-on:logined="loginToUser"></login-modal>
    </nav>
</div>
</template>

<script>
import loginModal from '@/components/login/LoginModal';
import { mapMutations, mapActions} from 'vuex';
export default {
    data() {
        return{
            active: 'home',
            showModal: false,
            username: '',
        }
    },
    created() {
        const user = window.localStorage.getItem('COUCH_USER');
        if(user){
            this.username = JSON.parse(user).username;
            this.setLoginFlag(true);
        }
    },
    computed: {
        isLogined() {
            return this.$store.state.auth.isLogined;
        }
    }
    ,
    // Functions we will be using.
    methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        },
        ...mapMutations({
            setLoginFlag: 'setLoginFlag' 
        }),
        ...mapActions({
            logoutAction: 'logoutAction',
            setBroadcastConfigAction: 'setBroadcastConfigAction'
        }),
        loginToUser() {
            this.username = JSON.parse(window.localStorage.getItem('COUCH_USER')).username;
            this.setLoginFlag(true);
        },
        testAction(){
            this.setBroadcastConfigAction({username: this.username, show: true, roomname: 'hello!', typeNum: 2});
        }
    },

    components : {
        'login-modal': loginModal
    }
};
</script>

<style scoped>

a, a:visited {
    outline:none;
    color:#389dc1;
}

a:hover{
    text-decoration:none;
}

section, footer, header, aside, nav{
    display: block;
}

/*-------------------------
    The menu
--------------------------*/

nav{
    display:inline-block;
    width: 100%;
    background-color:#5597b4;
    box-shadow:0 1px 1px #ccc;
    border-radius:2px;
}

nav a{
    display:inline-block;
    padding: 16px 70px;
    color:#fff !important;
    font-weight:bold;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    text-transform: uppercase;
    background-color:transparent;

    -webkit-transition:background-color 0.25s;
    -moz-transition:background-color 0.25s;
    transition:background-color 0.25s;
}

nav a:first-child{
    border-radius:2px 0 0 2px;
}

nav a:last-child{
    border-radius:0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact,
nav.login .login{
    background-color:#e35885;
}
.login, .logined {
    float: right;
}
p{
    font-size:22px;
    font-weight:bold;
    color:#7d9098;
}

p b{
    color:#ffffff;
    display:inline-block;
    padding:5px 10px;
    background-color:#c4d7e0;
    border-radius:2px;
    text-transform:uppercase;
    font-size:18px;
}
.search {
    padding-left:3px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}
.logined {
    display:inline-block;
    padding: 16px 70px;
    color:#fff;
    font-weight:bold;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    text-transform: uppercase;
    background-color:transparent;
}
.dropdown-content {
    display: none;
    position: absolute;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}
.dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}
.logined:hover .dropdown-content {
    display: block;
}
</style>
