<template>
  <div class="manager">
    <div class="top">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="showAddDialog">添加</el-button>
      <div class="top_right">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 90px;">
            <el-option label="账号" value="1"></el-option>
            <el-option label="邮箱" value="2"></el-option>
            <el-option label="用户名" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="manager_table">
      <manager_table @deleteData="updateAllData"></manager_table>
    </div>
    <manager_pagination ref="managerPagination"></manager_pagination>
    <manager_dialog></manager_dialog>
    <add_manager :dialogFormVisible="dialogFormVisible" @hideDialog="hideDialog" @addData="updateAllData"></add_manager>
  </div>
</template>

<script>
import manager_table from "@/components/manager/manager_table";
import manager_dialog from "@/components/manager/manager_dialog";
import add_manager from "@/components/manager/add_manager";
import manager_pagination from "@/components/manager/manager_pagination";
import axios from "axios";
import bus from "@/until/bus";
import router from "@/router";

export default {
  name: "manager",
  components: {
    manager_table,
    manager_dialog,
    add_manager,
    manager_pagination
  },
  data() {
    return {
      input3: '',
      select: '1',
      dialogFormVisible: false,
    }
  },
  created() {
    this.isLog()
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
    updateAllData() {
      this.$refs.managerPagination.getData(1);
      this.$refs.managerPagination.getTotalPage();
      this.$refs.managerPagination.currentPage = 1;
    },
    showAddDialog() {
      this.dialogFormVisible = true;
    },
    hideDialog(backData) {
      this.dialogFormVisible = backData;
    },
    search() {
      console.log(this.select);
      console.log(this.input3)
      if (this.input3.length === 0) {
        //  无任何输入
        this.$refs.managerPagination.getData(1);
        this.$refs.managerPagination.getTotalPage();
      } else {
        axios.get('/api/select/select_search.php?name=manager&type=' + this.select + '&content=' + this.input3)
            .then(res => {
              console.log(res.data.length)
              bus.$emit('managerData', res.data);
              bus.$emit('totalPage', res.data.length)
            })
            .catch(err => {
              console.log(err)
            })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.manager {
  height: 100%;
  width: 100%;

  .top {
    height: 40px;
    padding-top: 15px;
    margin-left: 15px;
    display: flex;

    .top_right {
      margin-left: 25px;
    }
  }

  .manager_table {
    padding-top: 15px;
    margin-left: 15px;
  }
}


.el-select .el-input {
  width: 330px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>