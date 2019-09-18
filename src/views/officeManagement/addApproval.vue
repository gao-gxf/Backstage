<template>
  <!--列表-->
  <div id="container">
    <el-tabs type="border-card">
      <el-tab-pane label="添加请款单">
        <el-form
          :model="approvalList"
          ref="approvalList"
          :rules="approvalRules"
          :hide-required-asterisk="true"
          label-width="140px"
          v-loading="listLoading"
        >
          <el-collapse v-model="activeNames" @change="handleChange1">
              <el-collapse-item title="请款单" name="1">
                  <template slot="title">
                    <h3>请款单</h3>
                  </template>
                  <div class="title_line"></div>
                  <div class="specItem">
				        <el-form-item label="支出类别：" prop="payment_type" class="dockingUser">
                  <!-- <el-input v-model="approvalList.construction_room_number" placeholder="请输入施工总数量"></el-input> -->
                    <el-select v-model="approvalList.payment_type" clearable placeholder="请选择" class="searchname" @change="changeType">
                        <el-option
                        v-for="item in paymenttypes"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门：" prop="department" class="dockingUser">
                  <!-- <el-input v-model="approvalList.template_room" placeholder="请输入项目样板间数量"></el-input> -->
                    <el-select v-model="approvalList.department" clearable placeholder="请选择" class="searchname" @change="changeSelect">
                      <el-option
                      v-for="item in departments"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="申请人：" prop="applicant" class="dockingUser">
                    <!-- <el-input v-model="approvalList.applicant" placeholder="请输入申请人"></el-input> -->
                    <el-select v-model="approvalList.applicant" clearable placeholder="请选择" class="searchname" @change="changeSelect">
                      <el-option
                      v-for="item in agentsLists"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="申请日期：" prop="application_date" class="dockingUser">
                  <!-- <el-input v-model="approvalList.construction_room_number" placeholder="请输入施工总数量"></el-input> -->
                  <el-date-picker
                    v-model="approvalList.application_date"
                    type="date"
					          value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                  </el-form-item>
                  <el-form-item label="收款人/公司：" prop="payee" class="dockingUser">
                  	<el-input v-model="approvalList.payee" placeholder="请输入收款人/公司"></el-input>
                  </el-form-item>
                  <el-form-item label="银行账号：" prop="collection_account" class="dockingUser">
                  	<el-input v-model="approvalList.collection_account" placeholder="请输入银行账号"></el-input>
                  </el-form-item>
				  <el-form-item label="银行开户行：" prop="bank" class="dockingUser">
                  	<el-input v-model="approvalList.bank" placeholder="请输入银行开户行"></el-input>
                  </el-form-item>
                  <el-form-item label="大写金额：" prop="payment_amount_capitalized" class="dockingUser">
                  	<el-input v-model="approvalList.payment_amount_capitalized" placeholder="请输入大写金额"></el-input>
                  </el-form-item>
                  <el-form-item label="小写金额：" prop="payment_amount" class="dockingUser">
                  	<el-input v-model="approvalList.payment_amount" placeholder="请输入小写金额"></el-input>
                  </el-form-item>
                  <el-form-item label="推广用途：" prop="promotional_use" class="dockingUser">
                  	<el-input v-model="approvalList.promotional_use" placeholder="请输入推广用途"></el-input>
                  </el-form-item>
                  <el-form-item label="项目名称：" prop="project_name" class="dockingUser">
                  	<el-input v-model="approvalList.project_name" placeholder="请输入项目名称"></el-input>
                  </el-form-item>
                  <el-form-item label="项目ID：" prop="project_id" class="dockingUser">
                  	<el-input v-model="approvalList.project_id" placeholder="请输入项目ID"></el-input>
                  </el-form-item>
                  <el-form-item label="转款原因：" prop="payment_reason" class="dockingUser">
                  	<el-input v-model="approvalList.payment_reason" placeholder="请输入转款原因"></el-input>
                  </el-form-item>
                  <el-form-item label="一级负责审批人：" prop="yjfzr" class="dockingUser">
                    <el-select v-model="approvalList.yjfzr" clearable placeholder="请选择" class="searchname" @change="changeSelect">
                      <el-option
                      v-for="item in agentsLists"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username">
                      </el-option>
                    </el-select>
                  	<!-- <el-input v-model="approvalList.construction_room_number" placeholder="请输入一级负责审批人名称"></el-input> -->
                  </el-form-item>
                  <el-form-item label="财务审批：" prop="cw" class="dockingUser">
                  	<!-- <el-input v-model="approvalList.bind_cube_room_number" placeholder="请输入财务审批人名称" readonly></el-input> -->
                    <el-select v-model="approvalList.cw" clearable placeholder="请选择" class="searchname" @change="changeSelect">
                      <el-option
                      v-for="item in agentsLists"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门负责人审批：" prop="bmfzr" class="dockingUser">
                  	<!-- <el-input v-model="approvalList.address" placeholder="请输入部门负责人名称"></el-input> -->
                    <el-select v-model="approvalList.bmfzr" clearable placeholder="请选择" class="searchname" @change="changeSelect">
                      <el-option
                      v-for="item in agentsLists"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="财务负责人审批：" prop="cwfzr" class="dockingUser">
                  	<!-- <el-input v-model="approvalList.template_room" placeholder="请输入财务负责人名称"></el-input> -->
                    <el-select v-model="approvalList.cwfzr" clearable placeholder="请选择" class="searchname" @change="changeSelect">
                      <el-option
                      v-for="item in agentsLists"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="CEO审批：" prop="ceo" class="dockingUser">
                  	<el-input v-model="approvalList.ceo" placeholder="请输入CEO名称"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="备注：" prop="desc" class="dockingUser">
                  	<el-input v-model="approvalList.desc" placeholder="请输入备注"></el-input>
                  </el-form-item> -->
                  <el-form-item label="合同附件：" class="dockingUser">
                    <el-upload
                      class="upload-demo"
                      action
                      accept=".zip"
                      :on-change="handleChange"
                      :before-upload="uploaderror"
                      :http-request="uploadMainImg"
                      multiple
                      :show-file-list="true"
                      :file-list="fileList1">
                      <el-button size="small" type="primary" :loading="uploadLoading">点击上传</el-button>
                    </el-upload>
                  </el-form-item><br>
                  <el-form-item label="清单附件：" class="dockingUser">
                    <el-upload
                      class="upload-demo"
                      action
                      accept=".zip"
                      :on-change="handleChange"
                      :before-upload="uploaderror"
                      :http-request="uploadMainImg1"
                      multiple
                      :show-file-list="true"
                      :file-list="fileList">
                      <el-button size="small" type="primary" :loading="uploadLoading">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" v-show="showModel" @change="handleChange1">
              <el-collapse-item title="供应商信息" name="供应商信息">
                  <template slot="title">
                      <h3>供应商信息</h3>
                  </template>
                  <div class="title_line"></div>
                  <div class="specItem">
                    <el-form-item label="供应商名称：" class="dockingUser">
                        <el-select v-model="approvalList.supplier_id" clearable  placeholder="请选择" class="searchname" @change="changeSelect">
                          <el-option
                          v-for="item in suppliers"
                          :key="item.supplier_name"
                          :label="item.supplier_name"
                          :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商地址：" prop="supplier_address" class="dockingUser">
                        <el-input placeholder="供应商地址" v-model="supplier_address" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商联系人：" prop="supplier_contact_people" class="dockingUser">
                        <el-input placeholder="供应商联系人" v-model="supplier_contact_people" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商电话：" prop="supplier_phone" class="dockingUser">
                        <el-input placeholder="供应商电话" v-model="supplier_phone" disabled auto-complete="off"></el-input>
                    </el-form-item><br>
                  </div>
              </el-collapse-item>
          </el-collapse>
		  <el-collapse v-model="activeNames" v-show="showModel" @change="handleChange1">
              <el-collapse-item title="申请列表" name="申请列表">
                  <template slot="title">
                      <h3>申请列表</h3>
                  </template>
                  <div class="title_line"></div>
				<!-- <el-button type="success" plain size="mini" @click="addApproval">添加</el-button> -->
                  <div class="specItem">
                    <el-table
						:data="multipleSelection"
            :summary-method="getSummaries"
            show-summary
						style="width: 99.9%;margin-bottom: 20px;"
						text-align="center"
						border
						v-loading="listLoading">
						<el-table-column width="100"
							:render-header="renderHeader">
						</el-table-column>
						<el-table-column prop="id" min-width="100" align="center" label="ID" sortable></el-table-column>
						<el-table-column prop="goods_name" label="商品名称" align="center" sortable></el-table-column>
						<el-table-column prop="goods_spec" min-width="120" align="center" label="商品规格" sortable>
							<template slot-scope="scope">
								<p v-for="(info,key) in scope.row.goods_spec" :key="key">{{key}}:{{info}}</p >
							</template>
						</el-table-column>
						<el-table-column prop="goods_number" label="商品数量" align="center" sortable></el-table-column>
						<el-table-column prop="goods_cpk" label="商品编码" align="center" sortable></el-table-column>
						<el-table-column prop="goods_model" label="商品型号" align="center" sortable></el-table-column>
						<el-table-column prop="material_code" label="物料编码" align="center" sortable></el-table-column>
			      <el-table-column prop="goods_price" min-width="50" align="center" label="单价" ></el-table-column>
						<el-table-column prop="total_price" align="center" label="总价" sortable></el-table-column>
					</el-table>
                  </div>
              </el-collapse-item>
          </el-collapse>
		  <div class="btnBox" style="margin-top:20px;">
			<el-button type="primary" size="small" @click="addwarehousSubmit">提交</el-button>
		  </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>

<!-- 添加商品弹框 -->
	<el-dialog
      title="添加商品"
      height="30%"
      width="70%"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false">
      <el-table
			:data="goodsList"
			style="width: 99.9%;margin-bottom: 20px;"
			text-align="center"
			border
			 @selection-change="handleSelectionChange"
			v-loading="listLoading">
			<el-table-column
				type="selection"
				width="35">
			</el-table-column>
			<el-table-column prop="id" min-width="30" align="center" label="ID" ></el-table-column>
			<el-table-column prop="goods_name" min-width="50" label="商品名称" align="center" ></el-table-column>
			<el-table-column prop="" min-width="50" align="center" label="商品规格" >
				<template slot-scope="scope">
					<p v-for="(info,key) in scope.row.goods_spec" :key="key">{{key}}:{{info}}</p >
				</template>
			</el-table-column>
			<el-table-column prop="goods_cpk" label="商品编码" align="center" ></el-table-column>
			<el-table-column prop="goods_model" label="商品型号" align="center"></el-table-column>
			<el-table-column prop="material_code" label="物料编码" align="center" ></el-table-column>
			<el-table-column prop="" label="商品数量" align="center" >
				<template slot-scope="scope">
					<el-input-number v-model="scope.row.goods_number" size="mini" @change="handleNumChange(scope.row.id,scope.row.goods_number)" :min="1" :max="10" label="描述文字"></el-input-number>
				</template>
			</el-table-column>
			<el-table-column prop="goods_price" min-width="50" align="center" label="单价" ></el-table-column>
		</el-table>
		<!--工具条-->
		<el-pagination
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:page-sizes="[10, 20, 30, 50]"
			:page-size="pageSize"
			layout="sizes, prev, pager, next"
			:total="total"
		></el-pagination>
    </el-dialog>


  </div>
</template>
<style>
.distpicker-address-wrapper select{
    width: 27.5%;
    height: 38px;
    color: #9caebf;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}

</style>
<script>
import VDistpicker from "v-distpicker";
import { resName } from "../../api/api";
import axios from 'axios';
export default {
  components: { VDistpicker },
  data() {
    return {
      Upload: "",
      activeNames: ["1"],
      id:"",
      file: "",
      
    //   新增
	  tableData:[],
	  addFormVisible:false,
      listLoading:false,
      uploadLoading:false,
	    showModel:false,
      time1:"",
      time2:"",
      supplier_id:"",
      supplier_contact_people:"",
      supplier_phone:"",
      value1:'',
      search:{
        user:""
      },
      value: '',
      payWay:[{
        value: '1',
        label: '微信'
        }, {
        value: '2',
        label: '支付宝'
        }, {
        value: '3',
        label: '建行'
        }, {
        value: '4',
        label: '线下'
      }],
      addLoading: false,
      approvalRules: {
        department: [
        {
          required: true,
          message: "请选择部门",
          trigger: "change",
        }
		    ],
        applicant: [
        {
          required: true,
          message: "请输入申请人",
          trigger: "change"
        }
        ],
        payment_type: [
        {
          required: true,
          message: "请选择支出类别",
          trigger: "change"
        }
        ],
        application_date: [
        {
          required: true,
          message: "请输入申请日期",
          trigger: "change"
        }
        ],
        payee: [
        {
          required: true,
          message: "请输入收款人",
          trigger: "change"
        }
        ],
        collection_account: [
        {
          required: true,
          message: "请输入收款账户",
          trigger: "change"
        }
        ],
        bank: [
        {
          required: true,
          message: "请输入开户行",
          trigger: "change"
        }
        ],
        payment_amount: [
        {
          required: true,
          message: "请输入小写金额",
          trigger: "change"
        }
        ],
        payment_amount_capitalized: [
        {
          required: true,
          message: "请输入大写金额",
          trigger: "change"
        }
		],
      },
      //新增数据
      approvalList: {
        supplier_id: "",//供应商id
        department:"",//部门
        applicant:"",//申请人
        payment_type:"",//支出类别
        application_date:"",//申请日期
        payee:"",//收款人
        collection_account:"",//收款账户
        bank:"",//开户行
        payment_amount:"",//大写金额
        payment_amount_capitalized:"",//小写金额
        promotional_use:"",//推广用途
        project_name:"",//项目名称
        project_id:"",//项目id
        payment_reason:"",//转款原因
        yjfzr:"",//一级审批人
        cw:"",//财务审批
        bmfzr:"",//部门负责人审批
        cwfzr:"",//财务负责人审批
        ceo:"沈雨薇",//CEO审批
        contract_files:[],//上传合同附件
        list_files:[],//上传清单附件
        goods:[],
        material_code:"",
        goods_cpk:"",
        goods_name:"",
        goods_model:"",
        goods_price:"",
        goods_number:"",
        total_price:"",
        desc:""
      },
      goods:{
        material_code:"",
        goods_cpk:"",
        goods_name:"",
        goods_model:"",
        goods_price:"",
        goods_number:"",
        total_price:"",
        desc:""
	  },
	  pageSize: 10,
	  page:1,
	  total:0,
	  goods_number:1,
    supplier_address:"",
    suppliers:[],
    agentsLists:[],
    departments:[],
	  paymenttypes:[],
	  goodsList:[],
	  multipleSelection:[],
    fileList1:[],
    fileList:[],
    uploadLoading:false,
    uploadLoading2:false,
    videoUploadPercent:0,
    heTong : []
    // 新增
    };
  },
  created() {
    this.supplierList();
    this.agentsList();
    this.departmentsList();
    this.paymenttypesList()
  },
  computed: {},
  methods: {
    // 列表添加合计行
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      let value = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(column.property === "total_price"){
          value = data.map(item => Number(item.goods_number*item.goods_price))
        }else{
          value = data.map(item => Number(item['goods_price']))
        }
        if(column.property == "total_price" || column.property == "goods_price"){
          sums[index] = value.reduce((prev,curr) => {
            const value = Number(curr);
            if(!isNaN(value)){
              return prev + curr
            }else{
              return prev
            }
          },0);
          sums[index]
        }else {
          sums[index] = '--'
        }
      });
      return sums;
    },
	//   计数器
  handleNumChange(id,num) {
    for(var i=0;i<this.multipleSelection.length;i++){
      if(this.multipleSelection[i].id == id){
        // console.log(this.multipleSelection[i].id+"=====>"+id+"-----"+num);
        this.multipleSelection[i].goods_number = num
        this.multipleSelection[i].total_price = num*this.multipleSelection[i].goods_price
      }
    }
  },
	renderHeader(h){
		return(
			<div style="text-align:center;">
				<el-button type="success" plain size="mini" on-click={()=>this.exportExcel()}><i class="el-icon-plus"></i></el-button>
			</div>
		)
	},
	// 添加商品
	exportExcel:function(){
		this.addFormVisible = true;
	},
	handleSelectionChange(val) {
		this.multipleSelection = val;
		// console.log(JSON.stringify(this.multipleSelection))
    },
	
	//折叠改变触发事件
	handleChange1:function(){
		console.log("折叠改变触发事件");
  	},
  
	// 改变供应商名称
	changeSelect:function(value){
    var _this = this;
	this.supplier_address = '';
		for(var i=0;i<this.suppliers.length;i++){
			if(value == this.suppliers[i].id){
				this.supplier_address = this.suppliers[i].supplier_address
				this.supplier_contact_people = this.suppliers[i].supplier_contact_people
				this.supplier_phone = this.suppliers[i].supplier_phone
			}
		}
		var params = {
			page:this.page,
			per_page:this.pageSize,
			supplier_id:value
		}
    	resName
        .suppliergoodsList(params)
        .then(res => {
            if (res.code === 1) {
				var mainData = res.data.data;
				for(var i = 0; i < mainData.length; i++){
          if(_this.multipleSelection.length !== 0){
            for(var j = 0; j < _this.multipleSelection.length; j++){
            if(mainData[i].id == _this.multipleSelection[j].id){
              mainData[i]["goods_number"] == _this.multipleSelection[j].goods_number
              mainData[i]["total_price"] == _this.multipleSelection[j].goods_number*_this.multipleSelection[j].goods_price
            }else{
              mainData[i]["goods_number"] = 1;
              mainData[i]["total_price"] = _this.multipleSelection[j].goods_price;
            }
          }
          }else{
            mainData[i]["goods_number"] = 1;
            mainData[i]["total_price"] = mainData[i].goods_price;
          }
				}
				this.goodsList = mainData
				this.total = res.data.total
          } 
        })
        .catch(err => {
        //错误处理
        return false
        });
	},
//   改变支出类别
  changeType:function(value){
	if(value == "1"){
		this.showModel = true;
	}else{
		this.showModel = false;
	}
  },
	// 获取部门列表
    departmentsList() {
    var _this = this;
    var params = {}
    resName
        .departmentList(params)
        .then(res => {
            if (res.code === 1) {
                this.departments = res.data					
            } 
        })
        .catch(err => {
        //错误处理
        return false
        });
	},
	// 获取支出类别列表
    paymenttypesList() {
    var _this = this;
    var params = {}
    resName
        .paymentTypeList(params)
        .then(res => {
            if (res.code === 1) {
				this.paymenttypes = res.data					
            } 
        })
        .catch(err => {
        //错误处理
        return false
        });
  },
    // 获取供应商id列表
    supplierList() {
    var _this = this;
    var params = {}
    resName
        .supplierList(params)
        .then(res => {
            if (res.code === 1) {
                this.suppliers = res.data					
            } 
        })
        .catch(err => {
        //错误处理
        return false
        });
    },
    // 获取经办人列表
    agentsList() {
    var _this = this;
    var params = {}
    resName
        .agentList(params)
        .then(res => {
            if (res.code === 1) {
                this.agentsLists = res.data					
            } 
        })
        .catch(err => {
        //错误处理
        return false
        });
    },
    // 添加入库单提交
    addwarehousSubmit() {
        this.$refs.approvalList.validate(valid => {
            if (valid) {
              var _this = this;
              this.approvalList.goods = this.multipleSelection
              let params = {
                  supplier_id: this.approvalList.supplier_id,
                  department: this.approvalList.department,
                  applicant:this.approvalList.applicant,
                  application_date:this.approvalList.application_date,
                  payee:this.approvalList.payee,
                  collection_account:this.approvalList.collection_account,
                  bank:this.approvalList.bank,
                  payment_amount:this.approvalList.payment_amount,
                  payment_amount_capitalized:this.approvalList.payment_amount_capitalized,
                  payment_type:this.approvalList.payment_type,
                  contract_files:JSON.stringify(_this.fileList1),
                  list_files:JSON.stringify(_this.fileList),
                  project_name:this.approvalList.project_name,
                  promotional_use:this.approvalList.promotional_use,
                  yjfzr:this.approvalList.yjfzr,
                  cw:this.approvalList.cw,
                  bmfzr:this.approvalList.bmfzr,
                  cwfzr:this.approvalList.cwfzr,
                  ceo:this.approvalList.ceo,
                  goods:JSON.stringify(this.multipleSelection),
              }
      resName
        .addApprolierList(params)
        .then(res => {
          if (res.code === 1) {
            // this.suppliers = res.data		
            this.$message({
              message: "添加成功",
              type: "success"
            });	
          this.$router.push({path:"/office/approvalManagement"})		
          } 
        })
        .catch(err => {
        //错误处理
        return false
        });
        }
    })
  },
  

  // 分页
	handleCurrentChange(val) {
      this.page = val;
      this.changeSelect();
	},
	// 分页
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.changeSelect();
    },
	

	// 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
	},
	// 上传错误
	uploaderror(file) {
      var aa = this.file.name;
      var ss = aa.split(".")[0];
      if (ss.match(/_+/)) {
        this.$message({
          message: "文件上传不符合规则",
          type: "success"
        });
        return false;
      }
	},
	// 上传合同附件
	uploadMainImg() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
      console.log(this.file)
      form.append("action", "UploadVMKImagePath");
      axios.post(resName.projectUpload(), form,{
              timeout:1000000000,
               onUploadProgress : progressEvent => {
                    let percent=(progressEvent.loaded / progressEvent.total * 100) | 0
                    //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                        _this.videoUploadPercent = percent
                        _this.uploadLoading = true
                }}).then(res => {
                 
            if (res.data.code === 1) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            // _this.approvalList.contract_files = res.data.data;
            var arr1 = []
            arr1.push(res.data.data)
            var obj = {};
            obj["name"] = this.file.name;
            obj["file_url"] = res.data.data;
            _this.fileList1.push(obj);
            // console.log(JSON.stringify(_this.fileList1));
            
            _this.videoUploadPercent = 0;
            _this.uploadLoading = false
          } else if (res.data.code === -2) {
            this.$message({
              message: "上传失败",
              type: "error"
            });
          }
          

            }).catch(err => {
                  reject(err);
            })
	},
	
	// 上传清单附件
	uploadMainImg1() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
      form.append("action", "UploadVMKImagePath");
      axios.post(resName.projectUpload(), form,{
			timeout:1000000000,
			onUploadProgress : progressEvent => {
				let percent=(progressEvent.loaded / progressEvent.total * 100) | 0
				//调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
					_this.videoUploadPercent = percent
					_this.uploadLoading2 = true
			}}).then(res => {
				
		if (res.data.code === 1) {
		this.$message({
			message: "上传成功",
			type: "success"
		});

    var arr2 = []
      arr2.push(res.data.data)
      var obj = {};
      obj["name"] = this.file.name;
      obj["file_url"] = res.data.data;
      _this.fileList.push(obj);
      // console.log(JSON.stringify(_this.fileList))
		_this.videoUploadPercent = 0;
		_this.uploadLoading2 = false
		} else if (res.data.code === -2) {
		this.$message({
			message: "上传失败",
			type: "error"
		});
		}
		}).catch(err => {
				reject(err);
		})
    },
 
  }
};
</script>
<style lang="less" scoped>
.el-input{
  width: 100% !important;
}
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
#container {
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
// .dockingUser {
//   width: 40%;
//   display: inline-block;
//   margin-bottom: 20px;
//   margin-right: 20px;
// }
.dockingbut {
  margin-left: 60px;
}
.gline {
  margin-bottom: 30px;
}
.specItem {
  overflow: hidden;
}
.specItem .dockingUser {
  margin-bottom: 15px;
  width: 33%;
  float: left;
}
h3 {
  width: 100%;
}
.title_line {
  width: 97%;
  height: 1px;
  border-bottom: 0.5px solid #efefef;
  margin-bottom: 34px;
  margin-left: 20px;
}
.el-select{
  width: 100% !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100% !important;
}
</style>
