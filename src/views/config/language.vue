<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        

        <!-- <el-form-item>
          <el-input v-model="filters.name" size="mini" placeholder="Duotel ID/推荐码/归集"></el-input>
        </el-form-item> -->
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="getLanguageList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-select v-model="filters.value" size="mini" placeholder="请选择所属页面">
                <el-option label="请选择所属页面" value=""></el-option>
            <el-option
              v-for="(item,index) in filters.options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">添加语言</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table border :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="id" label="ID" min-width="80" align="center" sortable></el-table-column>
      <el-table-column prop="lang_code" label="语言code" min-width="120" align="center" ></el-table-column>
      <el-table-column prop="lang_page" label="语言页面" min-width="100" align="center" ></el-table-column>
      <el-table-column prop="lang_type" label="语言类型" min-width="80" align="center" ></el-table-column>
      <el-table-column prop="lang_value" label="语言值" min-width="120" align="center" ></el-table-column>
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
          >编辑</el-button>
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

    <!--编辑界面-->
    <el-dialog title="编辑语言" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="editFormRules" :hide-required-asterisk="true" ref="editForm" label-width="80px">
        <el-form-item label="语言名称" prop="lang_type">
          <el-input placeholder="请输入语言名称" v-model="editForm.lang_type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属页面" prop="lang_page">
          <el-input placeholder="请输入所属页面" v-model="editForm.lang_page" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="语言key" prop="lang_code">
          <el-input placeholder="请输入语言key" v-model="editForm.lang_code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面值" prop="lang_value">
          <el-input placeholder="请输入页面展示值" v-model="editForm.lang_value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加语言" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :hide-required-asterisk="true" :rules="addFormRules" ref="addForm" label-width="80px">
        <el-form-item label="语言名称" prop="lang_type">
          <el-input placeholder="请输入语言名称" v-model="addForm.lang_type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属页面" prop="lang_page">
          <el-input placeholder="请输入所属页面" v-model="addForm.lang_page" auto-complete="off"></el-input>
        </el-form-item>
        <div class="langItem" v-for="(item,index) in langArr" :key="index">
          <el-form-item label="语言key">
            <el-input placeholder="请输入语言key" v-model="item.langKey" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="页面值">
            <el-input placeholder="请输入页面展示值" v-model="item.langValue" auto-complete="off"></el-input>
          </el-form-item>
          <el-button
            :type="item.isFirst?'success': 'warning'"
            @click="addLangItem(index,item.isFirst)"
          >{{item.isFirst?"添加": "删除"}}</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
        
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import util from '../../common/js/util'
// import NProgress from 'nprogress'
import { resName } from "../../api/api";
export default {
  data() {
    return {
      langArr: [
        {
          langKey: "",
          langValue: "",
          isFirst: true
        }
      ],
      filters: {
        name: "",
        options: [],
        value: ""
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        lang_type: [
          {
            required: true,
            message: "请输入语言名称",
            trigger: "change"
          }
        ],
        lang_page: [
          {
            required: true,
            message: "请输入所属页面",
            trigger: "change"
          }
        ],
        lang_code: [
          {
            required: true,
            message: "请输入语言key",
            trigger: "change"
          }
        ],
        lang_value: [
          {
            required: true,
            message: "请输入页面展示值",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        lang_type: "",
        lang_page: "",
        lang_code: "",
        lang_value: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        lang_type: [
          {
            required: true,
            message: "请输入语言名称",
            trigger: "change"
          }
        ],
        lang_page: [
          {
            required: true,
            message: "请输入所属页面",
            trigger: "change"
          }
        ]
      },
      //新增界面数据

      addForm: {
        lang_type: "",
        lang_page: "",
        lang_data: {}
      },
      pageSize: 10
    };
  },
  created() {
        this.getLanguagePage();
    this.getLanguageList();
  },
  mounted() {},
  methods: {
        //获取多语言所属页面
        getLanguagePage(){
              let para = {};
              resName
            .getLanguagePage(para)
            .then(res => {
                  //数据处理
                  //console.log("多语言所属页面：" + JSON.stringify(res));
                  if (res.code === 1) {
                        this.filters.options = res.data;
                  } else if (res.code === -7) {
                        this.$message({
                        message: res.msg,
                        type: "error"
                        });
                  }
            })
            .catch(err => {
            //错误处理
            // console.log("失败："+JSON.stringify(err));
            this.listLoading = false;
            });
        },
    addLangItem(index, state) {
      if (state) {
        var obj = {
          langKey: "",
          langValue: "",
          isFirst: false
        };
        this.langArr.push(obj);
      } else {
        this.langArr.splice(index, 1);
      }
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getLanguageList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getLanguageList();
    },
    //获取多语言列表
    getLanguageList() {
      let para = {
        page: this.page,
        per_page: this.pageSize,
        lang_page: this.filters.value
      };

      this.listLoading = true;
      resName
        .getLanguageList(para)
        .then(res => {
          //数据处理
          //console.log("多语言列表信息：" + JSON.stringify(res));
          if (res.code === 1) {
            this.total = res.data.total;
            this.users = res.data.data;
            this.listLoading = false;
          } else if (res.code === -7) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      // console.log(JSON.stringify(row));
      this.editForm = {
        id: row.id,
        lang_type: row.lang_type,
        lang_page: row.lang_page,
        lang_code: row.lang_code,
        lang_value: row.lang_value
      };
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = this.editForm;
            resName
              .LanguageEdit(para)
              .then(res => {
                //数据处理
                //console.log("获取编辑用户信息：" + JSON.stringify(res));
                if (res.data.code === 1) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.editLoading = false;
                  this.editFormVisible = false;
                  this.$refs["editForm"].resetFields();
                  this.getLanguageList();
                } else if (res.data.code === -7) {
                  this.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //错误处理
                // console.log("失败："+JSON.stringify(err));
              });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            var main = this.langArr;
            var obj = {};
            for (var i = 0; i < main.length; i++) {
              if (main[i].langKey === "") {
                this.$message({
                  message: "请输入第" + (i + 1) + "行的语言key",
                  type: "warning"
                });
                return false;
              } else if (main[i].langValue === "") {
                this.$message({
                  message: "请输入第" + (i + 1) + "行的页面展示值",
                  type: "warning"
                });
                return false;
              }
              obj[main[i].langKey] = main[i].langValue;
            }
            this.addLoading = true;
            this.addForm.lang_data = obj;
            let para = this.addForm;
            // console.log(JSON.stringify(para));
            resName
              .LanguageAdd(para)
              .then(res => {
                //数据处理
            //     console.log("获取添加用户信息：" + JSON.stringify(res));
                if (res.data.code === 1) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.addForm = {
                    lang_type: "",
                    lang_page: "",
                    lang_data: {}
                  };
                  this.langArr = [
                    {
                      langKey: "",
                      langValue: "",
                      isFirst: true
                    }
                  ];
                  this.addLoading = false;
                  this.addFormVisible = false;
                  this.$refs["addForm"].resetFields();
                  this.getLanguageList();
                } else if (res.code === -7) {
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
          });
        }
      });
    }
  }
};
</script>

<style>
.el-dialog__header {
  border-bottom: 1px solid #ddd;
  background: #ddd;
}
.el-dialog__footer {
  border-top: 1px solid #ddd;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.langItem .el-form-item {
  width: 40%;
  margin-right: 1%;
  display: inline-block;
}
.langItem .el-button {
  width: 16%;
  display: inline-block;
  float: right;
}
.el-form-item.right{
      float: right;
}
.el-form-item.left{
      float: left;
}
</style>