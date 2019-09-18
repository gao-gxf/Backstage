<template>
     <!--列表-->
      <div id="container">
        <el-tabs type="border-card">
            <el-tab-pane label="请款单详情" >
                <el-form
                :model="detailList"
                :hide-required-asterisk="false"
                label-width="100px"
                showClose="false">
                    <el-collapse v-model="activeNames" @change="handleChange" >
                        <el-collapse-item  name="1">
                            <template slot="title">
                              <h3>基本信息</h3> 
                            </template>
                              <div class="title_line"></div>
                            <div class="specItem">
                                <!-- <el-form-item label="部门" class="dockingUser">
                                    <el-input v-model="info.department" readonly></el-input>
                                </el-form-item> -->
                                 <el-form-item label="申请人" class="dockingUser" prop="applicant">
                                    <el-input v-model="info.applicant" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="申请日期" prop="application_date" class="dockingUser">
                                    <el-input v-model="info.application_date" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="收款人/公司" prop="payee" class="dockingUser">
                                    <el-input v-model="info.payee" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="收款账户" prop="collection_account" class="dockingUser">
                                    <el-input v-model="info.collection_account" readonly></el-input>
                                </el-form-item>
                                 <el-form-item label="开户行" class="dockingUser">
                                    <el-input v-model="info.bank" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="请款小写金额" class="dockingUser" prop="payment_amount">
                                    <el-input v-model="info.payment_amount" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="请款大写金额" class="dockingUser" prop="payment_amount_capitalized">
                                    <el-input v-model="info.payment_amount_capitalized" readonly ></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="支出类型" class="dockingUser">
                                    <el-input v-model="info.payment_type" readonly></el-input>
                                </el-form-item> -->
                                <el-form-item label="支出用处" class="dockingUser" prop="promotional_use">
                                    <el-input v-model="info.promotional_use" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="项目id" class="dockingUser">
                                    <el-input v-model="info.project_id" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="项目名称" class="dockingUser">
                                    <el-input v-model="info.project_name" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="请款原因" class="dockingUser">
                                    <el-input v-model="info.payment_reason" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="请款状态" class="dockingUser" prop="approval_status">
                                    <el-input v-model="info.payment_reason" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="部门名称" class="dockingUser">
                                    <el-input v-model="info.department_name" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="支出类型名称" class="dockingUser">
                                    <el-input v-model="info.payment_type_name" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="支出时间" class="dockingUser">
                                    <el-input v-model="info.payment_time" readonly></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames" @change="handleChange" >
                        <el-collapse-item  title="附件" name="附件">
                             <template slot="title">
                                <h3>附件</h3> 
                             </template>
                                <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="合同附件">
                                        <div v-for="(item,index) in contract_files" :key="index">
                                            <el-button type="primary" size='mini' @click="downContract(index)">
                                                <i class="el-icon-download">下载</i>&ensp;&ensp;
                                            </el-button>
                                            <div style='display:inline-block;'>{{item.file_url}}</div>
                                        </div>
                                </el-form-item>
                                <el-form-item label="清单附件">
                                        <div v-for="(item,index) in list_files" :key="index">
                                            <el-button type="primary" size='mini' @click="downfileList(index)">
                                                <i class="el-icon-download">下载</i>&ensp;&ensp;
                                            </el-button>
                                            <div style='display:inline-block;'>{{item.file_url}}</div>
                                        </div>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames" @change="handleChange" >
                        <el-collapse-item  title="审核进度" name="审核进度">
                             <template slot="title">
                                <h3>审核进度</h3> 
                             </template>
                                <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item>
                                    <el-timeline :reverse="reverse">
                                        <el-timeline-item
                                        v-for="(item, index) in approval_log"
                                        :key="index"
                                        :timestamp="item.created_at">
                                        {{item.result_title}}&ensp;&ensp;{{item.reason}}
                                        </el-timeline-item>
                                    </el-timeline>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="入库单列表" >
            <el-form
            :model="detailList"
            :hide-required-asterisk="false"
            label-width="100px"
            showClose="false">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="入库单列表" name="1">
                            <b slot="title">
                                入库单列表
                            </b>
                            <div class="specItem">
                            <el-table
                                :data="inbound_goods_list"
                                highlight-current-row
                                text-align="center"
                                style="width: 99.9%;"
                                border 
                                >
                                <el-table-column prop="id" label="id" align="center"></el-table-column>
                                <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                                <el-table-column prop="material_code" label="物料编码" align="center"></el-table-column>
                                <el-table-column prop="goods_model" label="商品类型" align="center"></el-table-column>
                                <el-table-column prop="goods_number" label="商品数量" align="center"></el-table-column>
                                <el-table-column prop="goods_price" label="商品单价" align="center"></el-table-column>
                                <el-table-column prop="total_price" label="商品总价" align="center"></el-table-column>
                            </el-table>
                        </div>
                        </el-collapse-item>
                    </el-collapse>
            </el-form>
        </el-tab-pane>

    </el-tabs>

      </div>
</template>


<script>
import { resName } from "../../api/api";
import axios from 'axios';
export default {
    data(){
        return{
            listLoading:false,
            activeNames: ['1'],
            reverse: true,
            detailList:{},
            info:{
                department: 1,
                applicant: "",
                application_date: "",
                payee: "",
                collection_account: "",
                bank: "",
                payment_amount: "",
                payment_amount_capitalized: "",
                payment_type: 3,
                promotional_use: "",
                project_name: "",
                project_id:"",
                payment_reason: "",
                approval_status: '',
                department_name: "",
                payment_type_name: "",
                payment_time:"",
            },
            approval_log:[],//审核进度
            contract_files:[],//附件合同
            inbound_goods_list:[],//入库单记录
            list_files:[],//附件清单
            projectDemand:[],
        }
    },
    created(){
      this.approvalDetails();
    },
    methods:{
        handleChange:function(){

        },
        // 获取详情列表
        approvalDetails: function() {
            var _this = this;
            var params = {
                id: _this.$route.query.id,
            };
            // this.listLoading = true;
            resName
            .approlierDetail(params)
            .then(res => {
            if (res.data.code == 1) {
                this.detailList = res.data.data;
                this.info = res.data.data.info
                this.approval_log = res.data.data.approval_log
                this.contract_files = res.data.data.contract_files
                this.inbound_goods_list = res.data.data.inbound_goods_list
                this.list_files = res.data.data.list_files
                // this.listLoading = false;
                }
            })
            .catch(err => {
            //错误处理
            this.listLoading = false;
            return false;
            });
        },
         //合同附件下载
       downContract:function(index){
           console.log(this.contract_files[index].file_url,44444444)
            let url = this.contract_files[index].file_url
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // 获取文件名
            // download 属性定义了下载链接的地址而不是跳转路径
            link.setAttribute('download', url)
            document.body.appendChild(link)
            link.click()
       },
        //清单列表下载
       downfileList:function(index){
           console.log(this.contract_files[index].file_url,44444444)
            let url = this.contract_files[index].file_url
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // 获取文件名
            // download 属性定义了下载链接的地址而不是跳转路径
            link.setAttribute('download', url)
            document.body.appendChild(link)
            link.click()
       },
    },
}
</script>
<style lang="less" scoped>
.el-input{
  width: 100% !important;
}
.el-upload {
    display: none !important;
    height:0 !important;
    text-align: center;
    cursor: pointer;
    outline: 0;
}
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
    #container {
        background: #fff;
        -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
            0 0 6px 0 rgba(0, 0, 0, 0.04);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }
    .specItem{
        overflow: hidden;
    }
    .specItem .dockingUser{
        margin-bottom:15px;
        width: 33%;
        float:left;
    }
    .el-form-item .el-form-item__content{
        margin-left:0 !important;
    }
    h3{
        width: 100%;
    }
    .title_line{
        width: 97%;
        height: 1px;
        border-bottom: 1px solid #efefef;
        margin-bottom: 34px;
        margin-left: 20px;
    }
    .reason{
        margin-right:20px;
    }
</style>
