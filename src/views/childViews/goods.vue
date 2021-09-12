<template>
  <div class="goods">
    <goods_top ref="goodsTop" @getAllDataTop="getAllData"></goods_top>
    <div class="user_table">
      <goods_table ref="goodsTable" @getAllData="getAllData"></goods_table>
    </div>
    <goods_pagination ref="pagination"></goods_pagination>
    <goods_dialog ref="goodsDialog"></goods_dialog>
  </div>
</template>

<script>
import goods_table from "@/components/goods/goods_table";
import goods_dialog from "@/components/goods/goods_dialog";
import goods_top from "@/components/goods/goods_top";
import goods_pagination from "@/components/goods/goods_pagination";
import axios from "axios";
import router from "@/router";

export default {
  name: "goods",
  methods: {
    getAllData() {
      this.$refs.pagination.getData(1);
      this.$refs.pagination.getTotalPage();
      this.$refs.pagination.currentPage = 1;
      this.$refs.goodsTable.getTableData()
    },
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
    }
  },
  created() {
    this.isLog()
  },
  data() {
    return {}
  },
  components: {
    goods_table,
    goods_dialog,
    goods_top,
    goods_pagination
  }
}
</script>

<style scoped lang="scss">
.goods {
  height: 100%;
  width: 100%;

  .top {
    height: 40px;
    padding-top: 15px;
    margin-left: 15px;
    display: flex;

    .top_right {
    }
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