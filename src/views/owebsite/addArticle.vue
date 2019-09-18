<template>
  <div id="container">
    <el-tabs type="border-card">
      <el-tab-pane label="创建文章">
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addForm"
          :hide-required-asterisk="false"
          label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input placeholder="文章标题" v-model="addForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章排序" prop="listorder">
            <el-input placeholder="排序" v-model="addForm.listorder" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章描述" prop="description">
            <el-input
              type="textarea"
              placeholder="请输入文章描述"
              v-model="addForm.description"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章标签" prop="tags">
            <el-input
              placeholder="请输入内容标签，多标签用半角逗号“,”分隔"
              v-model="addForm.tags"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章链接" prop="url">
            <el-input placeholder="如有新闻链接，可在此输入" v-model="addForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章状态" prop="status">
            <el-radio-group v-model="addForm.status" size="small">
              <el-radio-button label="0">隐藏</el-radio-button>
              <el-radio-button label="1">显示</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发布时间" prop="release_time">
            <el-date-picker
              v-model="addForm.release_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="文章头图" prop="image">
            <el-upload
              class="avatar-uploader"
              action
              :on-change="handleChange2"
              :http-request="uploadMainImg2"
              :on-success="handleAvatarSuccess2"
              :show-file-list="false"
            >
              <img v-if="addForm.image" :src="addForm.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <el-upload
              class="avatar-uploader3"
              :action="teUrl"
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
      </el-tab-pane>
    </el-tabs>
    <div class="btnBox">
      <el-button type="primary" size="small" @click="submitEdit">提交</el-button>
    </div>
  </div>
</template>
<style>
.ql-container.ql-snow {
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  height: auto;
  min-height: 200px;
  max-height: 350px;
  margin: 0px;
  position: relative;
}
.ql-editor {
  height: auto;
  min-height: 200px;
  max-height: 350px;
}
</style>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "axios";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend } from "quill-image-extend-module";
if (!Quill.imports["modules/ImageExtend"]) {
  // Register only if not exists - 仅在不存在时注册
  Quill.register("modules/ImageExtend", ImageExtend);
}
import { resName } from "../../api/api";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      file2: {},
      teUrl: "",
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入文章状态",
            trigger: "change"
          }
        ],
        release_time: [
          {
            required: true,
            message: "请输入文章发布时间",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      addForm: {
        id: "",
        cat_id: "",
        title: this.title,
        status: "",
        listorder: "",
        url: "",
        image: "",
        content: "",
        tags: "",
        description: "",
        release_time: ""
      },
      multipleSelection: [],
      listLoading: false,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "请输入商品描述",
        modules: {
          ImageExtend: {
            loading: true, // 可选参数 是否显示上传进度和提示语
            name: "img", // 图片参数名
            size: 2, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: resName.tarUrl, // 服务器地址, 如果action为空，则采用base64插入图片
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
      header: {
        // token: sessionStorage.token
      }
    };
  },
  created() {
    this.teUrl = resName.tarUrl();
  },
  methods: {
    submitEdit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          var params = {
            cat_id: this.$route.query.id,
            title: this.addForm.title,
            status: this.addForm.status,
            listorder: this.addForm.listorder,
            release_time: this.addForm.release_time,
            description: this.addForm.description,
            image: this.addForm.image,
            url: this.addForm.url,
            content: this.addForm.content,
            tags: 1
          };
          resName
            .addarticle(params)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "创建成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.$router.replace({ path: "/allArticle?id=" + params.cat_id});
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
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAvatarSuccess2(res, file) {
      this.addForm.image = URL.createObjectURL(file.raw);
    },

    // 上传文件，获取文件流
    handleChange2(file) {
      this.file2 = file.raw;
    },
    uploadMainImg2() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file2);
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
          // console.log("失败："+JSON.stringify(err));
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
        // 插入图片 res.url为服务器返回的图片地址
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
    }
  }
};
</script>

<style scoped lang="less">
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.quill-editor {
  max-height: 400px;
}

.ql-container {
  min-height: 200px;
  max-height: 350px;
}

.ql-snow .ql-picker {
  line-height: initial;
}

.title {
  font-size: 16px;
  margin-bottom: 0px;
  margin-top: 0;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 0;
}

.specBox {
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 15px;
}

.specList li {
  padding: 5px 0;
}

.shoptip {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  border: 1px dashed #f00;
  border-radius: 5px;
  line-height: 40px;
  color: red;
  text-indent: 6px;
  background: #ffffcc;
}

.upload-demo {
  display: inline-block;
}
.specItem .el-input {
  width: 200px;
}
.specItem {
  margin-bottom: 10px;
}
.el-checkbox {
  margin-right: 15px;
}
.am-table {
  width: 100%;
  border-collapse: collapse;
}
.am-table .el-input {
  width: 120px;
}
.am-table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 1px solid #ddd;
}
.am-table > thead > tr > th {
  vertical-align: middle;
}
.am-table > thead > tr > th,
.am-table > tbody > tr > td {
  padding: 0.7rem;
  line-height: 1.6;
  vertical-align: top;
  border: 1px solid #ddd;
  text-align: center;
}
span.red {
  color: #ff4e00;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  top: 12px;
}
.view-img {
  width: 30px;
}
#fileUpload {
  float: left;
}
#picker {
  float: right;
  margin: 4px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
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
}
.avatar2 {
  width: 30px;
  height: 30px;
  display: inline-block;
}
.showImg {
  position: relative;
  top: 10px;
}
.el-tabs--border-card {
  box-shadow: none;
}
#container {
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.btnBox {
  padding: 10px 5px;
  border: 1px solid #dcdfe6;
  border-top: none;
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
</style>
