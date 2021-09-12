<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="manager_account"
        label="账号"
        width="150">
    </el-table-column>
    <el-table-column
        prop="manager_name"
        label="用户名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="manager_email"
        label="邮箱"
        width="250">
    </el-table-column>
    <el-table-column
        prop="manager_power"
        label="权限"
        :formatter="power"
        width="120">
    </el-table-column>
    <el-table-column
        prop="manager_createtime"
        label="创建时间"
        width="180">
    </el-table-column>
    <el-table-column
        label="操作"
        width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" style="color: red!important;"  @click="deleteManagerData(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";
export default {
  name: "user_table",
  methods: {
    power(row, column, cellValue){
      if (cellValue === '0'){
        return '超级管理员'
      }else if(cellValue === '10'){
        return '管理员'
      }else if (cellValue === '20'){
        return '禁用'
      }
    },
    handleClick(row) {
      bus.$emit('showDialog',{dialogFormVisible:true,data:row})
    },
    // 获取表格数据
    getTableData() {
      bus.$on('managerData', (msg) => {
        console.log(msg)
        this.tableData = msg
      })
    },
    // 删除数据
    deleteManagerData(row){
      console.log(row)
      axios.get('/api/delete/delete_manager.php?manager_id='+row.manager_id)
          .then(res=>{
            console.log('删除成功:'+res.data)
            this.$message.warning('删除成功')
            this.$emit('deleteData');
            this.getTableData()
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  created() {
    this.getTableData();
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>
