<template>
  <el-table
      :data="tableData"
      max-height="460"
      style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.goods_title }}</span>
          </el-form-item>
          <el-form-item label="商品详情">
            <span>{{ props.row.goods_detail }}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.goods_price }}</span>
          </el-form-item>
          <el-form-item label="商品原价">
            <span>{{ props.row.goods_oldprice }}</span>
          </el-form-item>
          <el-form-item label="学校">
            <span>{{ props.row.goods_school }}</span>
          </el-form-item>
          <el-form-item label="商品发布者">
            <span>{{ props.row.goods_announcer }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.goods_createtime }}</span>
          </el-form-item>
          <el-form-item label="修改时间">
            <span>{{ props.row.goods_updatetime }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
        label="商品 ID"
        prop="goods_id">
    </el-table-column>
    <el-table-column
        label="商品名称"
        prop="goods_title">
    </el-table-column>
    <el-table-column
        label="商品分类"
        :formatter="category"
        prop="goods_category">
    </el-table-column>
    <el-table-column
        label="学校"
        prop="goods_school">
    </el-table-column>
    <el-table-column
        prop="goods_status"
        label="状态"
        :formatter="status"
        width="100">
    </el-table-column>
    <el-table-column
        label="发布时间"
        prop="goods_createtime">
    </el-table-column>
    <el-table-column
        label="操作"
        width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" style="color: red!important;" @click="deleteGoods(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";

export default {
  name: 'goods_table',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    deleteGoods(row){
      console.log(row)
      axios.get('/api/delete/delete_goods.php?goods_id='+row.goods_id)
          .then(res=>{
            console.log('删除成功:'+res.data)
            this.$message.warning('删除成功')
            this.$emit('getAllData');
            this.getTableData()
          })
          .catch(err=>{
            console.log(err)
          })
    },
    handleClick(row) {
      bus.$emit('showDialog', {dialogFormVisible: true, data: row})
    },
    // 获取表格数据
    getTableData() {
      bus.$on('goodsData', (msg) => {
        console.log(msg)
        this.tableData = msg
      })
    },
    // 状态过滤
    status(row, column, cellValue){
      if (cellValue === '10') {
        return '出售中'
      } else if (cellValue === '20') {
        return '已下架'
      } else if (cellValue === '30') {
        return '已卖出'
      } else if (cellValue === '40') {
        return '已完成'
      }
    },
    category(row, column, cellValue){
      if (cellValue === '10') {
        return '体育用品'
      } else if (cellValue === '20') {
        return '生活用品'
      } else if (cellValue === '30') {
        return '电子数码'
      } else if (cellValue === '40') {
        return '化妆用品'
      } else if (cellValue === '50') {
        return '图书资料'
      } else if (cellValue === '60') {
        return '衣服鞋子'
      } else if (cellValue === '70') {
        return '二手车辆'
      } else if (cellValue === '80') {
        return '其他类别'
      }
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
