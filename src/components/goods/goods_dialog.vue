<template>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <el-form :model="form" :inline=true>
      <el-form-item label="商品 ID" :label-width="formLabelWidth">
        <el-input v-model="form.goods_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品标题" :label-width="formLabelWidth">
        <el-input v-model="form.goods_title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍" :label-width="formLabelWidth">
        <el-input v-model="form.goods_detail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品位置" :label-width="formLabelWidth">
        <el-input v-model="form.goods_school" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" :label-width="formLabelWidth">
        <el-input v-model="form.goods_price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品原价格" :label-width="formLabelWidth">
        <el-input v-model="form.goods_oldprice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" :label-width="formLabelWidth">
        <el-select v-model="form.goods_category" placeholder="选择商品类别">
          <el-option label="体育用品" value="10"></el-option>
          <el-option label="生活用品" value="20"></el-option>
          <el-option label="电子数码" value="30"></el-option>
          <el-option label="化妆用品" value="40"></el-option>
          <el-option label="图书资料" value="50"></el-option>
          <el-option label="衣服鞋子" value="60"></el-option>
          <el-option label="二手车辆" value="70"></el-option>
          <el-option label="其他类别" value="80"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" :label-width="formLabelWidth">
        <el-input v-model="form.goods_createtime" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="修改时间" :label-width="formLabelWidth">
        <el-input v-model="form.goods_updatetime" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品状态" :label-width="formLabelWidth">
        <el-select v-model="form.goods_status" placeholder="选择商品状态">
          <el-option label="出售中" value="10"></el-option>
          <el-option label="已下架" value="20"></el-option>
          <el-option label="已卖出" value="30"></el-option>
          <el-option label="已完成" value="40"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布者 ID" :label-width="formLabelWidth">
        <el-input v-model="form.goods_announcer" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateGoodsInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";
import qs from "qs";

export default {
  name: "goods_dialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getUserTableData()
  },
  methods: {
    getUserTableData() {
      bus.$on('showDialog', (data) => {
        this.dialogFormVisible = data.dialogFormVisible;
        this.form = data.data;
        console.log(this.form)
      })
    },
    updateGoodsInfo(){
      this.dialogFormVisible = false;
      axios({
        url: '/api/update/update_goodsInfo.php',
        method: 'post',
        // 数据格式
        data: qs.stringify(this.form),
        // 修改请求头，防止后端接收不到数据
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>