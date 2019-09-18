<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
            <el-form-item class="right">
          <el-button type="primary" icon="el-icon-search" size="mini" v-on:click="permissionList">查询</el-button>
        </el-form-item>
            <el-form-item class="right">
          <el-input v-model="filters.name" size="mini" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item class="right">
          <el-select v-model="filters.value" size="mini" placeholder="请选择权限组">
            <el-option
              v-for="item in filters.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        
        <el-form-item class="left">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">添加权限</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column prop="name" label="ID" min-width="200"></el-table-column>
      <el-table-column prop="path" label="权限路径" min-width="180"></el-table-column>
      <el-table-column
        prop="permission_name"
        label="权限名称"
        min-width="240"
        :formatter="formatSex"
      ></el-table-column>
      <el-table-column prop="description" label="权限描述" min-width="200"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
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
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item label prop="role_name">
          <el-input v-model="addForm.role_name" placeholder="请输入角色组名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-tree
            :data="data"
            ref="tree"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import util from '../../common/js/util'
// import NProgress from 'nprogress'
import { resName } from "../../../api/api";
export default {
  data() {
    return {
      filters: {
        name: "",
        options: [],
        value: ""
      },
      users: [
        {name:"测试数据1"}
      ],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        rolename: [
          {
            required: true,
            message: "请输入角色组名称",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        rolename: "",
        permissions: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        role_name: [
          {
            required: true,
            message: "请输入角色组名称",
            trigger: "change"
          }
        ]
      },
      //新增界面数据
      addForm: {
        role_name: "",
        permissions: ""
      },
      pageSize: 10,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.permissionList();
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.permissionList();
    },
    //获取权限组列表
    permissionList() {
      let para = {
        search_key: this.filters.name,
        page: this.page,
        per_page: this.pageSize
      };

      this.listLoading = true;
      resName
        .GetPermission(para)
        .then(res => {
          //数据处理
          //console.log("权限列表信息：" + JSON.stringify(res.data));
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.total = res.data.recordsTotal;
              this.users = res.data.data;
              this.listLoading = false;
            } else if (res.data.code === -7) {
              this.$message({
                message: res.data.msg,
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
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            id: row.id
          };
          // 					removeUser(para).then((res) => {
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
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      var _this = this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          var chkIds1 = _this.$refs.tree
            .getCheckedKeys()
            .concat(_this.$refs.tree.getHalfCheckedKeys());
          if (chkIds1.length === 0) {
            this.$message({
              message: "请选择权限",
              type: "warning"
            });
            return false;
          } else {
            var checkId = chkIds1.join(",");
            _this.addForm.permissions = checkId;
          }

          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = _this.addForm;
            resName
              .RoleGroupAdd(para)
              .then(res => {
                //数据处理
                console.log("添加用户角色组：" + JSON.stringify(res.data));
                if (res.status === 200) {
                  if (res.data.code === 1) {
                    this.$message({
                      message: "添加成功",
                      type: "success"
                    });
                    this.addLoading = false;
                    this.addFormVisible = false;
                    this.permissionList();
                  } else if (res.data.code === -7) {
                    this.$message({
                      message: res.data.msg,
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
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    this.permissionList();
  }
};
</script>

<style>
.el-table th,
.el-table td {
  text-align: center;
}
.el-dialog__header {
  border-bottom: 1px solid #ddd;
  background: #ddd;
}
.el-dialog__footer {
  border-top: 1px solid #ddd;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.el-dialog__body {
  height: 340px;
  overflow-y: auto;
}
.el-form-item.right{
      float: right;
}
.el-form-item.left{
      float: left;
}
</style>
