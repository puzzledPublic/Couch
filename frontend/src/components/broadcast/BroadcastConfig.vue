<template>
    <div class="box content">
        <div v-if="hasConfig">
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">방송제목</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="방송제목을 입력해주세요..." v-model="broadcastConfig.roomname">
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">방송유형</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="broadcastConfig.typeNum">
                                <option v-for="(option, index) in typeList" v-bind:value="index" :key="index" v-if="index !== 0">
                                    {{option}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">리스트 노출</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="member" value="true" v-model="broadcastConfig.show">
                            Yes
                        </label>
                        <label class="radio">
                            <input type="radio" name="member" value="false" v-model="broadcastConfig.show">
                            No
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">스트림 키</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" v-model="broadcastConfig.streamkey" disabled>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <!-- Left empty for spacing -->
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <button class="button is-primary" @click="sendBroadcastConfig">저장하기</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div v-if="!hasConfig && !application.isExist">
            <article class="message is-link">
                <div class="message-body has-text-centered">
                    <p>방송을 하시려면 신청해주십시오.</p>
                    <p>(승락까지 하루 정도 소요됩니다.)</p>
                </div>
            </article>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">방송 목적</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" placeholder="방송 목적을 입력해주세요." v-model="applicationContent"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <!-- Left empty for spacing -->
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <button class="button is-link is-outlined" @click="sendBroadcastApplication">신청하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="application.isExist">
            <article class="message is-link" v-if="application.state === 0">
                <div class="message-body has-text-centered" v-if="application.state === 0">
                    <p>승인 대기중입니다.</p>
                    <p>(승락까지 하루 정도 소요됩니다.)</p>
                </div>
            </article>
            <article class="message is-link" v-if="application.state === 2">
                <div class="message-body has-text-centered">
                    <p>승인이 거부됐습니다.</p>
                    <p>(방송 목적을 확인해주세요.)</p>
                </div>
            </article>
        </div>
    </div>      
</template>

<script>
import { mapActions } from "vuex";
import { typeListKOR } from "@/api/util/broadcastTypeList";

export default {
  data() {
    return {
      typeList: typeListKOR,
      hasConfig: false,
      application: {
          isExist: false,
          state: null,
      },
      applicationContent: null,
    };
  },
  async created() {
    const applicationInfo = await this.getBroadcastConfigAction();
    if(applicationInfo) {
        this.application.isExist = applicationInfo.isExist;
        this.application.state = applicationInfo.state;
    }else {
        this.hasConfig = true;
    }
  },
  mounted() {
    this.$eventBus.$on("logout", this.whenLogout);
  },
  beforeDestroy() {
    this.$eventBus.$off("logout", this.whenLogout);
  },
  computed: {
    broadcastConfig() {
      return this.$store.state.broadcast.broadcastConfig;
    },
    broadcastResponseStatus() {
      return this.$store.state.broadcast.responseStatus;
    }
  },
  methods: {
    ...mapActions([
        'getBroadcastConfigAction',
        'setBroadcastConfigAction',
        'sendBroadcastApplicationAction'
    ]),
    async sendBroadcastConfig() {
      await this.setBroadcastConfigAction({
        username: this.$store.state.auth.userInfo.username,
        show: this.broadcastConfig.show,
        roomname: this.broadcastConfig.roomname,
        typeNum: this.broadcastConfig.typeNum
      });
      switch (this.broadcastResponseStatus) {
        case 403:
          alert("세션이 만료됐습니다.");
          this.$router.replace("/");
          break;
        case 400:
          alert("저장에 실패했습니다.\n 다시 시도해주세요.");
          break;
        default:
          this.$router.replace("/");
          break;
      }
    },
    async sendBroadcastApplication() {
        const result = await this.sendBroadcastApplicationAction(this.applicationContent);
        if(result) {
            this.application.isExist = true;
            this.application.state = 0;
        }else {
            alert('신청 오류');
        }
    },
    whenLogout() {
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
.broadcastConfig {
  margin-top: 20px;
  padding: 0;
  margin-left: 1px;
  margin-right: 1px;
}
.box {
  background-color: #fff;
}
</style>
