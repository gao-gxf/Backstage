<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="right">
          <el-button type="primary" size="mini" v-on:click="getLightApp">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filters.name" placeholder="应用名称" auto-complete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%"
    >
      <el-table-column min-width="130" prop="app_type_name" label="应用类型" sortable></el-table-column>
      <el-table-column min-width="130" prop="app_name" label="应用名称" sortable>
      </el-table-column>
      <el-table-column min-width="130" prop="icon" label="应用图标" sortable>
        <template slot-scope="scope">
          <a target="_bank" :href="scope.row.frontend_url">
            <el-image style="width: 60px; height: 50px" :src="scope.row.icon"></el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column min-width="130" prop="payment" label="支付费用" sortable></el-table-column>
      <el-table-column min-width="130" prop="is_third" label="是否第三方" sortable>
        <template slot-scope="scope">
          <font title="第三方应用" color='green' size="4" v-if="1===scope.row.is_third"><i  class="el-icon-success" ></i></font>
          <font title="Duotel" color='#909399' size="4" v-else ><i class="el-icon-error" ></i></font>
        </template>
      </el-table-column>
      <el-table-column min-width="130" prop="online_status" label="上线状态" sortable>
        <template slot-scope="scope">
          <font title="上线" color='green' size="4" v-if="1===scope.row.online_status"><i  class="el-icon-success" ></i></font>
          <font title="下线" color='#909399' size="4" v-else ><i class="el-icon-error" ></i></font>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="400">
        <template slot-scope="scope">
          <div v-if="scope.row.verify_status == '0'">
            <el-button type="success" size="mini" @click="lightAppAudit(scope.$index, scope.row)">通过</el-button>
            <el-button type="danger" size="mini" @click="lightAppAuditReject(scope.row.id)">驳回</el-button>
            <el-button @click="editor(scope.$index, scope.row)" type="success" size="mini" plain>编辑</el-button>
            <el-button
              @click="deleteLightApp(scope.$index, scope.row)"
              type="danger"
              plain
              size="mini"
            >删除</el-button>
          </div>
          <div v-else-if="scope.row.verify_status == '1'">
            <el-button type="success" size="mini">已审核</el-button>
            <el-button @click="editor(scope.$index, scope.row)" type="success" size="mini" plain>编辑</el-button>
            <el-button
              @click="deleteLightApp(scope.$index, scope.row)"
              type="danger"
              plain
              size="mini"
            >删除</el-button>
          </div>
          <!-- verify_status == '-1' -->
          <div v-else-if="scope.row.verify_status == '-1'">
            <el-button type="danger" size="mini">已驳回</el-button>
            <el-button @click="editor(scope.$index, scope.row)" type="success" size="mini" plain>编辑</el-button>
            <el-button
              @click="deleteLightApp(scope.$index, scope.row)"
              type="danger"
              plain
              size="mini"
            >删除</el-button>
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
  </section>
</template>

<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      filters: {
        name: "",
        value: ""
      },
      users: [],
      total: 0,
      page: 1,
      sels: [], //列表选中列

      listLoading: false,
      pageSize: 10,
      dialogFormVisible: false,
      id: ""
    };
  },
  methods: {
    editor(index, row) {
      this.$router.push({
        path: "/lightapp/editorLightApp",
        query: {
          id: row.id
        }
      });
    },

    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getLightApp();
    },

    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.getLightApp();
    },
    //获取用户列表
    getLightApp() {
      let pramas = {
        page: this.page,
        per_page: this.pageSize,
        app_name: this.filters.name
      };

      this.listLoading = true;
      resName
        .allLightAppList(pramas)
        .then(res => {
          //数据处理
          //console.log("用户列表信息：" + JSON.stringify(res.data));
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
          // }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    //通过审核
    lightAppAudit(index, row) {
      let passAudit = {
        id: row.id,
        verify_status: 1
      };
      resName.lightAppAudit(passAudit).then(res => {
        if (res.data.code == "1") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getLightApp();
        } else if (res.data.code === -3) {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    //驳回审核
    lightAppAuditReject(id) {
      this.id = id;
      let obj = {};
      obj = this.users.find(item => {
        return item.id === id; //筛选出匹配数据
      });
      this.$prompt("驳回原因", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let rejects = {
            id: obj.id,
            verify_status: -1,
            verify_reason: value
          };
          resName.lightAppAuditReject(rejects).then(res => {
            if (res.data.code == "1") {
              this.dialogFormVisible = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getLightApp();
            } else if (res.code === -3) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          });
        })
        .catch(err => {
          //错误处理
        });
    },
    //删除轻应用
    deleteLightApp(index, row) {
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        let params = {
          id: row.id
        };
        resName.deleteLightApp(params).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getLightApp();
          } else if (res.data.code === -3) {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
      });
    },
    //显示新增界面
    handleAdd: function() {
      this.$router.push({ path: "/addLightApp" });
    },

    // 列表搜索
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  created() {},
  mounted() {
    this.getLightApp();
  }
};
</script>

<style lang="css">
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
.el-form-item.right {
  float: right;
}
.el-form-item.left {
  float: left;
}
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.el-table th.is-sortable {
  text-align: center;
}
</style>