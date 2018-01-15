<template>
<section class="container">
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation" v-bind:class="active" v-on:click.prevent>
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
                        <button class="login button is-link" v-if="!isLogined" @click="openLoginModal" >Sign Up/ Sign In</button>   
                    </p>     
                    <div class="logined navbar-item has-dropdown is-hoverable" v-if="isLogined">
                        <span class="navbar-link">{{username}} 님</span>
                        <div class="dropdown-content navbar-dropdown is-boxed is-right">
                            <a href="#" class="broadcastConfig navbar-item" @click="broadcastConfig">설정하기</a>
                            <a href="#" class="logout navbar-item" @click="logout">로그아웃</a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <login-modal :activeModal="loginModal" @close="setLoginModal('bounceOutDown is-active')" v-on:logined="loginToUser"></login-modal>
    </nav>
</section>
</template>

<script>
import loginModal from '@/components/login/LoginModal';
import { mapMutations, mapActions} from 'vuex';
export default {
    data() {
        return{
            active: 'home',
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
        },
        loginModal() {
            return this.$store.state.auth.loginModal;
        }
    },
    // Functions we will be using.
    methods: {
        ...mapMutations([
            'setLoginFlag',
            'setLoginModal',
        ]),
        ...mapActions({
            logoutAction: 'logoutAction'
        }),
        loginToUser() {
            this.username = JSON.parse(window.localStorage.getItem('COUCH_USER')).username;
            this.setLoginFlag(true);
        },
        broadcastConfig() {
            this.closeNavBurger();
            this.$router.push(`/config/broadcast`);
        },
        initiateNavBurger() {
            let navbarBurger = document.getElementsByClassName('navbar-burger')[0];
            navbarBurger.addEventListener('click',() => {
                navbarBurger.classList.toggle('is-active');
                document.getElementById('navMenu').classList.toggle('is-active');
            });
        },
        logout() {
            this.closeNavBurger();
            this.logoutAction();
            if(this.$eventBus.$on) {
                this.$eventBus.$emit('logout');
            }
        },
        openLoginModal() {
            this.closeNavBurger();
            this.setLoginModal('bounceInUp is-active');
        },
        closeNavBurger() {
            document.getElementsByClassName('navbar-burger')[0].classList.toggle('is-active');
            document.getElementById('navMenu').classList.toggle('is-active');
        }
    },

    components : {
        'login-modal': loginModal
    }
};
</script>

<style scoped>
.navbar-brand {
    margin-left: 0;
}

</style>
