<template>
  <div>
    <Banner-Component banner="게시판 리스트"/>
    <div class="board-list">  
      <Board-List-Component v-for="(board, index) in boardList" :key="index"
        :name="board.name"
      />
    </div>
  </div>
</template>

<script>
import BoardListComponent from '@/components/board/BoardListComponent';
import BannerComponent from '@/components/board/BannerComponent';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    BoardListComponent,
    BannerComponent
  },
  created() {
    this.getBoardListAction();
  },
  computed: {
    boardList() {
      return this.$store.state.board.boardList;
    }
  },
  methods: {
    ...mapActions([
      'getBoardListAction'
    ]),
  }
}
</script>

<style scoped>
.board-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
