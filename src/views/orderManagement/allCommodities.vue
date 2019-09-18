<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="right">
          <el-button type="primary" size="mini" icon="el-icon-search" v-on:click="GetGoodsList">查询</el-button>
        </el-form-item>
        <el-form-item class="right">
          <el-input v-model="filters.name" size="mini" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item class="left">
          <el-cascader
            v-model="id"
            :options="searchOptions"
            size="mini"
            placeholder="商品类型"
            :show-all-levels="false"
            clearable
            @change="getChecked(id)"
            ref="asd"
            filterable
            :props="{checkStrictly: true, label :'goods_type_name',value:'id'}"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="left">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">新增商品</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="add-button">
      
    </div>
    <!--列表-->
    <el-table
      ref="multipleTable"
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 99.9%;"
      border
    >
      <el-table-column type="selection" align="center" width="60"></el-table-column>
      <el-table-column prop="goods_id" label="ID" min-width="60" align="center" sortable></el-table-column>
      <el-table-column prop="goods_img" label="商品图片" min-width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.goods_img" width="50" height="50" align="center" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" min-width="160" align="center"></el-table-column>
      <el-table-column prop="goods_model" label="商品型号" min-width="160" align="center" sortable></el-table-column>
      <el-table-column prop="goods_cpk" label="商品编号" min-width="160" align="center" sortable></el-table-column>
      <el-table-column prop="market_price" label="市场价" min-width="100" align="center" sortable></el-table-column>
      <el-table-column
        prop="agent_a"
        label="代理A"
        min-width="100"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column prop="agent_b" label="代理B" min-width="100" align="center" sortable></el-table-column>
      <!-- <el-table-column prop="goods_attr" label="商品属性" min-width="240" align="center" sortable></el-table-column> -->
      <el-table-column label="操作" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleDetail(scope.$index, scope.row)"
            plain
            :disabled="scope.row.is_sale== 0"
          >详情</el-button>
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
            :disabled="scope.row.is_sale== 0"
          >编辑</el-button>
          <el-button :type="scope.row.is_sale== 1?'danger' : 'success'" size="mini" @click="racksHandle(scope.row)" plain>{{scope.row.is_sale== 1?"下架" : scope.row.is_sale== 0?"上架" : "未知"}}</el-button>
          <el-button :disabled="scope.row.is_sale== 0" type="danger" size="mini" @click="DeleteIns(scope.$index, scope.row)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      id="commoditiesList"
      :data="tableAllData"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;display:none;"
      border
    >
      <el-table-column prop="goods_id" label="ID" min-width="60" align="center" sortable></el-table-column>
      <el-table-column prop="goods_img" label="商品图片" min-width="100" align="center" sortable>
        <template slot-scope="scope">
          <img :src="scope.row.goods_img" width="50" height="50" align="center" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" min-width="160" align="center" sortable></el-table-column>
      <el-table-column prop="goods_model" label="商品型号" min-width="160" align="center" sortable></el-table-column>
      <el-table-column prop="goods_cpk" label="商品编号" min-width="160" align="center" sortable></el-table-column>
      <el-table-column prop="market_price" label="市场价" min-width="100" align="center" sortable></el-table-column>
      <!-- <el-table-column prop="distribution_price" label="代理A" min-width="100" align="center" sortable></el-table-column>
      <el-table-column prop="internal_price" label="代理B" min-width="100" align="center" sortable></el-table-column>
      <el-table-column label="操作" min-width="150" align="center">
        <template slot-scope="scope">
              <el-button type="success" size="mini" @click="handleDetail(scope.$index, scope.row)" plain>详情</el-button>
          <el-button
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            plain
          >编辑</el-button>
          <el-button type="danger" size="mini" @click="DeleteIns(scope.$index, scope.row)" plain>停用</el-button>
          <el-button type="danger" size="mini" @click="DeleteIns(scope.$index, scope.row)" plain>删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :current-page="page"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
      <el-button class="exportExcel" type="primary" size="mini" @click="exportExcelSelect">导出到excel</el-button>
    </el-col>
  </section>
</template>

<script>
// import util from '../../common/js/util'
// import NProgress from 'nprogress'
import { resName } from "../../api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import exportFun from "./../../../static/js/export2Excel";

export default {
  data() {
    return {
      filters: {
        name: "",
        options: [],
        value: ""
      },
      value: "",
      id: [],
      pid: "",
      searchOptions: [],
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入职位",
            trigger: "change"
          }
        ]
      },
      //编辑界面数据
      editForm: {
        work_id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        title: ""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "change"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入职位",
            trigger: "change"
          }
        ]
      },
      //新增界面数据
      addForm: {
        work_id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        title: ""
      },
      pageSize: 10,
      

      //导出表格字段及formatter信息
      exportExcelArry: [
        {
          prop: "goods_id",
          label: "ID",
          formatterFlag: false
        },
        {
          prop: "goods_img",
          label: "图片",
          formatterFlag: false
        },
        {
          prop: "goods_name",
          label: "商品名称",
          formatterFlag: false
        },
        {
          prop: "goods_model",
          label: "商品型号",
          formatterFlag: false
        },
        {
          prop: "goods_cpk",
          label: "商品编号",
          formatterFlag: false
        },
        {
          prop: "market_price",
          label: "市场价",
          formatterFlag: false
        },
        {
          prop: "distribution_price",
          label: "代理A",
          formatterFlag: false
        }
      ],
      //导出excel表格id及excel名称
      exportExcelInfo: {
        excelId: "commoditiesList",
        excelName: "商品.xlsx"
      },
      multipleSelection: [],
      //需要导出的table数据
      tableAllData: [],
      tHeader: ["ID", "商品图片", "商品名称", "商品型号", "商品编号", "市场价","代理A","代理B"]
    };
  },
  created() {
      localStorage.removeItem("checkData");
      // console.log(localStorage.getItem("currentPage"));
      if(localStorage.getItem("currentPage") !== null){
            this.page = parseInt(localStorage.getItem("currentPage"));
      }else{
            this.page = 1;
      }
    this.GetGoodsList();
    this.goodstypelist();
  },
  mounted(){
        var _this = this;
  },
  methods: {
        //上下架
        racksHandle(obj){
              var _this = this;
            let pramas = {
                  goods_id : obj.goods_id
            }
            if(obj.is_sale == 0){
                  pramas.is_sale = 1;
            }else if(obj.is_sale == 1){
                  pramas.is_sale = 0;
            }
            // console.log(obj.is_sale);
            resName.GoodsRacks(pramas).then(res => {
                  // console.log(JSON.stringify(res));
                  //数据处理
                  if (res.data.code == 1) {
                        _this.$message({
                              message: "操作成功！",
                              type: "success"
                        });
                        _this.GetGoodsList();
                  } else if (res.data.code === -2) {
                        _this.$message({
                              message: res.msg,
                              type: "error"
                        });
                  }
            }).catch(err => {
                  //错误处理
            });
        },
    selsChange: function(sels) {
      var _this = this;
      this.sels = sels;
      this.multipleSelection = sels;
      // console.log(JSON.stringify(sels));
      if (localStorage.getItem("checkData") !== null) {
        var orderList = JSON.parse(localStorage.getItem("checkData"));
        this.multipleSelection = orderList.concat(sels);
      }
      //  方法1：利用对象访问属性的方法，判断对象中是否存在key
      // var result = [];
      // var obj = {};
      // for(var i =0; i< _this.multipleSelection.length; i++){
      //       if(!obj[_this.multipleSelection[i].goods_id]){
      //             result.push(_this.multipleSelection[i]);
      //             obj[_this.multipleSelection[i].goods_id] = true;
      //       }
      // }
      //  方法2：利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
      var obj = {};
      _this.multipleSelection = _this.multipleSelection.reduce(function(item, next) {
            obj[next.goods_id] ? '' : obj[next.goods_id] = true && item.push(next);
            return item;
      }, []);
      localStorage.setItem("checkData", JSON.stringify(_this.multipleSelection));

      // console.log(JSON.stringify(this.multipleSelection));
    },
    exportExcelSelect() {
          var _this = this;
      if (_this.multipleSelection.length == 0) {
        _this.$message({
          message: "请勾选操作项",
          type: "error"
        });
        return;
      }
      _this.tableAllData.length = 0;
      var orderList = JSON.parse(localStorage.getItem("checkData"));
      //将选中项传给this. tableAllData
      for (var i = 0; i < orderList.length; i++) {
        var mData = orderList[i];
        var obj = {};
        obj.goods_id = mData.goods_id;
        obj.goods_img = mData.goods_img;
        obj.goods_name = mData.goods_name;
        obj.goods_model = mData.goods_model;
        obj.goods_cpk = mData.goods_cpk;
        obj.market_price = mData.market_price;
        obj.distribution_price = mData.distribution_price;
        obj.internal_price = mData.internal_price;

        _this.tableAllData.push(obj);
      }
      _this.tableAllData.sort(_this.sortId);
      this.$refs.multipleTable.clearSelection(); 
      // console.log(JSON.stringify(_this.tableAllData));
      //需要延时调导出方法，为了等待数据初始化到列表中
      // setTimeout(()=>{
      //       this.exportExcel();
      // },500)
      exportFun.export2Excel(this.tHeader, this.tableAllData, '商品列表')
    },
    sortId(a,b){  
       return a.goods_id-b.goods_id  
    },
    exportExcel() {
      var xlsxParam = { raw: true }; // 导出的内容只做解析，不进行格式转换

      var wb = XLSX.utils.table_to_book(
        document.querySelector("#" + this.exportExcelInfo.excelId),
        xlsxParam
      );

      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });

      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          this.exportExcelInfo.excelName
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      // this.tableAllData = [];
      // this.multipleSelection = [];
      // localStorage.setItem("checkData","[]");

      return wbout;
    },

    // 筛选
    goodstypelist() {
      resName
        .goodsTypeList()
        .then(res => {
          //数据处理
          if (res.code === 1) {
            this.searchOptions = res.data;
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
    },

    getChecked(id) {
      this.id = id;
      // console.log(id);

      var arr = [];
      sessionStorage.setItem("arr", id);
      this.GetGoodsList();
    },

    stopHandle(index, row) {
      let pramas = {
        id: row.id,
        status: row.status ? 0 : 1
      };
      resName
        .ChangeUserStatus(pramas)
        .then(res => {
          //数据处理
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.GetGoodsList();
            } else if (res.code === -7) {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          }
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    handleSizeChange(val) {
      //切换每页显示条数
      this.pageSize = val;
      this.GetGoodsList();
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      // localStorage.setItem("checkData", JSON.stringify(this.multipleSelection));
      localStorage.setItem("currentPage", val);
      this.page = val;
      this.GetGoodsList();
    },
    //获取商品列表
    GetGoodsList() {
          var _this = this;
      var newArray = sessionStorage.getItem("arr");
      if (newArray == null || newArray == "") {
        _this.id = "";
      } else {
        _this.id = newArray.split(",");
      }
      let para = {
        goods_name: _this.filters.name,
        goods_type: _this.id,
        page:_this.page,
        per_page: _this.pageSize
      };
      
      _this.listLoading = true;
      resName
        .GoodsList(para)
        .then(res => {
          //数据处理
          _this.total = res.data.total;
          _this.users = res.data.data;
          _this.listLoading = false;
          if (res.code === 1) {
            _this.total = res.data.total;
            _this.users = res.data.data;
            _this.listLoading = false;
          } else if (res.code === -7) {
            _this.$message({
              message: res.msg,
              type: "error"
            });
            _this.listLoading = false;
          }
            var orderList = JSON.parse(localStorage.getItem("checkData"));
            // var orderList = [_this.users[2]];
            // console.log(JSON.stringify(orderList));
            var arr = [];
            for(var i = 0; i < _this.users.length; i++){
                  for(var j = 0; j < orderList.length; j++){
                        if(_this.users[i].goods_id == orderList[j].goods_id){
                              arr.push(_this.users[i]);
                        }
                  }
            }
            _this.$nextTick(function(){
                  
                  if(arr){
                        arr.forEach(row => {
                              _this.$refs.multipleTable.toggleRowSelection(row,true);
                        });
                  }
            })
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    getTree() {
      let para = {};
      resName
        .CategoryGetTree(para)
        .then(res => {
          //数据处理
          //console.log("所有栏目：" + JSON.stringify(res.data));
        })
        .catch(err => {
          //错误处理
          // console.log("失败："+JSON.stringify(err));
          this.listLoading = false;
        });
    },
    //删除
    DeleteIns: function(index, row) {
      var _this = this;
      this.$confirm("确定要删除当前数据吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            goods_id: row.goods_id
          };
          resName
            .GoodsDel(para)
            .then(res => {
              //数据处理
              //   console.log("获取删除数据信息：" + JSON.stringify(res.data));
              if (res.data.code === 1) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                _this.GetGoodsList();
              } else if (res.data.code === -2) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              //错误处理
              // console.log("失败："+JSON.stringify(err));
            });
        })
        .catch(() => {});
    },

    //跳转新增界面
    handleAdd: function() {
      this.$router.push({ path: "/order/commoditiesIns" });
    },
    //跳转编辑界面
    handleEdit: function(index, row) {
          var _this = this;
      this.$router.push({
        path: "/order/EditingCommodities",
        query: {
          goods_id: row.goods_id
        }
      });
    },
    //跳转编辑界面
    handleDetail: function(index, row) {
      this.$router.push({
        path: "/order/DetailCommodities",
        query: {
          goods_id: row.goods_id
        }
      });
    },

    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {
            ids: ids
          };
          // 					batchRemoveUser(para).then((res) => {
          // 						this.listLoading = false;
          // 						//NProgress.done();
          // 						this.$message({
          // 							message: '删除成功',
          // 							type: 'success'
          // 						});
          // 						this.getUsers();
          // 					});
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.el-pagination{
      display: inline-block;
}
.exportExcel{
      float:right;
}
.el-button + .el-button {
  margin: 3px 0;
}
.el-dialog__header {
  border-bottom: 1px solid #ddd;
  background: #ddd;
}
.el-dialog__footer {
  border-top: 1px solid #ddd;
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
.el-table--border td:first-child .cell{
      padding-left: 10px !important;
}
</style>
