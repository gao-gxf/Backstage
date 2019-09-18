<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addSupplier">新增供应商</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="starLevel"
      highlight-current-row
      text-align="center"
      v-loading="listLoading"
      style="width: 99.9%;"
      border
    >
      <el-table-column prop="id" label="供应商id" align="center"></el-table-column>
      <el-table-column prop="supplier_name" label="供应商名称" align="center"></el-table-column>
      <el-table-column prop="supplier_address" label="供应商地址" align="center"></el-table-column>
      <el-table-column prop="supplier_contact_people" label="供应商联系人" align="center"></el-table-column>
      <el-table-column prop="supplier_phone" label="供应商电话" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
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
    <!-- 编辑 -->
    <el-dialog
      title="编辑供应商"
      height="30%"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="140px"
      >
        <el-form-item label="供应商名称：" prop="supplier_name">
          <el-input placeholder="请输入供应商名称" v-model="editForm.supplier_name" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址：" prop="supplier_address">
          <el-input placeholder="请输入供应商地址" v-model="editForm.supplier_address" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系人：" prop="supplier_contact_people">
          <el-input placeholder="请输入供应商联系人" v-model="editForm.supplier_contact_people" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系电话：" prop="supplier_phone">
          <el-input placeholder="请输入供应商联系电话" v-model="editForm.supplier_phone" class="input-with-select"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 创建 -->
    <el-dialog
      title="新增供应商"
      height="30%"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="140px"
      >
        <el-form-item label="供应商名称：" prop="supplier_name">
          <el-input placeholder="请输入供应商名称" v-model="addForm.supplier_name" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址：" prop="supplier_address">
          <el-input placeholder="请输入供应商地址" v-model="addForm.supplier_address" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系人：" prop="supplier_contact_people">
          <el-input placeholder="请输入供应商联系人" v-model="addForm.supplier_contact_people" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系电话：" prop="supplier_phone">
          <el-input placeholder="请输入供应商联系电话" v-model="addForm.supplier_phone" class="input-with-select"></el-input>
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
import { resName } from "../../../api/api";
export default {
  data() {
    return {
      listLoading: false,
      starLevel: [],
      addFormVisible: false,
      editFormVisible: false,
      addForm: {
        supplier_name:"",
        supplier_address:"",
        supplier_contact_people:"",
        supplier_phone: ""
      },
      addFormRules: {
        supplier_name: [
          {
            required: true,
            message: "请输入供应商名称",
            trigger: "change"
          }
        ],
        supplier_address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "change"
          }
        ],
        supplier_contact_people: [
          {
            required: true,
            message: "请输入供应商联系人",
            trigger: "change"
          }
        ],
        supplier_phone: [
          {
            required: true,
            message: "请输入供应商电话",
            trigger: "change"
          }
        ],
      },
      editForm: {
        id: "",
        supplier_name:"",
        supplier_address:"",
        supplier_contact_people:"",
        supplier_phone: ""
      },
      editFormRules: {
        supplier_name: [
          {
            required: true,
            message: "请输入供应商名称",
            trigger: "change"
          }
        ],
        supplier_address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "change"
          }
        ],
        supplier_contact_people: [
          {
            required: true,
            message: "请输入供应商联系人",
            trigger: "change"
          }
        ],
        supplier_phone: [
          {
            required: true,
            message: "请输入供应商电话",
            trigger: "change"
          }
        ],
      },
      
    };
  },
  created() {
    this.supplierdata();
  },
  methods: {
    //   获取列表
    supplierdata() {
      let params = {
        
      };
      resName
        .supplierList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.starLevel = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 创建级别
    addSupplier() {
      this.addFormVisible = true;
    },
    // 确定提交
    addSubmit() {
        this.$refs.addForm.validate(valid => {
           if (valid) {
      let params = {
        supplier_name: this.addForm.supplier_name,
        supplier_address: this.addForm.supplier_address,
        supplier_contact_people:this.addForm.supplier_contact_people,
        supplier_phone:this.addForm.supplier_phone
      };
      resName
        .addSuppliers(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.addFormVisible = false;
            this.supplierdata();
          } else if (res.data.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
           }
        })
    },
    // 编辑
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editForm.id = row.id;
      this.editForm.supplier_name = row.supplier_name;
      this.editForm.supplier_address = row.supplier_address;
      this.editForm.supplier_contact_people = row.supplier_contact_people;
      this.editForm.supplier_phone = row.supplier_phone;
    },
    // 编辑提交
    editSubmit() {
        this.$refs.editForm.validate(valid => {
           if (valid) {
            let params = {
                id: this.editForm.id,
                supplier_name: this.editForm.supplier_name,
                supplier_address: this.editForm.supplier_address,
                supplier_contact_people:this.editForm.supplier_contact_people,
                supplier_phone:this.editForm.supplier_phone
            };
            resName
                .editSuppliers(params)
                .then(res => {
                //数据处理
                if (res.data.code === 1) {
                    this.$message({
                    message: "编辑成功",
                    type: "success"
                    });
                    this.editFormVisible = false;
                    this.supplierdata();
                } else if (res.data.code === -2) {
                    this.$message({
                    message: res.msg,
                    type: "error"
                    });
                }
                })
                .catch(err => {
                //错误处理
                return false;
                });
           }
        })
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      }).then(() => {
        let params = {
          id: row.id
        };
        resName
          .delSuppliers(params)
          .then(res => {
            //数据处理
            if (res.data.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.supplierdata();
            } else if (res.code === -2) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            //错误处理
            return false;
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.el-form-item.left {
  float: left;
}
</style>
