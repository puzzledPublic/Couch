<template>
    <div class="broadcastPage">
        <broadcast-player :username="$route.params.username"></broadcast-player>
        <chat-box></chat-box>
    </div>
</template>

<script>
import broadcastPlayer from '@/components/broadcast/BroadcastPlayer'
import chatBox from '@/components/chat/ChatBox'

export default {
    components: {
        broadcastPlayer: broadcastPlayer,
        chatBox: chatBox,
    }

}
</script>

<style scoped>
.broadcastPage {
    margin-top: 20px;
    padding: 0;
    float: left;
}
</style>
