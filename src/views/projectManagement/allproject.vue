<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="search">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="orderList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="search.name" size="mini" placeholder="搜索关键字"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            @change="chooseTimeRange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" @click="Advanced" size="mini">高级筛选</el-button>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" icon="el-icon-plus" @click="addition" size="mini">添加项目</el-button>
        </el-form-item>
      </el-form>
    </el-col>
	<!-- 表格列表 -->
    <el-table
      :data="tableData"
      style="width: 99.9%;margin-bottom: 20px;"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      text-align="center"
      v-loading="listLoading"
      :show-overflow-tooltip="true">
      <el-table-column prop="project_id" align="center" label="ID" sortable width="100"></el-table-column>
      <el-table-column align="center" label="项目名称" sortable min-width="360">
        <template slot-scope="scope">
          <p style="margin:0;text-align:left;">{{scope.row.project_name}}</p>
          <p style="margin:0;text-align:left;">{{scope.row.duotel_id}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="duotel_id" align="center" label="Duotel ID" sortable ></el-table-column> -->
      <el-table-column prop="room_number" align="center" min-width="100" label="房间数量" sortable ></el-table-column>
      <el-table-column align="center" label="当前进度" min-width="120">
        <template slot-scope="scope">
          <div v-for="item in Schedule" :key="item.id">
            <p v-if="scope.row.schedule === item.id" >{{item.class_value}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project_manager" min-width="120" align="center" label="项目经理"></el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <div>
            <el-button type="success" @click="details(scope.$index, scope.row)" size="mini" plain>详情</el-button>
            <el-button type="success" @click="edit(scope.$index,scope.row)" size="mini" plain>编辑</el-button>
          </div>
          <div style="margin-top:6px;">
            <el-button size="mini" plain type="danger" @click="deleteasd(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" plain type="info" @click="Aftersale(scope.$index, scope.row)">售后</el-button>
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
<style>
.el-table .el-table-column:nth-child(2){
  text-align:left !important;
}
.el-table .cell .projectNmae{
  text-align:left !important;
}
</style>
<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      search: {
        name: ""
      },
      value1: "",
      tableData: [],
      listLoading: false,
      addFormVisible:false,
      addForm:{

      },
      addFormRules:[],
      pageSize: 10,
      total: 0,
      page: 1,
      Schedule:[],
      time1: "",
      time2: "",
    };
  },
  created() {
    this.orderList()
  },
  mounted(){
     
  },
  methods: {
    // 获取列表
    orderList: function() {
      
           var params = {
            page: this.page,
            per_page: this.pageSize,
            searchKey:this.search.name,
             start_time: this.time1,
            end_time: this.time2
          };
          this.listLoading = true;
          resName
            .projectList(params)
            .then(res => {
              if (res.code === 1) {
                 this.total = res.data.total;
                this.tableData = res.data.data;
                this.listLoading = false;
              }
            })
            .catch(err => {
              //错误处理
              this.listLoading = false;
              return false;
            });
            // 项目进程
      let para = {
        class_type: "schedule"
      };
      resName
        .webgetcommonsdata(para)
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
    // 详情
    details(index, row) {
       	this.$router.push({
        path: "/project/detailsList",
		query: { id: row.project_id },
      });
    },
    // 编辑
    edit(index, row) {
		// console.log(row);
		this.$router.push({
        path: "/project/edittion",
      query: { id: row.project_id },
		});
	},
    // 删除
    deleteasd(index, row) {
      this.$confirm("确定要删除当前项目吗?", "提示", {
        type: "warning"
      }).then(() => {
         let para = {
        project_id: row.project_id
      };
      resName
        .projectOrderDel(para)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
                  message: "删除成功",
                  type: "success"
                });
            this.orderList()
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      })
    },
    // 售后
    Aftersale(index, row) {},
    // 高级检索
    Advanced() {

    },
    // 添加
    addition(){
      this.$router.push({
        path: "/project/addition"
      });
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.orderList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.orderList();
    },
     // 开始日期
    chooseTimeRange(t) {
      if (t != null) {
        this.time1 = Math.round(t[0].getTime() / 1000);
        this.time2 = Math.round(t[1].getTime() / 1000);
        this.orderList();
      } else {
        this.time1 = "";
        this.time2 = "";
        this.orderList();
      }
    }
  }
};
</script>

<style>
.row-bg {
  padding: 12px 10px;
  background: #fff;
  margin-bottom: 20px;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.input-with-select {
  float: right;
}
.el-table__row td {
  text-align: center;
}
.has-gutter th {
  text-align: center;
}
.el-form-item.right {
  float: right;
}
.el-form-item.left {
  float: left;
}
</style>
