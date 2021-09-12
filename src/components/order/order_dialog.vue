<template>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <el-form :model="form" :inline=true>
      <el-form-item label="商品 ID" :label-width="formLabelWidth">
        <el-input v-model="form.goods_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="购买者 ID" :label-width="formLabelWidth">
        <el-input v-model="form.goods_buyers" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布者 ID" :label-width="formLabelWidth">
        <el-input v-model="form.goods_announcer" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="购买者状态" :label-width="formLabelWidth">
        <el-select v-model="form.flag_buyers" placeholder="选择状态">
          <el-option label="已确认" value="1"></el-option>
          <el-option label="未确认" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布者状态" :label-width="formLabelWidth">
        <el-select v-model="form.flag_announcer" placeholder="选择状态">
          <el-option label="已确认" value="1"></el-option>
          <el-option label="未确认" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-select v-model="form.order_flag" placeholder="选择状态">
          <el-option label="已完成" value="1"></el-option>
          <el-option label="未完成" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改时间" :label-width="formLabelWidth">
        <el-input v-model="form.updatetime" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateOrderInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";
import qs from "qs";

export default {
  name: "order_dialog",
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
      })
    },
    updateOrderInfo() {
      this.dialogFormVisible = false;
      axios({
        url: '/api/update/update_orderInfo.php',
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
            this.$emit('dialogRefresh')
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