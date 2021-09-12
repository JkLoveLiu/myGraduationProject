<template>
  <div class="admin">
    <el-container>
      <el-aside width="auto">
        <div style="height: 60px;position: relative;overflow: hidden">
          <img src="../assets/xiaoyi-logo.png" style="float: left;width: 40px;position: absolute;left:11px;top: 9px"
               alt="">
          <img src="../assets/logo-sidebar.png"
               style="display:inline-block;position: absolute;left: 75px;top: 17px;width: 50%" alt=""
               v-show="!isCollapse">
        </div>
        <div style="height: calc(100vh - 93px);overflow: hidden">
          <el-menu class="el-menu-vertical-demo"
                   :default-active="defNavActive"
                   @select="navSelect"
                   :unique-opened="true"
                   :collapse="isCollapse">
            <el-menu-item index="1-1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item index="2-1">商城用户</el-menu-item>
              <el-menu-item index="2-2" v-if="userPower">管理员用户</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span slot="title">商品管理</span>
              </template>
              <el-menu-item index="3-1">商品管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span slot="title">订单管理</span>
              </template>
              <el-menu-item index="4-1">订单管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header style="position: relative">
          <div style="position: absolute;left: 7px;top: 10px;
                            font-size: 30px;line-height: 40px;text-align: center;display:
                            inline-block;height: 40px;width: 40px;cursor: pointer"
               @click="isCollapse = !isCollapse">
            <i :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'"></i>
          </div>
          <!--  头部右边标签  -->
          <el-menu :default-active="activeIndex"
                   style="width: 115px;float: right;"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect">
            <el-submenu index="1">
              <template slot="title"> {{ userName }}</template>
              <el-menu-item index="1" style="text-align: center">修改密码</el-menu-item>
              <hr style="width: 120px;margin: 0 auto">
              <el-menu-item index="2" style="text-align: center" @click="exitLog">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-main style="position: relative">
          <div id="main-top">
            <el-tabs v-model="editableTabsValue"
                     type="card"
                     closable
                     @tab-click="clickTab"
                     @tab-remove="removeTab">
              <el-tab-pane
                  v-for="item in editableTabs"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name">
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="templateWindow">
            <!--      组件放在这      -->
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <footer class="bottom_footer">版权信息 © 个人</footer>
  </div>
</template>

<script>

import router from "@/router";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      // 路由获取的数据
      someParams: '',
      // 是否显示管理员管理
      userPower: false,
      // 打开的导航页
      defNavActive: '1-1',
      userName: '',
      isCollapse: false,
      // 默认打开的标签页
      activeIndex: '1',
      // 当前打开的标签页
      editableTabsValue: '1',
      // tabs标签内容
      editableTabs: [
        {
          title: '首页',
          name: '1',
        }
      ],
      // 统计+编号
      tabIndex: 1,
      tabCount: 1,
      returnExistTabs: 0,
    }
  },
  methods: {
    // 导航栏标签点击方法
    navSelect(key, keyPath) {
      console.log(key)
      if (keyPath[0] === '1-1') {
        this.isAddTabs('首页')
        router.push({name: 'homeIndex'})
      } else if (keyPath[0] === '2') {
        if (key === '2-1') {
          this.isAddTabs('商城用户')
          router.push({name: 'user'})
        } else {
          this.isAddTabs('管理员用户')
          router.push({name: 'manager'})
        }
      } else if (keyPath[0] === '3') {
        this.isAddTabs('商品管理')
        router.push({name: 'goods'})
      } else {
        this.isAddTabs('订单管理')
        router.push({name: 'order'})
      }
    },
    // 头部导航点击
    handleSelect(key) {
      if (key === '1') {
        router.push({name: 'updatepwd'})
        if (this.isTabsExist('修改密码')) {
          this.editableTabsValue = this.returnExistTabs
        } else {
          // 添加修改密码
          this.tabCount++;
          this.editableTabs.push({
            title: '修改密码',
            name: '9',
          });
          this.editableTabsValue = '9';
        }
        this.defNavActive = '9'
      } else {

      }

    },
    // 添加标签
    addTab(targetName) {
      this.tabCount++;
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: targetName,
        name: newTabName,
      });
      this.editableTabsValue = newTabName;
    },
    // 移除标签
    removeTab(targetName) {
      // 数字  =>  targetName
      let tabs = this.editableTabs;
      // 当前打开的标签页
      let activeName = this.editableTabsValue;
      // 剩下一个的情况下
      if (this.tabCount === 1) {
        this.$message({
          showClose: true,
          message: '就剩一个了，关不了',
          type: 'warning'
        });
      } else {
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.tabCount--;
              }
            }
          });
          // 导航栏打开的
          for (let objElement of this.editableTabs) {
            if (objElement.name === activeName) {
              if (objElement.title === '首页') {
                this.defNavActive = '1-1'
                router.push({name: 'homeIndex'})
              } else if (objElement.title === '商城用户') {
                this.defNavActive = '2-1'
                router.push({name: 'user'})
              } else if (objElement.title === '管理员用户') {
                this.defNavActive = '2-2'
                router.push({name: 'manager'})
              } else if (objElement.title === '商品管理') {
                this.defNavActive = '3-1'
                router.push({name: 'goods'})
              } else if (objElement.title === '订单信息') {
                this.defNavActive = '4-1'
                router.push({name: 'order'})
              } else {
                this.defNavActive = '9'
                router.push({name: 'updatepwd'})
              }
            }
          }
          // 打开的标签页
          this.editableTabsValue = activeName;
          // 过滤清除
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        } else {
          for (let objElement of this.editableTabs) {
            if (objElement.name === targetName) {
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
              this.tabCount--;
            }
          }
        }
      }
    },
    // 点击标签后左侧导航栏跟着动
    clickTab(targetName) {
      if (targetName.label === '首页') {
        this.defNavActive = '1-1'
        router.push({name: 'homeIndex'})
      } else if (targetName.label === '商城用户') {
        this.defNavActive = '2-1'
        router.push({name: 'user'})
      } else if (targetName.label === '管理员用户') {
        this.defNavActive = '2-2'
        router.push({name: 'manager'})
      } else if (targetName.label === '商品管理') {
        this.defNavActive = '3-1'
        router.push({name: 'goods'})
      } else if (targetName.label === '订单管理') {
        this.defNavActive = '4-1'
        router.push({name: 'order'})
      } else {
        this.defNavActive = '9'
        router.push({name: 'updatepwd'})
      }
    },
    // 判断标签是否已经存在
    isTabsExist(targetName) {
      for (let objElement of this.editableTabs) {
        if (objElement.title === targetName) {
          this.returnExistTabs = objElement.name;
          return true;
        }
      }
      return false;
    },
    // 是添加标签还是跳转标签
    isAddTabs(tabsTitle) {
      if (this.isTabsExist(tabsTitle)) {
        this.editableTabsValue = this.returnExistTabs
      } else {
        this.addTab(tabsTitle);
      }
    },
    // 获取路由传参
    getRouter() {
      this.someParams = this.$route.params
      this.userName = this.someParams.manager_name;
      if (this.someParams.manager_power === '0') {
        this.userPower = true;
      }
    },
    //  退出登录
    exitLog() {
      axios.get('/api/log/exitLog.php')
          .then(res => {
            if (res.data === 14) {
              this.$message.warning('退出登录，即将跳转至登录页面')
              setTimeout(() => {
                router.push({
                  path: '/'
                })
              }, 1500)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    // 获取用户名
    getUserName() {
      axios.get('/api/log/getInfo.php?type=name')
          .then(res => {
            this.userName = res.data;
          })
          .catch(err => {
            console.log(err)
          })
    },
  //  获取权限
    getPower(){
      axios.get('/api/log/getInfo.php?type=power')
          .then(res => {
            if (res.data == '0') {
              this.userPower = true;
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  created() {
    this.getRouter()
    this.getUserName()
    this.getPower()
  }
}
</script>

<style scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}

.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /*background-color: #D3DCE6;*/
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.templateWindow {
  height: calc(100% - 40px);
  width: 100%;
  background-color: #D3DCE6;
  position: absolute;
  left: 0;
  top: 40px
}

#main-top {
  border: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /*background-color: #0f6674;*/
}

.el-tabs__nav-scroll {
  overflow: hidden;
  height: 40px;
  line-height: 40px;
}

.bottom_footer {
  position: fixed;
  bottom: 5px;
  left: 0;
  display: block;
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 13px;
}

.windowContent {
  position: absolute;
  left: 10px;
  top: 10px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
}

.el-select .el-input {
  width: 140px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

/*  客户管理页  */
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
