<template>
     <!--列表-->
      <div id="container">
        <el-tabs type="border-card">
            <el-tab-pane label="项目详情" >
                <el-form
                :model="detailList"
                :hide-required-asterisk="false"
                label-width="100px"
                v-loading="listLoading"
                showClose="false">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item  name="1">
                            <template slot="title">
                              <h3>基本信息</h3> 
                            </template>
                              <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="项目名称" class="dockingUser">
                                    <el-input v-model="detailList.project_name" readonly></el-input>
                                </el-form-item>
                                 <el-form-item label="项目来源" class="dockingUser" prop="source">
                                    <div v-for="item in Source" :key="item.id">
                                        <el-input v-if="detailList.source === item.id" v-model="item.class_value"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="项目类别" prop="project_category" class="dockingUser">
                                    <div v-for="item in projectCategory" :key="item.id">
                                        <el-input v-if="detailList.project_category === item.id" v-model="item.class_value"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="Duotel ID" class="dockingUser">
                                    <el-input v-model="detailList.duotel_id" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="项目规模" prop="star_level" class="dockingUser">
                                    <div v-for="item in starLevel" :key="item.id">
                                        <el-input v-if="detailList.star_level === item.id" v-model="item.class_value"></el-input>
                                    </div>
                                </el-form-item>
                                 <el-form-item label="项目时间" class="dockingUser">
                                    <el-input v-model="detailList.time" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="项目品牌" class="dockingUser" prop="brand">
                                      <div v-for="item in getProject" :key="item.id">
                                        <el-input v-if="detailList.brand === item.id"  v-model="item.project_brand_name"></el-input>
                                      </div>
                                </el-form-item>
                                <el-form-item label="项目业主" class="dockingUser" prop="owner">
                                    <div v-for="item in Owner" :key="item.id">
                                        <el-input v-if="detailList.owner === item.id" v-model="item.class_value"></el-input>
                                    </div>
                                </el-form-item>
                                
                                <el-form-item label="管理公司" class="dockingUser">
                                    <el-input v-model="detailList.company" readonly></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item  title="项目管理" name="项目管理">
                             <template slot="title">
                                <h3>项目管理</h3> 
                             </template>
                                <div class="title_line"></div>
                            <div class="specItem">
                                <el-form-item label="客房数量" class="dockingUser">
                                    <el-input v-model="detailList.room_number" readonly ></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="项目时间" class="dockingUser">
                                    <el-input v-model="detailList.time" readonly ></el-input>
                                </el-form-item> -->
                                 <el-form-item label="项目经理" class="dockingUser">
                                    <el-input v-model="detailList.project_manager" readonly ></el-input>
                                </el-form-item>
                                
                            <el-form-item label="预计金额" class="dockingUser">
                                    <el-input v-model="detailList.expect_money" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="成交金额" class="dockingUser">
                                    <el-input v-model="detailList.complete_money" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="项目进度" prop="schedule" class="dockingUser">
                                    <div v-for="item in Schedul" :key="item.id">
                                        <el-input v-if="detailList.schedule === item.id" v-model="item.class_value"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="项目需求">
                                        <div v-for="(item,index) in projectDemand" :key="index">
                                            <el-button type="primary" size='mini' @click="downDemand(index)">
                                                <i class="el-icon-download">下载</i>&ensp;&ensp;
                                            </el-button>
                                            <div style='display:inline-block;'>{{item}}</div>
                                        </div>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="工程管理" name="工程管理">
                             <template slot="title">
                           <h3>工程管理</h3> 
                             </template>
                                <div class="title_line"></div>
                            <div class="specItem">
                                  <el-form-item label="项目地址" class="dockingUser" style="width:100%;">
                                    <el-input v-model="detailList.address" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="样板间数量" prop="template_room" class="dockingUser">
                                    <el-input v-model="detailList.template_room"></el-input>
                                </el-form-item>
                                <el-form-item label="样板间完成数" prop="template_room_complete" readonly class="dockingUser" >
                                    <el-input v-model="detailList.template_room_complete"></el-input>
                                </el-form-item>
                                <el-form-item label="施工总数量" prop="construction_room_number" class="dockingUser">
                                    <el-input v-model="detailList.construction_room_number"></el-input>
                                </el-form-item>
                                <el-form-item label="施工完成数" prop="bind_cube_room_number" class="dockingUser" >
                                    <el-input v-model="detailList.bind_cube_room_number"></el-input>
                                </el-form-item>
                                <el-form-item label="项目地址" class="dockingUser" >
                                    <el-input v-model="detailList.address" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="进场时间" class="dockingUser" >
                                    <el-input v-model="detailList.arrival_time" readonly ></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="工程图纸">
                                        <div v-for="(item,index) in projectDrawws" :key="index">
                                            <el-button type="primary" size='mini' @click="downConstruction(index)">
                                                <i class="el-icon-download">下载</i>&ensp;&ensp;
                                            </el-button>
                                            <div  style='display:inline-block;'>{{item}}</div>
                                        </div>
                                </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" >
            <el-form
            :model="detailList"
            :hide-required-asterisk="false"
            label-width="100px"
            v-loading="listLoading"
            showClose="false">
                    <el-collapse v-model="activeNames" v-for="(v,index) in detailList.docking_user" :key="index">
                        <el-collapse-item :title="v.name" name="1">
                            <b slot="title">
                                {{v.name}} 
                            </b>
                            <div class="specItem">
                            <el-form-item label="姓名"  class="dockingUser" prop="name">
                                <el-input v-model="v.name"   placeholder="请输入姓名" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="电话" class="dockingUser"  prop="phone">
                                <el-input v-model="v.phone"   placeholder="请输入电话" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="职位" class="dockingUser" >
                                <el-input v-model="v.position"    placeholder="请输入职位" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="备注"  class="dockingUser">
                                <el-input v-model="v.desc"    placeholder="请输入备注" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱"  class="dockingUser" >
                                <el-input v-model="v.email"   placeholder="请输入邮箱" readonly></el-input>
                            </el-form-item>
                            <div class="gline"></div>
                        </div>
                        </el-collapse-item>
                    </el-collapse>
            </el-form>
        </el-tab-pane>
    <!-- gao -->
    <!-- 项目图纸 -->
      <el-tab-pane label="项目图纸">
        <el-form :inline="true" :model="search">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="search">
                    <el-form-item class="left">
                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addList">新增项目图纸</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-form>
        <el-table
          :data="drawList"
          highlight-current-row
          v-loading="listLoading"
          border
          align="center"
          style="width: 99.9%;"
          
        >
          <el-table-column prop="drawings_name" label="图纸名称" width="280" align="center" sortable></el-table-column>
          <el-table-column prop="create_time" label="上传时间" align="center" sortable></el-table-column>
          <el-table-column prop="create_by" label="上传人" align="center" sortable></el-table-column>
          <el-table-column label="操作" min-width="130" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="handleDown(scope.$index, scope.row)"
                size="mini"
                plain
              >下载</el-button>
              <el-button
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                size="mini"
                plain
              >编辑</el-button>
              <el-button
                type="danger"
                @click="handleDel(scope.$index, scope.row)"
                size="mini"
                plain
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      
        <!--新增项目图纸-->
        <el-dialog
          title="新增项目图纸"
          :visible.sync="addFormVisible"
          :close-on-click-modal="false"
          :show-close="true">
          <el-form class="creactivit" :hide-required-asterisk="false" label-width="100px">
            <el-upload
              class="upload-demo"
              action
              accept=".zip"
              :http-request="uploadMainImg"
              :on-change="handleChange"
              multiple
              :show-file-list="true"
            :file-list="fileList1">
              <el-button size="small" type="primary" :loading="uploadLoading">点击上传</el-button>
            </el-upload>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              size="small"
              
              @click="cancel('addForm')"
            >取消</el-button>
            <el-button size="small" type="primary" @click.native="addSubmit">提交</el-button>
          </div>
        </el-dialog>
        <!--编辑图纸-->
        <el-dialog
          title="编辑图纸"
          :visible.sync="editFormVisible"
          :close-on-click-modal="false"
          :show-close="true">
          <el-form class="creactivit" :hide-required-asterisk="false" label-width="100px">
            <el-upload
              class="upload-demo"
              action
              accept=".zip"
              :http-request="uploadMainImg2"
              :on-change="handleChange2"
              multiple
              :show-file-list="true"
              :file-list="fileLists"
            >
              <el-button size="small" type="primary" :loading="uploadLoading2">点击上传</el-button>
            </el-upload>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              size="small"
              @click.native="editFormVisible = false "
              @click="resetFields('editForm')"
            >取消</el-button>
            <el-button size="small" type="primary" @click.native="editSubmit" >提交</el-button>
          </div>
        </el-dialog>
<!-- gao -->
        <el-tab-pane label="项目订单" >
            <el-form
            :model="projectOrder"
            :hide-required-asterisk="false"
            label-width="100px"
            v-loading="listLoading"
            showClose="false">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="search">
                    <el-form-item class="left">
                        <el-button type="primary" size="mini" icon="el-icon-plus" v-on:click="projectorderList">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table
                    :data="OrderList"
                    highlight-current-row
                    v-loading="listLoading"
                    border
                    align="center"
                    @selection-change="selsChange"
                    style="width: 99.9%;"
                    >
                    <el-table-column prop="project_id" label="订单ID" width="280" align="center" sortable></el-table-column>
                    <el-table-column prop="order_no" label="订单编号" align="center" sortable></el-table-column>
                    <el-table-column prop="create_by" label="下单人" align="center" sortable></el-table-column>
                    <el-table-column prop="create_time" label="下单时间" align="center" sortable></el-table-column>
                    <el-table-column label="操作" min-width="130" align="center">
                        <template slot-scope="scope">
                        <el-button
                            type="danger"
                            @click="handleorderDel(scope.$index, scope.row)"
                            size="mini"
                            plain
                        >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-tab-pane>

        <!-- <el-tab-pane label="客户服务" >
            <el-table
                    :data="OrderList"
                    highlight-current-row
                    v-loading="listLoading"
                    border
                    align="center"
                    @selection-change="selsChange"
                    style="width: 99.9%;"
                    >
                    <el-table-column prop="project_id" label="订单ID" width="280" align="center" sortable></el-table-column>
                    <el-table-column prop="order_no" label="订单编号" align="center" sortable></el-table-column>
                    <el-table-column prop="create_by" label="下单人" align="center" sortable></el-table-column>
                    <el-table-column prop="create_time" label="下单时间" align="center" sortable></el-table-column>
                    <el-table-column label="操作" min-width="130" align="center">
                        <template slot-scope="scope">
                            <el-button
                            type="danger"
                            @click="handleService(scope.$index, scope.row)"
                            size="mini"
                            plain
                        >详情</el-button>
                        <el-button
                            type="danger"
                            @click="handleService(scope.$index, scope.row)"
                            size="mini"
                            plain
                        >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </el-tab-pane> -->

    </el-tabs>

    <!--新增项目订单-->
    <el-dialog title="新增订单" :visible.sync="addprojectVisible" :close-on-click-modal="false" :show-close="true">
      <el-form :model="addprojectForm" :rules="addFormRules" ref="addprojectForm" class="creactivit" :hide-required-asterisk="false" label-width="100px">
        <el-form-item label="订单号" prop="order_no">
          <el-input placeholder="订单号" v-model="addprojectForm.order_no" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="addprojectVisible = false " @click="resetFields('addprojectForm')">取消</el-button>
        <el-button size="small" type="primary" @click.native="addprojectSubmit">提交</el-button>
      </div>
    </el-dialog>


      </div>
</template>


<script>
import { resName } from "../../api/api";
import axios from 'axios';
export default {
    data(){
        return{
            addprojectVisible: false, //新增是否显示
            addLoading: false,
            addFormRules: {
                project_id: [
                {
                    required: true,
                    message: "请输入项目id",
                    trigger: "change"
                }
                ],
                duotel_id: [
                {
                    required: true,
                    message: "请输入duotel_id",
                    trigger: "change"
                }
                ],
                order_no: [
                {
                    required: true,
                    message: "请输入订单号",
                    trigger: "change"
                }
                ]
            },
            //新增数据
            addprojectForm: {
                project_id: "",
                duotel_id: "",
                order_no:"",
            },
            hideUpload: false,
            Upload:"",
            activeNames: ['1'],
            search:{
                name:""
            },
            detailList:{
                project_name:"",
                project_category:"",
                star_level:"",
                schedule:"",
                room_number:"",
                time:"",
                source:"",
                owner:"",
                brand:"",
                company:"",
                duotel_id:"",
                project_manager:"",
                expect_money:"",
                complete_money:"",
                template_room:"",
                bind_cube_room_number:"",
                address:"",
            },
            value1:"",
            addFormVisible: false, //新增是否显示
            //新增数据
            addForm: {
                catname: "",
            },
            projectDraw:{
                project_name:"",
            },
            projectOrder:{
                project_name:"",
            },
            customerService:{
                project_name:"",
            },
            Demand:[],
            templateDrawings:[],
            template_drawings:[],
            docking_user:[],
            listLoading:false,
            goods_spec:"",
            goodsInfo:[],
            company_address:"",
            personal_address:"",
            projectCategory:[],
            starLevel:[],
            fileList:[],
            Schedul:[],
            fileList1:[],
            fileLists: [
              {
                name:"",
                url:""
              }
            ],
            name:[],
            OrderList:[],
            customerService:[],
            // gao
            Schedul: [],
            
            name: [],
            drawList: [],
            file: "",
            file2: "",
            drawingsUrl: "",
            drawingsUrl2: "",
            drawingsName: "",
            drawingsName2: "",
            id:"",
            editFormVisible:false,
            // gao
            projectDemand:[],
            projectDrawws:[],
            getProject:[],
            Source:[],
            Owner:[],
            uploadLoading:false,
            uploadLoading2:false,
            videoUploadPercent:0,
        }
    },
    created(){
      this.commonsData();
      this.projectDetails();
      this.projectDrawing();
      this.projectOrderList();
    },
    methods:{
      // // 删除项目图纸
      //   delDraw:function(){
      //       let params={
      //           filename:this.drawingsUrl
      //       }
      //       resName
      //           .deleOldImg(params)
      //               .then(res => {
      //               //数据处理
      //               if (res.code === 1) {
      //                   this.$message({
      //                   message: res.msg,
      //                   type: "success"
      //                   });
      //               } else if (res.data.code === -2) {
      //                   this.$message({
      //                   message: res.msg,
      //                   type: "error"
      //                   });
      //               }
      //               })
      //           .catch(err => {
      //           //错误处理
      //           this.listLoading = false;
      //           });
      //   },
        // // 删除编辑时上传的文件
        // // 删除项目图纸
        // deleditDraw:function(){
        //     let params={
        //         filename:this.drawingsUrl2
        //     }
        //     resName
        //         .deleOldImg(params)
        //             .then(res => {
        //             //数据处理
        //             if (res.code === 1) {
        //                 this.$message({
        //                 message: res.msg,
        //                 type: "success"
        //                 });
        //             } else if (res.data.code === -2) {
        //                 this.$message({
        //                 message: res.msg,
        //                 type: "error"
        //                 });
        //             }
        //             })
        //         .catch(err => {
        //         //错误处理
        //         this.listLoading = false;
        //         });
        // },
        selsChange:function(){

        },
       
        //项目需求下载
       downDemand:function(index){
            let url = this.Demand[index]
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // 获取文件名
            // download 属性定义了下载链接的地址而不是跳转路径
            link.setAttribute('download', url)
            document.body.appendChild(link)
            link.click()
       },
    //施工管理中工程图纸下载
       downConstruction:function(index){
           let url = this.templateDrawings[index]
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // 获取文件名
            // download 属性定义了下载链接的地址而不是跳转路径
            link.setAttribute('download', url)
            document.body.appendChild(link)
            link.click()
       },
       handleDown(index,row) {
        let url = row.drawings_url
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取文件名
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', url)
        document.body.appendChild(link)
        link.click()
    },
        // 获取详情列表
        projectDetails: function() {
            var _this = this;
            var params = {
                project_id: _this.$route.query.id,
            };
            this.listLoading = true;
            resName
                .projectDetails(params)
                .then(res => {
                if (res.code === 1) {
                    this.detailList = res.data;
                    // 项目需要
                    for(var j=0;j<res.data.demand.length;j++){
                        var aa=[],
                        aa = res.data.demand
                        var tempa = aa[j].split("/")[3].split("_")[0]
                        this.projectDemand.push(tempa)
                    }

                    for(var i=0;i<res.data.template_drawings.length;i++){
                        var bb=[],
                        bb = res.data.template_drawings
                        var tempaa = bb[i].split("/")[3].split("_")[0]
                        this.projectDrawws.push(tempaa)
                    }

                    this.Demand = this.detailList.demand;
                    this.templateDrawings = this.detailList.template_drawings;
                    this.detailList.docking_user = res.data.docking_user

                    for(var i=0;i<this.detailList.docking_user.length;i++){
                        this.name.push(this.detailList.docking_user[i].name)
                    }
                    this.listLoading = false;
                    }
                })
                .catch(err => {
                //错误处理
                this.listLoading = false;
                return false;
                });
        },
        // 获取项目订单列表
        projectOrderList: function() {
            var _this = this;
            var params = {
                project_id: this.$route.query.id,
            };
            this.listLoading = true;
            resName
                .projectOrder(params)
                .then(res => {
                if (res.code === 1) {
                    this.OrderList = res.data;
                    this.listLoading = false;
                    }
                })
                .catch(err => {
                //错误处理
                this.listLoading = false;
                return false;
                });
        },
        // 新增项目订单列表
        projectorderList:function(){
            this.addprojectVisible = true;
            this.addprojectForm.project_id = this.detailList.project_id;
            this.addprojectForm.duotel_id = this.detailList.duotel_id;
        },
        // 提交新增项目订单
        addprojectSubmit:function(){
             this.$refs.addprojectForm.validate(valid => {
                if (valid) { 
                    this.addLoading = true;
                    resName
                    .addprojectOrder(this.addprojectForm)
                    .then(res => {
                        //数据处理
                        if (res.data.code === 1) {
                        this.$message({
                            message: "新增成功",
                            type: "success"
                        });
                        this.$refs["addprojectForm"].resetFields();
                        this.addprojectVisible = false;
                        this.projectOrderList();
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
        // 删除项目订单
        handleorderDel:function(index,row){
           this.$confirm("确定要删除当前订单吗?", "提示", {
            type: "warning"
          }).then(() => {
            var _this = this;
            var params = {
                id: row.id,
            };
            this.listLoading = true;
            resName
                .delprojectOrder(params)
                .then(res => {
                if (res.code === 1) {
                    // this.OrderList = res.data;
                    this.projectOrderList()
                    this.listLoading = false;
                    }
                })
                .catch(err => {
                //错误处理
                this.listLoading = false;
                return false;
                });
      })
        
        },
        // // 获取客户服务列表
        // customerServiceList: function() {
        //     var _this = this;
        //     var params = {
        //         duotel_id:this.detailList.duotel_id,
        //     };
        //     this.listLoading = true;
        //     resName
        //         .customerService(params)
        //         .then(res => {
        //         if (res.code === 1) {
        //             this.customerService = res.data;
        //             this.listLoading = false;
        //             }
        //         })
        //         .catch(err => {
        //         //错误处理
        //         this.listLoading = false;
        //         return false;
        //         });
        // },
        


        // 新增项目图纸
    addList() {
      this.addFormVisible = true;
    },
    // 项目图纸提交
    addSubmit() {
      if (this.drawingsUrl == "") {
        return false;
      } else {
        let params = {
          project_id: this.$route.query.id,
          drawings_name: this.drawingsName,
          drawings_url: this.drawingsUrl
        };
        resName
          .addProjectDrawings(params)
          .then(res => {
            //数据处理
            if (res.data.code === 1) {
              this.$message({
                message: "创建成功",
                type: "success"
              });
              this.addFormVisible = false;
              this.projectDrawing();
            //   上传之后清空列表
              this.$refs.upload.clearFiles();
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
    },
    cancel(addForm){
        this.addFormVisible = false;
        this.$refs.upload.clearFiles();
    },
    // 获取图纸列表
    projectDrawing: function() {
      var _this = this;
      var params = {
        project_id: this.$route.query.id
      };

      this.listLoading = true;
      resName
        .projectDrawing(params)
        .then(res => {
          if (res.code === 1) {
            this.drawList = res.data;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
          return false;
        });
    },
    // 删除图纸
    handleDel: function(index, row) {
      this.$confirm("确定要删除当前图纸吗?", "提示", {
        type: "warning"
      }).then(() => {
        var params = {
          id: row.id
        };
        resName
          .delProjectDrawings(params)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.projectDrawing();
            }
          })
          .catch(err => {
            //错误处理

            return false;
          });
      });
    },
    // 编辑图纸
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.id = row.id,
      this.fileLists[0].name = row.drawings_name,
      this.fileLists[0].url = row.drawings_url;
        
    },
    // \编辑图纸提交
    editSubmit() {
         if (this.drawingsUrl2 == "") {
        return false;
      } else {
      var params = {
        id: this.id,
        project_id:this.$route.query.id,
        drawings_name: this.drawingsName2,
        drawings_url: this.drawingsUrl2
      };
      resName
        .editProjectDrawings(params)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.editFormVisible = false;
            this.projectDrawing();
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
      }
    },
    // 上传文件，获取文件流
    handleChange(file, fileList) {
      this.file = file.raw;
     
      //   图纸的名字
      for (var i = 0; i < fileList.length; i++) {
        this.drawingsName = fileList[i].name;
      }
    },
    uploadMainImg() {
      var _this = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append("file", this.file);
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
          if (res.data.code === 1) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
              _this.videoUploadPercent = 0;
            _this.drawingsUrl = res.data.data;
            _this.uploadLoading = false
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
    // 上传文件，获取文件流
    handleChange2(file2, fileList2) {
      this.file2 = file2.raw;
       //   图纸的名字
      for (var i = 0; i < fileList2.length; i++) {
        this.drawingsName2 = fileList2[i].name;
      }
    },
    uploadMainImg2() {
      var _this = this;
      // 创建表单对象
      let form2 = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form2.append("file", this.file2);
      form2.append("action", "UploadVMKImagePath");
      axios.post(resName.projectUpload(), form2,{
                timeout:1000000000,
                onUploadProgress : progressEvent => {
                    let percent=(progressEvent.loaded / progressEvent.total * 100) | 0
                    //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                        _this.videoFlag = true;
                        _this.videoUploadPercent = percent
                        _this.uploadLoading2 = true
                }}).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            _this.drawingsUrl2 = res.data.data;
            console.log(_this.drawingsUrl2,8888888)
             _this.videoUploadPercent = 0;
             _this.uploadLoading2 = false
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
   commonsData(){
          resName
        .getProjectBrand()
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.getProject = res.data;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });

          let params={
                class_type:"project_category"
            }
            resName
            .webgetcommonsdata(params)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.projectCategory = res.data
                } else if (res.code === -2) {
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
                // 项目来源
            let paramz={
                class_type:"project_source"
            }
            resName
            .webgetcommonsdata(paramz)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.Source = res.data
                } else if (res.code === -2) {
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
                // 项目业主
                let paramzy={
                class_type:"project_owner"
            }
            resName
            .webgetcommonsdata(paramzy)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.Owner = res.data
                } else if (res.code === -2) {
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
            let param={
                class_type:"star_level"
            }
            resName
            .webgetcommonsdata(param)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.starLevel = res.data
                } else if (res.code === -2) {
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
            let parama={
                class_type:"schedule"
            }
            resName
            .webgetcommonsdata(parama)
                .then(res => {
                //数据处理
                if (res.code === 1) {
                    this.Schedul = res.data
                } else if (res.code === -2) {
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

       
    },
}
</script>
<style  scoped lang="less">
      .el-collapse-item__header{
      border-bottom:none;
}
.el-collapse{
      border-bottom:none;
}
</style>
<style lang="less" scoped>

.el-input{
  width: 100% !important;
}
.el-upload {
    display: none !important;
    height:0 !important;
    text-align: center;
    cursor: pointer;
    outline: 0;
}
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
    #container {
        background: #fff;
        -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
            0 0 6px 0 rgba(0, 0, 0, 0.04);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }
    .specItem{
        overflow: hidden;
    }
    .specItem .dockingUser{
        margin-bottom:15px;
        width: 33%;
        float:left;
    }
    .el-form-item .el-form-item__content{
        margin-left:0 !important;
    }
    h3{
        width: 100%;
        margin-left:0 !important;
    }
    .title_line{
           width: 97%;
            height: 1px;
            border-bottom: 1px solid #efefef;
            margin-bottom: 34px;
    }
    
</style>
