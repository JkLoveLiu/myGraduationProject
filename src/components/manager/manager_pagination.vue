<template>
  <div class="block">
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="7"
        layout="total , prev, pager, next, jumper"
        :total="totalPage"
        background
        :hide-on-single-page="true">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import bus from "@/until/bus";

export default {
  name: "manager_pagination",
  data() {
    return {
      // 总数
      totalPage: 7,
      // 默认打开的页
      currentPage: 1,
    };
  },
  methods: {
    handleCurrentChange(val) {
      // 改变页数时触发
      console.log(`当前页: ${val}`);
      bus.$emit('nowPage',val)
      this.getData(val)
    },
    // 获取数据总长度
    getTotalPage(){
      axios.get('/api/select/select_totalpage.php?name=manager_user')
          .then(res=>{
            this.totalPage = res.data;
          })
          .catch(err=>{
            console.log(err)
          })
    },
    // 数据总长度发生改变
    changeTotalPage(){
      bus.$on('totalPage',(msg)=>{
        this.totalPage = msg;
      })
    },
    // 获取数据
    getData(nowPage){
      axios.get('/api/select/select_getManagerData.php?pageNum='+nowPage)
          .then(res=>{
            bus.$emit('managerData',res.data)
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  created() {
    this.getTotalPage();
    this.getData(this.currentPage);
    this.changeTotalPage();
  }

}
</script>

<style scoped lang="scss">
.block {
  margin-top: 10px;
  margin-left: 10px;
}
</style>