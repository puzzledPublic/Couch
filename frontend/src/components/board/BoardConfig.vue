<template>
    <div class="box content">
        <div v-if="hasConfig">
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">게시판</label>
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
export default {
  
}
</script>

<style scoped>

</style>
