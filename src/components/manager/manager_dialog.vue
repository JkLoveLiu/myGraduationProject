<template>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="管理员账号" :label-width="formLabelWidth">
        <el-input v-model="form.manager_account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员名称" :label-width="formLabelWidth">
        <el-input v-model="form.manager_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.manager_email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员权限" :label-width="formLabelWidth">
        <el-select v-model="form.manager_power" placeholder="选择管理员权限">
          <el-option label="超级管理员" value="0"></el-option>
          <el-option label="管理员" value="10"></el-option>
          <el-option label="禁用" value="20"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateManagerInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";
import qs from "qs";

export default {
  name: "manager_dialog",
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
    updateManagerInfo() {
      this.dialogFormVisible = false;
      axios({
        url: '/api/update/update_managerInfo.php',
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