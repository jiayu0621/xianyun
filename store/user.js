
export const state = ()=>{
    return{
    userInfo:{
        token:"",
        user:{}
    // user:JSON.parse(localStorage.getItem("userInfo")||`{}`)
    }
}
}
export const mutations = {
        setUserInfo(state,data){
            state.userInfo=data
            // localStorage.setItem('userInfo',JSON.stringify(data))
        },
        // 清空用户数据
        clearUserInfo(state){
            state.userInfo={
                user:{},
                token:''
            }
        }
}
export const actions={
        login(store,data){
           return this.$axios({
                url: "/accounts/login",
                method: "POST",
                data
            }).then(res=>{
                store.commit('setUserInfo', res.data)
                
            })
        },
        sendCode(store,phoneNumber){
            return this.$axios({
                 url:'/captchas',
                 method:'POST',
                 data:{
                     tel:phoneNumber
                 }
             }).then(res=>{
               //   console.log(res);
               const {code} = res.data
                
                 return code
             })
         }
}

