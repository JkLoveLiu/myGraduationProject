<template>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户账号" :label-width="formLabelWidth">
        <el-input v-model="form.user_account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="form.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.user_email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户学校" :label-width="formLabelWidth">
        <el-input v-model="form.user_school" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateUserData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/until/bus";
import axios from "axios";
import qs from "qs";

export default {
  name: "user_dialog",
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
    updateUserData() {
      this.dialogFormVisible = false;
      axios({
        url: '/api/update/update_userInfo.php',
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