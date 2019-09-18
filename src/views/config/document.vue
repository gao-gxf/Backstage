<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="getcopyList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filters.name" size="mini" placeholder="Duotel ID/推荐码/归集"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">添加文案</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="id" label="ID" min-width="80" align="center" sortable></el-table-column>
      <el-table-column prop="title" label="标题" min-width="160" align="center" sortable></el-table-column>
      <!-- <el-table-column label="内容" min-width="160" sortable>
        <template slot-scope="scope">
          <div class="contentIns" v-html="scope.row.content"></div>
        </template>
      </el-table-column> -->
      <el-table-column prop="code" label="code值" min-width="80" align="center" sortable></el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="80" align="center" sortable></el-table-column>
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
    <el-dialog title="编辑文案" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :hide-required-asterisk="true"
        :rules="editFormRules"
        ref="editForm"
        label-width="80px"
      >
        <el-form-item label="文案标题" prop="title">
          <el-input placeholder="请输入标题" v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案code" prop="code">
          <el-input placeholder="请输入code" v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案内容" prop="content">
          <!-- 图片上传组件辅助-->
          <el-upload
            class="avatar-uploader4"
            :action="upUrl"
            name="img"
            :headers="header2"
            :show-file-list="false"
            :on-success="uploadSuccess2"
            :on-error="uploadError2"
            :before-upload="beforeUpload2"
          ></el-upload>

          <quill-editor
            class="editor"
            v-model="editForm.content"
            ref="myQuillEditor"
            :options="editorOption2"
            @blur="onEditorBlur2($event)"
            @focus="onEditorFocus2($event)"
            @change="onEditorChange2($event)"
          ></quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="添加文案" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form
        :model="addForm"
        :hide-required-asterisk="true"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item label="文案标题" prop="title">
          <el-input placeholder="请输入标题" v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案code" prop="code">
          <el-input placeholder="请输入code" v-model="addForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文案内容" prop="content">
          <!-- 图片上传组件辅助-->
          <el-upload
            class="avatar-uploader3"
            :action="upUrl"
            name="img"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
          ></el-upload>

          <quill-editor
            class="editor"
            v-model="addForm.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button size="small" @click.native="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
        
      </div>
    </el-dialog>
  </section>
</template>
<style>
.ql-container.ql-snow {
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  height: auto;
      min-height:200px;
      max-height:350px;
  margin: 0px;
  position: relative;
}
.ql-editor{
      height: auto;
      min-height:200px;
      max-height:350px;
}
</style>
<script>
import { resName } from "../../api/api";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend } from "quill-image-extend-module";
if (!Quill.imports['modules/ImageExtend']) {
      // Register only if not exists - 仅在不存在时注册
      Quill.register('modules/ImageExtend', ImageExtend);
}
// Quill.register("modules/ImageExtend", ImageExtend);
export default {
  components: {
    quillEditor
  },
  data() {
    return {
          upUrl : "",
      filters: {
        name: "",
        options: [],
        value: ""
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入code",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        title: "",
        code: "",
        content: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入code",
            trigger: "change"
          }
        ]
      },
      //新增界面数据
      addForm: {
        title: "",
        code: "",
        content: ""
      },
      pageSize: 10,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "请输入商品描述",
        modules: {
          ImageExtend: {
            loading: true, // 可选参数 是否显示上传进度和提示语
            name: "img", // 图片参数名
            size: 10, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: resName.tarUrl(), // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: res => {
              if (res.code === 1) {
                this.$message({
                  message: "上传成功",
                  type: "success"
                });
                return res.data;
              }
            }
          },
          toolbar: {
            container: container,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader3 input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      editorOption2: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "请输入商品描述",
        modules: {
          ImageExtend: {
            loading: true, // 可选参数 是否显示上传进度和提示语
            name: "img", // 图片参数名
            size: 10, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: resName.tarUrl(), // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: res => {
              if (res.code === 1) {
                this.$message({
                  message: "上传成功",
                  type: "success"
                });
                return res.data;
              }
            }
          },
          toolbar: {
            container: container,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader4 input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
      header2: {
        // token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    };
  },
  created() {
        this.upUrl = resName.tarUrl();
    this.getcopyList();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getcopyList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getcopyList();
    },
    //获取文案列表
    getcopyList() {
      let para = {
        page: this.page,
        per_page: this.pageSize
      };

      this.listLoading = true;
      resName
        .copyList(para)
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
    //显示编辑弹框
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = {
        id: row.id,
        title: row.title,
        code: row.code,
        content: row.content
      };
    },
    //显示新增弹框
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        title: "",
        code: "",
        content: ""
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = this.editForm;
            resName
              .copyEdit(para)
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
                  this.getcopyList();
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
            this.addLoading = true;
            let para = this.addForm;
            // console.log(JSON.stringify(para));
            resName
              .createCopy(para)
              .then(res => {
                //数据处理
            //     console.log("获取添加用户信息：" + JSON.stringify(res));
                if (res.data.code === 1) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.addLoading = false;
                  this.addFormVisible = false;
                  this.$refs["addForm"].resetFields();
                  this.getcopyList();
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
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
    },
    onEditorBlur2() {
      //失去焦点事件
    },
    onEditorFocus2() {
      //获得焦点事件
    },
    onEditorChange2() {
      //内容改变事件
      this.$emit("input", this.content);
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    uploadSuccess(res, file) {
      // console.log(JSON.stringify(res));
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 1) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    beforeUpload2() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    uploadSuccess2(res, file) {
      // console.log(JSON.stringify(res));
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 1) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError2() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
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
/* .quill-editor {
  height: 200px;
}

.ql-container {
  height: 150px;
} */

.ql-snow .ql-picker {
  line-height: initial;
}
.contentIns {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
/*新加文本编辑器样式*/
.editor {
  line-height: normal !important;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.avatar-uploader3 {
  display: none;
}
.el-form-item.right{
      float: right;
}
.el-form-item.left{
      float: left;
}
</style>