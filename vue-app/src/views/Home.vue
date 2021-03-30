<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="this.active" left-text="返回" left-arrow>
        <van-icon name="setting" slot="right" />
      </van-nav-bar>
    </van-sticky>
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item name="class" icon="home-o" replace to="/classlist">班课</van-tabbar-item>
      <van-tabbar-item name="find" icon="search" replace to="/find">发现</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" replace to="me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 'class'
    }
  },
  methods: {
    onChange (event) {
      this.setData({ active: event.detail })
    }
  },
  onBack: function () {
    this.$router.back()
  },
  created () {
    this.$router.replace('classlist').catch(err => err)
  }
}
</script>

<style scoped>

</style>
