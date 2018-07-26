<template>
    <div class="warp h100 w100 pr">
        
            <img src="../assets/login.jpg" alt="">
        
        <div class="x-y-center register">
            <h1>注册</h1>
            <ul class="uls  flex-column-between white">
                <!-- <li class="flex-between"><span>姓名</span><input v-model="name" placeholder="请输入姓名" type="text"></li>
                <li class="flex-between"><span>密码</span><input v-model="pwd" placeholder="密码" type="number"></li> -->
                <li  @click="submits()" class="submit">点击注册</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name : 'login',
    data () {
        return {
            name : null,
            pwd : null
        }
    },
    created () {
    },
    methods : {
        submits () {
            let data = {
                    name : 'yryyr' ,
                    pwd : '8437294274',
                };
            data = JSON.stringify(data);
            console.log(data);
            this.$http({
               
                method : 'post',
                url : '/login',
                data : data
            }).then(res=> {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>

    .warp  img   {
        height: 100%;
        width: 100%;
    }
    .uls {
     
        line-height: 50px;
    }
    .register {
        width: 55%;
    }
    .submit {

        background-color: orange;
        border-radius: 10px;
    }
    input {
        outline: none;
        height: 25px;;
        border-radius: 2px;
        text-indent: 10px;
    }
</style>
