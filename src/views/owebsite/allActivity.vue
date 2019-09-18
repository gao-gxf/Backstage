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
          <el-input v-model="search.waName" size="mini" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item class="left">
           <el-button type="primary" size="mini" icon="el-icon-refresh-right" @click="Advanced">高级检索</el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="Establish">创建活动</el-button>
        </el-form-item>
      </el-form>
      <div class="activity_type" v-show="activityType">
            <ul style="padding-left:0;">
              <span>活动类型：</span>
              <li
                class="el-button whole el-button--small"
                v-bind:class="{totals:index==current}"
                @click="whole(index,item.id)"
                v-for="(item,index) in this.commonsType"
                :key="index"
              >{{item}}</li>
            </ul>
          </div>
    </el-col>
    
    <!-- 列表 -->
          <el-table
            :data="tablelist"
            style="width:99.9%;margin-bottom: 20px;"
            border
            ref="multipleTable"
            tooltip-effect="dark"
            text-align="center"
            v-loading="listLoading" >
            <el-table-column prop="wa_id" width="70" label="ID" align="center">
              <template slot-scope="scope">{{ scope.row.wa_id }}</template>
            </el-table-column>
            <el-table-column prop="image" label="头图" width="120" align="center">
              <template slot-scope="scope">
                <el-image style="width: 50px; height: 50px" :src="scope.row.image"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="wa_type" width="130" label="活动类型" sortable align="center">
              <template slot-scope="scope">{{ scope.row.wa_type | filter1}}</template>
            </el-table-column>
            <el-table-column
              prop="wa_name"
              label="活动名称"
              sortable
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="wa_organizer"  label="活动主办方" align="center"></el-table-column>
            <el-table-column prop="begin_time" width="160" label="开始时间" sortable align="center"></el-table-column>
            <el-table-column prop="operation" width="160" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  v-if="scope.row.status == 1"
                  plain
                  size="mini"
                  @click="enable(scope.row.wa_id)"
                >停用</el-button>
                <el-button
                  type="success"
                  v-else-if="scope.row.status == -1"
                  plain
                  size="mini"
                  @click="enable(scope.row.wa_id)"
                >启用</el-button>
                <el-button
                  type="success"
                  plain
                  size="mini"
                  @click="edit(scope.$index, scope.row)"
                >编辑</el-button>
                <div style="margin-top:10px">
                  <el-button
                    size="mini"
                    plain
                    type="success"
                    @click="handleLook(scope.$index, scope.row)"
                  >明细</el-button>
                  <el-button
                    size="mini"
                    plain
                    type="danger"
                    @click="deletelist(scope.$index, scope.row)"
                  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
    <!--新增创建活动-->
    <el-dialog
      title="创建活动"
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
        <el-form-item label="活动类型">
           <template>
            <el-select
              placeholder="请选择活动类型"
              v-model="addForm.wa_type"
              style="width:100%;">
              <el-option v-for="item in commonType" :key="item.class_code" :value="item.class_value"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="动作">
          <template>
            <el-select
              placeholder="动作"
              v-model="addForm.act"
              style="width:100%;">
              <el-option v-for="item in commonAct" :key="item.class_code" :value="item.class_value"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item prop="status" label="活动状态">
          <el-radio-group v-model="addForm.status" size="small">
            <el-radio-button label="-1">停用</el-radio-button>
            <el-radio-button label="1">启用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动名称" prop="wa_name">
          <el-input placeholder="活动名称" v-model="addForm.wa_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="wa_desc">
          <el-input placeholder="活动描述" v-model="addForm.wa_desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="wa_title">
          <el-input placeholder="详情描述" v-model="addForm.wa_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动主办方" prop="wa_organizer">
          <el-input placeholder="活动主办方" v-model="addForm.wa_organizer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动地址" prop="wa_address">
          <el-input placeholder="活动地址" v-model="addForm.wa_address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动价格" prop="price">
          <el-input placeholder="活动价格" v-model="addForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="起始时间" prop="begin_time">
          <el-date-picker v-model="addForm.begin_time" type="datetime" placeholder="起始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker v-model="addForm.end_time" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动标签" prop="tag">
          <el-input placeholder="标签" v-model="addForm.tag" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动备注" prop="remark">
          <el-input type="textarea" placeholder="备注" auto-complete="off" v-model="addForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="活动图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange"
            :http-request="uploadMainImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-model="addForm.image">
            <img v-if="addForm.image" :src="addForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetFields('addForm')">取消</el-button>
        <el-button size="small" type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑活动"
      :visible.sync="editorialActivities"
      :show-close="true"
      :close-on-click-modal="false">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        class="creactivit"
        :hide-required-asterisk="false"
        label-width="100px">
        <el-form-item label="活动类型" >
          <template>
            <el-select
              placeholder="请选择活动类型"
              v-model="editForm.wa_type"
              style="width:100%;">
              <el-option v-for="item in commonType" :key="item.class_code" :value="item.class_value"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item prop="status" label="活动状态">
          <el-radio-group v-model="editForm.status" size="small">
            <el-radio-button label="-1">停用</el-radio-button>
            <el-radio-button label="1">启用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动名称" prop="wa_name">
          <el-input placeholder="活动名称" v-model="editForm.wa_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="wa_desc">
          <el-input placeholder="活动描述" v-model="editForm.wa_desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" prop="wa_title">
          <el-input placeholder="详情描述" v-model="editForm.wa_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动主办方" prop="wa_organizer">
          <el-input placeholder="活动主办方" v-model="editForm.wa_organizer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动地址" prop="wa_address">
          <el-input placeholder="活动地址" v-model="editForm.wa_address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动价格" prop="price">
          <el-input placeholder="活动价格" v-model="editForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker v-model="editForm.begin_time" type="datetime" placeholder="起始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="editForm.end_time" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动标签" prop="tag">
          <el-input placeholder="活动标签" v-model="editForm.tag" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动备注" prop="remark">
          <el-input type="textarea" placeholder="备注" auto-complete="off" v-model="editForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="handleChange2"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadMainImg2"
            :show-file-list="false"
          >
            <img v-if="editForm.image" :src="editForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="editorialActivities = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 明细 -->
    <el-dialog title="活动明细" :visible.sync="detailsActivities" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        ref="editForm"
        class="creactivit"
        :hide-required-asterisk="true"
        label-width="100px"
      >
        <el-form-item label="活动类型" prop="wa_type">
          <el-input v-model="editForm.wa_type" readonly></el-input>
        </el-form-item>
        <el-form-item prop="status" label="活动状态" disabled>
          <el-input v-if="editForm.status == -1" value="停用" readonly></el-input>
          <el-input v-if="editForm.status == 1" value="启用" readonly></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="wa_name">
          <el-input v-model="editForm.wa_name"  readonly></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="wa_desc">
          <el-input v-model="editForm.wa_desc" readonly></el-input>
        </el-form-item>
        <el-form-item label="活动短描述" prop="wa_title">
          <el-input v-model="editForm.wa_title"  readonly></el-input>
        </el-form-item>
        <el-form-item label="活动主办方" prop="wa_organizer">
          <el-input v-model="editForm.wa_organizer"  readonly></el-input>
        </el-form-item>
        <el-form-item label="活动地址" prop="wa_address">
          <el-input v-model="editForm.wa_address"  readonly></el-input>
        </el-form-item>
        <el-form-item label="活动价格" prop="price">
          <el-input v-model="editForm.price"  readonly></el-input>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-input v-model="editForm.begin_time"  readonly></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="editForm.end_time"  readonly></el-input>
        </el-form-item>
        <el-form-item label="活动标签" prop="tag">
          <el-input v-model="editForm.tag"  readonly></el-input>
        </el-form-item>
        <el-form-item label="活动备注" prop="remark">
          <el-input placeholder="备注"  v-model="editForm.remark" readonly></el-input>
        </el-form-item>
        <el-form-item prop="image" label="图片">
          <el-image :src="editForm.image"></el-image>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      commonsType:[],
      commonType:[],
      tablelist: [],
      getType: [],
      commonAct:[],
      total: 0,
      current: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      activityType: false,
      addFormVisible: false,
      addLoading: false,
      editorialActivities: false,
      detailsActivities: false,
      discontinue: false,
      enableing: false,
      discontinues: false,
      enabling: false,
      //创建活动
      addForm: {
        wa_type: "",
        wa_name: "",
        wa_desc: "",
        status: "",
        act:"",
        wa_organizer: "",
        wa_address: "",
        price: "",
        wa_title: "",
        begin_time: "",
        end_time: "",
        wa_title: "",
        remark: "",
        tag: "",
        image: ""
      },
      addFormRules: {
        wa_type: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "change"
          }
        ],
        act: [
          {
            required: true,
            message: "请选择动作",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择活动状态",
            trigger: "change"
          }
        ],
        wa_name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "change"
          }
        ],
        wa_desc: [
          {
            required: true,
            message: "请输入活动描述",
            trigger: "change"
          }
        ],
        wa_organizer: [
          {
            required: true,
            message: "请输入活动主办方",
            trigger: "change"
          }
        ],
        wa_title: [
          {
            required: true,
            message: "请输入描述相关内容",
            trigger: "change"
          }
        ],
        wa_address: [
          {
            required: true,
            message: "请输入活动地址相关内容",
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入价格相关内容",
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            message: "请输入活动结束时间",
            trigger: "change"
          }
        ],
        begin_time: [
          {
            required: true,
            message: "请输入活动开始时间",
            trigger: "change"
          }
        ],
        tag: [
          {
            required: true,
            message: "请输入标签相关内容",
            trigger: "change"
          }
        ],
        image: [
          {
            required: true,
            message: "请选择图片",
            trigger: "change"
          }
        ]
      },
      status: "",
      beginTime: "",
      endTime: "",
      // 编辑
      editForm: {
        wa_id: "",
        wa_type: "",
        wa_name: "",
        wa_desc: "",
        status: "",
        wa_organizer: "",
        wa_address: "",
        price: "",
        wa_title: "",
        begin_time: "",
        end_time: "",
        wa_title: "",
        remark: "",
        tag: "",
        image: ""
      },
      editFormRules: {
        wa_type: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择活动状态",
            trigger: "change"
          }
        ],
        wa_name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "change"
          }
        ],
        wa_desc: [
          {
            required: true,
            message: "请输入活动描述",
            trigger: "change"
          }
        ],
        wa_organizer: [
          {
            required: true,
            message: "请输入活动主办方",
            trigger: "change"
          }
        ],
        wa_title: [
          {
            required: true,
            message: "请输入描述相关内容",
            trigger: "change"
          }
        ],
        wa_address: [
          {
            required: true,
            message: "请输入活动地址相关内容",
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入价格相关内容",
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            message: "请输入活动结束时间",
            trigger: "change"
          }
        ],
        begin_time: [
          {
            required: true,
            message: "请输入活动开始时间",
            trigger: "change"
          }
        ],
        tag: [
          {
            required: true,
            message: "请输入标签相关内容",
            trigger: "change"
          }
        ],
        image: [
          {
            required: true,
            message: "请选择图片",
            trigger: "change"
          }
        ]
      },
      enables: {
        wa_id: "",
        status: ""
      },
      file: {},
      file2: {},
      search: {
        waName: "",
        actType:""
      },
      c_id:""
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    // 获取活动列表
    getlist() {
      var params = {
        act: "",
        wa_type: this.search.actType,
        status: "",
        per_page: this.pageSize,
        page: this.page,
        wa_name: this.search.waName
      };
      this.listLoading = true;
      resName
        .webactivities(params)
        .then(res => {
          this.total = res.data.total;
          if (res.code === 1) {
            this.tablelist = res.data.data;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          this.listLoading = false;
          return false;
        });
      var params = {
        class_type: "wa_type"
      };
      resName
        .webgetcommonsdata(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.commonsType = res.data;
            this.commonType = res.data;
            var getArray = []
            for(var i=0;i<this.commonsType.length;i++){
              var asd = this.commonsType[i].class_value
                getArray.push(asd)
            }
            getArray.unshift("全部")
            this.commonsType = getArray
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          return false;
        });
        var params = {
        class_type: "act"
      };
      resName
        .webgetcommonsdata(params)
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.commonAct = res.data;
          } else if (res.code === -2) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          return false;
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
    complete(){
        this.getlist();
    },
    whole(index,id) {
      this.current = index;
      if(index == 1){
          id = 54
      }else if(index == 2){
          id = 55
      }else if(index == 3){
          id = 56
      }
      this.c_id = id
      var params = {
        act: "",
        wa_type: id,
        status: "",
        per_page: this.pageSize,
        page: this.page,
        wa_name: ""
      };
      this.listLoading = true;
      resName
        .webactivities(params)
        .then(res => {
          this.total = res.data.total;
          if (res.code === 1) {
            this.tablelist = res.data.data;
            this.listLoading = false;
          }
        })
        .catch(err => {
          //错误处理
          return false;
        });
    },
    // 高级检索活动状态
    Advanced() {
      if (this.activityType == false) {
        this.activityType = true;
      } else {
        this.activityType = false;
      }
    },
    // 新建取消
    resetFields(addForm) {
      this.$refs[addForm].resetFields();
      this.addFormVisible = false;
    },
    // 创建
    Establish() {
      this.addFormVisible = true;
    },
    // 创建提交
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
            var beginTime =
              Date.parse(new Date(this.addForm.begin_time)) / 1000;
            var endTime = Date.parse(new Date(this.addForm.end_time)) / 1000;
             for(var i in this.commonType){
                if(this.addForm.wa_type == this.commonType[i].class_value){
                  var msgData  = this.commonType[i].id
                }
              }
               for(var i in this.commonAct){
                if(this.addForm.act == this.commonAct[i].class_value){
                  var wagAct  = this.commonAct[i].id
                }
              }
            var params = {
              wa_type: msgData,
              wa_name: this.addForm.wa_name,
              act:wagAct,
              wa_desc: this.addForm.wa_desc,
              status: this.addForm.status,
              wa_organizer: this.addForm.wa_organizer,
              wa_address: this.addForm.wa_address,
              price: this.addForm.price,
              wa_title: this.addForm.wa_title,
              begin_time: beginTime,
              end_time: endTime,
              wa_title: this.addForm.wa_title,
              remark: this.addForm.remark,
              tag: this.addForm.tag,
              image: this.addForm.image
            };
            resName
              .webactivityadd(params)
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
        }
      });
    },
    //上传图片相关方法
    handleAvatarSuccess(res, file) {
      this.addForm.image = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.editForm.image = URL.createObjectURL(file.raw);
    },
    // 上传文件，获取文件流
    handleChange(file) {
      this.file = file.raw;
    },
    handleChange2(file) {
      this.file2 = file.raw;
    },
    // 控制文件的大小
    beforeAvatarUpload(file) {
      var max_size = 500;
      const isLt2M = file.size < 1024 * max_size;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500kb!");
      }
      return isLt2M;
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
            _this.addForm.image = res.data.data;
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
            _this.editForm.image = res.data.data;
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
        });
    },
    // 启用
    enable(id) {
      this.enables.wa_id = id;
      let obj = {};
      obj = this.tablelist.find(item => {
        //这里的tablelist就是上面遍历的数据源
        return item.wa_id === id; //筛选出匹配数据
      });
      this.enables.status = obj.status == 1 ? -1 : 1;
       const h = this.$createElement;
        this.$msgbox({
          title: '提示',
           type: 'warning',
          message:
          obj.status == 1 ?  h('div', null, [
            h('div', null, '确定要停用此账户吗？ '),
            h('div', { style: "color:red" }, '确认停用后该用户将不能再访问系统。 ')
          ]):h('div', null, [
            h('div', null, '确定要启用此账户吗？ '),
            h('div', { style: "color:red" }, '启用后该用户将有权访问系统。 ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        .then(action => { 
          resName.webactivitystatus(this.enables).then(res => {
              //数据处理
              if (res.data.code === 1) {
                var params = {
                  act: "",
                  wa_type: this.c_id,
                  status: "",
                  per_page: this.pageSize,
                  page: this.page,
                  wa_name: ""
                };
                this.listLoading = true;
                resName
                  .webactivities(params)
                  .then(res => {
                    this.total = res.data.total;
                    if (res.code === 1) {
                      this.tablelist = res.data.data;
                      this.listLoading = false;
                    }
                  })
                  .catch(err => {
                    //错误处理
                    return false;
                  });
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
    // 编辑
    edit(index, row) {
      this.editorialActivities = true;
      for(var i in this.commonType){
        if(row.wa_type == this.commonType[i].id){
          var msgType  = this.commonType[i].class_value
        }
      }
      this.editForm = {
        wa_id: row.wa_id,
        wa_type:msgType,
        wa_name: row.wa_name,
        wa_desc: row.wa_desc,
        status: row.status,
        wa_organizer: row.wa_organizer,
        wa_address: row.wa_address,
        price: row.price,
        wa_title: row.wa_title,
        begin_time: row.begin_time,
        end_time: row.end_time,
        wa_title: row.wa_title,
        remark: row.remark,
        tag: row.tag,
        image: row.image
      };
    },
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
            // 获取某个时间格式的时间戳
            var beginTime = Date.parse(
              new Date(this.editForm.begin_time) / 1000
            );
            var endTime = Date.parse(new Date(this.editForm.end_time)) / 1000;
           for(var i in this.commonType){
            if(this.editForm.wa_type == this.commonType[i].class_value){
              var msgData  = this.commonType[i].id
              
            }
          }
            var pramas = {
              wa_id: this.editForm.wa_id,
              wa_type:msgData,
              wa_name: this.editForm.wa_name,
              wa_desc: this.editForm.wa_desc,
              status: this.editForm.status,
              wa_organizer: this.editForm.wa_organizer,
              wa_address: this.editForm.wa_address,
              price: this.editForm.price,
              wa_title: this.editForm.wa_title,
              begin_time: beginTime,
              end_time: endTime,
              wa_title: this.editForm.wa_title,
              remark: this.editForm.remark,
              tag: this.editForm.tag,
              image: this.editForm.image
            };
            resName
              .webactivityedit(pramas)
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
    // 明细
    handleLook(index, row) {
      this.detailsActivities = true;
      
      this.editForm = {
        wa_id: row.wa_id,
        wa_type: String(row.wa_type),
        wa_name: row.wa_name,
        wa_desc: row.wa_desc,
        status: row.status,
        wa_organizer: row.wa_organizer,
        wa_address: row.wa_address,
        price: row.price,
        wa_title: row.wa_title,
        begin_time: row.begin_time,
        end_time: row.end_time,
        wa_title: row.wa_title,
        remark: row.remark,
        tag: row.tag,
        image: row.image
      };
    },
    // 删除
    deletelist(index, row) {
       this.$confirm("确定要删除当前数据吗?", "提示", {
       type: "warning"
      }).then(() => {
      var del = {
        wa_id: row.wa_id
      };
      resName.webactivitydel(del).then(res => {
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
  },
  filters: {
    filter1: function(wa_type) {
      if (wa_type == 54) {
        return "媒体";
      } else if (wa_type == 55) {
        return "官方";
      } else if (wa_type == 56) {
        return "咨询";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el_top {
  background: white;
  padding: 10px;
  margin-bottom: 20px;
}
.whole {
  background: #e6e6e6;
  color: black;
}
.totals {
  background: #409EFF;
  color: white;
}
.creactivit {
  max-height: 370px;
  overflow-y: scroll;
}
.center {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.el_co_r {
  color: red;
}
.edimage {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  top: 60px;
  float: left;
  margin-left: -96px;
  left: 96px;
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
.activity_type{
  margin-top: 55px;
  margin-bottom: 20px;
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
</style>