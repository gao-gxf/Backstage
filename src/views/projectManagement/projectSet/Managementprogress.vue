<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">创建进度</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="Schedule"
      highlight-current-row
      text-align="center"
      v-loading="listLoading"
      style="width: 99.9%;"
      border>
      <el-table-column prop="class_value" label="进度名称" align="center"></el-table-column>
      <!-- <el-table-column label="项目进度" align="center">
        <template>
          <p>进度</p>
        </template>
      </el-table-column> -->
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
      title="编辑项目进度"
      height="30%"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="80px"
      >
        <el-form-item label="进度名称" prop="class_value">
          <el-input placeholder="请输入进度名称" v-model="editForm.class_value" class="input-with-select"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 创建 -->
    <el-dialog
      title="创建项目进度"
      height="30%"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item label="进度名称" prop="class_value">
          <el-input placeholder="请输入进度名称" v-model="addForm.class_value" class="input-with-select"></el-input>
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
      Schedule: [],
      addFormVisible: false,
      editFormVisible: false,
      addForm: {
        class_value: ""
      },
      addFormRules: {
        class_value: [
          {
            required: true,
            message: "请输入进度名称",
            trigger: "change"
          }
        ]
      },
      editForm: {
        class_value: ""
      },
      editFormRules: {
        class_value: [
          {
            required: true,
            message: "请输入进度名称",
            trigger: "change"
          }
        ]
      },
      id: ""
    };
  },
  created() {
    this.commonsdata();
  },
  methods: {
    //   获取列表
    commonsdata() {
      let params = {
        class_type: "schedule"
      };
      resName
        .webgetcommonsdata(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.Schedule = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 创建级别
    handleAdd() {
      this.addFormVisible = true;
    },
    // 确定提交
    addSubmit() {
       this.$refs.addForm.validate(valid => {
           if (valid) {
      let params = {
        class_type: "schedule",
        class_value: this.addForm.class_value
      };
      resName
        .addCommonsData(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.addFormVisible = false;
            this.commonsdata();
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
      this.id = row.id;
      this.editForm.class_value = row.class_value
    },
    // 编辑提交
    editSubmit() {
       this.$refs.editForm.validate(valid => {
           if (valid) {
      let params = {
        id: this.id,
        class_type: "schedule",
        class_value: this.editForm.class_value
      };
      resName
        .editCommonsData(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.editFormVisible = false;
            this.commonsdata();
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
          .delCommonsData(params)
          .then(res => {
            //数据处理
            if (res.data.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.commonsdata();
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
