<template>
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form">
      <el-form-item label="管理员账号" :label-width="formLabelWidth">
        <el-input v-model="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="addManager">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import axios from "axios";
import qs from "qs";

export default {
  name: "add_manager",
  props: ['dialogFormVisible'],
  data() {
    return {
      dialogHide: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    hideDialog() {
      this.$emit('hideDialog', this.dialogHide);
    },
    addManager() {
      this.hideDialog();
      let data = qs.stringify(this.form);
      axios({
        url: '/api/insert/insert_manager.php',
        method: 'post',
        // 数据格式
        data: data,
        // 修改请求头，防止后端接收不到数据
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
          .then(res => {
            this.form = {}
            if (res.data === 20){
              this.$message.error('账号已存在，添加失败')
            }else {
              this.$message.success('添加成功');
              this.$emit('addData')
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped lang="scss">
.addManager {

}
</style>