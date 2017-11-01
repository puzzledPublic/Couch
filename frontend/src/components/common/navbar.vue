<template>
<div>
    <nav v-bind:class="active" v-on:click.prevent>
        <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
        <a href="#" class="projects" v-on:click="makeActive('projects')">방송 목록</a>
        <a href="#" class="services" v-on:click="makeActive('services')">Services</a>
        <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
        <a href="" class="login" @click="showModal = true">Login</a>
        <login-modal v-if="showModal" @close="showModal = false"></login-modal>
    </nav>
</div>
</template>

<script>
import loginModal from '@/components/login/loginModal';

export default {
    data() {
        return{
            active: 'home',
            showModal: false
        }
    },

    // Functions we will be using.
    methods: {
        makeActive: function(item){
            // When a model is changed, the view will be automatically updated.
            this.active = item;
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
    padding: 18px 30px;
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
nav.contact .contact{
    background-color:#e35885;
}
.login {
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
</style>
