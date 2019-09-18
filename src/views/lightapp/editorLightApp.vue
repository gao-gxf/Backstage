<template>
  <div id="container">
    <el-tabs type="border-card">
      <el-tab-pane label="编辑应用">
        <el-form
          :model="editorForm"
          ref="editorForm"
          :rules="editorFormRules"
          :hide-required-asterisk="true"
          label-width="80px"
        >
          <el-form-item label="应用名称" prop="app_name">
            <el-input v-model="editorForm.app_name" auto-complete="off" placeholder="请输入应用名称"></el-input>
          </el-form-item>
          <el-form-item label="前台地址" prop="frontend_url">
            <el-input v-model="editorForm.frontend_url" placeholder="请输入前台地址"></el-input>
          </el-form-item>
          <el-form-item label="后台地址">
            <el-input v-model="editorForm.backend_url" placeholder="请输入后台地址"></el-input>
          </el-form-item>
          <el-form-item label="中台ＩＤ">
            <el-input v-model="editorForm.iduotel_user_id" placeholder="请输入中台ＩＤ"></el-input>
          </el-form-item>
          <el-form-item label="应用描述">
            <el-input v-model="editorForm.desc" type="textarea" :rows="2" placeholder="请输入应用描述"></el-input>
          </el-form-item>
          <el-form-item label="应用类型" prop="app_type">
            <el-select v-model="editorForm.app_type" placeholder="请选择应用类型">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.type_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用图标" prop="icon">
            <el-upload
              action
              :on-change="handleChange"
              class="avatar-uploader"
              :http-request="uploadMainImg"
              :show-file-list="false"
              list-type="picture-card"
            >
              <img v-if="editorForm.icon" :src="editorForm.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="第三方" prop="is_third">
            <el-radio-group v-model="editorForm.is_third">
              <el-radio-button label="否" value="1">否</el-radio-button>
              <el-radio-button label="是" value="2">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上线" prop="online_status">
            <el-radio-group v-model="editorForm.online_status">
              <el-radio-button label="否" value="1">否</el-radio-button>
              <el-radio-button label="是" value="2">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="付费金额">
            <el-input
              v-model="editorForm.payment"
              class="price"
              placeholder="请输入金额"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="btnBox">
      <el-button @click="resetFields('editorForm')">取消</el-button>
      <el-button type="primary" :loading="editLoading" @click="editorSubmit">提交</el-button>
    </div>
  </div>
</template>


<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      imageUrl: "", //编辑上传图片
      dialogVisible: false,
      editLoading: false,
      options: [], //类型选择
      //数据
      editorForm: {
        boss_work_id: "",
        app_name: "",
        icon: "",
        is_third: "0",
        app_type: "",
        payment: "",
        frontend_url: "",
        online_status: "0",
        iduotel_user_id: "",
        desc: "",
        backend_url: "",
        iduotel_user_id: ""
      },
      //编辑规则
      editorFormRules: {
        app_name: [
          {
            required: true,
            message: "请输入轻应用名称",
            trigger: "change"
          }
        ],
        icon: [
          {
            required: true,
            message: "请输入轻应用图标",
            trigger: "change"
          }
        ],
        is_third: [
          {
            required: true,
            message: "请选择是否第三方应用",
            trigger: "change"
          }
        ],
        frontend_url: [
          {
            required: true,
            message: "请输入前台访问地址",
            trigger: "change"
          }
        ],
        online_status: [
          {
            required: true,
            message: "请选择是否上线",
            trigger: "change"
          }
        ],
        app_type: [
          {
            required: true,
            message: "请选择轻应用类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.lightAppType();
    this.lightAppDetail();
  },

  methods: {
    // 新建取消
    resetFields(editorForm) {
      this.$refs[editorForm].resetFields();
      this.$router.replace({ path: "/lightapp/allLightApp" });
    },
    //获取workID
    workId() {
      var sessionSto = JSON.parse(sessionStorage.getItem("userMsg"));
      var userInfo = sessionSto.userInfo;
      this.editorForm.boss_work_id = userInfo.work_id;
    },
    //编辑提交
    editorSubmit() {
      this.workId();
      this.$refs.editorForm.validate(valid => {
        if (this.editorForm.payment == null || this.editorForm.payment == "") {
          this.editorForm.payment = 0;
        }
        if (valid) {
          if (this.editorForm.is_third == "是") {
            this.editorForm.is_third = 1;
          } else if (this.editorForm.is_third == "否") {
            this.editorForm.is_third = 2;
          }
          if (this.editorForm.online_status == "是") {
            this.editorForm.online_status = 1;
          } else if (this.editorForm.online_status == "否") {
            this.editorForm.online_status = 2;
          }
          resName
            .editorLightApp(this.editorForm)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                this.$refs["editorForm"].resetFields();
                this.editorFormVisible = false;
                this.$router.replace({ path: "/lightapp/allLightApp" });
              } else if (res.code === -44) {
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

    //数据回显
    lightAppDetail() {
      let params = {
        id: this.$route.query.id
      };
      resName.lightAppDetail(params).then(res => {
        console.log(res, 123456780);
        if (res.data.code == 1) {
          this.editorForm = res.data.data;
          if (this.editorForm.is_third == 1) {
            this.editorForm.is_third = "是";
          } else if (this.editorForm.is_third == 2) {
            this.editorForm.is_third = "否";
          }
          if (this.editorForm.online_status == 1) {
            this.editorForm.online_status = "是";
          } else if (this.editorForm.online_status == 2) {
            this.editorForm.online_status = "否";
          }
        }
      });
    },
    //获取轻应用类型
    lightAppType() {
      resName.lightAppType().then(res => {
        if (res.code === 1) {
          this.options = res.data;
        } else if (res.code === -2) {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    //上传图片接口
    uploadMainImg() {
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
      form.append("action", "UploadVMKImagePath");
      resName
        .uploadImg(form)
        .then(res => {
          if (res.data.code === 1) {
            this.editorForm.icon = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    handleAvatarSuccess(res, file) {
      this.newImageUrl = URL.createObjectURL(file.raw);
      this.editorImageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 jpg、png格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      return extension || (extension2 && isLt2M);
    }
  }
};
</script>

<style scoped lang="less">
#container {
  background: #fff;
}
.analysis_addr {
  float: left;
  margin-right: 15px;
  width: 10%;
}
.btnBox {
  padding: 10px 5px;
  border: 1px solid #dcdfe6;
  border-top: none;
}

/* 上传图片 */
.avatar-uploader2 {
  display: inline-block;
  position: relative;
  top: 12px;
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px !important;
  height: 178px !important;
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
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.price {
  width: 11%;
}
</style>
