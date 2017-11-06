<template>
  <transition id="modal-template" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <div name="header">
              <p v-if="!register">로그인</p>
              <p v-if="register">회원가입</p>
            </div>
          </div>

          <div class="modal-body">
            <div name="body" v-if="!register">
              <input v-model="email" type="email" placeholder="이메일.." :value="email"></input>
              <input v-model="password" type="password" placeholder="비밀번호.." :value="password"></input>
            </div>
            <div name="body" v-if="register">
              <input v-model="email" id="email" type="email" placeholder="이메일.."></input>
              <input v-model="username" type="text" placeholder="닉네임.."></input>
              <input v-model="password" type="password" placeholder="비밀번호.."></input>
              <input v-model="passwordCheck" type="password" placeholder="비밀번호 확인.."></input>
            </div>
          </div>

          <div class="modal-footer">
            <div name="footer">
              <button class="modal-register-button" v-if="!register" @click="register = true">
                회원가입
              </button>
              <button class="modal-register-button" v-if="register" @click="register = false">
                로그인
              </button>
              <button class="modal-default-button" @click="$emit('close')">
                닫기
              </button>
              <button class="modal-default-button" @click="request">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
      passwordCheck: ''
    }
  },
  methods: {
    close() {
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  overflow: auto;
}

.modal-header {
  margin-top: 0;
  color: #5597b4;
}

.modal-body {
  margin: 20px 0;
}
.modal-register-button {
  float: left;
}
.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

button {
    display:inline-block;
    color: #fff;
    background-color:#5597b4;
    box-shadow:0 1px 1px #ccc;
    border-radius:2px;
}

input {
  margin-bottom: 6px;
  -webkit-transition: 0.5s;
  transition:  0.5s;
  outline: none;
}
input:focus {
  border: 2px solid #5597b4;
}
</style>
