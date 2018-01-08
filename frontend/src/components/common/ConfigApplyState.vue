<template>
    <div>
        <article class="message is-success" v-if="state === 0">
            <div class="message-body has-text-centered">
                <p>승인 대기중입니다.</p>
                <p>(승락까지 하루 정도 소요됩니다.)</p>
            </div>
        </article>
        <article class="message is-danger" v-if="state === 2">
            <div class="message-body has-text-centered">
                <p>승인이 거부됐습니다.</p>
                <p>(방송 목적을 확인해주세요.)</p>
            </div>
        </article>
        <div class="columns is-centered is-mobile" v-if="state === 2">
            <div class="column is-narrow">
                <button class="button is-danger is-outlined" @click="setApplication">신청 다시하기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfigApplyState',
    props: ['state'],
    methods: {
        setApplication() {
            this.$emit('application');
        }
    }
}
</script>

<style scoped>

</style>
