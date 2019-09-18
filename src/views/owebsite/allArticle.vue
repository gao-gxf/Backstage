<template>
  <section>
    <!-- 全部内容 -->
    <!--工具条-->
    <!-- 搜索栏 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filter">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="getarticleList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filter.ID" size="mini" placeholder="请输入ID / 标题"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="createList">创建文章</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表 -->
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 99.9%"
            stripe
            text-align="center"
            v-loading="listLoading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="id" label="ID" align="center" width="120">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="文章标题"
              align="center"
              width="320"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
              prop="listorder"
              label="排序"
              sortable
              align="center"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{ scope.row.listorder }}</template>
            </el-table-column>
            <el-table-column prop="view" label="浏览" sortable align="center" width="120">
              <template slot-scope="scope">{{ scope.row.view }}</template>
            </el-table-column>
            <el-table-column prop="release_time" label="发布时间" sortable align="center">
              <template slot-scope="scope">{{ scope.row.release_time }}</template>
            </el-table-column>
            <el-table-column prop="is_top" label="是否置顶" sortable align="center">
              <template slot-scope="scope">{{ scope.row.is_top | filter2 }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  v-if="scope.row.status == 0"
                  plain
                  size="mini"
                  @click="enable(scope.row.id)"
                >显示</el-button>
                <el-button
                  type="danger"
                  v-else-if="scope.row.status == 1"
                  plain
                  size="mini"
                  @click="enable(scope.row.id)"
                >隐藏</el-button>
                <el-button
                  type="success"
                  plain
                  size="mini"
                  @click.native="handleLook(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  plain
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "axios";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend } from "quill-image-extend-module";
if (!Quill.imports['modules/ImageExtend']) {
      // Register only if not exists - 仅在不存在时注册
      Quill.register('modules/ImageExtend', ImageExtend);
}
// Quill.register("modules/ImageExtend", ImageExtend);
import { resName } from "../../api/api";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      teUrl: "",
      filter: {
        ID: ""
      },
      file1: {},
      file2: {},
      tableData: [],
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      discontinue: false,
      enableing: false,
      discontinues: false,
      enabling: false,
      enables: {
        id: "",
        status: ""
      },
      
      value: "",
      input: "",
      total: 43,
      pageSize: 10,
      page: 1,
      multipleSelection: [],
      listLoading: false,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      
      header: {
        // token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    };
  },
  created() {
    this.teUrl = resName.tarUrl();
    
  },
  mounted() {
    this.getarticleList();
  },
  methods: {
    // 获取列表
    getarticleList: function() {
      let id = window.location.href.split("=")[1];
      let params = {
        cat_id: id,
        order_field: "release_time",
        order_type: "desc",
        search_key: this.filter.ID
      };
      this.listLoading = true;
      resName
        .articleList(params)
        .then(res => {
          //数据处理
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.tableData = res.data.data
              
              this.listLoading = false;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
      handleAvatarSuccess1(res, file) {
      this.editForm.image = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.addForm.image = URL.createObjectURL(file.raw);
    },
    // 上传文件，获取文件流
    handleChange1(file) {
      this.file1 = file.raw;
    },
    handleChange2(file) {
      this.file2 = file.raw;
    },
    uploadMainImg1() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file1);
      form.append("action", "UploadVMKImagePath");
      resName
        .uploadImg(form)
        .then(res => {
          if (res.data.code === 1) {
            _this.editForm.image = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
        });
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
            _this.addForm.image = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
        });
    },
    // 启用
    enable(id) {
      this.enables.id = id;
      let obj = {};
      obj = this.tableData.find(item => {
        //这里的tablelist就是上面遍历的数据源
        return item.id === id; //筛选出匹配数据
      });
      this.enables.status = obj.status == 1 ? 0 : 1;
       const h = this.$createElement;
        this.$msgbox({
          title: '提示',
           type: 'warning',
          message:
          obj.status == 1 ?  h('div', null, [
            h('div', null, '确定要隐藏此文章吗？ ')
          ]):h('div', null, [
            h('div', null, '确定要显示此文章吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(action => { 
          resName.webarticlerelease(this.enables).then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.Abilitazione = false;
                this.getarticleList();
              } else if (res.code === -2) {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            })
          })
          .catch(err => {
              //错误处理
            });
    },
   
   
    
    // 新增
    createList: function() {
      let id = window.location.href.split("=")[1];
      this.$router.push({ path: "/addArticle", query: {id:id,cad:2}})
    },
    
    // 删除文章
    handleDelete(index, row) {
      let params = {
        id: row.id,
        cat_id: row.cat_id
      };
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => { 
            resName
              .delarticle(params)
              .then(res => {
                //数据处理
                // console.log("获取用户详情：" + JSON.stringify(res.data));
                if (res.data.code === 1) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  this.getarticleList();
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
    },
    // 查看文章下编辑
    handleLook(index, row) {
      this.$router.push({ path: "/editArticles", query: { id: row.id} });
    },
  },
  filters: {
    
    // 是否置顶
    filter2: function(value) {
      if (value == 0) {
        return "不置顶";
      } else if (value == 1) {
        return "置顶";
      }
    }
  }
};
</script>

<style scoped lang="less">
body {
  padding-right: 0 !important ;
}
.el-row {
  margin-bottom: 10px;
  border-radius: 4px;
}
.el-col {
  border-radius: 4px;
}
.center {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.el_co_r {
  color: red;
}
.el-dialog {
  width: 60%;
}
.grid-content {
  border-radius: 4px;
}
.row-bg {
  padding: 12px 10px;
  background: #fff;
}
.el-table td,
.el-table th {
  text-align: center;
}
.imgshow {
  width: 100%;
  height: 100px;
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
  border: 1px dashed #d9d9d9;
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
  border: 1px dashed #d9d9d9;
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

</style>
