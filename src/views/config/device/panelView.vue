<template>
  <section>
    <el-row class="row-bg" justify="space-between">
      <!-- <template>
        <el-select v-model="value" placeholder="请选择" size="small" class="rightsel">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>-->
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addBtnDialog = true"
        size="small"
        class="leftBtn"
      >添加面板</el-button>
    </el-row>

    <!-- 面板列表 -->
    <el-table :data="panelDate" border style="width: 99.9%;text-align:center">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="panel_name" label="名称"></el-table-column>
      <el-table-column prop="preview_img_url" label="图标">
        <template slot-scope="scope">
          <el-image :src="scope.row.preview_img_url" style="width: 60px; height: 50px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="panel_desc" label="描述"></el-table-column>
      <el-table-column prop="product_category" label="类别"></el-table-column>
      <el-table-column prop="applicable_equipment" label="适用设备"></el-table-column>
      <el-table-column prop="panel_download_url" label="地址"></el-table-column>
      <el-table-column label="操作" prop="operation" min-width="150">
        <template slot-scope="scope">
          <el-button
            @click="pannelEcho(scope.$index, scope.row)"
            type="success"
            size="mini"
            plain
          >编辑</el-button>
          <el-button
            @click="deleteLightPannel(scope.$index, scope.row)"
            type="danger"
            plain
            size="mini"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
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

    <!-- 添加按钮 -->
    <el-dialog title="添加面板" :visible.sync="addBtnDialog">
      <el-form :model="addPannel" ref="addPannel" :rules="editorFormRules">
        <el-form-item label="面板类别" prop="product_category" :label-width="formLabelWidth">
          <el-input v-model="addPannel.product_category" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="name" prop="panel_name" label="面板名称" :label-width="formLabelWidth">
          <el-input v-model="addPannel.panel_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="面板描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addPannel.panel_desc"></el-input>
        </el-form-item>
        <el-form-item label="预览图片" prop="preview_img_url" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :http-request="uploadMainImg"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <img v-if="addPannel.preview_img_url" :src="addPannel.preview_img_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="panel_download_url" label="压缩文件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action
            :limit="3"
            :on-change="handleChange"
            :http-request="uploadFile"
            :on-success="handleAvatarSuccess"
            :beforeUpload="beforeFileUpload"
            :show-file-list="true"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addBtnDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addPannelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑面板" :visible.sync="redactBtnDialog">
      <el-form :model="editorForm" ref="editorForm" :rules="editorFormRules">
        <el-form-item prop="product_category" label="面板类别" :label-width="formLabelWidth">
          <el-input v-model="editorForm.product_category" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="panel_name" class="name" label="面板名称" :label-width="formLabelWidth">
          <el-input v-model="editorForm.panel_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="applicable_equipment"
          class="name"
          label="适用设备"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editorForm.applicable_equipment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="面板描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editorForm.panel_desc"></el-input>
        </el-form-item>
        <el-form-item label="预览图片" prop="preview_img_url" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :http-request="uploadMainImg"
            :on-success="handleAvatarSuccess"
            v-model="editorForm.preview_img_url"
            :show-file-list="false"
          >
            <img v-if="editorForm.preview_img_url" :src="editorForm.preview_img_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="panel_download_url" label="压缩文件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action
            :limit="3"
            :on-change="handleChange"
            :http-request="uploadFile"
            :beforeUpload="beforeFileUpload"
            :show-file-list="true"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelEditor">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEditor">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { resName } from "../../../api/api";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "开关"
        },
        {
          value: "选项2",
          label: "插座"
        },
        {
          value: "选项3",
          label: "插排"
        },
        {
          value: "选项4",
          label: "场景开关"
        },
        {
          value: "选项5",
          label: "灯具"
        },
        {
          value: "选项6",
          label: "扫地机"
        },
        {
          value: "选项7",
          label: "电茶壶"
        },
        {
          value: "选项8",
          label: "香薰机"
        },
        {
          value: "选项10",
          label: "空气净化器"
        },
        {
          value: "选项11",
          label: "晾衣架"
        },
        {
          value: "选项12",
          label: "取暖器"
        },
        {
          value: "选项13",
          label: "空调控制器"
        },
        {
          value: "选项14",
          label: "窗帘"
        }
      ],
      panelDate: [], //列表页数据
      editorForm: {
        id: "",
        panel_name: "",
        panel_desc: "",
        product_category: "",
        preview_img_url: "",
        panel_download_url: "",
        applicable_equipment: ""
      }, //编辑数据回显
      //编辑规则
      editorFormRules: {
        panel_name: [
          {
            required: true,
            message: "请输入面板名称",
            trigger: "change"
          }
        ],
        product_category: [
          {
            required: true,
            message: "请输入面板类别",
            trigger: "change"
          }
        ],
        panel_download_url: [
          {
            required: true,
            message: "请上传面板下载链接",
            trigger: "change"
          }
        ],
        preview_img_url: [
          {
            required: true,
            message: "请上传面板预览图",
            trigger: "change"
          }
        ]
      },
      addPannel: {
        panel_name: "",
        product_category: "",
        panel_download_url: "",
        preview_img_url: "",
        panel_desc: "",
        applicable_equipment: ""
      },
      value: "",
      pageSize: 10,
      total: 0,
      page: 1,
      addBtnDialog: false,
      redactBtnDialog: false,
      textarea: "",
      fileList: [], //上传文件
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getLightPannel();
  },
  methods: {
    //添加面板
    addPannelSubmit() {
      this.$refs.addPannel.validate(valid => {
        if (valid) {
          resName
            .pannelAdd(this.addPannel)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "新建成功",
                  type: "success"
                });
                this.$refs["addPannel"].resetFields();
                this.addBtnDialog = false;
                this.getLightPannel();
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
    //编辑取消按钮
    cancelEditor() {
      this.redactBtnDialog = false;
      // this.fileList = [];
    },
    //编辑确认按钮
    confirmEditor() {
      // this.fileList = [];
      this.$refs.editorForm.validate(valid => {
        if (valid) {
          resName
            .pannelEdit(this.editorForm)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                this.$refs["editorForm"].resetFields();
                this.redactBtnDialog = false;
                this.getLightPannel();
              } else if (res.code === -32) {
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
    //编辑回显
    pannelEcho(index, row) {
      var _this = this;
      _this.redactBtnDialog = true;
      if (_this.fileList.length != 0) {
        _this.fileList = [];
      }
      _this.editorForm = {
        id: row.id,
        panel_name: row.panel_name,
        product_category: row.product_category,
        panel_download_url: row.panel_download_url,
        preview_img_url: row.preview_img_url,
        panel_desc: row.panel_desc,
        applicable_equipment: row.applicable_equipment
      };

      var temps = { name: _this.editorForm.panel_download_url };
      _this.fileList.push(temps);
    },

    //获取用户列表
    getLightPannel() {
      let pramas = {
        page: this.page,
        per_page: this.pageSize
      };

      this.listLoading = true;
      resName
        .panelList(pramas)
        .then(res => {
          //数据处理
          //console.log("用户列表信息：" + JSON.stringify(res.data));
          if (res.code === 1) {
            this.total = res.data.total;
            this.panelDate = res.data.data;
            this.listLoading = false;
          } else if (res.code === -7) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.listLoading = false;
          }
          // }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },

    //刪除
    deleteLightPannel(index, row) {
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        let params = {
          id: row.id
        };
        resName.pannelDelete(params).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getLightPannel();
          } else if (res.data.code === -32) {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
      });
    },
    // 上传文件
    uploadFile() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
      form.append("action", "UploadVMKImagePath");
      resName
        .projectUpload(form)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            _this.editorForm.panel_download_url = res.data.data;
            _this.addPannel.panel_download_url = res.data.data;
          } else if (res.data.code === -2) {
            this.$message({
              message: "上传失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.getLightPannel();
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.getLightPannel();
    },
    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    handlePreview(file) {
      console.log(file);
    },
    //上传图片相关方法
    handleAvatarSuccess(res, file) {
      this.addPannel.preview_img_url = URL.createObjectURL(file.raw);
      this.editorForm.preview_img_url = URL.createObjectURL(file.raw);
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
            _this.editorForm.preview_img_url = res.data.data;
            _this.addPannel.preview_img_url = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    //上传文件格式
    beforeFileUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "zip";
      if (!extension) {
        this.$message({
          message: "上传文件只能是zip格式!",
          type: "warning"
        });
      }
      return extension;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.redactBtnDialog = true;
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
.row-bg {
  padding: 12px 10px;
  background: #fff;
  margin-bottom: 20px;
}
.addPanel {
  margin-left: 15px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-select.rightsel {
  float: right;
}
.el-button.leftBtn {
  float: left;
}
.el-upload--picture-card {
  width: 185px;
  height: 185px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}
</style>
