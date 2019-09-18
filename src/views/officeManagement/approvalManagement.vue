<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item class="right" style="float:right;">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="searchApproval">查询</el-button>
        </el-form-item>
        <el-form-item class="right" style="float:right;">
          <el-input v-model="search.name" size="mini" placeholder="搜索关键字"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addSupplier">添加请款单</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="payment"
      highlight-current-row
      text-align="center"
      v-loading="listLoading"
      style="width: 99.9%;"
      border 
    >
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="application_date" label="日期" align="center"></el-table-column>
      <el-table-column prop="department_name" label="部门" align="center"></el-table-column>
      <el-table-column prop="payment_type_name" label="支出类别" align="center"></el-table-column>
      <el-table-column prop="bank" label="银行开户行" align="center"></el-table-column>
      <el-table-column prop="applicant" label="申请人" align="center"></el-table-column>
      <el-table-column prop="payment_amount" label="金额" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleDetail(scope.$index, scope.row)"
            size="mini"
            plain
          >详情</el-button>
          <el-button type="success" @click="handlePermission(scope.$index, scope.row)" size="mini" plain>审核</el-button>
          <el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="mini" plain>删除</el-button>
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
      listLoading: false,
      payment: [],
      page:1,
      pageSize:10,
      total:0,
      search:{
        name:""
      }
    };
  },
  created() {
    this.paymentrequestdata();
  },
  methods: {
    //   获取列表
    paymentrequestdata() {
      let params = {
		    page:this.page,
		    per_page:this.pageSize
      };
      this.listLoading = true;
      resName
        .paymentrequestList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
			this.payment = res.data.data;
			this.total = res.data.total
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
            this.listLoading = false;
          return false;
        });
  },
  searchApproval:function(){
      let params = {
        searchKey:this.search.name,
        page:this.page,
        per_page:this.pageSize
      };
      this.listLoading = true;
      resName
        .paymentrequestList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
			    this.payment = res.data.data;
			    this.total = res.data.total
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
            this.listLoading = false;
          return false;
        });
  },
	// 分页
	handleCurrentChange(val) {
      this.page = val;
      this.paymentrequestdata();
	},
	// 分页
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.paymentrequestdata();
    },
    // 标注每一行状态
    // tableRowClassName({row, rowIndex}) {
    //   if (rowIndex === 1) {
    //     return 'warning-row';
    //   } else if (rowIndex === 3) {
    //     return 'success-row';
    //   }
    //   return '';
    // },
    // 添加申请
    addSupplier() {
      this.$router.push({path:"/office/addApproval"})
    },
    // 详情
    handleDetail:function(index,row){
      this.$router.push({
        path: "/office/paymentDetail",
		    query: { id: row.id },
      });
    },
    // 审核
    handlePermission:function(){

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
.activity_type {
  margin-top: 55px;
  margin-bottom: 20px;
}
.toolbar {
  margin-bottom: 15px;
}
.el-form-item .left {
  float: left;
}
.el-form-item .right {
  float: right;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: green;
}
</style>
