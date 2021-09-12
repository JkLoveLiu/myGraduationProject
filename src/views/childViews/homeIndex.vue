<template>
  <div class="homeIndex">
    <el-carousel indicator-position="outside" height="500px">
      <el-carousel-item v-for="(item,key) in imgUrl" :key="key">
        <img :src="item" alt="" height="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>


import axios from "axios";
import router from "@/router";

export default {
  name: 'homeIndex',
  data() {
    return {
      imgUrl: [
        'http://139.196.55.163:808/indexImg/1.png',
        'http://139.196.55.163:808/indexImg/2.png',
        'http://139.196.55.163:808/indexImg/3.png',
        'http://139.196.55.163:808/indexImg/4.png',
        'http://139.196.55.163:808/indexImg/5.png'
      ]
    }
  },
  methods: {
    isLog() {
      axios.get('/api/log/islog.php')
          .then(res => {
            if (res.data !== 11) {
              router.push({path: '/'})
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  created() {
    this.isLog()
  }
}
</script>


<style>
.homeIndex {
  width: 500px;
  padding-top: 50px;
  margin: 0 auto;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>