<template>
  <div class="column is-3 chat-wrap">
    <div class="chatbox">
      <aside class="menu">
          <div class="tabs is-small is-centered">
            <ul>
              <li class="tab-item is-active" @click="changeViewList('chatlist', $event)"><a>채팅</a></li>
              <li class="tab-item" @click="changeViewList('userlist', $event)"><a>참여자({{userList.length}})</a></li>
              <li class="tab-item" @click="changeViewList('banlist', $event)"><a>차단</a></li>
            </ul>
          </div>
          <div class="chatlist view-item">
            <div v-for="item in chatMsgList" :key="item.id" class="is-size-7" :class="'chat-'+ checkPosition(item.username)" >
              <p>{{item.msg}}</p>
              <span @click="popupUserMenu(item.username, $event)"><a>{{item.username}}</a></span>
              <span class="time-left">{{item.time}}</span>
            </div>
          </div>
          <div class="userlist view-item">
            <div v-for="item in userList" :key="item.id" class="is-size-7" v-if="item !== 'guest'">
              <div><a @click="popupUserMenu(item, $event)">{{item}}</a></div>
            </div>
            <div class="is-size-7" v-if="guestCount > 0">
              <div>guest {{guestCount}} 명</div>
            </div>
          </div>
          <div class="banlist view-item">
            <div v-for="item in banList" :key="item.id" class="is-size-7">
              <div><a @click="popupUserMenu(item, $event)">{{item}}</a></div>
            </div>
          </div>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input v-model="chatMsg" class="input" type="text" placeholder="입력하세요.." @keyup.enter="sendMessage" v-if="openChatFlag">
              <div class="dropdown is-up" :class="{'is-active': showDropdown}" v-if="!openChatFlag" @click="showDropdown = !showDropdown">
                <div class="dropdown-trigger">
                  <button class="button guestButton" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span> 입력하세요.. </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a class="dropdown-item has-text-centered" @click="setLoginModal('is-active')">회원가입 or 로그인</a>
                    <hr class="dropdown-divider">
                    <div class="dropdown-item field has-addons" v-if="allowGuest">
                      <input class="input" id="guestname" type="text" placeholder="임시 접속 닉네임.." v-model="guestname" @click="$event.stopPropagation()" @keyup.enter="changeUsername(guestname, 'guest')">
                      <a class="button" @click="changeUsername(guestname, 'guest')">확인</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-menu">
            <div class="is-size-7"></div>
            <div class="is-size-7" @click="banUser" v-if="!isUserBanned"><a>차단하기</a></div>
            <div class="is-size-7" @click="banUser" v-if="isUserBanned"><a>차단풀기</a></div>
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
      openChatFlag: false,
      guestname: null,
      isUserBanned: false
    }
  },
  computed: {
    chatMsgList() {
      return this.$store.state.chat.chatMsgList;
    },
    isLogined() {
      return this.$store.state.auth.isLogined;
    },
    allowGuest() {
      return this.$store.state.chat.allowGuest;
    },
    userList() {
      return this.$store.state.chat.userList;
    },
    banList() {
      return this.$store.state.chat.banList;
    },
    guestCount() {
      return this.$store.state.chat.guestCount;
    }
  },
  mounted() {
    this.initializeSocket();
    this.joinChatRoom();
    this.openChatFlag = this.isLogined;
    this.$eventBus.$on('login', this.whenLogin);
    this.$eventBus.$on('logout', this.whenLogout);
    document.addEventListener('click', this.closeUserMenu);
  },
  beforeDestroy() {
    this.$eventBus.$off('login', this.whenLogin);
    this.$eventBus.$off('logout', this.whenLogout);
    this.disconnectSocket();
    document.removeEventListener('click', this.closeUserMenu);
  },
  updated() {
    const chatlist = document.getElementsByClassName('chatlist')[0];
    if(chatlist) {
      chatlist.scrollTop = chatlist.scrollHeight;
    }
  },
  methods: {
    ...mapMutations([
      'addMsg',
      'resetMsg',
      'setUserList',
      'addBan',
      'removeBan',
      'setGuestname',
      'setLoginModal'
    ]),
    initializeSocket() {
      if(!this.socket){
        this.socket = io('http://whowant.ml:3000');
        this.socket.on('receiveMessage', (chatMsg) => {
          this.addMsg(chatMsg);
        });
        this.socket.on('openChat', ({openChatFlag}) => {
          this.openChatFlag = openChatFlag;
        });
        this.socket.on('getUserList', ({userList}) => {
          this.setUserList(userList);
        });
        this.socket.on('denyRequest', ({msg}) => {
          alert(msg);
        })
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
      if(this.chatMsg.trim() === '') {
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
        this.resetMsg();
      }
    },
    checkPosition(username) {
      const userInfo = window.localStorage.getItem('COUCH_USER');
      if(userInfo) {
        return username === JSON.parse(userInfo).username ? 'right' : 'left';
      }
      return 'left';
    },
    whenLogin() {
      const userInfo = window.localStorage.getItem('COUCH_USER');
      let username;
      if(userInfo) {
        username = JSON.parse(userInfo).username;
      }
      this.changeUsername(username, 'user');
    },
    whenLogout() {
      this.socket.emit('logout');
    },
    changeUsername(username, userType) {
      if(userType === 'guest') {
        this.joinChatRoomInfo.username = `(guest) ${username}`;
      }else {
        this.joinChatRoomInfo.username = username;
      }
      this.socket.emit('changeUsername', {username: username, userType: userType});
    },
    changeViewList(viewname, event) {
      let tabItems = document.getElementsByClassName('tab-item');
      let viewItems = document.getElementsByClassName('view-item');
      for(let i = 0 ; i < tabItems.length ; i++) {
        tabItems[i].className = tabItems[i].className.replace(' is-active', '');
        viewItems[i].style.display = 'none';
      }
      document.getElementsByClassName(viewname)[0].style.display = 'block';
      event.currentTarget.className += ' is-active';
    },
    popupUserMenu(username, event) {
      event.stopPropagation();
      this.isUserBanned = false;
      if(this.banList.includes(username)) {
        this.isUserBanned = true;
      }
      const xPos = event.pageX;
      const yPos = event.pageY;
      document.getElementsByClassName('user-menu')[0].style.display = 'block';
      document.getElementsByClassName('user-menu')[0].children[0].textContent = username;
      document.getElementsByClassName('user-menu')[0].style.left = xPos + 'px';
      document.getElementsByClassName('user-menu')[0].style.top = yPos + 'px';
    },
    banUser() {
      const username = document.getElementsByClassName('user-menu')[0].children[0].textContent.trim();
      if(this.isUserBanned) {
        this.removeBan(username);
      }else {
        if(this.joinChatRoomInfo.username === username) {
          alert('자신은 차단 할 수 없습니다.');
        }else {
          this.addBan(username);
        }
      }
      document.getElementsByClassName('user-menu')[0].style.display = 'none';
    },
    closeUserMenu() {
      document.getElementsByClassName('user-menu')[0].style.display = 'none';
    }
  }
}
</script>

<style scoped>
.chat-wrap {
  background-color: white;
}
.chatbox {
  border: 1px solid;
  padding: 5px;
}
@media only screen and (max-width: 800px) {
  .column {
    padding: 0;
  }
  .chatbox {
    padding: 0 0.75rem;
  }
}
.userlist, .banlist {
  display: none;
}
.chatlist, .userlist, .banlist {
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
.user-menu {
  display: none;
  position: absolute;
  background-color: #dedede;
  border: 1px solid ;
  border-radius: 5px;
}
a {
  color: inherit;
}
</style>
