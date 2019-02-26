export default {
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    getUserInfo(){
      this.userInfo = {
        id: '10129',
        name: '小马甲',
        gender: '0',
        pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1810152264,2923293270&fm=27&gp=0.jpg',
      }
      // $.ajax('/users/info', (res)=>{
      //   if (res.return_code == 0) {
      //     // // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
      //     this.userInfo = res.data
      //   } else {
      //     console.log(res.msg);
      //   }
      // })
    },
  },
  mounted () {
    this.getUserInfo();
  }
}