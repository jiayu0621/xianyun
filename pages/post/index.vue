<template>
  
    <div class="container"> 
        <!-- //左侧栏 -->
        <Postleft/>
        
        <Postright />
    </div>
 
</template>

<script>
import Postleft from '@/components/post/postleft.vue'
import Postright from '@/components/post/postright.vue'
export default {
    components:{
        Postleft,
        Postright
    },
  methods:{
    
    
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
    }
</style>    