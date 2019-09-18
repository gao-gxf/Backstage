<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item class="right"  style="float:right;">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="brandList">查询</el-button>
        </el-form-item>
        <el-form-item class="right" style="float:right;">
          <el-input v-model="search.name" size="mini" placeholder="搜索关键字"></el-input>
        </el-form-item>
        
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">创建品牌</el-button>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" @click="createBrand">品牌管理</el-button>
        </el-form-item>
        
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="brandLists"
      highlight-current-row
      text-align="center"
      v-loading="listLoading"
      style="width: 99.9%;"
      border>
      <el-table-column label="子品牌名称" align="center">
        <template slot-scope="scope">
          <p v-html="scope.row.son_name"></p>
        </template>
      </el-table-column>

      <el-table-column label="品牌名称" align="center">
        <template slot-scope="scope">
          <p v-html="scope.row.project_brand_name"></p>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
          >编辑</el-button>
          <el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!--工具条-->
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
    </el-col>

    <!-- 编辑 -->
    <el-dialog
      title="编辑项目品牌"
      height="30%"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      >
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="80px"
      >
       <!-- <el-form-item label="项目品牌">
          <el-select
            @change="selGoods"
            value-key="id"
            placeholder="请选项目品牌"
          >
            <el-option
              v-for="item in source"
              :key="item.id"
              :label="item.project_brand_name"
              v-html="item.showName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="品牌名称" prop="project_brand_name">
          <el-input placeholder="请输入品牌名称" v-model="editForm.project_brand_name" class="input-with-select"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 创建 -->
    <el-dialog
      title="创建品牌"
      height="30%"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
       >
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
      <el-form-item label="品牌" prop="project_brand_name">
           <el-select
           v-model="addForm.equtype"
            @change="selGoods"
            value-key="id"
            placeholder="请选项目品牌"
            style="display:block;"
           >
          <el-option value="请选品牌类型">请选品牌类型</el-option>
            <el-option
              v-for="item in source"
              :key="item.id"
              :label="item.project_brand_name"
              v-html="item.showName"
              :value="item"
            ></el-option>
          </el-select>
          
        </el-form-item>
        <el-form-item label="子品牌" prop="project_brand">
          <el-input placeholder="请输入子品牌名称" v-model="addForm.project_brand" class="input-with-select"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit">确定</el-button>
      </div>
    </el-dialog>



  <!-- 创建新品牌弹框 -->
  <el-dialog
      title="管理品牌"
      height="30%"
      :visible.sync="createFormVisible"
      :close-on-click-modal="false"
      >
      <el-form
        :model="createForm"
        :hide-required-asterisk="true"
        :rules="createFormRules"
        ref="createForm"
        label-width="80px"
      >
      <el-form-item label="品牌名称" prop="project_brand_name">
        <el-input placeholder="请输入品牌名称" v-model="createForm.project_brand_name" class="input-with-select"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="createFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="createSubmit">确定</el-button>
      </div>
    </el-dialog>








  </section>
</template>
<script>
import { resName } from "../../../api/api";
export default {
  data() {
    return {
      listLoading: false,
      source: [],
      addFormVisible: false,
      editFormVisible: false,
      createFormVisible:false,
      brandLists:[],
       pageSize: 10,
      total: 0,
      page: 1,
      search:{
        name:""
      },
      addForm: {
        equtype:"",
        project_brand: "",
        pid:"",
        id:""
      },
      addFormRules: {
        project_brand: [
          {
            required: true,
            message: "请输入品牌名称",
            trigger: "change"
          }
        ]
      },
      editForm: {
        project_brand_name: "",
         pid:"",
        id:""
      },
      editFormRules: {
        project_brand_name: [
          {
            required: true,
            message: "请输入品牌名称",
            trigger: "change"
          }
        ]
      },
      // 创建新品牌
      createForm: {
        project_brand_name: "",
        pid:"",
        id:""
      },
      createFormRules: {
        project_brand_name: [
          {
            required: true,
            message: "请输入品牌名称",
            trigger: "change"
          }
        ]
      },
      Source:[]
    };
  },
  created() {
    this.commonsdata();
    this.getBrandList();
  },
  methods: {
    selGoods(selVal){
      console.log(selVal);
      
      if (selVal.project_brand_name !== undefined) {
        this.addForm.pid = selVal.id;
      } else {
        this.addForm.equtype = selVal;
        this.addForm.pid = 0;
      }
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getBrandList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getBrandList();
    },
    // 查询品牌列表
    brandList:function(){
      this.getBrandList()
    },
    // 品牌列表
    getBrandList:function(){
      let params = {
        page: this.page,
        per_page: this.pageSize,
        searchKey:this.search.name
      };
      resName
        .projectBrandList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.brandLists = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    
    //   获取列表
    commonsdata() {
      resName
        .projectBrandTree()
        .then(res => {
            //   console.log(JSON.stringify(res.data));
          //数据处理
          if (res.code === 1) {
            this.source = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 创建级别
    handleAdd() {
      this.addFormVisible = true;
    },
    // 确定提交
    addSubmit() {
       this.$refs.addForm.validate(valid => {
           if (valid) {
             if(this.addForm.equtype === ""){
                  _this.addForm.pid = 0;
            }
       let params = {
        pid: this.addForm.pid,
        project_brand_name: this.addForm.project_brand
      };
      resName
        .addProjectBrand(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.addFormVisible = false;
            this.commonsdata();
            this.$refs["addForm"].resetFields();
          } else if (res.data.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
           }
       })
    },
    // 编辑
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editForm.id = row.id;
      this.editForm.pid = row.pid;
      this.editForm.project_brand_name = row.project_brand_name
      console.log(row);
    },
    // 编辑提交
    editSubmit() {
       this.$refs.editForm.validate(valid => {
           if (valid) {
      let params = {
        id: this.editForm.id,
        pid: this.editForm.pid,
        project_brand_name: this.editForm.project_brand_name
      };
      resName
        .editProjectBrand(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.editFormVisible = false;
            this.commonsdata();
          } else if (res.data.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
           }
       })
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      }).then(() => {
        let params = {
          id: row.id,
          // pid:row.pid
        };
        resName
          .delProjectBrand(params)
          .then(res => {
            //数据处理
            if (res.data.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.commonsdata();
            } else if (res.code === -2) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            //错误处理
            return false;
          });
      });
    },
    // 创建新品牌
    createBrand:function(){
      this.createFormVisible = true;
      // this.$router.push({
      //   path: "/project/projectSet/brandManagement"
      // })
    },
    // 创建新品牌确定按钮
    createSubmit:function(){
      console.log("确定创建新品牌")
      this.$refs.createForm.validate(valid => {
        if (valid) {
        //   if(this.createForm.equtype === ""){
        //   _this.createForm.pid = 0;
        // }
       let params = {
        pid: 0,
        project_brand_name: this.createForm.project_brand_name
      };
      resName
        .addProjectBrand(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.createFormVisible = false;
            this.commonsdata();
            this.$refs["createForm"].resetFields();
          } else if (res.data.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
           }
       })











    }
  }
};
</script>
<style lang="less" scoped>
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.el-form-item.left {
  float: left;
}
</style>
