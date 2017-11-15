<template>
  <div class="column">
    <div class="chatbox">
      <aside class="menu">
          <div class="tabs is-small is-centered">
            <ul>
              <li class="is-active"><a>채팅</a></li>
              <li><a>참여자</a></li>
              <li><a>차단</a></li>
            </ul>
          </div>
          <div class="chatlist" >
            <div v-for="item in chatMsgList" :key="item.id" class="is-size-7" :class="'chat-'+ checkPosition(item.username)" >
              <p>{{item.msg}}</p>
              <span>{{item.username}}</span>
              <span class="time-left">time here</span>
            </div>
          </div>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input v-model="chatMsg" class="input" type="text" placeholder="입력하세요.." @keyup.enter="sendMessage" v-if="isLogined">
              <div class="dropdown is-up" :class="{'is-active': showDropdown}" v-if="!isLogined" @click="showDropdown = !showDropdown">
                <div class="dropdown-trigger">
                  <button class="button guestButton" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span> 입력하세요.. </span>
                  </button>
                </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <a class="dropdown-item">로그인이 필요합니다.</a>
                      <div class="dropdown-item">
                        <input class="input" type="text" placeholder="임시 접속 닉네임..">
                        <a>확인</a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </aside>
    </div>
    
  </div>
</template>

<script>
import io from 'socket.io-client'
import {mapMutations} from 'vuex'

export default {
  name: 'ChatBox',
  props: ['roomname'],
  data() {
    return {
      chatMsg: '',
      socket: null,
      joinChatRoomInfo: {roomname: this.roomname, username: null},
      showDropdown: false,
    }
  },
  computed: {
    chatMsgList() {
      return this.$store.state.chat.chatMsgList;
    },
    isLogined() {
      return this.$store.state.auth.isLogined;
    }
  },
  mounted() {
    this.initializeSocket();
    this.joinChatRoom();
    this.$eventBus.$on('login', this.changeUsername);
  },
  beforeDestroy() {
    this.disconnectSocket();
  },
  methods: {
    ...mapMutations([
      'addMsg',
      'setUserList',
      'addBan',
      'removeBan',
      'setGuestname',
    ]),
    initializeSocket() {
      if(!this.socket){
        this.socket = io('http://whowant.ml:3000');
        this.socket.on('receiveMessage', (chatMsg) => {
          this.addMsg(chatMsg);
        });
      }
    },
    joinChatRoom() {
      if(!this.isLogined) {
        this.joinChatRoomInfo.username = 'guest';
      }else {
        const username = JSON.parse(window.localStorage.getItem('COUCH_USER')).username;
        this.joinChatRoomInfo.username = username;
      }
      this.socket.emit('joinChatRoom', this.joinChatRoomInfo);
    },
    sendMessage() {
      if(this.chatMsg === '') {
        return;
      }else {
        this.socket.emit('sendMessage', {msg: this.chatMsg});
        this.chatMsg = '';
      }
    },
    disconnectSocket() {
      if(this.socket){
        this.socket.disconnect();
        this.socket = null;
      }
    },
    checkPosition(username) {
      const userInfo = window.localStorage.getItem('COUCH_USER');
      if(userInfo) {
        return username === JSON.parse(userInfo).username ? 'right' : 'left';
      }
      return 'left';
    },
    changeUsername() {
      const userInfo = window.localStorage.getItem('COUCH_USER');
      let username;
      if(userInfo) {
        username = JSON.parse(userInfo).username;
      }
      this.socket.emit('changeUsername', {username: username});
    }
  }
}
</script>

<style scoped>

.chatbox {
  border: 1px solid;
  padding: 5px;
}
.chatlist {
  position: relative;
  top: 0;
  overflow-y: auto;
  overflow-x: auto;
  height: 475px;
}
.chat-left {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
}
.chat-right {
  border: 2px solid #dedede;
  background-color: bisque;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
  text-align: right;
}
.time-left {
  text-align: right;
  color: #aaa;
}
.tabs {
  margin-bottom: 0px;
}
.dropdown, .dropdown-trigger, .guestButton, .dropdown-menu {
  width: 100%;
}
</style>
