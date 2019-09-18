<template>
  <section>
    <!-- 全部内容 -->
    <!--工具条-->
    <!-- 搜索栏 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
              <el-form :inline="true" :model="search">
                <el-form-item class="right">
                  <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="getlist">查询</el-button>
                </el-form-item>
                <el-form-item class="right">
                  <el-input v-model="search.name" size="mini" placeholder="Duotel ID/推荐码/名称/归集"></el-input>
                </el-form-item>
                <el-form-item class="left">
                  <el-button type="primary" size="mini" icon="el-icon-plus" @click="Establish">添加消息</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          <el-table
            :data="tablelist"
            style="width: 99.9%;margin-bottom: 20px;"
            border
            ref="multipleTable"
            tooltip-effect="dark"
            text-align="center"
            v-loading="listLoading">
            <el-table-column prop="id" width="70" label="ID" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" sortable align="center"></el-table-column>
            <el-table-column prop="content" label="内容" sortable align="center"></el-table-column>
            <el-table-column prop="desc" label="描述" sortable align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  plain
                  size="mini"
                  @click="problemEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <!-- <el-button
                  size="mini"
                  plain
                  type="danger"
                  @click="handleLook(scope.$index, scope.row)"
                >查看</el-button> -->
              </template>
            </el-table-column>
          </el-table>
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
	  <!-- 编辑 -->
    <el-dialog title="编辑活动" :visible.sync="editorialActivities" :show-close="true" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        class="creactivit"
        :hide-required-asterisk="true"
        label-width="50px"
        
      >
        <el-form-item label="标题" prop="title">
          <el-input placeholder="标题" v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input placeholder="内容" v-model="editForm.content" auto-complete="off"></el-input>
        </el-form-item>
		<el-form-item label="描述" prop="desc">
          <el-input placeholder="描述" v-model="editForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editorialActivities = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
	  <!-- 创建 -->
    <el-dialog title="创建消息" :visible.sync="addActivities" :show-close="true" :close-on-click-modal="false">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        class="creactivit"
        :hide-required-asterisk="true"
        label-width="50px">
        <el-form-item label="标题" prop="title">
          <el-input placeholder="标题" v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input placeholder="内容" v-model="addForm.content" auto-complete="off"></el-input>
        </el-form-item>
		<el-form-item label="描述" prop="desc">
          <el-input placeholder="描述" v-model="addForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small"  @click="resetFields('addForm')">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
	<!-- <el-dialog title="查看消息" :visible.sync="lookProblem" :close-on-click-modal="false">
      <el-form
        :model="lookForm"
        ref="lookForm"
        class="creactivit"
		disabled
        :hide-required-asterisk="true"
        label-width="100px">
          <el-form-item label="标题" prop="title">
          <el-input v-model="lookForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="lookForm.content" auto-complete="off"></el-input>
        </el-form-item>
		<el-form-item label="描述" prop="desc">
          <el-input  v-model="lookForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    </el-col>
  </section>
</template>

<script>
import { resName } from "../../../api/api";
export default {
  data() {
    return {
    tablelist: [],
    search:{
      name:""
    },
		activityType: false,
		page: 1,
		pageSize: 10,
		total:0,
		editorialActivities:false,
		addActivities:false,
		lookProblem:false,
		// 编辑
		editForm:{
			id:"",
			title:"",
			content:"",
			desc:""
		},
		editFormRules:{
			title:[
				{
					required: true,
					message: "请选择问题",
					trigger: "change"
				}
			],
			content:[
				{
					required: true,
					message: "请选择答案",
					trigger: "change"
				}
			],
			desc:[
				{
					required: true,
					message: "请选择答案",
					trigger: "change"
				}
			],
		},
		//创建
		addForm:{
			title:"",
			content:"",
			desc:""
		},
		addFormRules:{
			title:[
				{
					required: true,
					message: "请选择问题",
					trigger: "change"
				}
			],
			content:[
				{
					required: true,
					message: "请选择答案",
					trigger: "change"
				}
			],
			desc:[
				{
					required: true,
					message: "请选择答案",
					trigger: "change"
				}
			],
		},
		// 查看
		lookForm:{
			id:"",
			title:"",
			content:"",
			desc:""
		}
	};
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      var params = {
        per_page: this.pageSize,
        page: this.page
      };
      this.listLoading = true;
      resName
        .configmessageList(params)
        .then(res => {
          this.total = res.data.total;
          if (res.code === 1) {
            this.tablelist = res.data.data;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
          return false;
        });
	},
	 //切换每页显示条数
	 handleSizeChange(val) {
      this.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
	// 高级检索活动状态
    Advanced() {
    //   if (this.activityType == false) {
    //     this.activityType = true;
    //   } else {
    //     this.activityType = false;
    //   }
    },
   // 编辑
    problemEdit(index, row) {
		this.editorialActivities=true;
		this.editForm = {
			id:row.id,
			content:row.content,
			desc:row.desc,
			title:row.title
		}
	},
	// 编辑提交
	editSubmit(){
		this.$refs.editForm.validate(valid => {
        if (valid) {
          
			  var params = {
				  id:this.editForm.id,
				  title:this.editForm.title,
				  desc:this.editForm.desc,
				  content:this.editForm.content
			  }
            resName
              .configmessageEdit(params)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.$refs['editForm'].resetFields();
                  this.editorialActivities = false;
                  this.getlist();
                } else if (res.code === -2) {
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
      });
	},
	// 查看
    handleLook(index, row) {
		this.lookProblem = true;
		this.lookForm = {
			id:row.id,
			content:row.content,
			desc:row.desc,
			title:row.title
		}
	},
	// 新建
	Establish(){
		this.addActivities = true;
		// 重置
		if(this.$refs.addForm){
            this.$refs.addForm.resetFields();
        }
	},
	// 新建取消
    resetFields(addForm){
		this.$refs[addForm].resetFields();
		this.addActivities = false
    },
	// 创建提交
	addSubmit(){
		this.$refs.addForm.validate(valid => {
			if (valid) {
				resName
				.configmessageAdd(this.addForm)
				.then(res => {
					//数据处理
					if (res.data.code === 1) {
					this.$message({
						message: "创建成功",
						type: "success"
					});
          this.addActivities = false;
          this.$refs['addForm'].resetFields();
					this.getlist();
					} else if (res.code === -2) {
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
		});
	}
	
  }
};
</script>

<style lang="less" scoped>
.el_top {
  background: white;
  padding: 10px;
  margin-bottom: 20px;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.el-form-item.right{
      float: right;
}
.el-form-item.left{
      float: left;
}
</style>

