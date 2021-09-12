<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="order_id"
        label="订单 ID">
    </el-table-column>
    <el-table-column
        prop="goods_id"
        label="商品 ID">
    </el-table-column>
    <el-table-column
        prop="goods_buyers"
        label="购买者 ID">
    </el-table-column>
    <el-table-column
        prop="goods_announcer"
        label="发布者 ID">
    </el-table-column>
    <el-table-column
        prop="createtime"
        label="创建时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="updatetime"
        label="修改时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="flag_buyers"
        :formatter="status"
        label="购买者状态">
    </el-table-column>
    <el-table-column
        prop="flag_announcer"
        :formatter="status"
        label="发布者状态">
    </el-table-column>
    <el-table-column
        prop="order_flag"
        :formatter="orderFlag"
        label="状态">
    </el-table-column>
    <el-table-column
        flex="right"
        label="操作"
        width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" style="color: red!important;" @click="deleteOrder(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";
export default {
  name: "order_table",
  methods: {
    handleClick(row) {
      bus.$emit('showDialog',{dialogFormVisible:true,data:row})
    },
    deleteOrder(row){
      console.log(row)
      axios.get('/api/delete/delete_order.php?order_id='+row.order_id)
          .then(res=>{
            console.log('删除成功:'+res.data)
            this.$message.warning('删除成功')
            this.$emit('tableRefresh');
            this.getTableData()
          })
          .catch(err=>{
            console.log(err)
          })
    },
    // 过滤器，状态修改
    status(row, column, cellValue){
      if (cellValue === '0'){
        return '未确认'
      }else {
        return '确认'
      }
    },
    orderFlag(row, column, cellValue){
      if (cellValue === '0'){
        return '未完成'
      }else {
        return '完成'
      }
    },
    // 获取表格数据
    getTableData() {
      bus.$on('orderData', (msg) => {
        this.tableData = msg
      })
    },
  },
  created() {
    this.getTableData()
  },
  data() {
    return {
      tableData: []
    }
  },

}
</script>
