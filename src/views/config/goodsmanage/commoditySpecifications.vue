<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="getSpecList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filters.name" size="mini" placeholder="规格名称"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">创建规格</el-button>
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
      border
    >
      <el-table-column prop="goods_type_name" label="类型名称" min-width="240" align="center"></el-table-column>
      <el-table-column prop="cat_name" label="规格名称" min-width="240" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
          >编辑</el-button>
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
    <el-dialog title="编辑规格" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="80px"
      >
        <el-form-item label="商品类型" prop="goods_type">
          <el-select
            v-model="editForm.goods_type"
            @change="selGoods"
            value-key="id"
            placeholder="请选商品类型"
          >
            <el-option
              v-for="item in goodsType"
              :key="item.id"
              :label="item.goods_type_name"
              v-html="item.showName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格类型" prop="cat_name">
          <el-input placeholder="请输入规格类型名称" v-model="editForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="status">
          <!-- <el-radio-group v-model="editForm.status">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>-->
          <el-radio-group v-model="editForm.status" size="small">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无图片" prop="is_img">
          <!-- <el-radio-group v-model="editForm.is_img">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>-->
          <el-radio-group v-model="editForm.is_img" size="small">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="创建规格" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item label="商品类型" prop="goods_type">
          <el-select
            v-model="addForm.goods_type"
            @change="selGoods"
            value-key="id"
            placeholder="请选商品类型"
          >
            <el-option
              v-for="item in goodsType"
              :key="item.id"
              :label="item.goods_type_name"
              v-html="item.showName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格类型" prop="cat_name">
          <el-input placeholder="请输入规格类型名称" v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="status">
          <!-- <el-radio-group v-model="addForm.status">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>-->
          <el-radio-group v-model="addForm.status" size="small">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无图片" prop="is_img">
          <!-- <el-radio-group v-model="addForm.is_img">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>-->
          <el-radio-group v-model="addForm.is_img" size="small">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
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
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        cat_name: [
          {
            required: true,
            message: "请输入规格类型名称",
            trigger: "change"
          }
        ],
        goods_type: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        is_img: [
          { required: true, message: "请选择是否有图片", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择是否显示", trigger: "change" }
        ]
      },
      //编辑界面数据
      editForm: {
        cat_name: "",
        goods_type: "",
        is_img: "",
        status: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        cat_name: [
          {
            required: true,
            message: "请输入规格类型名称",
            trigger: "change"
          }
        ],
        goods_type: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        is_img: [
          { required: true, message: "请选择是否有图片", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择是否显示", trigger: "change" }
        ]
      },
      //新增界面数据

      addForm: {
        cat_name: "",
        goods_type: "",
        is_img: "2",
        status: "1"
      },
      pageSize: 10,
      goodsType: []
    };
  },
  methods: {
    selGoods(selVal) {},
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
              this.getSpecList();
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
      this.getSpecList();
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSpecList();
    },
    //获取用户列表
    getSpecList() {
      let para = {
        cat_name: this.filters.name,
        goods_type: "",
        page: this.page,
        per_page: this.pageSize
      };

      this.listLoading = true;
      resName
        .specList(para)
        .then(res => {
          //数据处理
          //     console.log("规格列表信息：" + JSON.stringify(res));
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
    getGoodsType() {
      let para = {
        goods_name: "",
        goods_type: "",
        page: this.page,
        per_page: this.pageSize
      };
      resName
        .GoodsTypeList(para)
        .then(res => {
          this.goodsType = res.data;
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    //删除
    resetPwd: function(index, row) {
      this.$confirm("确定要重置密码吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            id: row.id,
            password: row.password
          };
          resName
            .ResetPwd(para)
            .then(res => {
              //数据处理
              //   console.log("获取重置密码信息：" + JSON.stringify(res.data));
              if (res.data.code === 1) {
                this.$message({
                  message: "重置成功",
                  type: "success"
                });
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
      this.editFormVisible = true;
      let obj = {};
      obj = this.goodsType.find(item => {
        //这里的userRoleList就是上面遍历的数据源
        return item.id === row.goods_type; //筛选出匹配数据
      });
      this.editForm = {
        cat_id: row.cat_id,
        cat_name: row.cat_name,
        goods_type: obj,
        is_img: String(row.is_img),
        status: String(row.status)
      };
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = {
              cat_id: this.editForm.cat_id,
              cat_name: this.editForm.cat_name,
              goods_type: this.editForm.goods_type.id,
              is_img: this.editForm.is_img,
              status: this.editForm.status
            };
            resName
              .specEdit(para)
              .then(res => {
                //数据处理
                //console.log("获取编辑用户信息：" + JSON.stringify(res.data));
                if (res.data.code === 1) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.editLoading = false;
                  this.editFormVisible = false;
                  this.getSpecList();
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
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = {
              cat_name: this.addForm.cat_name,
              goods_type: this.addForm.goods_type.id,
              is_img: this.addForm.is_img,
              status: this.addForm.status
            };
            resName
              .specAdd(para)
              .then(res => {
                //数据处理
                //     console.log("获取添加规格信息：" + JSON.stringify(res.data));
                if (res.data.code === 1) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.addLoading = false;
                  this.addFormVisible = false;
                  this.addForm = {
                    cat_name: "",
                    goods_type: "",
                    is_img: "",
                    status: ""
                  };
                  this.$refs["addForm"].resetFields();
                  this.getSpecList();
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
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  created() {
    this.getGoodsType();
    this.getSpecList();
  },
  mounted() {}
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
.el-form-item.right {
  float: right;
}
.el-form-item.left {
  float: left;
}
</style>