<template>
  <!--列表-->
  <div id="container">
    <el-tabs type="border-card">
      <el-tab-pane label="订单详情">
        <el-form
          :model="dataLidt"
          :hide-required-asterisk="false"
          label-width="100px"
          v-loading="listLoading"
          showClose="false"
        >
         <el-form-item label="订单单号" class="order50">
            <el-input v-model="dataLidt.order_no" readonly></el-input>
          </el-form-item>
          <el-form-item label="下单时间" class="order50">
            <el-input v-model="dataLidt.create_time" readonly></el-input>
          </el-form-item>
          <el-form-item label="收货人姓名" class="order50">
            <el-input v-model="dataLidt.user_name" readonly></el-input>
          </el-form-item>
          <el-form-item label="收货人电话" class="order50">
            <el-input v-model="dataLidt.user_phone" readonly></el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="dataLidt.user_address" readonly></el-input>
          </el-form-item>
          <el-form-item label="总金额" class="order50">
            <el-input v-model="dataLidt.total_money" readonly></el-input>
          </el-form-item>
          <el-form-item label="服务费" class="order50">
            <el-input v-model="dataLidt.total_money" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品信息">
        <el-form
          :model="dataLidt"
          :hide-required-asterisk="false"
          v-loading="listLoading"
          showClose="false"
        >
          <el-form-item>
            <el-table :data="goodsInfo" highlight-current-row border show-summary style="width: 99.9%;">
              <el-table-column
                label="商品图片"
                align="center"
                sortable>
                <template slot-scope="scope">
                  <img class="goodsImg" :src="scope.row.goods_img"/>
                </template>
              </el-table-column>
              <el-table-column
                label="商品名称"
                min-width="120"
                align="center"
                sortable>
                  <p v-html="goodsModelNam"></p>
                </el-table-column>
              <el-table-column prop="goods_num" label="商品数量" align="center" sortable></el-table-column>
              <el-table-column prop="goods_spec_price" label="商品价格" align="center" sortable></el-table-column>
              <el-table-column prop="goods_spec_total_price" label="总金额" align="center" sortable></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="物流信息" v-if="is_pay==1">
          <div>
              <el-form
                :model="dataLidt"
                :hide-required-asterisk="false"
                label-width="100px"
                v-loading="listLoading"
                showClose="false"
                style="overflow:hidden"
                >
                <el-form-item label="物流商" class="order33">
                    <el-input v-model="dataLidt.order_no" readonly></el-input>
                </el-form-item>
                <el-form-item label="物流单号" class="order33">
                    <el-input v-model="dataLidt.logistic_code" readonly></el-input>
                </el-form-item>
                <el-form-item label="预计到达时间" class="order33">
                    <el-input v-model="dataLidt.estimated_date" readonly></el-input>
                </el-form-item>
                <el-form-item label="物流费用" class="order33">
                    <el-input v-model="dataLidt.deliver_money" readonly></el-input>
                </el-form-item>
                <el-form-item label="支付方式" class="order33">
                      <el-input v-if="dataLidt.pay_from == 'wechat'" value="微信" readonly></el-input>
                      <el-input v-else-if="dataLidt.pay_from == 'alipay'" value="支付宝" readonly></el-input>
                      <el-input v-else-if="dataLidt.pay_from == 'unionPay'" value="银联" readonly></el-input>
                      <el-input v-else-if="dataLidt.pay_from == 'offline'" value="线下" readonly></el-input>
                </el-form-item>
                <el-form-item label="当前状态" class="order33">
                      <el-input v-if="dataLidt.logistic_status == '1'" value="未发货" readonly></el-input>
                      <el-input v-else-if="dataLidt.logistic_status == '2'" value="备货中" readonly></el-input>
                      <el-input v-else-if="dataLidt.logistic_status == '3'" value="运输中" readonly></el-input>
                      <el-input v-else-if="dataLidt.logistic_status == '4'" value="已签收" readonly></el-input>
                </el-form-item>
                </el-form>
          </div>
          <div v-if="is_pay == 1 && logistic_status == 1">
            <el-button class="marle" type="primary" size="mini" @click="Stockup">去备货</el-button>
          </div>
            <div v-else-if="is_pay == 1 && logistic_status == 2">
              <el-collapse >
                <el-collapse-item title="是否发货">
                <el-form
                    :model="Logistiy"
                    :rules="LogistiyRules"
                    ref="Logistiy"
                    :hide-required-asterisk="false"
                    label-width="110px"
                    v-loading="listLoading"
                    showClose="false"
                    style="overflow:hidden"
                    >
                    <el-form-item label="物流单号" prop='Logistics' class="order33">
                        <el-input v-model="Logistiy.Logistics" @blur="Logisticssub"></el-input>
                    </el-form-item>
                    <el-form-item label="物流公司" prop="ShipperName" class="order33">
                        <el-input v-model="Logistiy.ShipperName" ></el-input>
                    </el-form-item>
                    <el-form-item label="预计到达时间" prop="value1" class="order33">
                        <el-date-picker
                        v-model="Logistiy.value1"
                        type="date"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    </el-form>
                    <el-button class="marle" type="primary" size="mini" @click="delivery">确认发货</el-button>
                </el-collapse-item>
              </el-collapse>
                
            </div>
            <div v-else-if="is_pay ==1 && (logistic_status==3 || logistic_status==4)">
                <el-steps style="margin-left:50px" direction="vertical">
                    <el-step class="vertical" icon="el-icon-location-outline" :title="item.AcceptTime" v-for="(item,index) in logistic" :key="index" :description="item.AcceptStation"></el-step>
                </el-steps>
            </div>
            <div v-else>
                数据异常
            </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.el-step.is-vertical .el-step__head{
    padding-bottom: 55px !important;
}
.el-collapse-item__header{
      margin-left: 33px;
}
</style>
<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      dataLidt: {},
      LogInfor: [],
      listLoading: false,
      goods_spec: "",
      goodsInfo: [],
      company_address: "",
      personal_address: "",
      logistic: [],
      Information:false,
      Logistics:"",
      Logistiy:{
        Logistics:"",
        ShipperName:"",
        value1:"",
     },
        LogistiyRules:{
            Logistics: [
          {
            required: true,
            message: "请输入物流单号",
            trigger: "change"
          }
          ],
          ShipperName: [
            {
              required: true,
              message: "请输入物流公司",
              trigger: "change"
            }
          ],
          value1: [
            {
              required: true,
              message: "请输入预计到达时间",
              trigger: "change"
            }
          ],
        },
        is_pay:"",
        logistic_status:"",
        logisticCode:"",
        goodsModelNam:""
    };
  },
  created() {
    this.handleEdit();
  },
  methods: {
    //   列表
    handleEdit() {
      let params = {
        order_id: this.$route.query.id
      };
      this.listLoading = true;
      resName
        .orderDetai(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt = res.data;
            this.logistic_status = this.dataLidt.logistic_status
            this.is_pay = this.dataLidt.is_pay
            this.logisticCode = this.dataLidt.logistic_code
            this.company_address =
              this.dataLidt.province_id +
              this.dataLidt.city_id +
              this.dataLidt.area_id +
              this.dataLidt.address;

            this.goodsInfo = this.dataLidt.goods_info;
            // 商品名称+型号
            for(var a in this.goodsInfo){
              this.goodsModelNam = this.goodsInfo[a].goods_name + this.goodsInfo[a].goods_model
            }
            this.listLoading = false;
            // 规格
            var s = [];
            for (var i = 0; i < this.dataLidt.goods_info.length; i++) {
              s.push(this.dataLidt.goods_info[i].goods_spec);
            }
            for (var i = 0; i < s.length; i++) {
              var data = s[i];
              for (var k in data) {
                this.goods_spec += k + ":" + data[k] + ";   ";
              }
            }
            if(this.dataLidt.logistic_status == 3 || this.dataLidt.logistic_status == 4){
                let param = {
                  order_id: this.$route.query.id,
                  logistic_code: this.logisticCode
                };
                resName
                  .logisticInfo(param)
                  .then(res => {
                    //数据处理
                    if (res.code === 1) {
                      this.logistic = res.data.Traces;
                    } else if (res.code === -2) {
                      this.$message({
                        message: res.msg,
                        type: "error"
                      });
                    }
                  })
                  .catch(err => {
                    //错误处理
                    this.listLoading = false;
                  });
            }
            
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
    // 备货
    Stockup(){
      // this.handleEdit();
        let param = {
              order_id: this.$route.query.id,
            };
            resName
              .orderStocking(param)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                     this.$message({
                        message: "备货成功",
                        type: "success"
                    });
                  this.handleEdit();
                } else if (res.data.code === -2) {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
                this.listLoading = false;
              });
    },
    // 物流单号
    Logisticssub(){
        let param = {
              order_id: this.$route.query.id,
              logistic_code:  this.dataLidt.logistic_code
            };
            resName
              .shipperCode(param)
              .then(res => {
                //数据处理
                if (res.code === 1) {
                      this.Logistiy.ShipperName = res.data.ShipperName;
                } 
              })
              .catch(err => {
                //错误处理
                
              });
    },
    // 确认发货
    delivery(){
         this.$refs.Logistiy.validate(valid => {
              if (valid) {
                var d = new Date(this.Logistiy.value1);  
                var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() ;
                let param = {
                  order_id: this.$route.query.id,
                  logistic_code: this.Logistiy.Logistics,
                  shipper_name:this.Logistiy.ShipperName,
                  estimated_date:youWant
                  };
                resName
                .orderDelivery(param)
                .then(res => {
                    //数据处理
                    if (res.data.code === 1) {
                      this.$message({
                        message: "发货成功",
                        type: "success"
                      });
                      this.handleEdit();
                    } else if (res.data.code === -2) {
                      this.$message({
                        message: res.msg,
                        type: "error"
                      });
                    }
                })
                .catch(err => {
                    //错误处理
                });
              }
         })
    }
  }
};
</script>
<style lang="less" scoped>
.el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  display: inline-block;
}
.goods_span {
  color: #606266;
}

#container h3 {
  margin-left: 20px;
}
.order50{
    float: left;
    width:50%;
}
.order33{
    float: left;
    width:33%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
}
.marle{
        margin-left: 32px;
}
.goodsImg{
    width: 80px;
    height: 80px;
}
</style>
