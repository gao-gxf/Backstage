<template>
     <!--列表-->
      <div id="container">
        <el-tabs type="border-card">
            <el-tab-pane label="订单详情" >
                <el-form
                :model="dataLidt"
                :hide-required-asterisk="false"
                label-width="100px"
                v-loading="listLoading"
                showClose="false">
                <el-form-item label="下单时间" >
                    <el-input v-model="dataLidt.create_time" readonly></el-input>
                </el-form-item>
                <el-form-item label="收货人姓名">
                    <el-input v-model="dataLidt.user_name" readonly></el-input>
                </el-form-item>
                 <el-form-item label="收货人电话">
                    <el-input v-model="dataLidt.user_phone" readonly ></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                    <el-input v-model="dataLidt.user_address" readonly ></el-input>
                </el-form-item>
                <el-form-item label="总金额">
                    <el-input v-model="dataLidt.total_money" readonly ></el-input>
                </el-form-item>
                <el-form-item label="实付价格" >
                    <el-input v-model="dataLidt.realTotal_money" readonly ></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-input v-if="dataLidt.order_status == -4" readonly value="微信支付失败"></el-input>
                    <el-input v-else-if="dataLidt.order_status == -3" readonly value="用户拒收"></el-input>
                    <el-input v-else-if="dataLidt.order_status == -2" readonly value="未付款的订单"></el-input>
                    <el-input v-else-if="dataLidt.order_status == -1" readonly value="用户取消"></el-input>
                    <el-input v-else-if="dataLidt.order_status == 0" readonly value="待发货"></el-input>
                    <el-input v-else-if="dataLidt.order_status == 1" readonly value="配送中"></el-input>
                    <el-input v-else-if="dataLidt.order_status == 2" readonly value="用户确认收货"></el-input>
                </el-form-item>
                <!-- 商户 -->
                <div v-if="dataLidt.user_type == 1">
                    <el-form-item label="duotel ID" >
                        <el-input v-model="dataLidt.duotel_id" readonly ></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称">
                        <el-input v-model="dataLidt.company_name" readonly ></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" >
                        <el-input v-model="company_address" readonly ></el-input>
                    </el-form-item>
                </div>
                <!-- 个人 -->
                <div v-if="dataLidt.user_type == 2">
                    <el-form-item label="duotel ID" >
                        <el-input v-model="dataLidt.duotel_id" readonly ></el-input>
                    </el-form-item>
                    <el-form-item label="个人名称">
                        <el-input v-model="dataLidt.personal_name" readonly ></el-input>
                    </el-form-item>
                    <el-form-item label="个人地址" >
                        <el-input v-model="company_address" readonly ></el-input>
                    </el-form-item>
                </div>
                    <el-form-item label="商品信息">
                        <el-table
                        :data="goodsInfo"
                        highlight-current-row
                        border
                        style="width: 99.9%;">
                        <el-table-column prop="goods_name" label="商品名称"  min-width="120" align="center" sortable></el-table-column>
                        <el-table-column prop="goods_num" label="商品数量"  align="center" sortable></el-table-column>
                        <el-table-column prop="goods_price" label="商品价格"  align="center" sortable></el-table-column>
                        </el-table>
                    </el-form-item>
                     
                </el-form>
            </el-tab-pane>
        </el-tabs>
      </div>
</template>
<script>
import { resName } from "../../api/api";
export default {
    data(){
        return{
            dataLidt:{
                create_time:"",
                user_name:"",
                user_phone:""
            },
            listLoading:false,
            goods_spec:"",
            goodsInfo:[],
            company_address:"",
            personal_address:""
        }
    },
    created(){
        this.handleEdit()
    },
    methods:{
        handleEdit() {
            let params={
                order_id:this.$route.query.id
            }
            this.listLoading = true;
            resName
                .orderDetai(params)
                    .then(res => {
                    //数据处理
                    if (res.code === 1) {
                        this.dataLidt = res.data;
                        this.company_address = this.dataLidt.province_id + this.dataLidt.city_id + this.dataLidt.area_id + this.dataLidt.address
                       console.log(this.company_address);
                       
                       this.goodsInfo = this.dataLidt.goods_info
                        this.listLoading = false;
                        var s=[]
                        for(var i=0;i<this.dataLidt.goods_info.length;i++){
                            s.push(this.dataLidt.goods_info[i].goods_spec)
                        }
                        for(var i = 0; i < s.length; i++){
                            var data = s[i];
                            for(var k in data){
                                this.goods_spec += k +":" + data[k]+ ";   "
                            }
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

                
             }
            
        
    }
}
</script>
<style lang="less" scoped>
.el-input__inner{
    background-color: #F5F7FA;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
    display:inline-block;
}
    .goods_span{
        color: #606266;
    }
    
    #container h3{
        margin-left:20px;
    }
</style>
