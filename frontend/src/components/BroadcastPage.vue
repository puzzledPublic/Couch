<template>
    <div class="broadcastPage columns">
        <broadcast-player :username="$route.params.username"></broadcast-player>
        <chat-box :roomname="$route.params.username"></chat-box>
    </div>
</template>

<script>
import broadcastPlayer from '@/components/broadcast/BroadcastPlayer'
import chatBox from '@/components/chat/ChatBox'

export default {
    components: {
        broadcastPlayer: broadcastPlayer,
        chatBox: chatBox,
    },
}
</script>

<style scoped>
.broadcastPage {
    margin: 20px 1px 0px 1px;
    padding: 0;
    border-top: 3px solid royalblue;
}
@media only screen and (max-width:800px) {
    .broadcastPage {
        margin-top: 0;
    }
}
</style>
