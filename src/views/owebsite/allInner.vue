<template>
	<section>
		<!-- 全部内容 -->
		<!--工具条-->
		<!-- 搜索栏 -->
	
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="search">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="searchlist">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="search.waName" size="mini" placeholder="请输入栏目ID/标题或文章标题"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addList">新增栏目</el-button>
        </el-form-item>
      </el-form>
    </el-col>
		<!-- 列表 -->
					<el-table
						border
						ref="multipleTable"
						:data="tableData"
						tooltip-effect="dark"
						style="width: 99.9%"
						stripe
            v-loading="listLoading"
						@selection-change="handleSelectionChange">
						<el-table-column
							prop="id"
							label="ID"
							align="center"
							width="120">
							<template slot-scope="scope">{{ scope.row.id }}</template>
						</el-table-column>
						<el-table-column
							label="栏目名称"
              min-width="200"
              align="center"
							show-overflow-tooltip>
							<template slot-scope="scope">
                <div style="text-align:left;margin-left:100px;" v-if="setshowName" v-html="scope.row.showName"></div>
                <div style="text-align:left;margin-left:100px;" v-else-if="setcatname" v-html="scope.row.catname"></div>
                </template>
						</el-table-column>
						<el-table-column
							prop="article_num"
							label="内容"
							align="center"
							show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.article_num }}</template>
						</el-table-column>
						<el-table-column
							prop="lv"
             v-if="state"
							label="排序"
							align="center"
							width="120">
							<template slot-scope="scope">{{ scope.row.lv }}</template>
						</el-table-column>
						 <el-table-column label="操作" align="center" width="250">
							<template slot-scope="scope">
								<el-button
								type="success"
								plain
								size="mini"
								@click="handleLook(scope.$index, scope.row)">查看文章</el-button>
								<el-button
								type="success"
								plain
								size="mini"
								@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button
								size="mini"
								plain
								type="danger"
								@click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
							</el-table-column>
					</el-table>
         
    <!--编辑栏目-->
    <el-dialog title="编辑栏目" :visible.sync="editFormVisible" :close-on-click-modal="false" :show-close="true">
      <el-form :model="editForm" :rules="editFormRules" class="creactivit" ref="editForm" :hide-required-asterisk="false" label-width="100px">
        <el-form-item label="栏目名称" prop="catname">
          <el-input placeholder="栏目名称" v-model="editForm.catname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目类别" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择栏目类别" style="width:100%;">
            <el-option label="正常栏目" value="0"></el-option>
            <el-option label="外链" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外链URL" prop="url">
          <el-input placeholder="外链URL" v-model="editForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目描述" prop="description">
          <el-input placeholder="栏目描述" v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目状态" prop="status">
          <el-radio-group v-model="editForm.status" size="small">
            <el-radio-button label="0">不显示</el-radio-button>
            <el-radio-button label="1">显示</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布时间" prop="create_time">
          <el-date-picker v-model="editForm.create_time"  value-format="yyyy-MM-dd" type="date" placeholder="栏目发布时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增栏目-->
    <el-dialog title="新增栏目" :visible.sync="addFormVisible" :close-on-click-modal="false" :show-close="true">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" class="creactivit" :hide-required-asterisk="false" label-width="100px">
        <el-form-item label="栏目名称" prop="catname">
          <el-input placeholder="栏目名称" v-model="addForm.catname" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item   label="父级栏目" prop="pid">
            <el-select @change="selGoods" @blur="selblur" v-model="addForm.value1" value-key="id" placeholder="请选择父级栏目" style="width:100%;">
              <el-option label="顶级栏目" value="0"></el-option>
              <el-option v-for="item in tableData" :key="item.id" :label="item.catname" :value="item" v-html="item.showName"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="栏目类别" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择栏目类别" style="width:100%;">
            <el-option label="正常栏目" value="0"></el-option>
            <el-option label="外链" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外链URL" prop="url">
          <el-input placeholder="外链URL" v-model="addForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="外链描述" prop="url_desc">
          <el-input placeholder="请输入外链描述" v-model="addForm.url_desc" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="栏目图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :http-request="uploadMainImg"
            :on-success="handleAvatarSuccess"
            v-model="addForm.image"
            :show-file-list="false"
          >
           <img v-if="addForm.image" :src="addForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目状态" prop="status">
          <el-radio-group v-model="addForm.status" size="small">
            <el-radio-button label="0">不显示</el-radio-button>
            <el-radio-button label="1">显示</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="栏目描述" prop="description">
          <el-input type="textarea" placeholder="栏目状态" v-model="addForm.description" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="发布时间" prop="release_time">
          <el-date-picker v-model="addForm.release_time"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="addFormVisible = false " @click="resetFields('addForm')">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      state:true,
      setshowName:true,
      setcatname:false,
      listLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      search: {
        waName: ""
      },
      editFormRules: {
        catname: [
          {
            required: true,
            message: "请输入栏目名称",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入栏目类别",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入栏目状态",
            trigger: "change"
          }
        ],
        create_time: [
          {
            required: true,
            message: "请输入栏目发布时间",
            trigger: "change"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入外链URL",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        listorder: "1",
        id: "",
        pid: "",
        image: "",
        catname: "",
        type: "",
        url: "",
        description: "",
        status: "",
        create_time: ""
      },
      addFormVisible: false, //新增是否显示
      addLoading: false,
      addFormRules: {
        catname: [
          {
            required: true,
            message: "请输入栏目名称",
            trigger: "change"
          }
        ],
        pid: [
          {
            required: true,
            message: "请选择栏目父级",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入栏目类别",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入栏目状态",
            trigger: "change"
          }
        ],
        release_time: [
          {
            required: true,
            message: "请输入栏目发布时间",
            trigger: "change"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入外链URL",
            trigger: "change"
          }
        ]

      },
      //新增数据
      addForm: {
        listorder: "1",
        pid: "",
        image: "",
        catname: "",
        type: "",
        url: "",
        value1:"",
        url_desc:"",
        description: "",
        status: "",
        release_time: ""
      },
      value: "",
      input: "",
      multipleSelection: [],
      listLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList: function() {
      var _this=this
      this.listLoading = true;
      resName
        .websiteList()
        .then(res => {
          //数据处理
          if (res.status === 200) {
            if (res.data.code === 1) {
              _this.tableData = res.data.data;
              console.log(_this.tableData);
              
              _this.listLoading = false;
            } else if (res.code === -7) {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.listLoading = false;
            }
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    // 查找
    searchlist(){
      var params={
        search_key:this.search.waName
      }
      if(this.search.waName == ""){
          this.state = true;
          this.setshowName=true;
          this.setcatname=false;
          this.getList()
      }
       this.listLoading = true;
      resName
        .websearchCategory(params)
        .then(res => {
          if (res.code === 1) {
            if(this.search.waName == ""){
                this.state = true,
                this.setshowName=true,
                this.setcatname=false
            }else{
              this.state = false,
              this.setshowName=false,
              this.setcatname=true
            }
            this.tableData = res.data;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
          return false;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    // 编辑
    handleEdit(index, row) {
          console.log(row.id);
      this.editFormVisible = true;
      if (row.type === 0) {
        this.type = "正常栏目";
      } else if (row.type === 1) {
        this.type = "外链";
      }
      this.editForm = {
        listorder: 1,
        id: row.id,
        pid: row.pid,
        image: row.image,
        catname: row.catname,
        type: this.type,
        url_desc: 21321,
        url:row.url,
        description: row.description,
        status: row.status,
        create_time: row.create_time
      };
    },
    // 编辑提交按钮
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
            resName
              .editcategory(this.editForm)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.$refs["addForm"].resetFields();
                  this.editFormVisible = false;
                  this.getList();
                } else if (res.code === -2) {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
                // console.log("失败："+JSON.stringify(err));
              });
        } else {
          return false;
        }
      });
    },
    // 新增
    addList: function() {
      this.addFormVisible = true;
    },
    pidVal(val){
      console.log(val);
      
    },
    // 新增提交按钮
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) { 
            this.addLoading = true;
            resName
              .addcategory(this.addForm)
              .then(res => {
                //数据处理
                if (res.data.code === 1) {
                  this.$message({
                    message: "新建成功",
                    type: "success"
                  });
                  this.$refs["addForm"].resetFields();
                  this.addFormVisible = false;
                  this.getList();
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
    //上传图片相关方法
    handleAvatarSuccess(res, file) {
      this.addForm.image = URL.createObjectURL(file.raw);
    },
    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    uploadMainImg() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
      form.append("action", "UploadVMKImagePath");
      resName
        .uploadImg(form)
        .then(res => {
          if (res.data.code === 1) {
            if(_this.addForm.image !== ""){
              let imgUrl = _this.addForm.image;
              resName.deleOldImg(imgUrl);
              }
            _this.addForm.image = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    selGoods(selVal) {
      if (selVal.pid !== undefined) {
        this.addForm.pid = selVal.pid
      } else {
        this.addForm.pid = 0;
      }
    },
    selblur(selVal){
      if (selVal.pid !== undefined) {
        this.addForm.pid = selVal.pid
      } else {
        this.addForm.pid = 0;
      }
    },
    // 新建取消
    resetFields(addForm){
        this.$refs[addForm].resetFields();
    },
    
    // 删除栏目
    handleDelete(index, row) {
      let params = {
        id: row.id
      };
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        resName
          .delcategory(params)
          .then(res => {
            //数据处理
            // console.log("获取用户详情：" + JSON.stringify(res.data));
            if (res.data.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
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
      }).catch(err => {
            //错误处理
          });
    },
    // 查看栏目下文章
    handleLook(index, row) {
      this.$router.push({ path: "/allArticle", query: { id: row.id } });
    },
    
  }
};
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
  border-radius: 4px;
}
.el-col {
  border-radius: 4px;
}


.grid-content {
  border-radius: 4px;
}
.row-bg {
  padding: 12px 10px;
  background: #fff;
}

.avatar-uploader .el-upload,
.avatar-uploader2 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader2 {
  display: inline-block;
  position: relative;
  top: 12px;
}
.avatar-uploader .el-upload:hover,
.avatar-uploader2 .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon,
.avatar-uploader-icon2 {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border:1px dashed #d9d9d9;
}
.avatar-uploader-icon2 {
  line-height: 30px;
  text-align: center;
  width: 30px;
  height: 30px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border:1px dashed #d9d9d9;
}
.avatar2 {
  width: 30px;
  height: 30px;
  display: inline-block;
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
