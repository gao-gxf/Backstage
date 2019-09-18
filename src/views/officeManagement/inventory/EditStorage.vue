<template>
	<section>
		
	<!-- 表格列表 -->
		<el-table
			:data="tableData"
			style="width: 99.9%;margin-bottom: 20px;"
			text-align="center"
			border
			v-loading="listLoading">
			<el-table-column prop="sn" min-width="100" align="center" label="序号" sortable></el-table-column>
			<el-table-column prop="f_code" label="物料编码" align="center" sortable></el-table-column>
			<el-table-column prop="active_key" min-width="120" align="center" label="商品编码" sortable></el-table-column>
			<el-table-column prop="mac" align="center" label="产品名称" sortable></el-table-column>
			<el-table-column prop="h_name" align="center" label="型号" sortable></el-table-column>
			<el-table-column prop="r_number" align="center" label="单价" sortable></el-table-column>
			<el-table-column prop="f_code" label="数量" align="center" sortable></el-table-column>
			<el-table-column prop="active_key" min-width="120" align="center" label="总价" sortable></el-table-column>
			<el-table-column prop="mac" align="center" label="备注" sortable></el-table-column>
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

<script>
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