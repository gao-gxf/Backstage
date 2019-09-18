<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item class="right ">
          <el-input class="formwid" v-model="filters.name" size="mini" placeholder="请输入姓名/手机号/工号/邮箱"></el-input>
        </el-form-item>
        <el-form-item class="right">
          <el-select v-model="filters.value" size="mini" placeholder="请选择权限">
            <el-option
              v-for="item in filters.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="left">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      :row-class-name="tableRowClassName"
      @selection-change="selsChange"
      style="width: 100%;"
      border>
      <el-table-column prop="id" label="ID" width="80" center sortable></el-table-column>
      <el-table-column prop="work_id" label="工号" width="100" center sortable></el-table-column>
      <el-table-column prop="username" label="姓名" width="140" center></el-table-column>
      <el-table-column prop="title" label="职位" width="160" center></el-table-column>
      <el-table-column prop="email" label="邮箱" width="240" center></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120" center></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">
            <el-button
            class="handleBtn"
              :type="scope.row.status == 0? 'success' : 'danger'"
              @click="stopHandle(scope.$index, scope.row)"
              size="mini"
              plain
            >{{scope.row.status == 0? "启用" : "停用"}}</el-button>
            <el-button id="button1"
            class="handleBtn"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              size="mini"
              plain
            >编辑</el-button>
            <el-button type="success" class="handleBtn" id="button2" size="mini" plain>权限组</el-button>
            <el-button id="button3"
              type="warning"
              @click="resetPwd(scope.$index, scope.row)"
              size="mini"
              plain
              class="handleBtn"
            >重置</el-button>
          </div>

          <div v-else>
            <el-button
              :type="scope.row.status == 0? 'success' : 'danger'"
              @click="stopHandle(scope.$index, scope.row)"
              size="mini"
              plain
            >{{scope.row.status == 0? "启用" : "停用"}}</el-button>
            <!-- <el-button id="button1"
              type="success"
              disabled
              @click="handleEdit(scope.$index, scope.row)"
              size="mini"
              plain
            >编辑用户</el-button>
            <el-button type="success" id="button2" disabled size="mini" plain>编辑权限组</el-button>
            <el-button id="button3"
              type="warning"
              disabled
              @click="resetPwd(scope.$index, scope.row)"
              size="mini"
              plain
            >重置密码</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="80px"
      >
        <el-form-item label="工号">
          <el-input :disabled="true" v-model="editForm.work_id" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="动态密码">
          <el-input
            :disabled="true"
            placeholder="请输入密码"
            v-model="editForm.password"
            class="input-with-select"
          >
            <el-button slot="append" type="info" plain>获取密码</el-button>
          </el-input>
        </el-form-item> -->
        <el-form-item label="姓名" prop="username">
          <el-input placeholder="姓名" v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="inside" label="邮箱" prop="email">
          <el-input placeholder="邮箱" v-model="editForm.email" class="input-with-select">
            <el-button slot="append" type="info" plain>@duotel.cn</el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!inside" label="邮箱" prop="email">
          <el-input placeholder="邮箱" v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="手机号" v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="title">
          <el-input placeholder="职位" v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" >提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增用户" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
      <el-form-item label="用户类型" style="width:30%;float:left;" prop="usertype">
            <el-select style="display:block;" @change="selUserType" v-model="addForm.usertype" placeholder="用户类型">
                  <el-option v-for="item in usertype" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item style="width:70%;float:left;" prop="work_id" class="workIdItem">
          <el-input :disabled="addForm.worIdStatus" type="" maxlength=6 style="margin-left:0;" @input="getThisVal" v-model="addForm.work_id" auto-complete="off" placeholder="请输入工号(6位)"></el-input>
        </el-form-item>
        <div style="clear:both;"></div>
        <!-- <el-form-item label="工号">
          <el-input :disabled="true" v-model="addForm.work_id" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="动态密码">
          <el-input
            :disabled="true"
            placeholder="请输入内容"
            v-model="addForm.password"
            class="input-with-select"
          >
            <el-button slot="append" type="info" plain>获取密码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input placeholder="姓名" v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="inside" label="邮箱" prop="email">
          <el-input placeholder="邮箱" v-model="addForm.email" class="input-with-select">
            <el-button slot="append" type="info" plain>@duotel.cn</el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!inside" label="邮箱" prop="email">
          <el-input placeholder="邮箱" v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="手机号" v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="title">
          <el-input placeholder="职位" v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import util from '../../common/js/util'
// import NProgress from 'nprogress'
import { resName } from "../../../api/api";
//验证手机号
function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str);
}
//定义一个全局的变量，谁用谁知道
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      Email:"",
      filters: {
        name: "",
        options: [],
        value: ""
      },
      inside:true,
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
            usertype: [
          {
            required: true,
            message: "请选择用户类型",
            trigger: "change"
          }
        ],
            work_id: [
          {
            required: true,
            message: "请输入工号",
            trigger: "change"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            trigger: "change",
            validator: validPhone
          }
        ],
        title: [
          {
            required: true,
            message: "请输入职位",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        id:"",
        work_id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        title: "",
        usertype :'',
        worIdStatus : true
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
      usertype: [
          {
            required: true,
            message: "请选择用户类型",
            trigger: "change"
          }
        ],
            work_id: [
          {
            required: true,
            message: "请输入工号",
            trigger: "change"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            trigger: "change",
            validator: validPhone
          }
        ],
        title: [
          {
            required: true,
            message: "请输入职位",
            trigger: "change"
          }
        ]
      },
      //新增界面数据
      usertype:[
              {
                    value : "D"
              },
              {
                    value : "A"
              },
              {
                    value : "S"
              },
              {
                    value : "K"
              }
        ],
      addForm: {
        work_id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        title: "",
        usertype :'',
        worIdStatus : true
      },
      pageSize: 10,
      
    };
  },
  created() {
        
  },
  methods: {
        //添加工号
        getThisVal(val){
              
            // this.addForm.work_id = str;
            if(val.length >= 6){
                  var str = '';
                  str = this.addForm.usertype + val;
                  //验证工号是否合法
                  this.CheckWorkId(str);
            }
        },
        //验证工号是否合法
        CheckWorkId(workno){
              let param = {
                    work_id : workno
              }
            resName.CheckWorkId(param).then(res => {
                  //数据处理
                  console.log("验证工号信息：" + JSON.stringify(res));
                  if(res.code == 1){
                        if(res.data.exist == 1){
                              this.$message({
                                    message: "当前工号不可用！",
                                    type: "warning"
                              });
                              this.addForm.work_id = "";
                              this.addForm.password = "";
                        }else if(res.data.exist == 0){
                              this.addForm.password = res.data.password;
                              this.addForm.work_id = workno.splice(0,1);
                              
                        }
                  }else{
                        console.log();
                  }
            })
            .catch(err => {
                  //错误处理
                  // console.log("失败："+JSON.stringify(err));
            });
        },
        //选择用户类型
        selUserType(val){
              if(val == "A" || val == "K"){
                    this.inside = false;
              }else{
                   this.inside = true;
              }
              if(this.addForm.usertype == ""){
                  this.addForm.worIdStatus = true;
            }else{
                  this.addForm.worIdStatus = false;
            }
        },
    // 停用和启用
    stopHandle(index, row) {
      let pramas = {
        id: row.id,
        status: row.status ? 0 : 1
      };
      resName
        .ChangeUserStatus(pramas)
        .then(res => {
          //数据处理
          //console.log("更改用户状态信息：" + JSON.stringify(res.data));
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getUsers();
            } else if (res.code === -7) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getUsers();
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        search_key: this.filters.name,
        role_id: "",
        page: this.page,
        per_page: this.pageSize
      };
      
      this.listLoading = true;
      resName
        .userList(para)
        .then(res => {
          //数据处理
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.total = res.data.recordsTotal;
              this.users = res.data.data;
              this.listLoading = false;
              for(var i=0;i<this.users.length;i++){
                if(this.users[i].status == 0){
                  
                }else if(this.users[i].status == 1){
                }
              }
              
            } else if (res.code === -7) {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.listLoading = false;
            }
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    // 新增  停用行背景显示灰色
    tableRowClassName:function({row, rowIndex}){
      for(var i=0;i<this.users.length;i++){
        if (row.status === 0) {//1是启用按钮应该是停用
          return 'warning-row';
          $('#button1').attr('disabled',"true");
          $('#button2').attr('disabled',"true");
          $('#button3').attr('disabled',"true");
        } else if (row.status === 1) {//0是停用按钮应该是启用
          return 'success-row';
          $('#button1').removeAttr("disabled");
          $('#button2').removeAttr("disabled");
          $('#button3').removeAttr("disabled");
        }
        return '';
      }
    },
    // 新增  停用行背景显示灰色
    getTree() {
      let para = {};
      resName
        .CategoryGetTree(para)
        .then(res => {
          //数据处理
          // console.log("所有栏目：" + JSON.stringify(res.data));
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    //重置密码
    resetPwd: function(index, row) {
      this.$confirm("确定要重置密码吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            id: row.id
          };
          resName
            .ResetPwd(para)
            .then(res => {
              //数据处理
              // console.log("获取重置密码信息：" + JSON.stringify(res.data));
              if (res.data.code === 1) {
                this.$message({
                  message: "重置成功",
                  type: "success"
                });
                this.getUsers()
              } else if (res.data.code === -2) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              //错误处理
              // console.log("失败："+JSON.stringify(err));
            });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
          var that = this;
      this.editFormVisible = true;
      let pramas = {
        id: row.id
      };
      resName
        .GetUserInfo(pramas)
        .then(res => {
          //数据处理
          console.log("获取用户详情：" + JSON.stringify(res.data));
          if (res.data.code === 1) {
            var tarData = res.data.data;
            
            if(tarData.work_id.indexOf("D") !== -1 || tarData.work_id.indexOf("S") !== -1){
                  that.inside = true;
                  var Email = tarData.email.split("@")[0]
            }else{
                  that.inside = false;
                  var Email = tarData.email
            }
            this.editForm = {
              id: row.id,
              work_id: tarData.work_id,
              username: tarData.username,
              password: tarData.password,
              email: Email,
              phone: tarData.phone,
              title: tarData.title,
              id: row.id
            };
          } else if (res.data.code === -7) {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
        });
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;

      //获取新工号和密码
      // let pramas = {};
      // resName
      //   .GetJobNumber(pramas)
      //   .then(res => {
      //     //数据处理
      //     //console.log("获取到新工号和密码：" + JSON.stringify(res));
      //     if (res.code === 1) {
      //       this.addForm = {
      //         work_id: res.data.work_id,
      //         username: "",
      //         password: res.data.password,
      //         email: "",
      //         phone: "",
      //         title: ""
      //       };
      //     } else if (res.code === -7) {
      //       this.$message({
      //         message: res.msg,
      //         type: "error"
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     //错误处理
      //     // console.log("失败："+JSON.stringify(err));
      //   });
    },
    //编辑
    editSubmit: function() {
          var _this = this;
      this.$refs.editForm.validate(valid => {
        if (valid) {
            this.editLoading = true;
            //NProgress.start();
            let para = {
              id:this.editForm.id,
              password:this.editForm.password,
              work_id: this.editForm.work_id,
              username: this.editForm.username,
            //   email: this.editForm.email + "@duotel.cn",
              phone:  this.editForm.phone,
              title:  this.editForm.title
            };
            if(_this.inside){
                  para.email = this.editForm.email + "@duotel.cn";
                  if (!check(para.email)) {
                        this.$message({
                              message: "请输入正确的邮箱格式",
                              type: "warning"
                        });
                        this.editLoading = false;
                        return false;
                  }
            }else{
                  para.email = this.editForm.email;
                  if (!check(para.email)) {
                        this.$message({
                              message: "请输入正确的邮箱格式",
                              type: "warning"
                        });
                        this.editLoading = false;
                        return false;
                  }
            }
            resName
              .UserInfoEdit(para)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.editLoading = false;
                  this.editFormVisible = false;
                  this.getUsers();
                } else if (res.data.code === -2) {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
                // console.log("失败："+JSON.stringify(err));
              });
        }
      });
    },
    //新增
    addSubmit: function() {
          var _this = this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
            this.addLoading = true;
            let para = {
              work_id: this.addForm.usertype + this.addForm.work_id,
              title: this.addForm.title,
              username: this.addForm.username,
              password: this.addForm.password,
              phone: this.addForm.phone
            };
            if(_this.inside){
                  para.email = this.addForm.email + "@duotel.cn";
                  if (!check(para.email)) {
                        this.$message({
                              message: "请输入正确的邮箱格式",
                              type: "warning"
                        });
                        this.addLoading = false;
                        return false;
                  }
            }else{
                  para.email = this.addForm.email;
                  if (!check(para.email)) {
                        this.$message({
                              message: "请输入正确的邮箱格式",
                              type: "warning"
                        });
                        this.addLoading = false;
                        return false;
                  }
            }
            
            resName
              .UserAdd(para)
              .then(res => {
                //数据处理
            //     console.log("获取添加用户信息：" + JSON.stringify(res.data));
                if (res.data.code === 1) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.addForm.password = "";
                  this.addLoading = false;
                  this.addFormVisible = false;
                  this.inserted = true;
                  this.$refs["addForm"].resetFields();
                  this.getUsers();
                } else if (res.code === -7) {
                      
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
                // console.log("失败："+JSON.stringify(err));
              });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            ids: ids
          };
          // 					batchRemoveUser(para).then((res) => {
          // 						this.listLoading = false;
          // 						//NProgress.done();
          // 						this.$message({
          // 							message: '删除成功',
          // 							type: 'success'
          // 						});
          // 						this.getUsers();
          // 					});
        })
        .catch(() => {});
    }
  },
  
  mounted() {
    this.getUsers();
  }
};
function check(val) {
  var reg = new RegExp(
    "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
  ); //正则表达式
  var obj = document.getElementById("mazey"); //要验证的对象
  if (!reg.test(val)) {
    //正则验证不通过，格式不对
    return false;
  } else {
    return true;
  }
}
</script>

<style>
.el-table th,
.el-table td {
  text-align: center;
}
.handleBtn{
      margin:5px;
}
.workIdItem .el-form-item__content{
      margin-left:10px !important;
}
.el-dialog__header {
  border-bottom: 1px solid #ddd;
  background: #ddd;
}
.el-dialog__footer {
  border-top: 1px solid #ddd;
}
.formwid{
  width:200px;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.el-form-item.right {
  float: right;
}
.el-form-item.left {
  float: left;
}
.el-table .warning-row td{
    /* background: #ccc; */
    color:#ccc;
    text-decoration:line-through;
  }
.el-table .warning-row td:last-child{
    /* background: #ccc; */
    color:#ccc;
    text-decoration:none;
  }
  .el-table .success-row {
    background: #fff;
  }
</style>