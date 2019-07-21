<template>
  <div class="centainer">
    <el-row type="flex" justify="space-between" class="header">
      <div class="header-yi">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row type="flex" class="header-er">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="header-san" v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <div class="header-si" v-else>
        <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt />
        <span>{{$store.state.user.userInfo.user.nickname}}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handeLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  mounted(){
    // console.log(this.$store.state);
    
  },
  methods:{
    handeLogout(){
      this.$store.commit('user/clearUserInfo')
      
    }
  }
};
</script>
<style lang="less" scoped>
.centainer {
  box-shadow: 0 2px 2px #ddd;
}
.header {
  width: 1000px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}
.header-yi {
  margin-right: 20px;
  img {
    width: 156px;
    height: 42px;
    margin-top: 9px;
  }
}
.header-er {
  flex: 1;
  a {
    display: black;
    padding: 0 20px;
    text-decoration: none;
    box-sizing: border-box;
    color: #000;
    &:hover {
      border-bottom: 5px blue solid;
    }
  }
  .nuxt-link-exact-active {
    background-color: blue;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
.header-si img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  border: 2px blue solid;
  border-radius: 50%;
}
</style>


