<template>
  <div id="container">
    <el-tabs type="border-card">
      <el-tab-pane label="添加应用">
        <el-form
          :model="addForm"
          ref="addForm"
          :rules="addFormRules"
          :hide-required-asterisk="true"
          label-width="80px"
        >
          <el-form-item label="应用名称" prop="app_name">
            <el-input v-model="addForm.app_name" auto-complete="off" placeholder="请输入应用名称"></el-input>
          </el-form-item>
          <el-form-item label="前台地址" prop="frontend_url">
            <el-input v-model="addForm.frontend_url" placeholder="请输入前台地址"></el-input>
          </el-form-item>
          <el-form-item label="后台地址">
            <el-input v-model="addForm.backend_url" placeholder="请输入后台地址"></el-input>
          </el-form-item>
          <el-form-item label="中台ＩＤ">
            <el-input v-model="addForm.iduotel_user_id" placeholder="请输入中台ＩＤ"></el-input>
          </el-form-item>
          <el-form-item label="应用描述">
            <el-input v-model="addForm.desc" type="textarea" :rows="2" placeholder="请输入应用描述"></el-input>
          </el-form-item>
          <el-form-item label="应用类型" prop="app_type">
            <el-select v-model="addForm.app_type" placeholder="请选择应用类型">
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
              <img v-if="addForm.icon" :src="addForm.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="第三方"  prop="is_third">
            <el-radio-group v-model="addForm.is_third">
              <el-radio-button label="否" value="1">否</el-radio-button>
              <el-radio-button label="是" value="2">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上线" prop="online_status">
            <el-radio-group v-model="addForm.online_status" >
              <el-radio-button label="否" value="1">否</el-radio-button>
              <el-radio-button label="是" value="2">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="付费金额">
            <el-input
              v-model="addForm.payment"
              class="price"
              placeholder="请输入金额"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="btnBox">
      <el-button @click="resetFields('addForm')">取消</el-button>
      <el-button @click.native="addSubmit" type="primary" :loading="editLoading">提交</el-button>
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
      //新增数据
      addForm: {
        boss_work_id: "",
        app_name: "",
        icon: "",
        is_third: "",
        app_type: "",
        payment: "",
        frontend_url: "",
        online_status: "",
        iduotel_user_id: "",
        desc: "",
        backend_url: "",
        iduotel_user_id: ""
      },
      //添加规则
      addFormRules: {
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
    this.workId();
  },
  methods: {
    //提交按钮
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (this.addForm.payment == null || this.addForm.payment == "") {
          this.addForm.payment = 0;
        }
        if (valid) {
          if (this.addForm.is_third == "是") {
            this.addForm.is_third = 1;
          } else if (this.addForm.is_third == "否") {
            this.addForm.is_third = 2;
          }
          if (this.addForm.online_status == "是") {
            this.addForm.online_status = 1;
          } else if (this.addForm.online_status == "否") {
            this.addForm.online_status = 2;
          }

          resName
            .addLightApp(this.addForm)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "新建成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.$router.replace({ path: "/lightapp/allLightApp" });
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

    // 新建取消
    resetFields(addForm) {
      this.$refs[addForm].resetFields();
      this.$router.replace({ path: "/lightapp/allLightApp" });
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
    //获取work_id
    workId() {
      var sessionSto = JSON.parse(sessionStorage.getItem("userMsg"));
      var userInfo = sessionSto.userInfo;
      this.addForm.boss_work_id = userInfo.work_id;
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
            this.addForm.icon = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
        });
    },
    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    handleAvatarSuccess(res, file) {
      this.addForm.icon = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M && isPNG;
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
