<template>
  <div class="column is-2 broadcast-menu">
    <aside class="menu">
      <p class="menu-label has-text-centered has-text-weight-bold">
        메뉴
      </p>
      <ul class="menu-list">
        <li >
            신청 리스트
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.menu {
  position: sticky;
  top: 0;
}
.menu-label {
  background-color: royalblue;
  color: white;
}
.menu-list > li > a.is-active {
  background-color: lightgrey;
  color: #4a4a4a;
}
</style>
