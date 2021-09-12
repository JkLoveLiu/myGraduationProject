<template>
  <div class="top_right">
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 90px;">
        <el-option label="账号" value="1"></el-option>
        <el-option label="昵称" value="2"></el-option>
        <el-option label="邮箱" value="3"></el-option>
        <el-option label="学校" value="4"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </div>
</template>

<script>
import axios from "axios";
import bus from "@/until/bus";

export default {
  name: "user_top",
  data() {
    return {
      input3: '',
      select: '1'
    }
  },
  methods: {
    search() {
      console.log(this.select);
      console.log(this.input3)
      if (this.input3.length === 0) {
        //  无任何输入
        this.$emit('getAllData');
      } else {
        axios.get('/api/select/select_search.php?name=user&type=' + this.select + '&content=' + this.input3)
            .then(res => {
              console.log(res.data.length)
              bus.$emit('goodsData', res.data);
              bus.$emit('totalPage', res.data.length)
            })
            .catch(err => {
              console.log(err)
            })
      }
    }
  }
}
</script>

<style scoped>

</style>