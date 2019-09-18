<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="search">
				<el-form-item class="right" style="float:right;">
					<el-button type="primary" icon="el-icon-search" size="mini" v-on:click="formatter">查询</el-button>
				</el-form-item>
				<el-form-item class="right" style="float:right;">
					<el-input size="mini" v-model="search.name" placeholder="搜索关键字"></el-input>
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


	</section>
</template>
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
<script>
	export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				total: 0,
				listLoading:false,
				time1:"",
				time2:"",
				value1:"",
				search:{
					name:""
				},
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					remark:"备注"
				}],
			};
		},
		created:function(){
			
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

			}
		}
	}
</script>

