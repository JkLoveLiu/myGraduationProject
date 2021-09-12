<template>
  <div class="order">
    <order_top ref="orderTop" @getAllOrderData="getAllOrderData"></order_top>
    <div class="user_table">
      <order_table ref="orderTable" @tableRefresh="getAllOrderData"></order_table>
    </div>
    <order_pagination ref="orderPagination"></order_pagination>
    <order_dialog ref="orderDialog" @dialogRefresh="getAllOrderData"></order_dialog>
  </div>
</template>

<script>
import order_table from "@/components/order/order_table";
import order_dialog from "@/components/order/order_dialog";
import order_pagination from "@/components/order/order_pagination";
import order_top from "@/components/order/order_top";
import axios from "axios";
import router from "@/router";

export default {
  name: "order",
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
    getAllOrderData() {
      this.$refs.orderPagination.getData(1);
      this.$refs.orderPagination.getTotalPage();
      this.$refs.orderPagination.currentPage = 1;
      this.$refs.orderTable.getTableData()
    },

  },
  created() {
    this.isLog()
  },
  components: {
    order_table,
    order_dialog,
    order_top,
    order_pagination
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.order {
  height: 100%;
  width: 100%;

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