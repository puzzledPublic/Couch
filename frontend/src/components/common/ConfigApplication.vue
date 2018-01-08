<template>
    <div>
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
                        <textarea class="textarea" placeholder="방송 목적을 입력해주세요." v-model="content"></textarea>
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
</template>

<script>
import {mapActions} from 'vuex'


export default {
    name: 'ConfigApplication',
    props: ['configType'],
    data() {
        return {
            content: null,
        }
    },
    methods: {
        ...mapActions([
            'sendBroadcastApplicationAction'
        ]),
        async sendBroadcastApplication() {
            const result = await this.sendBroadcastApplicationAction({
                content: this.content,
                configType: this.configType
            });
            if(result) {
                this.$emit('sendApplication');
            }else {
                alert('신청 오류');
            }
        }
    }
}
</script>

<style scoped>

</style>

