<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search">
				<el-form-item class="left" style="float:left;">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="AddtoStorage">添加</el-button>
				</el-form-item>
				<el-form-item class="left" style="float:left;">
					<!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="AddtoStorage">添加</el-button> -->
					<el-select v-model="value1" multiple placeholder="请选择" size="small">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-col>
	<!-- 表格列表 -->
		<el-table
			:data="tableData"
			style="width: 99.9%;margin-bottom: 20px;"
			text-align="center"
			border
			v-loading="listLoading">
			<el-table-column prop="name" label="序号" align="center" sortable></el-table-column>
			<el-table-column prop="name" label="物料编码" align="center" sortable></el-table-column>
			<el-table-column prop="name" min-width="120" align="center" label="商品编码" sortable></el-table-column>
			<el-table-column prop="name" align="center" label="产品名称" sortable></el-table-column>
			<el-table-column prop="name" align="center" label="型号" sortable></el-table-column>
			<el-table-column prop="name" align="center" label="单价" sortable></el-table-column>
			<el-table-column prop="name" label="数量" align="center" sortable></el-table-column>
			<el-table-column prop="name" min-width="120" align="center" label="总价" sortable></el-table-column>
			<el-table-column prop="mac" align="center" label="备注" sortable></el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button
						type="success"
						@click="handleDetail(scope.$index, scope.row)"
						size="mini"
						plain
					>详情</el-button>
					<el-button type="success" @click="handleEdit(scope.$index, scope.row)" size="mini" plain>编辑</el-button>
					<el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="mini" plain>删除</el-button>
				</template>
			</el-table-column>
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
	<!--新增入库单-->
		<el-dialog title="新增入库单" :visible.sync="addwarehousVisible" :close-on-click-modal="false" :show-close="true">
			<el-form :model="addwarehousForm" :rules="addFormRules" ref="addwarehousForm" class="creactivit" :hide-required-asterisk="false" label-width="100px">
				<el-form-item label="入库单号" prop="order_no">
				<el-input placeholder="入库单号" v-model="addwarehousForm.order_no" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="入库日期" prop="order_no">
				<el-input placeholder="入库日期" v-model="addwarehousForm.order_no" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称" prop="order_no">
				<el-input placeholder="供应商名称" v-model="addwarehousForm.order_no" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="供应商地址" prop="order_no">
					<el-select v-model="value1" multiple placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click.native="addwarehousVisible = false " @click="resetFields('addwarhousForm')">取消</el-button>
				<el-button size="small" type="primary" @click.native="addwarehousSubmit">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				addwarehousVisible: false, //新增是否显示
				addLoading: false,
				addFormRules: {
					order_no: [
					{
						required: true,
						message: "请输入订单号",
						trigger: "change"
					}
					]
				},
				//新增数据
				addwarehousForm: {
					project_id: "",
					duotel_id: "",
					order_no:"",
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
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
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
		created:function(){
			
		},
		methods:{
			AddtoStorage(){
				this.$router.push({path:"/office/inventory/AddtoStorage"})
			},
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
			// 详情
			handleDetail:function(){
				this.$router.push({path:"/office/inventory/DetailStorage"})
			},
			// 编辑
			handleEdit:function(){
				this.$router.push({path:"/office/inventory/EditStorage"})
			},
			// 添加入库单提交按钮
			addwarehousSubmit:function(){
			},
			// 添加
			handleAdd:function(){
				this.addwarehousVisible = true;
			}
		}
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

</style>