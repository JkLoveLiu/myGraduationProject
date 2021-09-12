<template>
  <div class="top">
    <div class="top_right">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 90px;">
          <el-option label="学校" value="1"></el-option>
          <el-option label="商品 ID" value="2"></el-option>
          <el-option label="商品名称" value="3"></el-option>
          <el-option label="商品分类" value="4"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bus from "@/until/bus";

export default {
  name: "goods_top",
  data() {
    return {
      select: '1',
      input3: ''
    }
  },
  methods:{
    search() {
      console.log(this.select);
      console.log(this.input3)
      if (this.input3.length === 0) {
        //  无任何输入
        this.$emit('getAllDataTop');
      } else {
        axios.get('/api/select/select_search.php?name=goods&type=' + this.select + '&content=' + this.input3)
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

<style scoped lang="scss">
.top {
  height: 40px;
  padding-top: 15px;
  margin-left: 15px;
  display: flex;

  .top_right {
  }
}
</style>