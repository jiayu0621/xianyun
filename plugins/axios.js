import {Message} from 'element-ui'
export default ({$axios,redirect })=>{
    // console.log(nuxt,123);
    $axios.onError(err=>{
        console.log(err.response.data);
        const {message,statusCode}=err.response.data
        if(statusCode===400){
            Message.warning(message)
        }
        if(statusCode===401||statusCode===403){
            redirect('/user/login')
        }
    })
    
}
