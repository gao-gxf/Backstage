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
      </el-form>
      <div class="activity_type" v-show="activityType">
        <span class="activity_span activity_spanfir">支付状态:</span>
        <el-checkbox-group v-model="checked1" style="display:inline-block">
          <el-checkbox
            v-for="(item,index) in Paymentstatus"
            :key="index"
            @change="handleCheckedCitiesChange1"
            :label="item.id"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <span class="activity_span">支付方式:</span>
        <el-checkbox-group v-model="checked2" style="display:inline-block">
          <el-checkbox
            v-for="(item,index) in Paymentmethod"
            :key="index"
            @change="handleCheckedCitiesChange2"
            :label="item.value"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <span class="activity_span">物流状态:</span>
        <el-checkbox-group v-model="checked3" style="display:inline-block">
          <el-checkbox
            v-for="(item,index) in Logisticsstatus"
            :key="index"
            @change="handleCheckedCitiesChange3"
            :label="item.id"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-col>
    <!--列表-->
    <el-table
      :data="dataLidt"
      highlight-current-row
      v-loading="listLoading"
      border
      align="center"
      @selection-change="selsChange"
      style="width: 99.9%;">
      <el-table-column prop="order_no" label="订单号" width="210" align="center" sortable></el-table-column>
      <el-table-column prop="duotel_id" label="Duotel ID" align="center"></el-table-column>
      <el-table-column prop="total_money" label="总金额" align="center" sortable></el-table-column>
      <el-table-column label="支付状态" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.is_pay == '0'">未支付</p>
               <el-popover trigger="hover" placement="top">
                <p style="text-align:center;" v-html="scope.row.pay_from_title"></p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" v-if="scope.row.is_pay == '1'">已支付</el-tag>
                </div>
              </el-popover>
        </template>
      </el-table-column>
      <el-table-column  label="物流状态" align="center">
        <template slot-scope="scope">
            <p v-if="scope.row.logistic_status == '1'">未发货</p>
            <p v-else-if="scope.row.logistic_status == '2'">备货中</p>
            <p v-else-if="scope.row.logistic_status == '3'">运输中</p>
            <p v-else-if="scope.row.logistic_status == '4'">已签收</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="130" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleDetail(scope.$index, scope.row)"
            size="mini"
            plain
          >详情</el-button>
          <el-button type="success" size="mini" plain>删除</el-button>
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
.el-popover{
  padding:0;
  min-width: 100px;
}
</style>
<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      total: 0,
      page: 1,
      dataLidt: [],
      listLoading: false,
      pageSize: 10,
      search: {
        name: ""
      },
      value1: "",
      dialogParticularsa: false,
      time1: "",
      time2: "",
      activityType: false,
      checkList: "",
      Paymentstatus: [
        {
          id: "0",
          value:"0",
          name: "未支付"
        },
        {
          id: "1",
          value:"1",
          name: "已支付"
        }
      ],
      Paymentmethod: [
        {
          id: "1",
          value:"wechat",
          name: "微信"
        },
        {
          id: "2",
          value:"aliPay",
          name: "支付宝"
        },
        {
          id: "3",
          value:"unionPay ",
          name: "银联"
        },
        {
          id: "4",
          value:"offline",
          name: "线下"
        }
      ],
      Logisticsstatus: [
        {
          id: "1",
          value:"1",
          name: "未发货"
        },
        {
          id: "2",
          value:"2",
          name: "备货中"
        },
        {
          id: "3",
          value:"3",
          name: "运输中"
        },
        {
          id: "4",
          value:"4",
          name: "已签收"
        }
      ],
      checked1: [],
      checked2: [],
      checked3: [],
      confirmation: true,
      Shipped: false
    };
  },
  created() {
    this.orderList();
  },
  methods: {
    
    // 获取列表
    orderList() {
      let params = {
        page: this.page,
        per_page: this.pageSize,
        searchKey: this.search.name,
        start_time: this.time1,
        end_time: this.time2
      };
      this.listLoading = true;
      resName
        .orderList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt = res.data.data;
            this.listLoading = false;
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
        });
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
    },
    // 高级检索
    Advanced() {
      if (this.activityType == false) {
        this.activityType = true;
      } else {
        this.activityType = false;
      }
    },
    handleCheckedCitiesChange1() {
      let params = {
        page: this.page,
        per_page: this.pageSize,
        is_pay: this.checked1,
        searchKey: this.search.name,
        start_time: this.time1,
        end_time: this.time2
      };
      this.listLoading = true;
      resName
        .orderList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt = res.data.data;
            this.listLoading = false;
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
        });
    },
    handleCheckedCitiesChange2() {
      let params = {
        page: this.page,
        per_page: this.pageSize,
        pay_from: this.checked2,
        searchKey: this.search.name,
        start_time: this.time1,
        end_time: this.time2
      };
      this.listLoading = true;
      resName
        .orderList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt = res.data.data;
            this.listLoading = false;
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
        });
    },
    handleCheckedCitiesChange3() {
      let params = {
        page: this.page,
        per_page: this.pageSize,
        logistic_status: this.checked3,
        searchKey: this.search.name,
        start_time: this.time1,
        end_time: this.time2
      };
      this.listLoading = true;
      resName
        .orderList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt = res.data.data;
            this.listLoading = false;
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
        });
    },
    Paymented(row){
      
    },
    handleCurrentChange(val) {
      this.page = val;
      this.orderList();
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.orderList();
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    // 订单确认发货
    Confirmation(index, row) {
      this.$confirm("是否确认发货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let params = {
            order_id: row.order_id
          };
          resName
            .confirmDelivery(params)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "发货成功!"
                });
                this.orderList();
                // this.confirmation=false;
                // this.Shipped=true;
              } else if (res.data.code === -2) {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
                this.listLoading = false;
              }
            })
            .catch(err => {
              //错误处理
              this.listLoading = false;
            });
        })
        .catch(() => {
          return false;
        });
    },
    //跳转新增界面
    handleDetail: function(index, row) {
      this.$router.push({
        path: "/order/Orderdetails",
        query: { id: row.order_id }
      });
    }
  }
};
</script>

<style>
.el-checkbox {
  margin-left: 10px;
  margin-right: 0 !important;
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
.activity_type {
  margin-top: 55px;
  margin-bottom: 20px;
}

.activity_spanfir {
  margin-left: 0px !important;
}
.activity_span {
  font-size: 12px;
  font-weight: 600;
  margin-left: 30px;
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
