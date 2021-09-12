<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="user_account"
        label="账号"
        width="150">
    </el-table-column>
    <el-table-column
        prop="user_name"
        label="昵称"
        width="120">
    </el-table-column>
    <el-table-column
        prop="user_email"
        label="邮箱"
        width="250">
    </el-table-column>
    <el-table-column
        prop="user_school"
        label="学校"
        width="250">
    </el-table-column>
    <el-table-column
        prop="user_createtime"
        label="创建时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="user_status"
        label="状态"
        width="80">
      <template slot-scope="scope">
        <el-switch
            active-value="0"
            inactive-value="10"
            v-model="scope.row.user_status"
            @change="changeSwitch(scope.row,$event)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column
        label="操作"
        width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" style="color: red!important;" @click="deleteUserData(scope.row)">删除</el-button>
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
    handleClick(row) {
      bus.$emit('showDialog', {dialogFormVisible: true, data: row})
    },
    // 获取表格数据
    getTableData() {
      bus.$on('tableData', (msg) => {
        console.log(msg)
        this.tableData = msg
      })
    },
    // 修改开关状态
    changeSwitch(row,event){
      console.log(row.user_id)
      console.log(event)
      axios.get('/api/update/update_userStatus.php?user_id='+row.user_id+'&status='+event)
          .then(res=>{
            console.log('修改成功:'+res.data)
            this.$message.success('修改成功')
          })
          .catch(err=>{
            console.log(err)
          })
    },
  // 删除数据
    deleteUserData(row){
      console.log(row)
      axios.get('/api/delete/delete_user.php?user_id='+row.user_id)
          .then(res=>{
            console.log('删除成功:'+res.data)
            this.$message.warning('删除成功')
            this.$emit('getData');
            this.getTableData()
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  created() {
    this.getTableData()

  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>
