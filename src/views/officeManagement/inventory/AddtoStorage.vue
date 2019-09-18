<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search" class="formList" label-width="120px">
				<!-- <el-form-item class="left">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="addWare">添加</el-button>
					<el-button type="primary" size="mini" icon="el-icon-refresh-right" @click="Advanced">高级检索</el-button>
				</el-form-item> -->
				<el-form-item label="入库日期：">
					<el-date-picker
					v-model="value1"
					type="date"
					placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="供应商名称：">
					<el-select v-model="addwarehousForm.supplier_id"  placeholder="请选择" class="searchname" @change="changeSelect">
						<el-option
						v-for="item in suppliers"
						:key="item.supplier_name"
						:label="item.supplier_name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入库单号：" prop="i_order_no">
					<el-input v-model="addwarehousForm.i_order_no" placeholder="入库单号" class="searchList" disabled></el-input>
				</el-form-item>
			</el-form>
			<div v-show="wareSearch">
				<el-form :inline="true" :model="addwarehousForm" :rules="addFormRules" ref="addwarehousForm" class="demo-form-inline addware" :hide-required-asterisk="false" label-width="120px">
					<el-form-item label="供应商地址：" prop="supplier_address">
						<el-input placeholder="供应商地址" v-model="supplier_address" disabled auto-complete="off"></el-input>
					</el-form-item>
					<!-- 新改 -->
					<el-form-item label="供应商联系人：" prop="supplier_contact_people">
						<el-input placeholder="供应商联系人" v-model="supplier_contact_people" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="供应商电话：" prop="supplier_phone">
						<el-input placeholder="供应商电话" v-model="supplier_phone" disabled auto-complete="off"></el-input>
					</el-form-item>
					<!-- 新改 -->
					<el-form-item label="物料编码：" prop="material_code">
						<el-input placeholder="物料编码" v-model="addwarehousForm.material_code" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品编码：" prop="goods_cpk">
						<el-input placeholder="商品编码" v-model="addwarehousForm.goods_cpk" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品名称：" prop="goods_name">
						<el-input placeholder="商品名称" v-model="addwarehousForm.goods_name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品型号：" prop="goods_model">
						<el-input placeholder="商品型号" v-model="addwarehousForm.goods_model" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品进货单价：" prop="goods_price">
						<el-input placeholder="商品进货单价" v-model="addwarehousForm.goods_price" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品数量：" prop="goods_number">
						<el-input placeholder="商品数量" v-model="addwarehousForm.goods_number" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="商品总价：" prop="total_price">
						<el-input placeholder="商品总价" v-model="addwarehousForm.total_price" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="合计金额：" prop="total_price">
						<el-input placeholder="合计金额" v-model="addwarehousForm.total_price" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="审批人：" prop="audit_user">
						<el-input placeholder="审批人" v-model="addwarehousForm.audit_user" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="审批时间：" prop="audit_time">
						<!-- <el-input placeholder="审批时间" v-model="addwarehousForm.audit_time" auto-complete="off"></el-input> -->
						<el-date-picker
							v-model="addwarehousForm.audit_time"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="结算人：" prop="pay_user">
						<el-input placeholder="结算人" v-model="addwarehousForm.pay_user" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="结算时间：" prop="pay_time">
						<!-- <el-input placeholder="结算时间" v-model="addwarehousForm.pay_time" auto-complete="off"></el-input> -->
						<el-date-picker
							v-model="addwarehousForm.pay_time"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="经办人：" prop="agent">
						<!-- <el-input placeholder="经办人" v-model="addwarehousForm.agent" auto-complete="off"></el-input> -->
						<el-select v-model="addwarehousForm.agent" placeholder="请选择">
							<el-option
							v-for="item in agentsLists"
							:key="item.username"
							:label="item.username"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="物流单号：" prop="logistics_no">
						<el-input placeholder="物流单号" v-model="addwarehousForm.logistics_no" @change="gettrackNum" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="物流供应商：" prop="logistics_providers">
						<el-input placeholder="物流供应商" v-model="addwarehousForm.logistics_providers" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="物流状态：" prop="logistics_status">
						<el-input placeholder="物流状态" v-model="addwarehousForm.logistics_status" disabled auto-complete="off"></el-input>
						<!-- <el-select v-model="addwarehousForm.logistics_status" placeholder="请选择">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select> -->
					</el-form-item>
					<el-form-item label="物流费用：" prop="logistics_price">
						<el-input placeholder="物流费用" v-model="addwarehousForm.logistics_price" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="支付方式：" prop="pay_way">
						<el-select v-model="addwarehousForm.pay_way" placeholder="请选择">
							<el-option
							v-for="item in payWay"
							:key="item.label"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否支付：" prop="is_pay">
						<el-radio-group v-model="addwarehousForm.is_pay">
							<el-radio label="1">已支付</el-radio>
							<el-radio label="0">未支付</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="备注：" prop="desc">
						<el-input type="textarea" v-model="addwarehousForm.desc" auto-complete="off"></el-input>
						<!-- <el-input placeholder="备注" v-model="addwarehousForm.desc" auto-complete="off"></el-input> -->
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click.native="addwarehousVisible = false " @click="resetFields('addwarhousForm')">取消</el-button>
					<el-button size="small" type="primary" @click.native="addwarehousSubmit">提交</el-button>
				</div>
			</div>
		</el-col>
	<!-- 表格列表 -->
		<el-table
			:data="tableData"
			style="width: 99.9%;margin-bottom: 20px;"
			text-align="center"
			border
			v-loading="listLoading">
			<el-table-column prop="name" min-width="100" align="center" label="序号" sortable></el-table-column>
			<el-table-column prop="name" label="物料编码" align="center" sortable></el-table-column>
			<el-table-column prop="name" min-width="120" align="center" label="商品编码" sortable></el-table-column>
			<el-table-column prop="name" align="center" label="产品名称" sortable></el-table-column>
			<el-table-column prop="name" align="center" label="型号" sortable></el-table-column>
			<el-table-column prop="name" align="center" label="单价" sortable></el-table-column>
			<el-table-column prop="name" label="数量" align="center" sortable></el-table-column>
			<el-table-column prop="name" min-width="120" align="center" label="总价" sortable></el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button type="success" @click="handleDel(scope.$index, scope.row)" size="mini" plain>添加</el-button>
					<el-button
						type="success"
						@click="handleDetail(scope.$index, scope.row)"
						size="mini"
						plain
					>编辑</el-button>
					<el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="mini" plain>删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="remark" align="center" label="备注" sortable></el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-col :span="24" class="toolbar">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="pageSize"
				layout="sizes, prev, pager, next"
				:total="total">
			</el-pagination>
		</el-col>
	<!-- 添加入库单弹框 -->
	<!-- <el-dialog title="新增入库单" :visible.sync="addwarehousVisible" :close-on-click-modal="false" :show-close="true">
		<el-form :inline="true" :model="addwarehousForm" :rules="addFormRules" ref="addwarehousForm" class="demo-form-inline addware" :hide-required-asterisk="false" label-width="120px">
			<el-form-item label="供应商：" prop="supplier_id">
				<el-select v-model="addwarehousForm.supplier_id" multiple @change="changeSelect" placeholder="请选择">
					<el-option
					v-for="item in suppliers"
					:key="item.supplier_name"
					:label="item.supplier_name"
					:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="供应商地址：" prop="supplier_address">
				<el-input placeholder="供应商地址" v-model="supplier_address" disabled auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="入库单号：" prop="i_order_no">
				<el-input placeholder="入库单号" v-model="addwarehousForm.i_order_no" disabled auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="物料编码：" prop="material_code">
				<el-input placeholder="物料编码" v-model="addwarehousForm.material_code" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品编码：" prop="goods_cpk">
				<el-input placeholder="商品编码" v-model="addwarehousForm.goods_cpk" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品名称：" prop="goods_name">
				<el-input placeholder="商品名称" v-model="addwarehousForm.goods_name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品型号：" prop="goods_model">
				<el-input placeholder="商品型号" v-model="addwarehousForm.goods_model" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品进货单价：" prop="goods_price">
				<el-input placeholder="商品进货单价" v-model="addwarehousForm.goods_price" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品数量：" prop="goods_number">
				<el-input placeholder="商品数量" v-model="addwarehousForm.goods_number" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品总价：" prop="total_price">
				<el-input placeholder="商品总价" v-model="addwarehousForm.total_price" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="合计金额：" prop="total_price">
				<el-input placeholder="合计金额" v-model="addwarehousForm.total_price" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批人：" prop="audit_user">
				<el-input placeholder="审批人" v-model="addwarehousForm.audit_user" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批时间：" prop="audit_time">
				<el-date-picker
					v-model="addwarehousForm.audit_time"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="结算人：" prop="pay_user">
				<el-input placeholder="结算人" v-model="addwarehousForm.pay_user" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="结算时间：" prop="pay_time">
				<el-date-picker
					v-model="addwarehousForm.pay_time"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="经办人：" prop="agent">
				<el-select v-model="addwarehousForm.agent" placeholder="请选择">
					<el-option
					v-for="item in agentsLists"
					:key="item.username"
					:label="item.username"
					:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="物流单号：" prop="logistics_no">
				<el-input placeholder="物流单号" v-model="addwarehousForm.logistics_no" @change="gettrackNum" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="物流供应商：" prop="logistics_providers">
				<el-input placeholder="物流供应商" v-model="addwarehousForm.logistics_providers" disabled auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="物流状态：" prop="logistics_status">
				<el-input placeholder="物流状态" v-model="addwarehousForm.logistics_status" disabled auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="物流费用：" prop="logistics_price">
				<el-input placeholder="物流费用" v-model="addwarehousForm.logistics_price" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="支付方式：" prop="pay_way">
				<el-select v-model="addwarehousForm.pay_way" placeholder="请选择">
					<el-option
					v-for="item in payWay"
					:key="item.label"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否支付：" prop="is_pay">
				<el-radio-group v-model="addwarehousForm.is_pay">
					<el-radio label="1">已支付</el-radio>
					<el-radio label="0">未支付</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注：" prop="desc">
				<el-input type="textarea" v-model="addwarehousForm.desc" auto-complete="off" style="width:568px;"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click.native="addwarehousVisible = false " @click="resetFields('addwarhousForm')">取消</el-button>
			<el-button size="small" type="primary" @click.native="addwarehousSubmit">提交</el-button>
		</div>
	</el-dialog> -->

	</section>
</template>

<script>
import { resName } from "../../../api/api";
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				page: 1,
				pageSize: 10,
				total: 0,
				listLoading:false,
				wareSearch:false,
				time1:"",
				time2:"",
				supplier_id:"",
				supplier_contact_people:"",
				supplier_phone:"",
				value1:'',
				search:{
					user:""
				},
				options: [{
					value: '选项1',
					label: '黄金糕'
					}, {
					value: '选项2',
					label: '双皮奶'
					}, {
					value: '选项3',
					label: '蚵仔煎'
					}, {
					value: '选项4',
					label: '龙须面'
					}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
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
				addwarehousVisible: false, //新增是否显示
				addLoading: false,
				addFormRules: {
					supplier_id: [
					{
						required: true,
						// message: "请输入供应商id",
						trigger: "change",
					}
					],
					i_order_no: [
					{
						required: true,
						// message: "请输入订单号",
						trigger: "change"
					}
					],
					total_price: [
					{
						required: true,
						// message: "请输入合计金额",
						trigger: "change"
					}
					],
					audit_user: [
					{
						required: true,
						// message: "请输入审批人",
						trigger: "change"
					}
					],
					audit_time: [
					{
						required: true,
						// message: "请输入审批时间",
						trigger: "change"
					}
					],
					pay_user: [
					{
						required: true,
						// message: "请输入结算人",
						trigger: "change"
					}
					],
					pay_time: [
					{
						required: true,
						// message: "请输入支付时间",
						trigger: "change"
					}
					],
					agent: [
					{
						required: true,
						// message: "请输入经办人",
						trigger: "change"
					}
					],
					logistics_no: [
					{
						required: true,
						// message: "请输入物流单号",
						trigger: "change"
					}
					],
					logistics_providers: [
					{
						required: true,
						// message: "请输入物流商",
						trigger: "change"
					}
					],
					logistics_status: [
					{
						required: true,
						// message: "请输入物流状态",
						trigger: "change"
					}
					],
					logistics_price: [
					{
						required: true,
						// message: "请输入物流费用",
						trigger: "change"
					}
					],
					pay_way: [
					{
						required: true,
						// message: "请输入支付方式",
						trigger: "change"
					}
					],
					is_pay: [
					{
						required: true,
						// message: "请确认是否支付",
						trigger: "change"
					}
					],
					material_code: [
					{
						required: true,
						// message: "请输入物料编码",
						trigger: "change"
					}
					],
					goods_cpk: [
					{
						required: true,
						// message: "请输入商品编码",
						trigger: "change"
					}
					],
					goods_name: [
					{
						required: true,
						// message: "请输入商品名称",
						trigger: "change"
					}
					],
					goods_model: [
					{
						required: true,
						// message: "请输入商品型号",
						trigger: "change"
					}
					],
					goods_price: [
					{
						required: true,
						// message: "请输入商品进货单价",
						trigger: "change"
					}
					],
					goods_number: [
					{
						required: true,
						// message: "请输入商品数量",
						trigger: "change"
					}
					],
					total_price: [
					{
						required: true,
						// message: "请输入商品总价",
						trigger: "change"
					}
					],
				},
				//新增数据
				addwarehousForm: {
					supplier_id: "",
					i_order_no: "",
					order_goods:[],
					total_price:"",
					audit_user:"",
					audit_time:"",
					pay_user:"",
					pay_time:"",
					agent:"",
					logistics_no:"",
					logistics_providers:"",
					logistics_status:"",
					logistics_price:"",
					pay_way:"",
					is_pay:"",
					order_no:"",
					material_code:"",
					goods_cpk:"",
					goods_name:"",
					goods_model:"",
					goods_price:"",
					goods_number:"",
					total_price:"",
					desc:""
				},
				orderGoods:{
					material_code:"",
					goods_cpk:"",
					goods_name:"",
					goods_model:"",
					goods_price:"",
					goods_number:"",
					total_price:"",
					desc:""
				},
				supplier_address:"",
				suppliers:[],
				agentsLists:[]
			};
		},
		created:function(){
			this.supplierList();
			this.ordersList();
			this.agentsList()
		},
		methods:{
			formatter:function(){
				console.log("我是查询")
			},
			// 分页
			handleSizeChange(val) {
			//切换每页显示条数
				this.pageSize = val;
				this.formatter();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.formatter();
			},
			chooseTimeRange:function(){

			},
			// 高级检索
			Advanced:function(){
				if (this.wareSearch == false) {
					this.wareSearch = true;
				} else {
					this.wareSearch = false;
				}
			},
			changeSelect:function(value){
				this.wareSearch = true;
				this.supplier_address = '';
				for(var i=0;i<this.suppliers.length;i++){
					if(value == this.suppliers[i].id){
						this.supplier_address = this.suppliers[i].supplier_address
						this.supplier_contact_people = this.suppliers[i].supplier_contact_people
						this.supplier_phone = this.suppliers[i].supplier_phone
					}
				}
				// if(value == "1"){
				// 	this.supplier_address = "杭州"
				// }else{
				// 	this.supplier_address = "武汉"
				// }
			},
			// 添加入库
			addWare:function(){
				this.addwarehousVisible = true;
			},
			resetFields:function(){
				this.wareSearch = false;
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
			// 获取入库单号列表
			ordersList() {
			var _this = this;
			var params = {}
			resName
				.ordernoList(params)
				.then(res => {
					if (res.code === 1) {
						this.addwarehousForm.i_order_no = res.data					
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
			// 获取物流单号
			gettrackNum:function(){
				var _this = this;
				var params = {
					logistics_no:this.addwarehousForm.logistics_no
				}
				resName
				.getlogistics(params)
				.then(res => {
					if (res.code === 1) {
						this.addwarehousForm.logistics_providers = res.data.ShipperName
						this.addwarehousForm.logistics_status = res.data.State
						if(res.data.State == "2"){
							this.addwarehousForm.logistics_status = '在途中'
						}else if(res.data.State == "3"){
							this.addwarehousForm.logistics_status = '已签收'
						}else if(res.data.State == '4'){
							this.addwarehousForm.logistics_status = '问题件'
						}
					} 
				})
				.catch(err => {
				//错误处理
				return false
				});
			},
			// 添加入库单提交
			addwarehousSubmit() {
				this.$refs.addwarehousForm.validate(valid => {
        			if (valid) {
					var _this = this;
					this.orderGoods.material_code = this.addwarehousForm.material_code
					this.orderGoods.goods_cpk = this.addwarehousForm.goods_cpk
					this.orderGoods.goods_name = this.addwarehousForm.goods_name
					this.orderGoods.goods_model = this.addwarehousForm.model
					this.orderGoods.goods_price = this.addwarehousForm.goods_price
					this.orderGoods.goods_number = this.addwarehousForm.goods_number
					this.orderGoods.total_price = this.addwarehousForm.total_price
					this.orderGoods.desc = this.addwarehousForm.desc
					this.addwarehousForm.order_goods.push(this.orderGoods)
					// 判断物流状态
					if(this.addwarehousForm.logistics_status == "在途中"){
						this.addwarehousForm.logistics_status = '2'
					}else if(this.addwarehousForm.logistics_status == "已签收"){
						this.addwarehousForm.logistics_status = '3'
					}else if(this.addwarehousForm.logistics_status == '问题件'){
						this.addwarehousForm.logistics_status = '4'
					}
					let params = {
						supplier_id: this.addwarehousForm.supplier_id,
						i_order_no: this.addwarehousForm.i_order_no,
						order_goods:this.addwarehousForm.order_goods,
						total_price:this.addwarehousForm.total_price,
						audit_user:this.addwarehousForm.audit_user,
						audit_time:this.addwarehousForm.audit_time,
						pay_user:this.addwarehousForm.pay_user,
						pay_time:this.addwarehousForm.pay_time,
						agent:this.addwarehousForm.agent,
						logistics_no:this.addwarehousForm.logistics_no,
						logistics_providers:this.addwarehousForm.logistics_providers,
						logistics_status:this.addwarehousForm.logistics_status,
						logistics_price:this.addwarehousForm.logistics_price,
						pay_way:this.addwarehousForm.pay_way,
						is_pay:this.addwarehousForm.is_pay,
						order_no:this.addwarehousForm.order_no,
					}
					resName
						.addWare(params)
						.then(res => {
							if (res.code === 1) {
								// this.suppliers = res.data		
								this.$message({
									message: "添加成功",
									type: "success"
								});			
							} 
						})
						.catch(err => {
						//错误处理
						return false
						});
					}
				})
			},
		},
	}
</script>

<style lang="css" scoped>
.toolbar .el-form-item .right {
  float: right;
}
.toolbar .el-form-item .left {
  float: left;
}
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
.el-form .el-form-item{
	width:32%;
}
.el-input{
	width:300px;
}
.el-select{
	width:300px;
}
.searchname{
	width:296px;
}
.dialog-footer{
	margin-bottom:10px;
}
/* .addware .el-input{
	width:217px;
} */
</style>