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
          <div class="chatlist">
            <div class="chat-left is-size-7">
              <p>Hello. How are you my name is kim hyeong min live in korea and nobody cares me</p>
              <span>Hello</span>
              <span class="time-left">16:56</span>
            </div>
            <div class="chat-right is-size-7">
              <p>Hello. How are you my name is kim hyeong min live in korea and nobody cares me</p>
              <span class="time-left">17:00</span>
            </div>
            
          </div>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input v-model="chatMsg" class="input" type="text" placeholder="입력하세요..">
            </div>
            <div class="control">
              <a class="button is-info" @click="sendMessage">
                Submit
              </a>
            </div>
          </div>
      </aside>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'ChatBox',
  props: ['roomname'],
  data() {
    return {
      chatMsg: '',
      socket: null,
      joinChatRoomInfo: {roomname: this.roomname, username: null},
    }
  },
  mounted() {
    this.initializeSocket();
    this.joinChatRoom();
  },
  beforeDestroy() {
    this.disconnectSocket();
  },
  methods: {
    initializeSocket() {
      if(!this.socket){
        this.socket = io('http://whowant.ml:3000');
        this.socket.on('receiveMessage', ({msg, username}) => {
          console.log(msg);
          console.log(username);
        });
      }
    },
    joinChatRoom() {
      if(!this.isLogined()){
        this.joinChatRoomInfo.username = 'guest';
      }else {
        this.joinChatRoomInfo.username = this.$store.getters.username;
      }
      this.socket.emit('joinChatRoom', this.joinChatRoomInfo);
    },
    sendMessage() {
      if(this.chatMsg === ''){
        return;
      }else{
        this.socket.emit('sendMessage', {msg: this.chatMsg});
        this.chatMsg = '';
      }
    },
    disconnectSocket() {
      this.socket.disconnect();
    },
    isLogined() {
      return this.$store.state.auth.isLogined;
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
</style>
