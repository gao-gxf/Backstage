<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="GetGoodsList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filters.name" size="mini" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item class="left">
         <el-cascader
            v-model="id"
            :options="searchOptions"
            size="mini"
            placeholder="商品类型"
            :show-all-levels="false"
            clearable
            @change="getChecked(id)"
            ref="asd"
            filterable
            :props="{checkStrictly: true, label :'goods_type_name',value:'id'}"></el-cascader>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">新增商品</el-button>
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
      border >
      <el-table-column prop="goods_id" label="商品ID" min-width="100" align="center" sortable></el-table-column>
      <el-table-column prop="goods_img" label="商品图片" min-width="120" align="center" sortable>
        <template slot-scope="scope">
          <img :src="scope.row.goods_img" width="40" height="40" align="center" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" min-width="200" align="center" sortable></el-table-column>
      <el-table-column prop="goods_model" label="商品型号" min-width="200" align="center" sortable></el-table-column>
      <el-table-column prop="internal_price" label="进货价" min-width="100" align="center" sortable></el-table-column>
      <el-table-column prop="distribution_price" label="分销价" min-width="100" align="center" sortable></el-table-column>
      <el-table-column prop="market_price" label="市场价" min-width="100" align="center" sortable></el-table-column>
      <el-table-column prop="goods_attr" label="商品属性" min-width="240" align="center" sortable></el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
          >编辑</el-button>
          <el-button type="danger" size="mini" @click="DeleteIns(scope.$index, scope.row)" plain>删除</el-button>
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
      value: "",
      id:[],
      pid:"",
      searchOptions:[],
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "change"
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
        work_id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        title: ""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "change"
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
      addForm: {
        work_id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        title: ""
      },
      pageSize: 10
    };
  },
  created() {
        this.GetGoodsList();
        this.goodstypelist()
  },
  methods: {
    // 筛选
      goodstypelist(){
         resName
        .goodsTypeList()
        .then(res => {
          //数据处理
            if (res.code === 1) {
              this.searchOptions = res.data
            } else if (res.code === -2) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
        })
        .catch(err => {
          //错误处理
        });
      },
     getChecked(id) {
        this.id = id;
        var arr = []
        sessionStorage.setItem("arr",id);
        this.GetGoodsList()
      },
      
    stopHandle(index, row) {
      let pramas = {
        id: row.id,
        status: row.status ? 0 : 1
      };
      resName
        .ChangeUserStatus(pramas)
        .then(res => {
          //数据处理
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.GetGoodsList();
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
      this.GetGoodsList();
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.GetGoodsList();
    },
    //获取商品列表
    GetGoodsList() {
      var newArray = sessionStorage.getItem('arr');
      if(newArray == null || newArray == ""){
        this.id = ""
      }else{
        this.id = newArray.split(',')
      }
      let para = {
        goods_name: this.filters.name,
        goods_type: this.id,
        page: this.page,
        per_page: this.pageSize
      };
      this.listLoading = true;
      resName
        .GoodsList(para)
        .then(res => {
          //数据处理
          this.total = res.data.total;
          this.users = res.data.data;
          this.listLoading = false;
          if (res.code === 1) {
            this.total = res.data.total;
            this.users = res.data.data;
            this.listLoading = false;
            
          } else if (res.code === -7) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    getTree() {
      let para = {};
      resName
        .CategoryGetTree(para)
        .then(res => {
          //数据处理
          //console.log("所有栏目：" + JSON.stringify(res.data));
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    //删除
    DeleteIns: function(index, row) {
      var _this = this;
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            goods_id: row.goods_id
          };
          resName
            .GoodsDel(para)
            .then(res => {
              //数据处理
            //   console.log("获取删除数据信息：" + JSON.stringify(res.data));
              if (res.data.code === 1) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                _this.GetGoodsList();
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

    //跳转新增界面
    handleAdd: function() {
      this.$router.push({ path: "/order/commoditiesIns" });
    },
    //跳转编辑界面
    handleEdit: function(index, row) {
      this.$router.push({
        path: "/order/EditingCommodities",
        query: {
          goods_id: row.goods_id
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
  
};
</script>

<style>
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
.el-form-item.right{
      float: right;
}
.el-form-item.left{
      float: left;
}
</style>
