<template>
  <div class="updatepwd">
    <el-form
        :model="ruleForm"
        status-icon :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
        class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="ruleForm.oldPwd" autocomplete="off" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width: 350px"
                  show-password="show-password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width: 350px"
                  show-password="show-password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "updatepwd",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userId: '',
      ruleForm: {
        oldPwd: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPwd: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    isLog() {
      axios.get('/api/log/islog.php')
          .then(res => {
            if (res.data !== 11) {
              router.push({path: '/'})
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    getId() {
      axios.get('/api/log/getInfo.php?type=id')
          .then(res => {
            this.userId = res.data;
          })
          .catch(err => {
            console.log(err)
          })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功后执行
          if (this.ruleForm.oldPwd === this.ruleForm.pass) {
            this.$message.error('错误，新密码不能与旧密码相同')
          } else {
            axios.get('/api/update/updatePwd.php?id=' + this.userId + '&oldPwd='
                + this.ruleForm.oldPwd + '&newPwd=' + this.ruleForm.pass)
            .then(res=>{
                if (res.data === 10){
                  this.$message.success('密码修改成功，即将重新登录')
                  setTimeout(()=>{
                    router.push({path: '/'})
                  },1500)
                }else {
                  this.$message.error('原密码错误，请重新尝试')
                }
            })
            .catch((err=>{
              console.log(err)
            }))
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.isLog()
    this.getId()
  }
}
</script>

<style scoped lang="scss">
.updatepwd {
  padding-top: 15px;
  margin-left: 15px;
}
</style>