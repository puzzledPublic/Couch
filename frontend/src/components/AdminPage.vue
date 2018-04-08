<template>
    <section class="container wrap">
        <div class="columns main-wrap">
            <Admin-Sidebar></Admin-Sidebar>
            <div class="column is-10 broadcast-list">
                <router-view></router-view>
            </div>
        </div>  
    </section>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar';

export default {
  components: {
      AdminSidebar
  }
}
</script>

<style scoped>

.wrap {
  height: 90%;
}
.main-wrap {
  height: 97%;
}
.broadcast-list,
.broadcast-menu,
.free-board {
  background-color: white;
}
.broadcast-list {
  overflow-y: auto;
}

@media screen and (min-width: 960px) {
  .main-wrap {
    padding: 0 20px 0 10px;
  }
  .broadcast-menu {
    margin-right: 10px;
  }
  .dropdown {
    display: block;
  }
}
@media screen and (max-width: 960px) {
  .broadcast-menu {
    display: none;
  }
  .broadcast-list {
    overflow-y: unset;
  }
}
.dropdown {
  display: none;
}
</style>
