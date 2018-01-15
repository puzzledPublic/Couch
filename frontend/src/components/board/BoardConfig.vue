<template>
    <div class="box content">
        <div>
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
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            config: {
                readLevel: '0',
                writeLevel: '0',
                commentLevel: '0'
            }
        }
    },
    methods: {
        ...mapActions([
            'setBoardConfigAction'
        ]),
        async sendBoardConfig() {
            for(i in this.config) {
                this.config[i] = parseInt(this.config[i]);
            }
            const result = await this.setBoardConfigAction(this.config);
        }
    }
}
</script>

<style scoped>

</style>
