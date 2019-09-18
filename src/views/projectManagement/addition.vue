<template>
  <!--列表-->
  <div id="container">
    <el-tabs type="border-card">
      <el-tab-pane label="添加项目">
        <el-form
          :model="dataLidt"
          ref="dataLidt"
          :rules="dataLidtRules"
          :hide-required-asterisk="true"
          label-width="100px"
          v-loading="listLoading"
        >
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本信息" name="1">
              <template slot="title">
                <h3>基本信息</h3>
              </template>
              <div class="title_line"></div>
              <div class="specItem">
                <el-form-item label="项目名称" prop="project_name" class="dockingUser">
                  <el-input v-model="dataLidt.project_name" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目来源" prop="source" class="dockingUser">
                  <el-select v-model="dataLidt.source" placeholder="请选择">
                    <el-option
                      v-for="item in projectsource"
                      :key="item.class_code"
                      :label="item.class_value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目类别" class="dockingUser" prop="project_category">
                  <el-select
                    v-model="dataLidt.project_category"
                    @change="proCategory"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in projectCategory"
                      :key="item.class_code"
                      :label="item.class_value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目规模" class="dockingUser" ref="starLevelhid" prop="star_level">
                  <el-select v-model="dataLidt.star_level" :disabled="asd" placeholder="请选择">
                    <el-option
                      v-for="item in starLevel"
                      :key="item.id"
                      :label="item.class_value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Duotel ID" prop="duotel_id" class="dockingUser">
                  <el-input
                    v-model="dataLidt.duotel_id"
                    placeholder="请输入商户Duotel ID"
                    @change="Obtain"
                    @blur="Obtainty"
                  ></el-input>
                </el-form-item>
                <el-form-item label="项目业主" prop="owner" class="dockingUser">
                  <el-select v-model="dataLidt.owner" placeholder="请选择">
                    <el-option
                      v-for="item in projectOwner"
                      :key="item.class_code"
                      :label="item.class_value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="brand" label="项目品牌" class="dockingUser">
                  <el-select  placeholder="请选择" v-model="dataLidt.brand" >
                    <el-option
                      v-for="item in projectBrand"
                      :key="item.id"
                      :label="item.project_brand_name == item.son_name ? item.project_brand_name : item.project_brand_name + ' · ' + item.son_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="管理公司" prop="company" class="dockingUser">
                  <el-input v-model="dataLidt.company" placeholder="请输入项目公司"></el-input>
                </el-form-item>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="项目管理" name="项目管理">
              <template slot="title">
                <h3>项目管理</h3>
              </template>
              <div class="title_line"></div>
              <div class="specItem">
                <el-form-item label="客房数量" prop="room_number" class="dockingUser">
                  <el-input v-model="dataLidt.room_number" placeholder="请输入项目客房数量"></el-input>
                </el-form-item>
                <el-form-item label="项目时间" prop="time" class="dockingUser">
                  <el-date-picker v-model="dataLidt.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目经理" prop="project_manager" class="dockingUser">
                  <el-select v-model="dataLidt.project_manager" filterable placeholder="请选择">
                    <el-option
                      v-for="item in userName"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目进度" prop="schedule" class="dockingUser">
                  <el-select v-model="dataLidt.schedule" placeholder="请选择">
                    <el-option
                      v-for="item in Schedule"
                      :key="item.id"
                      :label="item.class_value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预计金额" prop="expect_money" class="dockingUser">
                  <el-input v-model="dataLidt.expect_money" placeholder="请输入项目预计金额"></el-input>
                </el-form-item>
                <el-form-item label="成交金额" prop="complete_money" class="dockingUser">
                  <el-input v-model="dataLidt.complete_money" placeholder="请输入项目成交金额" readonly></el-input>
                </el-form-item>
                <el-form-item label="项目需求" class="dockingUser">
                  <el-upload
                    class="upload-demo"
                    action
                    accept=".zip"
                    :on-change="handleChange"
                    :before-upload="uploaderror"
                    :http-request="uploadMainImg"
                    multiple
                    :show-file-list="true"
                    :file-list="fileList1"
                  >
                    <el-button size="small" type="primary" :loading="uploadLoading">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </div>
          </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="工程管理" name="工程管理">
              <template slot="title">
                    <h3>工程管理</h3>
                  </template>
                  <div class="title_line"></div>
                <div class="specItem">
                  
                <el-form-item label="样板间数量" prop="template_room" class="dockingUser">
                  <el-input v-model="dataLidt.template_room" placeholder="请输入项目样板间数量"></el-input>
                </el-form-item>
                <el-form-item label="样板间完成数" prop="template_room_complete" class="dockingUser">
                  <el-input v-model="dataLidt.template_room_complete" placeholder="请输入样板间完成数"></el-input>
                </el-form-item>
                <el-form-item label="施工总数量" prop="construction_room_number" class="dockingUser">
                  <el-input v-model="dataLidt.construction_room_number" placeholder="请输入施工总数量"></el-input>
                </el-form-item>
                <el-form-item label="施工完成数" prop="bind_cube_room_number" class="dockingUser">
                  <el-input v-model="dataLidt.bind_cube_room_number" placeholder="请输入施工完成数" readonly></el-input>
                </el-form-item>
                
                <el-form-item label="项目详细地址" prop="address" class="dockingUser">
                  <el-input v-model="dataLidt.address" placeholder="请输入项目地址"></el-input>
                </el-form-item>
                </div>
                <el-form-item label="项目地址">
                  <VDistpicker province="省" city="市" area="区" @selected="selected"></VDistpicker>
                </el-form-item>
              <el-form-item label="工程图纸">
              <el-upload
                class="upload-demo"
                action
                accept=".zip"
                :http-request="uploadMainImg2"
                :on-change="handleChange2"
                :before-upload="uploaderror2"
                multiple
                :show-file-list="true"
              :file-list="fileList2">
                <el-button size="small" type="primary" :loading="uploadLoading2">点击上传</el-button>
              </el-upload>
                </el-form-item>
            </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item >
                <template slot="title">
                    <h3>联系人信息</h3>
                  </template>
                  <div class="title_line"></div>
                <div class="specItem" v-for="(v,i) in dockinguser" :key="i">
                  <el-form-item label="姓名" class="dockingUser" prop="name">
                    <el-input v-model="v.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" class="dockingUser" prop="phone">
                    <el-input v-model="v.phone" placeholder="请输入电话"></el-input>
                  </el-form-item>
                  <el-form-item label="职位" class="dockingUser">
                    <el-input v-model="v.position" placeholder="请输入职位"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" class="dockingUser">
                    <el-input v-model="v.desc" placeholder="请输入备注"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" class="dockingUser">
                    <el-input v-model="v.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-button
                    class="dockingbut"
                    type="success"
                    size="small"
                    v-if="i == 0"
                    @click="newlyAdded(i)"
                  >新增</el-button>
                  <el-button
                    class="dockingbut"
                    type="primary"
                    size="small"
                    v-if="i != 0"
                    @click="newlyDel(i)"
                  >删除</el-button>
                  <div class="gline"></div>
                </div>
              </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-tab-pane>
      <div class="btnBox" style="margin-top:20px;">
        <el-button type="primary" size="small" @click="submitEdit">提交</el-button>
      </div>
    </el-tabs>
  </div>
</template>
<style>
.distpicker-address-wrapper select {
  width: 27.5%;
  height: 38px;
  color: #9caebf;
}
</style>
<script>
import VDistpicker from "v-distpicker";
import { resName } from "../../api/api";
import axios from "axios";
export default {
  components: { VDistpicker },
  data() {
    return {
      Upload: "",
      activeNames: ["1"],
      dataLidt: {
        project_name: "",
        project_category: "",
        project_source: "",
        project_owner: "",
        star_level: "",
        room_number: "",
        time: "",
        source: "",
        schedule: "",
        owner: "",
        brand: "",
        company: "",
        duotel_id: "",
        project_manager: "",
        expect_money: "",
        complete_money: "",
        template_room: "",
        template_room_complete: "",
        construction_room_number: "",
        bind_cube_room_number: "",
        address: "",
        phone: "",
        name: "",
        position: "",
        desc: "",
        email: ""
      },
      id: "",
      province: "",
      city: "",
      area: "",
      dataLidtRules: {
        project_name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "change"
          }
        ],
        project_category: [
          {
            required: true,
            message: "请输入项目类别",
            trigger: "change"
          }
        ],
        room_number: [
          {
            required: true,
            message: "请输入房间号码",
            trigger: "change"
          }
        ],
        star_level: [
          {
            required: true,
            message: "请输入项目规模",
            trigger: "change"
          }
        ],
        demand: [
          {
            required: true,
            message: "请输入项目需要",
            trigger: "change"
          }
        ],
        template_drawings: [
          {
            required: true,
            message: "请输入工程图纸",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: "请输入项目时间",
            trigger: "change"
          }
        ],
        source: [
          {
            required: true,
            message: "请输入项目来源",
            trigger: "change"
          }
        ],
        owner: [
          {
            required: true,
            message: "请输入项目业主",
            trigger: "change"
          }
        ],
        template_room: [
          {
            required: true,
            message: "请输入项目样板间",
            trigger: "change"
          }
        ],
        brand: [
          {
            required: true,
            message: "请输入项目品牌",
            trigger: "change"
          }
        ],
        schedule: [
          {
            required: true,
            message: "请输入项目进程",
            trigger: "change"
          }
        ],
        company: [
          {
            required: true,
            message: "请输入项目公司",
            trigger: "change"
          }
        ],
        project_manager: [
          {
            required: true,
            message: "请输入项目经理",
            trigger: "change"
          }
        ],
        expect_money: [
          {
            required: true,
            message: "请输入预计金额",
            trigger: "change"
          }
        ],
        complete_money: [
          {
            required: true,
            message: "请输入成交金额",
            trigger: "change"
          }
        ],
        template_room: [
          {
            required: true,
            message: "请输入项目样板间",
            trigger: "change"
          }
        ],
        bind_cube_room_number: [
          {
            required: true,
            message: "请输入已完成数量",
            trigger: "change"
          }
        ],
        template_room_complete: [
          {
            required: true,
            message: "请输入样板间完成数",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入项目地址",
            trigger: "change"
          }
        ],
        construction_room_number: [
          {
            required: true,
            message: "请输入施工数量",
            trigger: "change"
          }
        ]
      },
      asd: false,
      listLoading: false,
      goods_spec: "",
      goodsInfo: [],
      company_address: "",
      personal_address: "",
      projectCategory: [],
      starLevel: [],
      fileList: [],
      Schedule: [],
      dockinguser: [
        {
          phone: "",
          name: "",
          position: "",
          desc: "",
          email: ""
        }
      ],
      file: "",
      file2: "",
      demand: "",
      template_drawings: "",
      Demand: [],
      templateDrawings: [],
      duotel: "",
      userName: [],
      projectsource: [],
      projectOwner: [],
      projectBrand: [],
      getProject: "",
      uploadLoading: false,
      uploadLoading2: false,
      fileList1: [],
      fileList2: [],
      videoUploadPercent: 0,
      ads:""
    };
  },
  created() {
    this.commonsData();
    this.goodstypelist();
  },
  computed: {},
  methods: {
    proCategory(id) {
      for (var i = 0; i < this.projectCategory.length; i++) {
        if (id == this.projectCategory[i].id) {
          this.asd = true;
        } else {
          this.asd = false;
        }
      }
    },
    // 项目品牌
    goodstypelist() {
      let params = {
        page: '1',
        per_page: '10'
      };
      resName
        .projectBrandList(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.projectBrand = res.data.data;
            
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    selected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    // duotel ID
    Obtainty() {
      if (this.dataLidt.duotel_id == null || this.dataLidt.duotel_id == "") {
        this.dataLidt.complete_money = 0;
        this.dataLidt.bind_cube_room_number = 0;
      }
    },
    Obtain() {
      // 获取已完成的cube房间数量
      let params = {
        duotel_id: this.dataLidt.duotel_id
      };
      resName
        .getBindCubeNum(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt.bind_cube_room_number = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      // 获取成交金额
      let param = {
        duotel_id: this.dataLidt.duotel_id
      };
      resName
        .getCompleteMoney(param)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.dataLidt.complete_money = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 提交
    submitEdit() {
      this.$refs.dataLidt.validate(valid => {
        if (valid) {
          var d = new Date(this.dataLidt.time);
          var youWant =
            d.getFullYear() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getDate() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds();

          let params = {
            project_name: this.dataLidt.project_name,
            project_category: this.dataLidt.project_category,
            star_level: this.dataLidt.star_level,
            schedule: this.dataLidt.schedule,
            demand: this.Demand,
            room_number: this.dataLidt.room_number,
            time: youWant,
            source: this.dataLidt.source,
            owner: this.dataLidt.owner,
            brand: this.dataLidt.brand,
            company: this.dataLidt.company,
            duotel_id: this.dataLidt.duotel_id,
            project_manager: this.dataLidt.project_manager,
            expect_money: this.dataLidt.expect_money,
            complete_money: this.dataLidt.complete_money,
            template_drawings: this.templateDrawings,
            template_room: this.dataLidt.template_room,
            template_room_complete: this.dataLidt.template_room_complete,
            bind_cube_room_number: this.dataLidt.bind_cube_room_number,
            construction_room_number: this.dataLidt.construction_room_number,
            address: this.dataLidt.address,
            docking_user: this.dockinguser,
            province: this.province,
            city: this.city,
            area: this.area
          };
          resName
            .projectAdd(params)
            .then(res => {
              //数据处理
              if (res.data.code === 1) {
                this.$message({
                  message: "创建成功",
                  type: "success"
                });
                this.$router.replace({ path: "/projectManagement/allproject" });
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
        }
      });
    },
    commonsData() {
      // 项目来源
      let paramsa = {
        class_type: "project_source"
      };
      resName
        .webgetcommonsdata(paramsa)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.projectsource = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });

      // 项目业主
      let paramsO = {
        class_type: "project_owner"
      };
      resName
        .webgetcommonsdata(paramsO)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.projectOwner = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });

     

      // 项目类别
      let params = {
        class_type: "project_category"
      };
      resName
        .webgetcommonsdata(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.projectCategory = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      // 项目规模
      let para = {
        class_type: "star_level"
      };
      resName
        .webgetcommonsdata(para)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.starLevel = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      // 项目进程
      let pars = {
        class_type: "schedule"
      };
      resName
        .webgetcommonsdata(pars)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.Schedule = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      // 项目经理/

      resName
        .getProjectManager()
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.userName = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 添加
    newlyAdded: function(val) {
      var obj = {
        phone: "",
        name: "",
        position: "",
        desc: "",
        email: ""
      };
      this.dockinguser.push(obj);
    },
    // 删除
    newlyDel: function(i) {
      this.dockinguser.splice(i, 1);
    },

    // // 删除项目需求
    //     delDemands:function(){
    //         let params={
    //             filename:this.demand
    //         }
    //         resName
    //             .deleOldImg(params)
    //                 .then(res => {
    //                 //数据处理
    //                 if (res.code === 1) {
    //                     this.$message({
    //                     message: res.msg,
    //                     type: "success"
    //                     });
    //                 } else if (res.data.code === -2) {
    //                     this.$message({
    //                     message: res.msg,
    //                     type: "error"
    //                     });
    //                 }
    //                 })
    //             .catch(err => {
    //             //错误处理
    //             this.listLoading = false;
    //             });
    //     },

    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    uploaderror(file) {
      var aa = this.file.name;
      var ss = aa.split(".")[0];
      if (ss.match(/_+/)) {
        this.$message({
          message: "文件上传不符合规则",
          type: "success"
        });
        return false;
      }
    },
    uploadMainImg() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      console.log(this.file);

      form.append("file", this.file);
      form.append("action", "UploadVMKImagePath");
      axios
        .post(resName.projectUpload(), form, {
          timeout: 1000000000,
          onUploadProgress: progressEvent => {
            let percent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
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
            _this.demand = res.data.data;
            _this.Demand.push(_this.demand);
            _this.videoUploadPercent = 0;
            _this.uploadLoading = false;
          } else if (res.code === -2) {
            this.$message({
              message: "上传失败",
              type: "error"
            });
          }
        })
        .catch(err => {});
    },

    //  // 删除项目图纸
    //     delDraws:function(){
    //         let params={
    //             filename:this.template_drawings
    //         }
    //         resName
    //             .deleOldImg(params)
    //                 .then(res => {
    //                 //数据处理
    //                 if (res.code === 1) {
    //                     this.$message({
    //                     message: res.msg,
    //                     type: "success"
    //                     });
    //                 } else if (res.data.code === -2) {
    //                     this.$message({
    //                     message: res.msg,
    //                     type: "error"
    //                     });
    //                 }
    //                 })
    //             .catch(err => {
    //             //错误处理
    //             this.listLoading = false;
    //             });
    //     },

    // 上传文件，获取文件流
    handleChange2(file2) {
      this.file2 = file2.raw;
      var aa = this.file2.name;
      var ss = aa.split(".")[0];
      if (ss.match(/_+/)) {
        this.$message({
          message: "文件上传不符合规则",
          type: "success"
        });
        return false;
      }
    },
    uploaderror2(file2) {
      var aa = this.file2.name;
      var ss = aa.split(".")[0];
      if (ss.match(/_+/)) {
        this.$message({
          message: "文件上传不符合规则",
          type: "success"
        });
        return false;
      }
    },
    uploadMainImg2() {
      var _this = this;
      // 创建表单对象
      let form2 = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form2.append("file", this.file2);
      form2.append("action", "UploadVMKImagePath");
      axios
        .post(resName.projectUpload(), form2, {
          timeout: 1000000000,
          onUploadProgress: progressEvent => {
            let percent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
            _this.videoFlag = true;
            _this.videoUploadPercent = percent;
            _this.uploadLoading2 = true;
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            _this.videoUploadPercent = 0;
            _this.uploadLoading2 = false;
            _this.template_drawings = res.data.data;
            _this.templateDrawings.push(_this.template_drawings);
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
<style lang="less" scoped>
.el-input {
  width: 100% !important;
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
.dockingbut {
  margin-left: 60px;
}
// .el-collapse {
//   border-top: none !important;
// }
.gline {
  margin-bottom: 30px;
}
.specItem {
  overflow: hidden;
}
.specItem .dockingUser {
  margin-bottom: 15px;
  width: 33%;
  float: left;
}
h3 {
  width: 100%;
}
.title_line {
  width: 97%;
  height: 1px;
  border-bottom: 0.5px solid #efefef;
  margin-bottom: 34px;
  margin-left: 20px;
}
.el-select {
  width: 100% !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
</style>
