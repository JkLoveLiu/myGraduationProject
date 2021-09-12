<template>
  <div class="user">
    <div class="top">
      <user_top @getAllData="getAllData"></user_top>
    </div>
    <!--  表格组件  -->
    <div class="user_table">
      <user_table @getData="getData"></user_table>
    </div>
    <!--  分页功能  -->
    <div class="block">
      <pagination ref="getTableData"></pagination>
    </div>
    <!--  对话框  -->
    <user_dialog></user_dialog>
  </div>
</template>

<script>
import user_dialog from "@/components/user/user_dialog";
import user_table from "@/components/user/user_table";
import user_top from "@/components/user/user_top";
import pagination from "@/components/user/user_pagination";
import axios from "axios";
import router from "@/router";

export default {
  name: "user",
  components: {
    user_table,
    user_dialog,
    user_top,
    pagination
  },
  data() {
    return {}
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
    getData() {
      this.$refs.getTableData.getData(1)
      this.$refs.getTableData.changeCurrentPage(1);
    },
    getAllData() {
      this.$refs.getTableData.getData(1)
      this.$refs.getTableData.changeCurrentPage(1);
      this.$refs.getTableData.getTotalPage();
    }
  },
  created() {
    this.isLog()
  }
}
</script>

<style scoped lang="scss">
.user {
  height: 100%;
  width: 100%;

  .top {
    height: 40px;
    padding-top: 15px;
    margin-left: 15px;
    display: flex;
  }

  .user_table {
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