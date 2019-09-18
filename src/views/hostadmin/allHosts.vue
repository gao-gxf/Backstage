<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="search">
        <el-form-item class="right">
          <el-button type="primary" icon="el-icon-search" size="mini" v-on:click="formatter">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input size="mini" v-model="search.name" placeholder="搜索关键字"></el-input>
        </el-form-item>
        <el-form-item class="left">
           <el-date-picker
              v-model="value1"
              type="daterange"
              size="mini" 
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            @change="chooseTimeRange" >
            </el-date-picker>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="tableData"
      style="width: 99.9%;margin-bottom: 20px;"
      text-align="center"
      border
      v-loading="listLoading">
      <el-table-column prop="sn" min-width="100" align="center" label="唯一序号" sortable></el-table-column>
      <el-table-column prop="f_code" label="F码" align="center" sortable></el-table-column>
      <el-table-column prop="active_key" min-width="120" align="center" label="激活key" sortable></el-table-column>
      <el-table-column prop="active_time" min-width="100" align="center" :formatter="activetampToTime"  label="激活时间" sortable></el-table-column>
      <el-table-column prop="expire_time" min-width="100" align="center" :formatter="expiretampToTime" label="激活有限期截止" sortable></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0" >未激活</span>
          <span v-else-if="scope.row.status == 1" >已激活</span>
        </template>
      </el-table-column>
      <el-table-column prop="mac" align="center" label="mac地址"></el-table-column>
      <el-table-column prop="h_name" align="center" label="酒店名称"></el-table-column>
      <el-table-column prop="r_number" align="center" label="房间号"></el-table-column>
    </el-table>
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
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      listLoading:false,
      time1:"",
      time2:"",
      value1:"",
      search:{
        name:""
      }
    };
  },
  created() {
    this.formatter();
  },
  methods: {
    // 获取列表
    formatter() {
        let params = {
            page:this.page,
            per_page:this.pageSize,
            searchKey:this.search.name,
            start_time:this.time1,
            end_time:this.time2
        };
        this.listLoading=true;
          resName
            .cubeList(params)
            .then(res => {
              //数据处理
              if (res.code === 1) {
                this.tableData = res.data.data;
                this.listLoading=false;
              } else if (res.code === -2) {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
                this.listLoading=false;
              }
            })
            .catch(err => {
              //错误处理
        });
    },
    // 转换时间
    activetampToTime (row, column) {
      if(row.active_time == null){
        return false;
      }else{
        var date = new Date(row.active_time*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
      }
    },
    expiretampToTime (row, column) {
      if(row.expire_time == 0){
        return false;
      }else{
        var date = new Date(row.expire_time*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
      }
        
    },
    // 时间
     chooseTimeRange(t){
      if(t != null){
          this.time1 = Math.round(t[0].getTime()/1000)
          this.time2 = Math.round(t[1].getTime()/1000)
          this.formatter();
      }else{
         this.time1 = ""
         this.time2 = ""
         this.formatter();
      }
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.formatter();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.formatter();
    }
  }
};
</script>

<style lang="css" scoped>
.row-bg {
  padding: 12px 10px;
  background: #fff;
  margin-bottom: 20px;
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
