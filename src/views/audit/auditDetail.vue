<template>
     <!--列表-->
      <div id="container">
        <el-tabs type="border-card">
            <el-tab-pane label="商户详情" >
                <el-form
                :model="detailList"
                :hide-required-asterisk="false"
                label-width="100px"
                v-loading="listLoading"
                showClose="false">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item  name="1">
                            <template slot="title">
                              <h3>注册信息</h3> 
                            </template>
                              <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="DuotelID" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.duotel_id" autocomplete="off" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="公司名称" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.company_name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="用户昵称" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.nickname" autocomplete="off" readonly></el-input>
                                </el-form-item>
                               <el-form-item label="注册时间" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.create_time" autocomplete="off" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="归属地名称" :label-width="formLabelWidth" class="dockingUser" style="width:66%;float:left;">
                                    <el-input v-model="detailList.attribution" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="营业执照号码" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.company_license_num" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="机构类型" :label-width="formLabelWidth" class="dockingUser">
                                    <el-select v-model="detailList.company_type" placeholder="请选择" style="width:100%;">
                                        <el-option
                                        v-for="item in organType"
                                        :key="item.class_name"
                                        :label="item.class_name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="营业执照" :label-width="formLabelWidth" class="dockingUser ">
                                    <el-upload style="float:left;"
                                        class="avatar-uploader"
                                        action
                                        :http-request="uploadMainImg"
                                        :on-change="handleChange"
                                        multiple
                                        :show-file-list="false">
                                        <!-- <div v-if="detailList.company_license_url" class="ceshi license">
                                            <img  :src="detailList.company_license_url" class="avatar">
                                            <a href="javascript:void(0)" class="look">
                                                <img :src="detailList.company_license_url" target='_blank'>
                                            </a> 
                                        </div> -->
                                        <img v-if="detailList.company_license_url" :src="detailList.company_license_url" class="avatar" alt="">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                    <a :href="detailList.company_license_url" target='_blank' class="reviewlook">预览</a>
                                </el-form-item>
                                <div style="clear:both;"></div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse>
                         <el-collapse-item>
                            <template slot="title">
                              <h3>联络信息</h3> 
                            </template>
                              <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="详细地址" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.address" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.company_contact_phone" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                               <el-form-item label="省市区" :label-width="formLabelWidth" style="">
                                    <!-- <el-input :span="12" v-model="detailList.province_id" prop="province_id" autocomplete="off"></el-input> -->
                                    <!-- <VDistpicker province="省" city="市" area="区" @selected="selected"></VDistpicker> -->
                                    <VDistpicker :province="detailList.province_id" :city="detailList.city_id" :area="detailList.area_id" @selected="selected"></VDistpicker>
                                </el-form-item>
                        
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse>
                        <el-collapse-item>
                            <template slot="title">
                              <h3>银行信息</h3> 
                            </template>
                              <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="开户银行" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.company_bank" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="开户支行" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.company_bank_name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="银行账号" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input v-model="detailList.company_bank_account" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse>
                        <el-collapse-item>
                            <template slot="title">
                              <h3>系统信息</h3> 
                            </template>
                              <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="系统账号" :label-width="formLabelWidth" class="dockingUser">
                                    <el-input  autocomplete="off" v-model="detailList.work_id" readonly></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <div>
                        <el-button type="primary" size="mini">审核</el-button>
                        <el-button type="primary" size="mini" @click='compiler'>编辑</el-button>
                    </div>
                </el-form>
            </el-tab-pane>

      <el-tab-pane label="子账户">
        <el-table
          :data="auditList"
          highlight-current-row
          v-loading="listLoading"
          border
          text-align="center"
          style="width: 99.9%;"
        >
          <el-table-column label="头像" align="center" sortable>
            <template slot-scope="scope">
              <img class="avatar" :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" align="center" sortable></el-table-column>
          <el-table-column prop="nickname" label="昵称" align="center" sortable></el-table-column>
          <el-table-column prop="email" label="e-Mail" align="center" sortable></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" sortable></el-table-column>
          <el-table-column label="用户状态" align="center" sortable>
            <template slot-scope="scope">
              <p v-html="scope.row.status == '0' ? '禁用' : '启用'"></p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
    /* .el-collapse-item__wrap,.specItem{
        overflow: inherit !important;
    }
    .avatar-uploader .el-upload{
        overflow: inherit !important;
    } */
    /* 上传营业执照样式 */
    .reviewlook{
        display:inline-block;
        margin-top:5px;
    }
    .avatar-uploader .el-upload {
        display:inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .ceshi{
        position: relative;
    }
    .look{
        display:none;
        width:260px;
        height:260px;
        z-index:1000;
        position:absolute;
        top: -105px;
        left: 50px;
    }
    .look img{
        width:100%;
    }
    .license:hover .look{
        display:inline-block;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .avatar {
        display: block;
    }
  /* 上传营业执照样式 */
</style>
<script>
import { resName } from "../../api/api";
import axios from "axios";
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      auditList: [],
      organType: [
        { class_name: "酒店", id: 1, calss_value: "酒店" },
        { class_name: "公寓", id: 2, calss_value: "公寓" },
        { class_name: "民宿", id: 3, calss_value: "民宿" }
      ],
      listLoading: false,
      activeNames: ["1"],
      formLabelWidth: "120px",
      search: {
        name: ""
      },
      audit: [],
      detailList: {
        duotel_id: "",
        username: "",
        nickname: "",
        province_id: "",
        city_id: "",
        area_id: "",
        address: "",
        //商户
        company_name: "",
        company_type: "",
        company_license_num: "",
        company_contact_phone: "",
        company_license_url: "",
        company_bank: "",
        company_bank_name: "",
        company_bank_account: "",
        attribution: "",
        create_time: "",
        work_id: ""
      },
      file: "",
      uploadLoading: false,
      province: "",
      city: "",
      area: "",
      license: ""
      // supplier:[],
      // licenses:[],
      // fileList:[],
    };
  },
  created() {
    this.projectOrderList();
    //   this.commonsData()
  },
  methods: {
    compiler() {
      let params = {
        id: this.$route.query.id,
        company_name: this.detailList.company_name,
        province_id: this.detailList.province_id,
        city_id: this.detailList.city_id,
        area_id: this.detailList.area_id,
        address: this.detailList.address,
        personal_phone: this.detailList.personal_phone,
        company_bank: this.detailList.company_bank,
        company_bank_name: this.detailList.company_bank_name,
        company_bank_account: this.detailList.company_bank_account
      };
      resName
        .iduotelEdit(params)
        .then(res => {
          //数据处理
          if (res.data.code === 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.$router.replace({ path: "/audit/realNameList" });
          } else if (res.data.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
        });
    },
    // commonsData:function(){
    //     let params={
    //         class_type:"project_category"
    //     }
    //     resName
    //     .webgetcommonsdata(params)
    //         .then(res => {
    //         //数据处理
    //         if (res.code === 1) {
    //             this.organType = res.data
    //         } else if (res.code === -2) {
    //             this.$message({
    //             message: res.msg,
    //             type: "error"
    //             });
    //         }
    //         })
    //         .catch(err => {
    //         //错误处理
    //         this.listLoading = false;
    //         });
    // },
    // 获取项目订单列表
    projectOrderList: function() {
      var _this = this;
      var params = {
        user_info_id: this.$route.query.id
      };
      this.listLoading = true;
      resName
        .authreParticulars(params)
        .then(res => {
          if (res.code === 1) {
            if (res.data.company_type === 1) {
              this.detailList.company_type = "酒店";
            } else if (res.data.company_type === 2) {
              this.detailList.company_type = "民宿";
            } else if (res.data.company_type === 3) {
              this.detailList.company_type = "公寓";
            }
            this.detailList = res.data;
            this.auditList = this.detailList.userSonList;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
          return false;
        });
    },

    selected(data) {
      this.detailList.province = data.province.value;
      this.detailList.city = data.city.value;
      this.detailList.area = data.area.value;
    },

    // 上传文件流
    handleChange(file) {
      this.file = file.raw;
    },
    uploadMainImg() {
      var _this = this;
      // 创建表单对象
      let form2 = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form2.append("file", this.file);
      form2.append("action", "UploadVMKImagePath");
      axios
        .post(resName.tarUrl(), form2, {
          timeout: 1000000000,
          onUploadProgress: progressEvent => {
            let percent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
            _this.videoFlag = true;
            _this.videoUploadPercent = percent;
            _this.uploadLoading = true;
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            _this.videoUploadPercent = 0;
            _this.uploadLoading = false;
            //   _this.license = res.data.data;
            _this.detailList.company_license_url = res.data.data;
            resName.deleOldImg(_this.detailList.company_license_url);
            //   _this.licenses.push(_this.license);
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
    }
  }
};
</script>

<style  scoped lang="less">
.el-collapse-item__header {
  border-bottom: none;
}
.el-collapse {
  border-bottom: none;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 100% !important;
}
.el-upload {
  display: none !important;
  height: 0 !important;
  text-align: center;
  cursor: pointer;
  outline: 0;
}
.el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  display: inline-block;
}
.goods_span {
  color: #606266;
}

#container h3 {
  margin-left: 20px;
}
#container {
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.specItem {
  overflow: hidden;
}
.specItem .dockingUser {
  margin-bottom: 15px;
  width: 33%;
  float: left;
}
// .el-form-item .el-form-item__content{
//     margin-left:0 !important;
// }
h3 {
  width: 100%;
}
.title_line {
  width: 97%;
  height: 1px;
  border-bottom: 1px solid #efefef;
  margin-bottom: 34px;
  margin-left: 20px;
}
.specItem .dockingUser {
  margin-bottom: 15px;
  width: 33%;
  float: left;
}
.avatar {
  width: 50px;
  height: 50px;
}
</style>
