<template>
    <div class="box content">
        <div v-if="hasConfig">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">접근 허용</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="config.readLevel">
                                    <option :value="0">
                                        모두에게
                                    </option>
                                    <option :value="1">
                                        회원만
                                    </option>
                                    <option :value="2">
                                        금지
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">글 쓰기 허용</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="config.writeLevel">
                                    <option :value="0">
                                        모두에게
                                    </option>
                                    <option :value="1">회원만</option>
                                    <option :value="2">금지</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">댓글 허용</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="config.commentLevel">
                                    <option :value="0">
                                        모두에게
                                    </option>
                                    <option :value="1">회원만</option>
                                    <option :value="2">금지</option>
                                </select>
                            </div>
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
                            <button class="button is-link is-outlined" @click="sendBoardConfig">저장하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!hasConfig && !application.isExist">
            <Config-Application v-on:sendApplication="sendBroadcastApplication" configType="board"></Config-Application>
        </div>

        <div v-if="application.isExist">
            <Config-Apply-State v-on:application="setApplication" :state="application.state"></Config-Apply-State>
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'
import ConfigApplication from '@/components/common/ConfigApplication'
import ConfigApplyState from '@/components/common/ConfigApplyState'

export default {
    data() {
        return {
            hasConfig: false,
            config: {
                readLevel: '0',
                writeLevel: '0',
                commentLevel: '0'
            },
            application: {
                isExist: false,
                state: null,
            }
        }
    },
    components: {
        'Config-Apply-State': ConfigApplyState,
        'Config-Application': ConfigApplication
    },
    async created() {
        const {boardInfo, applicationInfo} = await this.getBoardConfigAction();
        if(applicationInfo) {
            this.application.isExist = applicationInfo.isExist;
            this.application.state = applicationInfo.state;
            this.hasConfig = false;
        }else {
            this.config.readLevel = boardInfo.read_level;
            this.config.writeLevel = boardInfo.write_level;
            this.config.commentLevel = boardInfo.comment_level;
            this.hasConfig = true;
        }
    },
    methods: {
        ...mapActions([
            'getBoardConfigAction',
            'setBoardConfigAction'
        ]),
        async sendBoardConfig() {
            for(let i in this.config) {
                this.config[i] = parseInt(this.config[i]);
            }
            const result = await this.setBoardConfigAction(this.config);
        },
        sendBroadcastApplication() {
            this.application.isExist = true;
            this.application.state = 0;
        },
        setApplication() {
            this.application.isExist = false;
            this.application.state = -1;
        },
    }
}
</script>

<style scoped>

</style>
