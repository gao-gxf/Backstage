<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col
        :span="3"
        class="logo"
        :class="collapsed?'logo-collapse-width':'logo-width'"
      >{{collapsed?'':sysName}}</el-col>
      <el-col :span="2" style="width: auto;">
        <div class="tools" @click.prevent="collapse">
          <i :class="collapsed?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </div>
      </el-col>
      <!-- <el-col :span="12">
        <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title">
            <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col> -->
      <el-col :span="12">
        <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
              <template v-for="(item)  in levelList">
                  <el-breadcrumb-item :key="item.item"  v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
              </template>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2" class="userinfo" style="float: right;">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="sysUserAvatar" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>我的消息</el-dropdown-item>
            <el-dropdown-item @click.native="password">修改密码</el-dropdown-item>
            <el-dropdown-item disabled>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3" class="userInfo">
        <span style="margin-left:20px">{{users}}</span>
      </el-col>
    </el-col>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="true"
      height="50%">
      <el-form ref="Password" :rules="PasswordsRules" :model="Password" label-width="80px">
        <el-form-item label="原始密码" prop="primitive">
          <el-input placeholder="请输入原始密码" v-model="Password.primitive"></el-input>
        </el-form-item>
        <el-form-item label="新的密码" prop="new">
          <el-input placeholder="请输入新的密码" v-model="Password.new"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmation">
          <el-input placeholder="请重新输入密码" v-model="Password.confirmation"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('Password')" size="small">取 消</el-button>
        <el-button type="primary" @click="ChangePassword('Password')" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <div class="leftnavBox">
          <el-menu
            router
            background-color="#001529"
            :default-openeds="openeds"
            text-color="#fff"
            active-text-color="#fff"
            class="el-menu-vertical-demo"
            @open="handleopen"
            @close="handleclose"
            :collapse="collapsed"
            @select="handleSelect"
            :collapse-transition="false"
            unique-opened
          >
            <template id="ceshi" v-for="(issue,index) in $router.options.routes">
              <template v-if="issue.name === $store.state.leftNavState">
                <template v-for="(item,index) in issue.children">
                  <el-submenu
                    v-if="!item.leaf"
                    :key="index"
                    :index="index+''"
                    v-show="item.menuShow"
                  >
                    <template slot="title">
                      <i :class="item.iconCls"></i>
                      <span slot="title">{{item.name}}</span>
                    </template>
                    <template v-for="(child,index2) in item.children">
                      <template v-if="child.levelThree">
                        <!-- 有三级菜单的二级 -->
                        <el-submenu
                          :key="index2"
                          :index="index+'-'+index2"
                          style="margin-left:16px"
                        >
                          <template slot="title">
                            <span slot="title">{{child.name}}</span>
                          </template>
                          <template v-for="child in child.children">
                            <el-menu-item
                              v-if="child.menuShow"
                              :key="child.path"
                              :index="child.path"
                              :class="$route.path == child.path ?'is-active2':''"
                            >
                              <span slot="title">{{child.name}}</span>
                            </el-menu-item>
                          </template>
                        </el-submenu>
                      </template>
                      <template v-if="child.menuShow && !child.levelThree">
                        <!-- 无三级菜单的二级 -->
                        <el-menu-item
                          :key="child.path"
                          :index="child.path"
                          :class="$route.path == child.path ?'is-active2':''"
                          style="margin-left:16px"
                        >
                          <i :class="child.iconCls"></i>
                          <span slot="title">{{child.name}}</span>
                        </el-menu-item>
                      </template>
                    </template>
                  </el-submenu>
                  <el-menu-item
                    v-else-if="item.leaf"
                    :key="index"
                    :index="item.path"
                    :class="$route.path==item.path ?'is-active2':''"
                    v-show="item.menuShow"
                  >
                    <i :class="item.iconCls"></i>
                    <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                </template>
              </template>
            </template>
          </el-menu>
        </div>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view name="content"></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { resName } from "../api/api";
const imgurl = require("../assets/images/hport.png");
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新的密码"));
      } else if (value === this.Password.primitive) {
        callback(new Error("请勿输入与原密码相同"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重新输入密码"));
      } else if (value !== this.Password.new) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      defaultActiveIndex: "/",
      activeIndex: "1",
      sysName: "Duotel BOSS",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: imgurl,
      users: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      openeds: [],
      levelList: null,
      id: "",
      Password: {
        primitive: "",
        new: "",
        confirmation: ""
      },
      PasswordsRules: {
        primitive: [
          {
            required: true,
            message: "请输入原始密码",
            trigger: "change"
          }
        ],
        new: [
          {
            required: true,
            validator: validatePass1,
            trigger: "blur"
          },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur"
          }
        ],
        confirmation: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  beforeCreate() {},
  created() {
    var _this = this;
    // 组件创建完后获取数据
    this.fetchNavData();
    this.openeds = this.$store.state.leftNavLevel;
    
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("userMsg") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(sessionStorage.getItem("userMsg"))
        )
      );

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    });
    var userCon = _this.$store.state.userInfo;
    _this.users = userCon.work_id + " " + userCon.username;
    _this.sysUserName = userCon.username;
    _this.id = userCon.id;
  },
  methods: {
    handleSelect(index, indexPath) {
      this.$store.state.defaultActiveIndex = index;
    },
    /**
     * 生成面包屑的方法
     */
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== "首页") {
        matched = [
          {
            path: "/home",
            meta: {
              title: "首页"
            }
          }
        ].concat(matched);
      } else {
      }
      this.levelList = matched;
    },
    fetchNavData() {
      // 初始化菜单激活项
      var _this = this;
      var cur_path = this.$route.path; //获取当前路由
      var routers = this.$router.options.routes; // 获取路由对象
      var nav_name = this.$store.state.leftNavState;
      var navlevel = this.$store.state.leftNavLevel;

      navlevel.length = 0;
      for (var i = 0; i < routers.length; i++) {
        var children = routers[i].children;
        if (children) {
          for (var j = 0; j < children.length; j++) {
            //console.log(children[j].path +"==="+ cur_path);
            var children2 = children[j].children;
            if (children2) {
              for (var k = 0; k < children2.length; k++) {
                var children3 = children2[k].children;
                if (children3) {
                  for (var z = 0; z < children3.length; z++) {
                    if (children3[z].path === cur_path) {
                      nav_name = routers[i].name;
                      // navlevel =  children3[z].plevel;
                      navlevel = children3[z].levelArr;
                    }
                  }
                } else {
                  if (children2[k].path === cur_path) {
                    nav_name = routers[i].name;
                    // navlevel =  children2[k].plevel;
                    navlevel.push(String(children2[k].plevel));
                    // console.log("当前点击的顶部目标是：" + routers[i].name);
                    break;
                  }
                }
              }
            }
            // if (children[j].path === cur_path) {
            //       nav_name = routers[i].name;
            //       navlevel =  routers[i].plevel;

            // 	console.log("当前点击的顶部目标是：" + routers[i].name);
            // 	break;
            // }
          }
        }
      }
      this.$store.state.leftNavLevel = navlevel;
      this.$store.state.leftNavState = nav_name;
    },
    // 修改密码
    password() {
      this.dialogVisible = true;
      this.$refs.Password.clearValidate();
    },
    cancel(Password) {
      this.dialogVisible = false;
      this.$refs[Password].resetFields();
    },
    ChangePassword(Password) {
      this.$refs.Password.validate(valid => {
        let params = {
          id: this.id,
          password: this.Password.new
        };
        resName.useRetrievePwd(params).then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.dialogVisible = false;
            this.$router.push({
              path: "/login"
            });
            this.$refs[Password].resetFields();
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      });
    },
    onSubmit() {
      // console.log('submit!');
    },
    jumpTo(url) {
      this.$router.push(url); //用go刷新
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("userCon");

          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },

  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      // this.sysUserAvatar = user.avatar || '';
    }

    this.getBreadcrumb();
  },
  watch: {
    $route: function(to, from) {
      // 路由改变时执行
      this.fetchNavData();
      //刷新面包屑导航
      this.getBreadcrumb();
      //console.log("当前选中的路由：" + this.$route.path);
    }
  }
};
</script>
<style>
@import "../assets/font/iconfont.css";

.el-menu-item,
.el-submenu__title {
  height: 44px;
  line-height: 44px;
}

.el-breadcrumb {
  line-height: 60px;
}

.userInfo {
  float: right;
  text-align: right;
  color: #606266;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.leftnavBox {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.leftnavBox::-webkit-scrollbar {
  width: 0;
}

/* .colorBar{
            position: absolute;
            top:0;
            right:0;
            height:100%;
            width:17px;
            background: rgb(0, 21, 41);
            z-index: 1;
      } */
</style>
<style scoped lang="less">
.iconfont {
  font-size: 16px;
  margin-right: 10px;
}

.logo-width {
  background: #1d2023;
  color: #fff;
}

.logo-collapse-width {
  background: #1d2023;
  color: #fff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  z-index: 100;
}

.topMenu .el-menu-item.is-active {
  color: #00c1de !important;
  border-bottom-color: #00c1de !important;
  background: rgb(37, 42, 47) !important;
}

.el-menu {
  border-right: none;
}

.el-submenu [class^="el-icon-"] {
  margin-right: 10px;
  width: auto;
  font-size: 16px;
}

.el-menu-item [class^="el-icon-"] {
  text-align: left;
  margin-right: 3px;
}

.el-menu-item.is-active {
  background: rgb(37, 42, 47) !important;
}

.el-menu-item.is-active2 {
  background: #108ee9 !important;
}

.el-menu-item.is-active2 i {
  color: #fff;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: #fff;
    color: #1d2023;
    border-bottom: 1px solid #d4d4d4;

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .userinfo-inner {
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
          border-radius: 20px;
          margin: 15px 0px 15px 10px;
          float: right;
        }
      }
    }

    .logo {
      //width:230px;
      height: 60px;
      font-size: 20px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: 200px;
    }

    .logo-collapse-width {
      width: 64px;
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    // overflow: hidden;

    aside {
      flex: 0 0 200px;
      width: 200px;
      background: #252a2f;
      position: relative;
      top: 0px;

      .el-menu {
        height: 100%;
        background: #252a2f;
      }

      .el-menu-item {
        height: 44px;
        line-height: 44px;
        color: #fff;
      }

      .collapsed {
        width: 64px;

        .item {
          position: relative;
        }

        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }

    .menu-collapsed {
      flex: 0 0 64px;
      width: 64px;
    }

    .menu-expanded {
      flex: 0 0 200px;
      width: 230px;
    }

    .content-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #f2f2f2;

      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }

        .breadcrumb-inner {
          float: right;
        }
      }

      .content-wrapper {
        // background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
