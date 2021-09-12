<template>
  <div class="top">
    <div class="top_right">
      <el-input placeholder="请输入内容" v-model="input3" className="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 120px;">
          <el-option label="订单 ID" value="1"></el-option>
          <el-option label="商品 ID" value="2"></el-option>
          <el-option label="购买者　ID" value="3"></el-option>
          <el-option label="发布者　ID" value="4"></el-option>
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
  name: "order_top",
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
        this.$emit('getAllOrderData');
      } else {
        axios.get('/api/select/select_search.php?name=order&type=' + this.select + '&content=' + this.input3)
            .then(res => {
              bus.$emit('orderData', res.data);
              bus.$emit('totalPage', 1)
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

}
</style>