<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="right">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            v-on:click="getGoodsTypeList"
          >查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filters.name" size="mini" placeholder="类型名称"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">创建分类</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
      border>
      <el-table-column label="类型名称" min-width="280" align="left">
        <template slot-scope="scope">
          <p v-html="scope.row.showName"></p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="dev_type_code" label="设备CODE" min-width="100" align="center"></el-table-column> -->
      <el-table-column prop="goods_type_name" label="设备类型名称" min-width="160" align="center"></el-table-column>
      <el-table-column label="操作" min-width="120" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
          >编辑</el-button>
          <el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-col>-->

    <!--编辑界面-->
    <el-dialog title="编辑分类" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="80px"
      >
        <!-- <el-form-item label="设备code" prop="dev_type_code">
          <el-input placeholder="请输入设备code" v-model="editForm.dev_type_code" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="商品类型" prop="title">
          <el-select
            v-model="editForm.equtype"
            @change="selGoods"
            value-key="id"
            placeholder="请选商品类型"
          >
            <el-option value="请选商品类型">请选商品类型</el-option>
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.goods_type_name"
              v-html="item.showName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="dev_type_name">
          <el-input
            placeholder="请输入设备类型名称"
            v-model="editForm.dev_type_name"
            class="input-with-select"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop>
          <el-input placeholder="请输入设备描述" v-model="editForm.dev_desc" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="lang_key" prop="lang_key">
          <el-input placeholder="请输入lang_key" v-model="editForm.lang_key" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="设备图片" prop="phone">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange2"
            :http-request="uploadMainImg2"
            :show-file-list="false"
          >
            <img v-if="editForm.icon" :src="editForm.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="创建商品分类" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
        <!-- <el-form-item label="设备code" prop="dev_type_code">
          <el-input placeholder="请输入设备code" v-model="addForm.dev_type_code" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="商品类型" prop="title">
          <el-select
            v-model="addForm.equtype"
            @change="selGoods"
            value-key="id"
            placeholder="请选商品类型"
          >
            <el-option value="请选商品类型">请选商品类型</el-option>
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.goods_type_name"
              v-html="item.showName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="dev_type_name">
          <el-input
            placeholder="请输入设备类型名称"
            v-model="addForm.dev_type_name"
            class="input-with-select"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop>
          <el-input placeholder="请输入设备描述" v-model="addForm.dev_desc" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="lang_key" prop="lang_key">
          <el-input placeholder="请输入lang_key" v-model="addForm.lang_key" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="设备图片" prop="phone">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :http-request="uploadMainImg"
            :show-file-list="false"
          >
            <img v-if="addForm.icon" :src="addForm.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { resName } from "../../api/api";
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

      //编辑部分
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        dev_type_code: [
          {
            required: true,
            message: "请输入设备code",
            trigger: "change"
          }
        ],
        dev_type_name: [
          {
            required: true,
            message: "请输入设备类型名称",
            trigger: "change"
          }
        ],
        lang_key: [
          {
            required: true,
            message: "请输入lang_key",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        dev_type_name: "",
        dev_desc: "",
        lang_key: "",
        icon: "",
        equtype: "",
        parent_type_code: 0,
        lv: 1
      },
      file2: {},
      //新增部分
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        dev_type_code: [
          {
            required: true,
            message: "请输入设备code",
            trigger: "change"
          }
        ],
        dev_type_name: [
          {
            required: true,
            message: "请输入设备类型名称",
            trigger: "change"
          }
        ],
        lang_key: [
          {
            required: true,
            message: "请输入lang_key",
            trigger: "change"
          }
        ]
      },
      //新增界面数据
      addForm: {
        id: 0,
        dev_type_name: "",
        dev_desc: "",
        lang_key: "",
        icon: "",
        equtype: "",
        parent_type_code: 0,
        lv: 1
      },
      file: {},
      pageSize: 10
    };
  },
  created() {
    this.getGoodsTypeList();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getGoodsTypeList();
    },
    // 上传文件，获取文件流
    handleChange2(file) {
      this.file2 = file.raw;
    },
    uploadMainImg2() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file2);
      form.append("action", "UploadVMKImagePath");
      resName
        .uploadImg(form)
        .then(res => {
          if (res.data.code === 1) {
            if(_this.editForm.icon !== ""){
                  let imgUrl = _this.editForm.icon;
                  resName.deleOldImg(imgUrl);
            }
            _this.editForm.icon = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    uploadMainImg() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
      form.append("action", "UploadVMKImagePath");
      resName
        .uploadImg(form)
        .then(res => {
          if (res.data.code === 1) {
                if(_this.addForm.icon !== ""){
                        let imgUrl = _this.addForm.icon;
                        resName.deleOldImg(imgUrl);
                  }
                  _this.addForm.icon = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getGoodsTypeList();
    },
    //获取用户列表
    getGoodsTypeList() {
      let para = {
        goods_name: this.filters.name,
        goods_type: "",
        page: this.page,
        per_page: this.pageSize
      };
      this.listLoading = true;
      resName
        .GoodsTypeList(para)
        .then(res => {
          //数据处理
          this.users = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
        });
    },
    selGoods(selVal) {
      if (selVal.goods_type_name !== undefined) {
        this.addForm.id = selVal.id;
        this.addForm.lv = selVal.lv;
      } else {
        this.addForm.equtype = selVal;
        this.addForm.id = 0;
        this.addForm.lv = 1;
      }
       
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      let obj = {};
      obj = this.users.find(item => {
        //这里的userRoleList就是上面遍历的数据源
        return item.id === row.id; //筛选出匹配数据
      });
      this.editForm = {
        id: row.id,
        dev_type_name: obj.goods_type_name,
        dev_desc: obj.dev_desc == null ? "" : obj.goods_type_desc,
        icon: obj.icon,
        equtype: obj,
        parent_type_code: obj.p_id,
        dev_type_level: obj.lv
      };
    },
    //删除数据
    handleDel(index, row) {
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = {
            id: row.id
          };
          resName
            .goodsTypeDel(para)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                this.editLoading = false;
                this.getGoodsTypeList();
              } else if (res.data.code === -7) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              //错误处理
            });
        })
        .catch(() => {});
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        dev_type_name: "",
        dev_desc: "",
        lang_key: "",
        icon: "",
        equtype: "",
        parent_type_code: 0,
        dev_type_level: 1
      };
    },
    //编辑
    editSubmit: function() {
      var _this = this;
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            this.editForm.equtype = this.editForm.equtype.dev_type_name;
            let para = {
              id: _this.editForm.id,
              goods_type_name: _this.editForm.dev_type_name,
              p_id: _this.editForm.parent_type_code,
              goods_type_desc: _this.editForm.dev_desc,
              icon: _this.editForm.icon
            };
            resName
              .goodsTypeEdit(para)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.editLoading = false;
                  this.editFormVisible = false;
                  this.getGoodsTypeList();
                } else if (res.data.code === -7) {
                  this.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
              });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      var _this = this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            // this.addForm.equtype = this.addForm.equtype.dev_type_name;
            if(this.addForm.equtype === ""){
                  _this.addForm.id = 0;
            }
            let para = {
              goods_type_name: _this.addForm.dev_type_name,
              p_id: _this.addForm.id,
              goods_type_desc: _this.addForm.dev_desc,
              icon: _this.addForm.icon
            };
            
            resName
              .goodsTypeAdd(para)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.addLoading = false;
                  this.addFormVisible = false;
                  this.$refs["addForm"].resetFields();
                  this.getGoodsTypeList();
                } else if (res.code === -7) {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
              });
          });
        }
      });
    }
  }
};
</script>

<style>
p {
  margin: 0;
  padding: 0;
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
.avatar-uploader-icon,
.avatar {
  width: 120px !important;
  height: 120px !important;
  font-size: 28px;
  color: #8c939d;
  line-height: 120px !important;
  text-align: center;
}
.avatar-uploader .el-upload {
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-table th:first-child {
  text-align: center;
}
.el-form-item.right {
  float: right;
}
.el-form-item.left {
  float: left;
}
.el-table td:first-child .cell{
      padding-left:50px;
}
</style>