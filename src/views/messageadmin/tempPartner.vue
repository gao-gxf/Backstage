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
          <el-input v-model="search.waName" size="mini" placeholder="搜索关键字"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addList">新增消息模板</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      align="center"
      tooltip-effect="dark"
      style="width: 99.9%;margin-bottom: 20px;"
      v-loading="listLoading">
      <el-table-column prop="id" label="ID" align="center" width="80" sortable></el-table-column>
      <el-table-column label="消息类型" width="120" sortable align="center">
        <template slot-scope="scope">
          <p
            v-for="item in commonsType"
            v-if="scope.row.msg_type == item.class_code"
          >{{item.class_value}}</p>
        </template>
      </el-table-column>
      <el-table-column label="模板类型" width="120" sortable align="center">
        <template slot-scope="scope">
          <p v-for="item in commonsData"
            v-if="scope.row.tpl_type == item.class_code"
          >{{item.class_value}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" sortable></el-table-column>
      <el-table-column prop="desc" label="模板说明" align="center" sortable></el-table-column>
      <el-table-column label="内容" align="center" sortable>
        <template slot-scope="scope">
          <p v-html="scope.row.content" style="max-height:86px;overflow:hidden"></p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button
            type="success"
            plain
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
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
    <!-- 编辑 -->
    <el-dialog
      title="编辑消息模板"
      :visible.sync="editorialActivities"
      :show-close="true"
      :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        class="creactivit"
        :hide-required-asterisk="false"
        label-width="100px"
      >
        <el-form-item label="消息类型" prop="msg_type">
          <template>
            <el-select placeholder="请选择消息类型" v-model="editForm.msg_type" style="width:100%;">
              <el-option
                v-for="item in commonsType"
                :key="item.class_code"
                :value="item.class_value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="模板类型" prop="tpl_type">
          <el-select v-model="editForm.tpl_type" placeholder="请选择模板类型" style="width:100%;">
            <el-option v-for="item in commonsData" :key="item.class_code" :value="item.class_value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板标题" prop="title">
          <el-input placeholder="请输入标题" v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板code" prop="code">
          <el-input placeholder="请输入code内容" v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <!-- <el-input placeholder="请输入内容" type="textarea" v-model="editForm.content" auto-complete="off"></!-->
         <el-upload
              class="avatar-uploader3"
              :action="upUrl"
              name="img"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
              </el-upload>

              <quill-editor 
              class="editor"
              v-model="editForm.content"
              ref="myQuillEditor" 
              :options="editorOption" 
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
              </quill-editor>
        </el-form-item>
        <el-form-item label="模板说明" prop="desc">
          <el-input placeholder="请输入模板说明" v-model="editForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editorialActivities = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!--新增创建-->
    <el-dialog
      title="创建模板"
      :visible.sync="addFormVisible"
      :show-close="true"
      :close-on-click-modal="false">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        class="creactivit"
        :hide-required-asterisk="false"
        label-width="100px"
      >
        <el-form-item label="消息类型" prop="msg_type">
          <template>
            <el-select placeholder="请选择消息类型" v-model="addForm.msg_type" style="width:100%;">
              <el-option
                v-for="item in commonsType"
                :key="item.class_code"
                :value="item.class_value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="模板类型" prop="tpl_type">
          <el-select v-model="addForm.tpl_type" placeholder="请选择模板类型" style="width:100%;">
            <el-option v-for="item in commonsData" :key="item.class_code" :value="item.class_value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板标题" prop="title">
          <el-input placeholder="请输入标题" v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板code" prop="code">
          <el-input placeholder="请输入code内容" v-model="addForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <!-- <el-input type="textarea" placeholder="请输入内容" v-model="addForm.content" auto-complete="off"></el-input> -->
        <el-upload
              class="avatar-uploader3"
              :action="upUrl"
              name="img"
              :headers="header"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
              </el-upload>

              <quill-editor 
              class="editor"
              v-model="addForm.content"
              ref="myQuillEditor" 
              :options="editorOption" 
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
              </quill-editor>
        </el-form-item>
        <el-form-item label="模板说明" prop="desc">
          <el-input placeholder="请输入模板说明" v-model="addForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetFields('addForm')">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit">提交</el-button>
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
import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
      import "quill/dist/quill.bubble.css";
      import axios from 'axios';
	import {
		quillEditor,Quill
      } from "vue-quill-editor";
      import {container, ImageExtend} from 'quill-image-extend-module'
      if (!Quill.imports['modules/ImageExtend']) {
            // Register only if not exists - 仅在不存在时注册
            Quill.register('modules/ImageExtend', ImageExtend);
      }
import { resName } from "../../api/api";
export default {
      components: {
			quillEditor
		},
  data() {
    return {
      // rowContent:false,
      upUrl : "",
      addFormVisible: false,
      search: {
        waName: ""
      },
	  tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      editorialActivities: false,
      commonsData: [],
      commonsType: [],
      editForm: {
        id: "",
        tpl_type: "",
        msg_type: "",
        title: "",
        code: "",
        content: "",
        desc: ""
      },
      editFormRules: {
        tpl_type: [
          {
            required: true,
            message: "请输入模板类型",
            trigger: "change"
          }
        ],
        msg_type: [
          {
            required: true,
            message: "请输入消息类型",
            trigger: "change"
          }
        ],
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
            message: "请输入code内容",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入模板说明",
            trigger: "change"
          }
        ]
      },
      addForm: {
        id: "",
        tpl_type: "",
        msg_type: "",
        title: "",
        code: "",
        content: "",
        desc: ""
      },
      addFormRules: {
        tpl_type: [
          {
            required: true,
            message: "请输入模板类型",
            trigger: "change"
          }
        ],
        msg_type: [
          {
            required: true,
            message: "请输入消息类型",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入code内容",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入模板说明",
            trigger: "change"
          }
        ]
      },
       quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                editorOption: {
                        placeholder: "",
                        theme: "snow", // or 'bubble'
                        placeholder: "请输入商品描述",
                        modules: {
                            ImageExtend: {
                                    loading: true,  // 可选参数 是否显示上传进度和提示语
                                    name: 'img',  // 图片参数名
                                    size: 10,  // 可选参数 图片大小，单位为M，1M = 1024kb
                                    action: resName.tarUrl(),  // 服务器地址, 如果action为空，则采用base64插入图片
                                    // response 为一个函数用来获取服务器返回的具体图片地址
                                    // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                                    // 则 return res.data.url
                                    response: (res) => {
                                        console.log(JSON.stringify(res));
                                        if(res.code === 1){
                                                this.$message({
                                                    message: "上传成功",
                                                    type: "success"
                                                });
                                                return res.data
                                        }
                                    }
                            },
                            toolbar: {
                                    container: container,
                                    // container: "#toolbar",
                                    handlers: {
                                        'image': function(value) {
                                                if (value) {
                                                    // 触发input框选择图片文件
                                                    document.querySelector(".avatar-uploader3 input").click();
                                                } else {
                                                    this.quill.format("image", false);
                                                }
                                        },
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
    this.getlist();
  },
  methods: {
    getlist() {
      var params = {
        content: this.search.waName,
        tpl_type: "",
	  	msg_type: "",
	  	page: this.page,
        per_page: this.pageSize
      };
      this.listLoading = true;
      resName
        .messageTplList(params)
        .then(res => {
          if (res.code === 1) {
			this.total = res.data.total;
            this.tableData = res.data.data;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
          return false;
        });
      // 模板类型
      let param = {
        class_type: "tpl_type"
      };
      resName
        .webgetcommonsdata(param)
        .then(res => {
          if (res.code === 1) {
            this.commonsData = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      // 消息类型
      let para = {
        class_type: "msg_type"
      };
      resName
        .webgetcommonsdata(para)
        .then(res => {
          if (res.code === 1) {
            this.commonsType = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 新建取消
    resetFields(addForm) {
      this.$refs[addForm].resetFields();
      this.addFormVisible = false;
    },
    // 创建
    addList() {
      this.addFormVisible = true;
    },
    // 创建提交
    addSubmit() {
      this.$refs.addForm.validate(valid => {
          for (var i in this.commonsType) {
			if (this.addForm.msg_type == this.commonsType[i].class_value) {
				var msgData = this.commonsType[i].class_code;
				}
			}
			for (var i in this.commonsData) {
				if (this.addForm.tpl_type == this.commonsData[i].class_value) {
					var tplType = this.commonsData[i].class_code;
				}
			}
          var params = {
            tpl_type: tplType,
            msg_type: msgData,
            code: this.addForm.code,
            content: this.addForm.content,
            desc: this.addForm.desc
          };
          resName
            .messageTplAdd(params)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "创建成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
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
	  })
      
    },
    // 删除
    handleDelete(index, row) {
	  	this.$confirm("确定要删除当前数据吗?", "提示", {
			type: "warning"
			}).then(() => {
			var del = {
				id: row.id
			};
			resName.messageTplDel(del).then(res => {
				//数据处理
				if (res.data.code === 1) {
				this.$message({
					message: "删除成功",
					type: "success"
				});
				this.getlist();
				} else if (res.code === -2) {
				this.$message({
					message: res.msg,
					type: "error"
				});
				}
			})
			})
	},
    // 编辑
    handleEdit(index, row) {
	    this.editorialActivities = true;
      for (var i in this.commonsType) {
        if (row.msg_type == this.commonsType[i].class_code) {
          var msgType = this.commonsType[i].class_value;
        }
      }
      for (var i in this.commonsData) {
        if (row.tpl_type == this.commonsData[i].class_code) {
          var tplData = this.commonsData[i].class_value;
        }
      }
      this.editForm = {
        id: row.id,
        tpl_type: tplData,
        msg_type: msgType,
        title: row.title,
        code: row.code,
        content: row.content,
        desc: row.desc
	  };
	},
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        for (var i in this.commonsType) {
          if (this.editForm.msg_type == this.commonsType[i].class_value) {
            var msgData = this.commonsType[i].class_code;
          }
        }
        for (var i in this.commonsData) {
          if (this.editForm.tpl_type == this.commonsData[i].class_value) {
            var tplType = this.commonsData[i].class_code;
          }
        }
        if (valid) {
          var pramas = {
            id: this.editForm.id,
            msg_type: msgData,
            tpl_type: tplType,
            title: this.editForm.title,
            code: this.editForm.code,
            content: this.editForm.content,
            desc: this.editForm.desc
          };
          resName
            .meTplEdit(pramas)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                this.editorialActivities = false;
                this.$refs["editForm"].resetFields();
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
	handleSizeChange(val) {
	  //切换每页显示条数
      this.pageSize = val;
	  this.getlist();
	},
	handleCurrentChange(val) {
	  this.page = val;
      this.getlist();
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
    }
  }
};
</script>

<style lang="less" scoped>
.rowContent{
    width: 700px;
    height: auto;
    left: 50%;
    background: rgba(68, 68, 68, 0.6);
    display: block;
    position: absolute;
    top: 111px;
    transform: translateX(-50%);
    color:white;
    text-align:center;
    line-height: 20px;
}
.toolbar,
.el-table {
  background: #fff;
}
.toolbar {
  margin-bottom: 15px;
}
.el-form-item.right {
  float: right;
}
.el-form-item.left {
  float: left;
}
 /*新加文本编辑器样式*/
      .editor {
            line-height: normal !important;
      }
      .ql-snow .ql-tooltip[data-mode=link]::before {
            content: "请输入链接地址:";
      }
      .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
            border-right: 0px;
            content: '保存';
            padding-right: 0px;
      }

      .ql-snow .ql-tooltip[data-mode=video]::before {
            content: "请输入视频地址:";
      }

      .ql-snow .ql-picker.ql-size .ql-picker-label::before,
      .ql-snow .ql-picker.ql-size .ql-picker-item::before {
            content: '14px';
      }
      .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
      .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
            content: '10px';
      }
      .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
      .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
            content: '18px';
      }
      .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
      .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
            content: '32px';
      }

      .ql-snow .ql-picker.ql-header .ql-picker-label::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item::before {
            content: '文本';
      }
      .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
            content: '标题1';
      }
      .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
            content: '标题2';
      }
      .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
            content: '标题3';
      }
      .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
            content: '标题4';
      }
      .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
            content: '标题5';
      }
      .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
      .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
            content: '标题6';
      }

      .ql-snow .ql-picker.ql-font .ql-picker-label::before,
      .ql-snow .ql-picker.ql-font .ql-picker-item::before {
            content: '标准字体';
      }
      .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
      .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
            content: '衬线字体';
      }
      .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
      .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
            content: '等宽字体';
      }
      .avatar-uploader3{
            display: none;
      }
</style>

