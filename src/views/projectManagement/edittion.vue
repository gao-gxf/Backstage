<template>
     <!--列表-->
      <div id="container">
        <el-tabs type="border-card">
            <el-tab-pane label="编辑项目" >
                <el-form
                :model="dataList"
                ref="dataList"
                :rules="dataListRules"
                :hide-required-asterisk="true"
                label-width="100px"
                v-loading="listLoading"
                showClose="false">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="基本信息" name="1">
                        <template slot="title">
                            <h3>基本信息</h3>
                        </template>
                        <div class="title_line"></div>
                        <div class="specItem">
                            <el-form-item label="项目名称" prop="project_names" class="dockingUser">
                        <el-input v-model="dataList.project_names"></el-input>
                        </el-form-item>
                        <el-form-item label="项目来源" prop="sources" class="dockingUser">
                        <el-select v-model="dataList.sources" placeholder="请选择">
                            <el-option
                                v-for="item in Sources"
                                :key="item.id"
                                :label="item.class_value"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="项目类别" prop="project_category" class="dockingUser">
                            <el-select v-model="dataList.project_category" placeholder="请选择">
                                <el-option
                                    v-for="item in projectCategory"
                                    :key="item.id"
                                    :label="item.class_value"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目规模" prop="star_levels" class="dockingUser">
                            <el-select v-model="dataList.star_levels" placeholder="请选择">
                                <el-option
                                    v-for="item in starLevel"
                                    :key="item.id"
                                    :label="item.class_value"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Duotel ID" prop="duotel_ids" class="dockingUser">
                            <el-input v-model="dataList.duotel_ids"  ></el-input>
                        </el-form-item>
                        <el-form-item label="项目业主" prop="owner" class="dockingUser">
                            <el-select v-model="dataList.owner" placeholder="请选择">
                                <el-option
                                    v-for="item in Owner"
                                    :key="item.id"
                                    :label="item.class_value"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目品牌" prop="brand" class="dockingUser">
                            <el-select v-model="dataList.brand" placeholder="请选择">
                                <el-option
                                    v-for="item in Brand"
                                    :key="item.id"
                                    :label="item.project_brand_name"
                                    :value="item.project_brand_name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="管理公司" prop="companys" class="dockingUser">
                            <el-input v-model="dataList.companys"  ></el-input>
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
                        <el-form-item label="客房数量" prop="room_numbers" class="dockingUser">
                            <el-input v-model="dataList.room_numbers"  ></el-input>
                        </el-form-item>
                        <el-form-item label="项目时间" prop="times" class="dockingUser">
                            <el-date-picker
                                v-model="dataList.times"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="项目经理" prop="project_managers" class="dockingUser">
                            <el-input v-model="dataList.project_managers"  ></el-input>
                        </el-form-item>
                        <el-form-item label="项目进程" class="dockingUser">
                            <el-select v-model="dataList.Schedules" placeholder="请选择">
                                <el-option
                                    v-for="item in Schedule"
                                    :key="item.id"
                                    :label="item.class_value"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="预计金额" prop="expect_moneys" class="dockingUser">
                            <el-input v-model="dataList.expect_moneys"  ></el-input>
                        </el-form-item>
                        <el-form-item label="成交金额" prop="complete_moneys" class="dockingUser">
                            <el-input v-model="dataList.complete_moneys"  ></el-input>
                        </el-form-item>
                        <el-form-item label="项目需求">
                            <el-upload
                                class="upload-demo"
                                action=""
                                accept=".zip"
                                :before-upload="uploaderror"
                                :http-request="uploadMainImg"
                                :on-change="handleChange"
                                multiple
                                :show-file-list="true"
                                :file-list="fileList1">
                                <el-button size="small" type="primary" :loading="uploadLoading">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </div>
                    </el-collapse-item>
                </el-collapse>

                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="工程管理" name="工程管理">
                    <template slot="title">
                        <h3>项目管理</h3>
                    </template>
                    <div class="title_line"></div>
                    <div class="specItem">
                        <el-form-item label="样板间数量" prop="template_rooms" class="dockingUser">
                            <el-input v-model="dataList.template_rooms"></el-input>
                        </el-form-item>
                        <el-form-item label="样板间完成数" prop="template_room_complete" readonly class="dockingUser">
                            <el-input v-model="dataList.template_room_complete"></el-input>
                        </el-form-item>
                        <el-form-item label="施工总数量" prop="construction_room_numbers" class="dockingUser">
                            <el-input v-model="dataList.construction_room_numbers"></el-input>
                        </el-form-item>
                        <el-form-item label="施工完成数" prop="bind_cube_room_numbers" class="dockingUser">
                            <el-input v-model="dataList.bind_cube_room_numbers"></el-input>
                        </el-form-item>
                        <el-form-item label="项目详细地址" prop="addresss" class="dockingUser">
                            <el-input v-model="dataList.addresss"  ></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="项目地址">
                            <VDistpicker province="省" city="市" area="区" @selected="selected"></VDistpicker>
                        </el-form-item>
                        <el-form-item label="工程图纸" prop="template_drawings">
                            <el-upload
                                class="upload-demo"
                                action=""
                                accept=".zip"
                                :before-upload="uploaderror"
                                :http-request="uploadMainImg2"
                                :on-change="handleChange2"
                                    multiple
                                :show-file-list="true"
                                :file-list="fileLists">
                                <el-button size="small" type="primary" :loading="uploadLoading2">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>



                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="联系人信息" name="联系人信息">
                    <template slot="title">
                        <h3>联系人信息</h3>
                    </template>
                    <div class="title_line"></div>
                    <div class="specItem" v-for="(item,i) in dockinguser" :key='i'>
                        <el-form-item label="姓名"  class="dockingUser" prop="name">
                            <el-input v-model="item.name"   placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" class="dockingUser"  prop="phone">
                            <el-input v-model="item.phone"   placeholder="请输入电话" ></el-input>
                        </el-form-item>
                        <el-form-item label="职位" class="dockingUser" >
                            <el-input v-model="item.position"    placeholder="请输入职位"></el-input>
                        </el-form-item>
                        <el-form-item label="备注"  class="dockingUser">
                            <el-input v-model="item.desc"    placeholder="请输入备注"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱"  class="dockingUser" >
                            <el-input v-model="item.email"   placeholder="请输入邮箱" ></el-input>
                        </el-form-item>
                            <el-button class="dockingbut" type="success" size="small" v-if="i == 0" @click="newlyAdded(i)">新增</el-button>
                            <el-button class="dockingbut" type="primary" size="small" v-if="i != 0" @click="newlyDel(i)">删除</el-button>
                        <div class="gline"></div>
                    </div>
                    </el-collapse-item>
                </el-collapse>
                    <div class="btnBox" style="margin-top:20px;">
                        <el-button type="primary" size="small" @click='submitEdit'>提交</el-button>
                    </div>
                </el-form>
            </el-tab-pane>
        </el-tabs>
         
      </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import { resName } from "../../api/api";
import axios from 'axios';
export default {
    components: { VDistpicker },
    data(){
        return{
            Upload:"",
            activeNames:'',
            bb:{},
            dataList:{
                project_names:"",
                project_category:"",
                star_levels:"",
                room_numbers:"",
                times:"",
                sources:"",
                owner:"",
                brand:"",
                demands:"",
                companys:"",
                duotel_ids:"",
                project_managers:"",
                expect_moneys:"",
                complete_moneys:"",
                template_rooms:"",
                construction_room_numbers:"",
                bind_cube_room_numbers:"",
                addresss:"",
                phones:"",
                names:"",
                positions:"",
                descs:"",
                emails:"",
                Schedules:"",
                template_room_complete:""
            },
                
            dataListRules:{
                project_names:[{
                    required: true,
                    message: "请输入项目名称",
                    trigger: "change"
                }],
                project_category:[{
                    required: true,
                    message: "请输入项目类别",
                    trigger: "change"
                }],
                room_numbers:[{
                    required: true,
                    message: "请输入房间号码",
                    trigger: "change"
                }],
                star_levels:[{
                    required: true,
                    message: "请输入项目规模",
                    trigger: "change"
                }],
                demands:[{
                    required: true,
                    message: "请输入项目需要",
                    trigger: "change"
                }],
                times:[{
                    required: true,
                    message: "请输入项目时间",
                    trigger: "change"
                }],
                sources:[{
                    required: true,
                    message: "请输入项目来源",
                    trigger: "change"
                }],
                owner:[{
                    required: true,
                    message: "请输入项目业主",
                    trigger: "change"
                }],
                 template_rooms:[{
                    required: true,
                    message: "请输入项目样板间",
                    trigger: "change"
                }],
                brand:[{
                    required: true,
                    message: "请输入项目品牌",
                    trigger: "change"
                }],
                schedules:[{
                    required: true,
                    message: "请输入项目进程",
                    trigger: "change"
                }],
                companys:[{
                    required: true,
                    message: "请输入项目公司",
                    trigger: "change"
                }],
                duotel_ids:[{
                    required: true,
                    message: "请输入Duotel ID",
                    trigger: "change"
                }],
                project_managers:[{
                    required: true,
                    message: "请输入项目经理",
                    trigger: "change"
                }],
                expect_moneys:[{
                    required: true,
                    message: "请输入预计金额",
                    trigger: "change"
                }],
                complete_moneys:[{
                    required: true,
                    message: "请输入成交金额",
                    trigger: "change"
                }],
                template_rooms:[{
                    required: true,
                    message: "请输入项目样板间",
                    trigger: "change"
                }],
                bind_cube_room_numbers:[{
                    required: true,
                    message: "请输入已完成数量",
                    trigger: "change"
                }],
                addresss:[{
                    required: true,
                    message: "请输入项目地址",
                    trigger: "change"
                }],
                construction_room_numbers:[{
                    required: true,
                    message: "请输入施工数量",
                    trigger: "change"
                }]
            },
            demand:[],
            template_drawings:[],
            listLoading:false,
            goods_spec:"",
            goodsInfo:[],
            company_address:"",
            personal_address:"",
            projectCategory:[],
            starLevel:[],
            fileList:[],
            Schedule:[],
            dockinguser:[
                
            ],
            file:"",
            file2:"",
            demand:"",
            template_drawings:"",
            Demand:[],
            templateDrawings:[],
            fileList1:[],
            fileLists: [],
            Owner:[],
            Brand:[],
            Sources:[],
            videoUploadPercent:0,
            uploadLoading:false,
            uploadLoading2:false,
        }
    },
    created(){
      this.commonsData();
      this.aa();
    },
    methods:{
        selected(data) {
            this.province = data.province.value;
            this.city = data.city.value;
            this.area = data.area.value;
        },
        aa() {
            var d = new Date(this.dataList.time);  
            var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            let params={
                project_id:this.$route.query.id
            }
            resName
                .projectDetails(params)
                    .then(res => {
                    //数据处理
                    if (res.code === 1) {
                        this.bb = res.data
                        this.dockinguser = this.bb.docking_user
                        this.dataList.project_names = this.bb.project_name,
                        this.dataList.project_category = this.bb.project_category,
                        this.dataList.star_levels = this.bb.star_level,
                        // this.dataList.demands = this.bb.demand[0],
                        this.dataList.room_numbers = this.bb.room_number,
                        this.dataList.times = this.bb.time,
                        this.dataList.sources = this.bb.source,
                        this.dataList.owner = this.bb.owner,
                        this.dataList.brand = this.bb.brand,
                        this.dataList.companys = this.bb.company,
                        this.dataList.duotel_ids = this.bb.duotel_id,
                        this.dataList.project_managers = this.bb.project_manager,
                        this.dataList.expect_moneys = this.bb.expect_money,
                        this.dataList.complete_moneys = this.bb.complete_money,
                        this.dataList.template_drawings = this.bb.template_drawings,
                        this.dataList.template_rooms = this.bb.template_room,
                        this.dataList.addresss = this.bb.address,
                        this.dockinguser = this.bb.docking_user,
                        this.dataList.bind_cube_room_numbers = this.bb.bind_cube_room_number,
                        this.dataList.Schedules = this.bb.schedule,
                        this.dataList.construction_room_numbers = this.bb.construction_room_number,
                        this.dataList.template_room_complete = this.bb.template_room_complete
                        // 项目需要
                        for(var key in this.bb.demand){
                            var temp = {"name":this.bb.demand[key]};
                            this.fileList1.push(temp);
                        }
                        // 项目模板图
                        for(var key in this.bb.template_drawings){
                            var temps = {"name":this.bb.template_drawings[key]};
                            this.fileLists.push(temps);
                        }
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
        // 提交编辑数据
        submitEdit:function(){
            this.$refs.dataList.validate(valid => {
                if (valid) {
                // var d = new Date(this.dataList.time);  
                // var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                let params={
                    project_id:this.$route.query.id,
                    project_name:this.dataList.project_names,
                    project_category:this.dataList.project_category,
                    star_level:this.dataList.star_levels,
                    demand:this.Demand,
                    room_number:this.dataList.room_numbers,
                    time:this.dataList.times,
                    // time:youWants,
                    source:this.dataList.sources,
                    owner:this.dataList.owner,
                    brand:this.dataList.brand,
                    company:this.dataList.companys,
                    duotel_id:this.dataList.duotel_ids,
                    project_manager:this.dataList.project_managers,
                    expect_money:this.dataList.expect_moneys,
                    complete_money:this.dataList.complete_moneys,
                    template_drawings:this.templateDrawings,
                    template_room:this.dataList.template_rooms,
                    bind_cube_room_number:this.dataList.bind_cube_room_numbers,
                    address:this.dataList.addresss,
                    docking_user:this.dockinguser,
                    construction_room_number:this.dataList.construction_room_number,
                    phone:this.dataList.phones,
                    name:this.dataList.names,
                    position:this.dataList.positions,
                    desc:this.dataList.descs,
                    email:this.dataList.email,
                    schedule:this.dataList.Schedules,
                    template_room_complete:this.dataList.template_room_complete
                }
                resName
                    .projectEdit(params)
                        .then(res => {
                        //数据处理
                        if (res.data.code === 1) {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                                });
                            this.$router.replace({path : "/projectManagement/allproject"})
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
            })
        },
        commonsData(){
            // 项目品牌
            resName
                .getProjectBrand()
                    .then(res => {
                    //数据处理
                    if (res.code === 1) {
                        this.Brand = res.data
                       } 
                    })
                    .catch(err => {
                    //错误处理
                    return false;
                    });
            // 项目来源
            let paramsr={
                class_type:"project_source"
            }
            resName
                .webgetcommonsdata(paramsr)
                    .then(res => {
                    //数据处理
                    if (res.code === 1) {
                        this.Sources = res.data
                    } 
                    })
                    .catch(err => {
                    //错误处理
                    return false;
                    });
            // 项目类别
            let params={
                class_type:"project_category"
            }
            resName
                .webgetcommonsdata(params)
                    .then(res => {
                    //数据处理
                    if (res.code === 1) {
                        this.projectCategory = res.data
                    } 
                    })
                    .catch(err => {
                    //错误处理
                    return false;
                    });
                    // 项目规模
            let para={
                class_type:"star_level"
            }
            resName
            .webgetcommonsdata(para)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.starLevel = res.data
                } 
                })
                .catch(err => {
                //错误处理
                return false;
                });
                // 项目进程
            let pars={
                class_type:"schedule"
            }
            resName
            .webgetcommonsdata(pars)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.Schedule = res.data
                } 
                })
                .catch(err => {
                //错误处理
                return false;
                });
                // 项目业主
                 let parazxc={
                class_type:"project_owner"
            }
            resName
            .webgetcommonsdata(parazxc)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.Owner = res.data
                } 
                })
                .catch(err => {
                //错误处理
                return false;
                });
            },
        // 添加
        newlyAdded:function(val){
            var obj = {
                phone:"",
                name:"",
                position:"",
                desc:"",
                email:"",
            }
            this.dockinguser.push(obj)
        },
        // 删除
        newlyDel:function(i){
            this.dockinguser.splice(i,1)
        },
        // 上传文件，获取文件流
        handleChange(file) {
            this.file = file.raw
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
        // 上传项目需求
        uploadMainImg(){
            var _this = this;
            // 创建表单对象
            let form = new FormData();
            // 后端接受参数 ，可以接受多个参数
            form.append("file",this.file)
            form.append("action", "UploadVMKImagePath");
           axios.post(resName.projectUpload(), form,{
               timeout:1000000000,
               onUploadProgress : progressEvent => {
                    let percent=(progressEvent.loaded / progressEvent.total * 100) | 0
                    //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                        _this.videoUploadPercent = percent
                        _this.uploadLoading = true
                }
               }).then(res => {
                    if(res.data.code === 1){
                        this.$message({
                            message: "上传成功",
                            type: "success"
                            });
                        _this.videoUploadPercent = 0;
                        _this.demand = res.data.data
                        _this.Demand.push(_this.demand)
                        resName.deleOldImg(_this.demand);
                        _this.uploadLoading = false
                    }else if(res.data.code === -2){
                         this.$message({
                            message: "上传失败",
                            type: "error"
                            });
                    }
                    }).catch((err)=>{
                    //上传失败 调用onError方法
                    //处理自己的逻辑
                    })
        },
        // 上传文件，获取文件流
        handleChange2(file) {
            this.file2 = file.raw
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
        uploadMainImg2(){
            var _this = this;
            // 创建表单对象
            let form = new FormData();
            // 后端接受参数 ，可以接受多个参数
            form.append("file",this.file)
            form.append("action", "UploadVMKImagePath");
            axios.post(resName.projectUpload(), form,{
                timeout:1000000000,
                onUploadProgress : progressEvent => {
                    let percent=(progressEvent.loaded / progressEvent.total * 100) | 0
                    //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                        _this.videoFlag = true;
                        _this.videoUploadPercent = percent
                        _this.uploadLoading2 = true
                }}).then(res => {
                if(res.data.code === 1){
                    this.$message({
                        message: "上传成功",
                        type: "success"
                        });
                        _this.videoUploadPercent = 0;
                    _this.template_drawings = res.data.data
                    _this.templateDrawings.push(_this.template_drawings)
                        resName.deleOldImg(_this.template_drawings);
                    _this.uploadLoading2 = false
                }else if(res.data.code === -2){
                        this.$message({
                        message: "上传失败",
                        type: "error"
                        });
                }   
            }).catch(err => {
                    //错误处理
            });
        },
    }
}
</script>
<style lang="less" scoped>
.el-input__inner{
    background-color: #F5F7FA;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
    display:inline-block;
}
    .goods_span{
        color: #606266;
    }
    
    #container h3{
        margin-left:20px;
    }
    .dockingUser{
        width:33%;
        float:left;
        // display:inline-block;
        margin-bottom:20px;
        // margin-right:20px;
    }
    .dockingbut{
        margin-left:60px;
    }
    .gline{
         margin-bottom:30px;
    }
    .el-select{
        width: 100% !important;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100% !important;
    }
</style>
