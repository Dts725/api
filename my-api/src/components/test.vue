<template>
  <div>
    <ul class="uls" >
      <li class="item" @click="add()">{{lis[0]}}</li>
      <li class="item">{{lis[1]}}</li>
      <li class="item">{{lis[2]}}</li>
      <li class="item">{{lis[3]}}</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            lis: ["增加", "删除", "查找", "修改"]
        };
    },
    created () {

    },
    mounted () {

    },
    methods : {
      add () {
          axios({
              method : 'GET',
              url : '/login',
          }).then(res => {
              console.log(res);
              console.log('测试成功了');
          }).catch(err => {
              console.log(err);
          })
      }
    }
};
</script>
<style slot-scope="scoped">
* {
    margin: 0;
    padding: 0;
}
.uls {
    margin-top: 50px;
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.item {
    padding: 10px 20px;
    background-color: orange;
    border-radius: 5px;
    cursor: pointer;
}
</style>