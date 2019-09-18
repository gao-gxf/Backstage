<template>
  <section>
        <!--工具条-->
    <el-col :span="24" class="row-bg" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input  size="mini" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" >查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

		<el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>
	
  </section>
</template>

<script>
export default {
  data() {
    return {
			tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
		};
	},
	  methods: {
      formatter(row, column) {
        return row.address;
      }
    }
};
</script>

<style>
.row-bg {
  padding: 12px 10px;
  background: #fff;
  margin-bottom: 20px;
}

.input-with-select{
	float: right;
}
.el-table__row td{
	text-align: center;
}
.has-gutter th{
	text-align: center;
}
</style>
