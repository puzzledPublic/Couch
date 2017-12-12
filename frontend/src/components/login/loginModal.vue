<template>
  <div class="modal animated" :class="activeModal">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!register" class="modal-card-title">로그인</p>
        <p v-if="register" class="modal-card-title">회원가입</p>
        <button class="delete" aria-label="close" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left ">
            <input v-model="email" class="input" type="email" placeholder="이메일...">
            <span class="icon is-small is-left">
              <i class="fa fa-email"></i>
            </span>
          </div>
        </div>
        <div v-if="register" class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input v-model="username" class="input" type="text" placeholder="닉네임...">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input v-model="password" class="input" type="password" placeholder="비밀번호..." @keyup.enter="request">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div v-if="register" class="field">
          <label class="label">PasswordCheck</label>
          <div class="control has-icons-left">
            <input v-model="passwordCheck" class="input" type="password" placeholder="비밀번호확인...">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div>
          <button v-if="register" class="button" @click="register = false">로그인</button>
          <button v-if="!register" class="button" @click="register = true">회원가입</button>
        </div>
        <div>
          <button class="button is-link" @click="request">확인</button>
          <button class="button" @click="closeModal()">취소</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginModal',
  data() {
    return {
      register: false,
      email: '',
      username: '',
      password: '',
      passwordCheck: '',
    }
  },
  props: ['activeModal']
  ,
  methods: {
    closeModal() {
      this.email = this.username = this.password = this.passwordCheck = '';
      this.register = false;
      this.$emit('close');
    },
    async request() {
      if(this.register){
        await this.$store.dispatch('createUserAction',{email:this.email, username: this.username, password: this.password});
        if(this.checkResult()){
          alert('회원가입 완료');
          this.password = this.passwordCheck= '';
          this.register = false;
        }
      }
      else{
        await this.$store.dispatch('localLoginAction', {email:this.email, password: this.password});
        if(this.checkResult()){
          this.$emit('logined');
          this.$emit('close');
          this.password = '';
          if(this.$eventBus.$on) {
            this.$eventBus.$emit('login');
          }  //global event for login
        }
      }
    },
    checkResult() {
      if(this.$store.state.auth.error.status){
        alert(this.$store.state.auth.error.msg);
        this.$store.commit('resetError');
        return false;
      }else{
        return true;
      }
    }

  }
}
</script>

<style scoped>
.modal-card-foot {
  justify-content: space-between;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.bounceInUp {
  animation-name: bounceInUp;
}
@keyframes bounceInUp {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0);
  }

  90% {
    transform: translate3d(0, -5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes bounceOutDown {
  20% {
    transform: translate3d(0, 10px, 0);
  }

  40%, 45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.bounceOutDown {
  animation-name: bounceOutDown;
}
.modal-background {
  opacity: 0.4;
}
</style>
