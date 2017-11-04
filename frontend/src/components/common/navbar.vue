<template>
<div>
    <nav v-bind:class="active" v-on:click.prevent>
        <a href="#" class="home" v-on:click="makeActive('home')">Couch</a>
        <input type="text" class="search" placeholder="search..">
        <a href="#" class="login" v-if="!isLogined" @click="showModal = true" >Login</a>
        <a href="#" class="logined" v-if="isLogined">{{username}} 님</a> 
        <login-modal v-if="showModal" @close="showModal = false" v-on:logined="loginToUser"></login-modal>
    </nav>
</div>
</template>

<script>
import loginModal from '@/components/login/LoginModal';

export default {
    data() {
        return{
            active: 'home',
            showModal: false,
            isLogined: false,
            username: '',
        }
    },
    created() {
        const user = window.localStorage.getItem('user');
        if(user){
            this.username = JSON.parse(user).username;
            this.isLogined = true;
        }
    }
    ,
    // Functions we will be using.
    methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        },
        loginToUser() {
            this.username = JSON.parse(window.localStorage.getItem('user')).username;
            this.isLogined = true;
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
</style>
