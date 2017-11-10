<template>
<div>
    <nav class="navbar" role="navigation" aria-label="main navigation" v-bind:class="active" v-on:click.prevent>
        <div class="home navbar-brand">
            <router-link to="/" class="navbar-item"> 
                <img src="../../assets/COUCH-logo.png" width="112" height="28">
            </router-link>
            <button class="button navbar-burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="navbar-menu" id="navMenu">
            <div class="navbar-start">
                <div class="navbar-item">
                    <div class="field has-addons">
                        <p class="control">
                            <input type="text" class="search input" placeholder="search..">
                        </p>
                        <p class="control">
                            <button class="button">
                                Search
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <p class="control">
                        <button class="login button is-primary" v-if="!isLogined" @click="showModal = 'is-active'" >Sign Up/ Sign In</button>   
                    </p>     
                    <div class="logined navbar-item has-dropdown is-hoverable" v-if="isLogined">
                        <span class="navbar-link">{{username}} 님</span>
                        <div class="dropdown-content navbar-dropdown is-boxed is-right">
                            <a href="#" class="navbar-item"></a>
                            <a href="#" class="broadcastConfig navbar-item" @click="testAction">방송설정</a>
                            <a href="#" class="logout navbar-item" @click="logoutAction">로그아웃</a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <login-modal :activeModal="showModal" @close="showModal = ''" v-on:logined="loginToUser"></login-modal>
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
            showModal: '',
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
    mounted() {
        this.initiateNavBurger();
    },
    computed: {
        isLogined() {
            return this.$store.state.auth.isLogined;
        }
    },
    // Functions we will be using.
    methods: {
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
        testAction() {
            this.setBroadcastConfigAction({username: this.username, show: true, roomname: 'hello!', typeNum: 2});
        },
        initiateNavBurger() {
            let navbarBuger = document.getElementsByClassName('navbar-burger')[0];
            navbarBuger.addEventListener('click',() => {
                navbarBuger.classList.toggle('is-active');
                document.getElementById('navMenu').classList.toggle('is-active');
            });
        }
    },

    components : {
        'login-modal': loginModal
    }
};
</script>

<style scoped>
/*
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
*/
</style>
