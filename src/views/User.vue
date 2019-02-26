<template>
  <div class='app-container'>
    <img
      :src="users.pic"
      class="user-pic"
      alt="加载失败"
    />
    <div class="user-name">{{users.name}}</div>
    <x-button
      size="default"
      color="primary"
      @on-click="updateUserInfo()"
    >
      <x-icon icon="search"></x-icon>
      搜索
    </x-button>
  </div>
</template>
<script>
import xIcon from '../components/x-icon/x-icon';
import xButton from '../components/x-button/x-button';
  export default {
    data () {
      return {
        users: {}
      }
    },
    inject: ['app'],
    methods: {
      updateUserInfo () {
        this.users = {
          id: '10129',
          name: '**小马甲**',
          gender: '0',
          pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=782046930,1105099424&fm=27&gp=0.jpg',
        }
        // $.ajax('/users/update', ()=>{
        //   // ... 
        //   // 这里修改完用户数据后，通知 app.vue 更新
        //   this.app.getUserInfo()
        // })
      }
    },
    mounted() {
      this.users = this.app.userInfo
    },
    components: {
      xButton,
      xIcon
    }
  }
</script>
<style lang='less' scoped>
.user-pic {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.user-name {
  font-size: 16px;
  line-height: 1;
  padding: 10px 0;
}
</style>
