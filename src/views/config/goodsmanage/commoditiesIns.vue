<template>
	<div id="container">
		<el-tabs type="border-card">
			<el-tab-pane label="商品信息">
				<el-form ref="form" :model="form" :rules="addFormRules" :hide-required-asterisk="true" label-width="80px">
					<el-form-item label="商品名称" prop="goods_name">
						<el-input v-model="form.goods_name" placeholder="商品名称"></el-input>
					</el-form-item>
                              <el-form-item label="产品型号" prop="goods_model">
						<el-input v-model="form.goods_model" placeholder="产品型号"></el-input>
					</el-form-item>
					<el-form-item label="CPK编码">
						<el-input v-model="form.goods_cpk" placeholder="CPK编码"></el-input>
					</el-form-item>
                              <el-form-item label="是否置顶" prop="is_top">
						 <el-radio-group v-model="form.is_top">
                                          <el-radio-button label="否" value="0">否</el-radio-button>
                                          <el-radio-button label="是" value="1">是</el-radio-button>
                                    </el-radio-group>
					</el-form-item>
                              <el-form-item label="连接方式"  prop="connection_method">
						<el-select placeholder="请选择连接方式" v-model="form.connection_method" style="width:18%;">
                                          <el-option label="wifi" value="1"></el-option>
                                          <el-option label="zigbee" value="2"></el-option>
                                    </el-select>
					</el-form-item>
                              <el-form-item label="供应商" prop="wendor_id">
						<el-select placeholder="请选择连接方式" v-model="form.wendor_id" style="width:18%;">
                                          <el-option label="涂鸦智能" value="1"></el-option>
                                    </el-select>
					</el-form-item>

                              <el-form-item label="商品类型" required>
                                    <el-col :span="7">
                                          <el-form-item prop="value1">
                                                <el-select v-model="form.value1" @change="selGoods" value-key="id" placeholder="请选商品类型">
                                                      <el-option v-for="item in goodsType" :key="item.id" :label="item.goods_type_name" :value="item"></el-option>
                                                </el-select>
                                          </el-form-item>
                                    </el-col>
                                    <el-col v-if="gtype2" :span="7">
                                          <el-form-item prop="value2">
                                                <el-select v-if="gtype2" v-model="form.value2" @change="selGoods2" value-key="id" placeholder="请选商品类型">
                                                      <el-option v-for="item in goodsType2" :key="item.id" :label="item.goods_type_name" :value="item"></el-option>
                                                </el-select>
                                          </el-form-item>
                                    </el-col>
                                    <el-col v-if="gtype3" :span="7">
                                          <el-form-item prop="goods_type3">
                                                <el-select v-if="gtype3" v-model="form.goods_type3" @change="selGoods3" value-key="id" placeholder="请选商品类型">
                                                      <el-option v-for="item in goodsType3" :key="item.id" :label="item.goods_type_name" :value="item"></el-option>
                                                </el-select>
                                          </el-form-item>
                                    </el-col>
                              </el-form-item>

					<el-form-item label="市场价格" prop="market_price">
						<el-input v-model="form.market_price" placeholder="市场价格"></el-input>
					</el-form-item>
					<el-form-item label="促销价格" prop="shop_price">
						<el-input v-model="form.shop_price" placeholder="促销价格"></el-input>
					</el-form-item>
                              <el-form-item label="进货价格" prop="internal_price">
						<el-input v-model="form.internal_price" placeholder="进货价格"></el-input>
					</el-form-item>
					<el-form-item label="分销价格" prop="distribution_price">
						<el-input v-model="form.distribution_price" placeholder="分销价格"></el-input>
					</el-form-item>
					<el-form-item label="商品主图" prop="goods_img">
                                    <el-upload
                                          class="avatar-uploader"
                                          action=""
                                          :on-change="handleChange"
                                          :http-request="uploadMainImg"
                                          :show-file-list="false">
                                          <img v-if="form.goods_img" :src="form.goods_img" class="avatar">
                                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
					</el-form-item>
					<el-form-item label="商品属性" prop="goods_attr">
						<el-input type="textarea" v-model="form.goods_attr" placeholder="商品属性"></el-input>
					</el-form-item>
					<el-form-item label="商品描述">
						<!-- <quill-editor ref="text" v-model="form.goods_desc" class="myQuillEditor" :options="editorOption" /> -->
                                    <!-- 图片上传组件辅助-->
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
                                    v-model="form.goods_desc"
                                    ref="myQuillEditor" 
                                    :options="editorOption" 
                                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)">
                                    </quill-editor>
                              </el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="规格属性" v-if="specsState">
				<div id="specContent">
					<p class="title">商品规格</p>
                              <div class="top">
                                <div class='topOne' v-for="(value,index) in specs" :key="index">
                                    <div class="btn_list" v-if="value.title">
                                        <p class="spectit">{{value.title}}：</p>
                                        <div class="specItem" v-for="(v,i) in value._list" :key="i">
                                          <el-checkbox v-model="v.is_checked" ></el-checkbox>
                                            <el-input v-model="v.value" size="small" placeholder="请输入"></el-input>
                                            <a :href="v.img" class="showImg" target="_blank">
                                                <!-- <img :src="v.img" class="view-img" v-if="value.is_img"> -->
                                                <img :src="v.img" class="view-img" v-if="v.is_img">
                                            </a>
                                            <a href="javascript:;" class="file" v-if="value.is_img">上传图片
                                                <input type="file" :id="'fileUpload-'+i" @change="uploadImg($event,index,i)" :cat="index" :index="i" class="file-upload">
                                            </a>
                                            
                                                <el-button type="success" size="small" v-if="i == 0" @click="newlyAdded(index)">新增</el-button>
                                                <el-button type="primary" size="small" v-if="i != 0" @click="newlyDel(index,i)">删除</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>

					<div class="shoptip">1.若改动商品规格时，销售规则表将会重新绘制，填写销售规格表前选择好商品规格</div>
					<p class="title">销售规格</p>
                              <div class="am-form-group">
                                    <div class='table' style='margin-top:10px;'>
                                          <table class="am-table">
                                                <thead id='amsThead'>
                                                <tr v-if="tableHeader!=''">
                                                      <th class='norms'>推荐规格</th>
                                                      <th class="agreement" v-for='item in tableHeader' :key="item">{{item}}</th>
                                                      <th class="common-input"><p><span class="red">*</span>市场价</p><el-input v-model="market_value"></el-input></th>
                                                      <th class="common-input"><p><span class="red">*</span>促销价</p><el-input v-model="shop_price"></el-input></th>
                                                </tr>
                                                </thead>
                                                <tbody id='amsTbody'>
                                                      
                                                <tr v-for="(row,index) in tableData" :key="index">
                                                      <td class='normsC'><input name="recommend" :value="index" type="radio" v-model="checkRadio"></td>
                                                      <td v-for='(item,key) in row' :key="key">{{item}}</td>
                                                      <!-- <td ><el-input  v-model="row.market_value"></el-input></td>
                                                      <td ><el-input  v-model="row.shop_price"></el-input></td> -->
                                                      <td ><input v-model='row.market_value' class="el-input__inner"></td>
                                                      <td ><input v-model='row.shop_price' class="el-input__inner"></td>
                                                </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                              
				</div>
			</el-tab-pane>
		</el-tabs>
            <div class="btnBox">
                  <el-button type="primary" size="small" @click='submitEdit'>提交</el-button>
            </div>
	</div>
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
      // Quill.register('modules/ImageExtend', ImageExtend)
	import {
		resName
	} from "../../../api/api";
	export default {
		components: {
			quillEditor
		},
		data() {
			return {
                        upUrl : "",
				form: {
                              value1:"",
                              value2:"",
                              is_top:"",
                              goods_cpk:'',
                              goods_model:'',
                              goods_name:'',
                              goods_img:'',
                              goods_type:'',
                              connection_method:"",
                              goods_type1:'',
                              goods_type2:'',
                              goods_type3:'',
                              wendor_id:'1',//要删除
                              shop_price:'',
                              goods_unit:'',
                              goods_attr:'',
                              is_sale:1,
                              goods_desc:'',
                              market_price:'',
                              internal_price:'',
                              distribution_price:''
                        },
                        addFormRules: {
                              goods_name: [{
                                    required: true,
                                    message: "请输入商品名称",
                                    trigger: "change"
                              }],
                              is_top: [{
                                    required: true,
                                    message: "请选择是否置顶",
                                    trigger: "change"
                              }],
                               wendor_id: [{
                                    required: true,
                                    message: "请选择供应商",
                                    trigger: "change"
                              }],
                              value1: [{
                                    required: true,
                                    message: "请选择商品类型",
                                    trigger: "change"
                              }],
                              value2: [{
                                    required: true,
                                    message: "请选择商品类型",
                                    trigger: "change"
                              }],
                              connection_method:[{
                                    required: true,
                                    message: "请选择连接方式",
                                    trigger: "change"
                              }],
                              goods_type3: [{
                                    required: true,
                                    message: "请选择商品类型",
                                    trigger: "change"
                              }],
                              market_price: [{
                                    required: true,
                                    message: "请输入市场价格",
                                    trigger: "change"
                              }],
                              shop_price: [{
                                    required: true,
                                    message: "请输入促销价格",
                                    trigger: "change"
                              }],
                              internal_price: [{
                                    required: true,
                                    message: "请输入进货价格",
                                    trigger: "change"
                              }],
                              distribution_price: [{
                                    required: true,
                                    message: "请输入分销价格",
                                    trigger: "change"
                              }]
                        },
				gtype2: false,
				gtype3: false,
				goodsType: [],
				goodsType2: [],
				goodsType3: [],
				specsState: false,
                        dialogVisible: false,
				specList: [{
					specCon: "",
					checked: false,
					btnstate: 0
				}],
				tables: [],
                        titleData: [],
                        market_value:'0',
                        shop_price:'0',
                        tableHeader:[],
                        tableData:[],
                        specs:[],
                        checkedArr:[],
                        checkRadio:-1,
                        firstLinkage:[],
                        first:'',
                        twoLinkage:[],
                        two:'',
                        threeLinkage:[],
                        three:'',
                        specsList:[],
                        gid:0,
                        editId:[],
                        file:{},
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
                        } // 有的图片服务器要求请求头需要有token
			}
            },
            created:function(){
                  this.upUrl = resName.tarUrl();
                 this.GetGoodsType();
            },
            watch:{
                  tableData:{
                        handler:function(){
                              // console.log(1);
                        // this.packageData()
                        },
                        deep:true
                  },
                  market_value:{
                        handler:function(val){
                        this.modifyTable('market_value',val)
                        },
                  },
                  shop_price:{
                        handler:function(val){
                        this.modifyTable('shop_price',val)
                        },
                  },
                  specs:{
                        handler:function(){
                              this.generateList()
                        },
                        deep:true
                  },
            },
		mounted() {
			
		},
		methods: {
                 
                  // 商品添加
                  submitEdit:function(){
                        var _this = this
                        if(_this.$route.query.goods_id !== undefined){          //编辑
                              _this.GoodsEdit(_this.$route.query.goods_id);
                        }else{       //新增
                        
                        _this.packageGoodsSpecData()
                        _this.packageSpecData()
                        _this.$refs.form.validate(valid => {
                              if (valid) {
                                    var params = _this.form;
                                    if(!_this.gtype3&&_this.gtype2){
                                          params.goods_type3 = _this.form.goods_type2;
                                    }else if(!_this.gtype2){
                                          params.goods_type2 = _this.form.goods_type1;
                                          params.goods_type3 = _this.form.goods_type1;
                                    }else{
                                          params.goods_type3 = _this.form.goods_type3.id;
                                    }
                                    if(_this.form.is_top == "否" ){
                                          _this.form.is_top = 0
                                    }else if(_this.form.is_top == "是"){
                                          _this.form.is_top = 1
                                    }
                                    params.goods_type = _this.form.goods_type3;
                                    resName
                                          .GoodsAdd(params)
                                          .then(res => {
                                                //数据处理
                                                if (res.data.code === 1) {
                                                      _this.$message({
                                                            message: "添加成功",
                                                            type: "success"
                                                      });
                                                      this.form = {
                                                            goods_cpk:'',
                                                            goods_model:'',
                                                            goods_name:'',
                                                            goods_img:'',
                                                            is_top:'',
                                                            goods_type:'',
                                                            goods_type1:'',
                                                            goods_type2:'',
                                                            goods_type3:'',
                                                            connection_method:'',
                                                            wendor_id:'1',//要删除
                                                            shop_price:'',
                                                            goods_unit:'',
                                                            goods_attr:'',
                                                            is_sale:1,
                                                            goods_desc:'',
                                                            market_price:'',
                                                            internal_price:'',
                                                            distribution_price:''
                                                      };
                                                      
                                                      this.gtype2 = false;
                                                      this.gtype3 = false;

                                                      this.tableHeader = [];
                                                      this.tableData = [];
                                                      this.specs = [];
                                                      this.specsState = false;
                                                      this.$router.replace({ path: "/order/allCommodities" });
                                                } else{
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
                        }
                        
                  },
			//获取商品分类
			GetGoodsType() {
				let para = {
					id: ""
				};
				resName
					.GetGoodsType(para)
					.then(res => {
						//数据处理
						if (res.code === 1) {
                                          this.goodsType = res.data;
                                          _this.firstLinkage = res.data
						} else if (res.code === -7) {
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
			selGoods(selVal) {
                        this.form.goods_type1 = selVal.id; 
                        this.goodsType2.length = 0;
                        this.goodsType3.length = 0;
                        this.form.value2 = "";
                        this.form.goods_type3 = "";
                        this.GetGoodsType2(selVal.id,"","");
                  },
                  GetGoodsType2(code,tar,tar3){
                        var _this = this;
                        let para = {
					id: code
                        };
				resName
					.GetGoodsType(para)
					.then(res => {
						//数据处理
						if (res.code === 1) {
                                          this.goodsType2 = res.data;
                                          if(res.data.length !== 0){
                                                this.gtype2 = true;
                                          }else{
                                                this.gtype2 = false;
                                          }
                                          
                                          if(tar !== "" && tar3 !== ""){
                                                let obj2 = {}; 
                                                obj2 = _this.goodsType2.find((item)=>{//这里的userRoleList就是上面遍历的数据源 
                                                      return item.id === tar;//筛选出匹配数据 
                                                }); 
                                                _this.form.value2 = obj2; 
                                                this.GetGoodsType3(obj2.id,tar3);
                                          }
						} else if (res.code === -7) {
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
			selGoods2(selVal) {
                        this.form.goods_type2 = selVal.id; 
                        this.goodsType3.length = 0;
                        this.form.goods_type3 = "";
                        this.GetGoodsType3(selVal.id,"");
                  },
                  GetGoodsType3(code,tar){
                        var _this = this;
                        let para = {
					id: code
				};
				resName
					.GetGoodsType(para)
					.then(res => {
						//数据处理
						//console.log("商品类型3列表：" + JSON.stringify(res));
						if (res.code === 1) {
							this.goodsType3 = res.data;
                                          if(res.data.length !== 0){
                                                this.gtype3 = true;
                                          }else{
                                                this.gtype3 = false;
                                          }
                                          if(tar !== ""){
                                                let obj3 = {}; 
                                                obj3 = _this.goodsType3.find((item)=>{//这里的userRoleList就是上面遍历的数据源 
                                                      return item.id === tar;//筛选出匹配数据 
                                                }); 
                                                _this.form.goods_type3 = obj3;
                                                _this.form.goods_type = obj3;  
                                          }
						} else if (res.code === -7) {
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
			selGoods3(selVal) {
                        var _this = this;
                        
				let pramas = {
					goods_type: selVal.id
				};
				resName
					.GetSpec(pramas)
					.then(res => {
                                    //console.log("商品规格列表：" + JSON.stringify(res));
                                    //console.log(_this.form.goods_type1,_this.form.goods_type2,_this.form.goods_type3);
						if (res.code === 1) {
							if (res.data.length !== 0) {
                                                this.specsState = true;
                                                 _this.specsList = res.data;
                                                _this.specsSwitch()
							} else {
								this.specsState = false;
							}
						} else if (res.code === -7) {
							_this.specsState = false;
							_this.$message({
								message: res.msg,
								type: "error"
							});
						}
					})
					.catch(err => {
						//错误处理
					});
                  },
                  specsSwitch:function(){
                        var _this = this
                        var arr = []
                        for (let index = 0; index < _this.specsList.length; index++) {
                        const element = _this.specsList[index];
                        arr.push({
                              id:_this.specsList[index].cat_id,
                              title:_this.specsList[index].cat_name,
                              is_img:_this.specsList[index].is_img == 1 ? true : false,
                        })
                        }
                        _this.specsList = arr
                        _this.init()
                  },
                  // 初始化
                  init:function(){
                        var _this = this
                        _this.specs =[]
                        var obj = _this.specsList
                        for (let index = 0; index < obj.length; index++) {
                        this.specs.push({
                              id:obj[index]['id'],
                              title:obj[index]['title'],
                              is_img:obj[index]['is_img'],
                              // fields:obj[index]['fields'],
                              _list:[{
                                    is_checked:false,//是否选中
                                    value:'',//输入的值
                                    img:'',//图片地址
                              }]
                        })
                        }
                  },
                  // 添加
                  newlyAdded:function(val){
                        var obj = {
                        is_checked:false,//是否选中
                        value:'',//输入的值
                        img:'',//图片地址
                        }
                        this.specs[val]._list.push(obj)
                  },
                  // 删除
                  newlyDel:function(val,i){
                        this.specs[val]._list.splice(i,1)
                  },
                  cartesianProductOf:function(){
                        return Array.prototype.reduce.call(arguments,function(a, b) {
                              var ret = [];
                              
                              a.forEach(function(a) {
                                    b.forEach(function(b) {
                                          ret.push(a.concat([b]));
                                    });
                              });
                              return ret;
                        }, [[]])
                  },
                  // 生成列表
                  generateList:function(){
                        //console.log(JSON.stringify(this.specs));
                        var _this = this;
                        var specCols = {};
                        this.tableHeader =[];
                        this.checkedArr =[];
                        for (var index = 0; index < this.specs.length; index++) {
                              for (var i = 0; i < this.specs[index]._list.length; i++) {
                                    //选中值
                                    if(this.specs[index]._list[i].is_checked){
                                          var catId = this.specs[index].title
                                          if(!specCols[catId]){
                                          specCols[catId] = [];
                                          specCols[catId].push(this.specs[index]._list[i].value);
                                          }else{
                                          specCols[catId].push(this.specs[index]._list[i].value);
                                          }
                                    }
                              }
                        }
                        
                        for(var i in specCols){
                              this.tableHeader.push(i);
                              this.checkedArr.push(specCols[i])
                        }
                        if(this.checkedArr.length != 0){
                              this.tableData = this.cartesianProductOf.apply(_this,this.checkedArr);
                              
                              // this.tableData = this.checkedArr;
                              
                        }
                        
                        for(var i in this.tableData){
                              this.tableData[i].market_value ='0'
                              this.tableData[i].shop_price ='0'
                        }
                        
                        // console.log(JSON.stringify(this.tableData));
                        this.packageSpecData()
                        this.packageGoodsSpecData()
                  },
                  modifyTable:function(key,val){
                        
                        for(var i in this.tableData){
                              this.tableData[i][key] = val
                        }

                        
                  },
                  //拼装后台参数
                  packageSpecData:function(){
                        var arr=[]
                        var specs={}
                        var spec_ids = []
                        for (let index = 0; index < this.specs.length; index++) {
                              arr=[]
                              for (let i = 0; i < this.specs[index]._list.length; i++) {
                                    if (this.specs[index]._list[i].is_checked){
                                          arr.push({'spec_name':this.specs[index]._list[i].value,'url':this.specs[index]._list[i].img})
                                          // console.log(JSON.stringify(this.specs[index]));
                                    }
                              }
                              
                              if(arr.length != 0){
                                    specs[this.specs[index].title] = arr
                                    spec_ids.push(this.specs[index].id)
                              }
                        }
                        this.form.spec = specs
                        this.form.specs = specs
                        // this.form.specs = spec_ids
                        //console.log(JSON.stringify(this.form.specs));
                        
                  },
                  //拼装后台参数
                  packageGoodsSpecData:function(){
                        var catId=[]
                        for (let index = 0; index < this.specs.length; index++) {
                              var res = this.tableHeader.indexOf(this.specs[index].title)
                              
                              if(res!=-1){
                                    // catId.push(this.specs[index].id)
                                    catId.push(this.specs[index].title)
                              }
                        }
                        
                        var goodsArr = {}
                        var goodsSpec =[]
                        
                        for (let index = 0; index < this.tableData.length; index++) {
                              var res = this.tableData[index];
                              
                              goodsArr={}
                              for(var item in res){
                                    if(catId[item]){
                                          Object.assign(goodsArr,{[catId[item]]:res[item]})
                                    }else{
                                          Object.assign(goodsArr,{[item]:res[item]})
                                    }
                                   
                                    if(index == this.checkRadio){
                                          Object.assign(goodsArr,{'is_default':1})
                                    }else{
                                          Object.assign(goodsArr,{'is_default':0})
                                    }
                              }
                              goodsSpec[index] = goodsArr
                        }

                        if(this.editId.length !== 0){
                              for(var j = 0; j < this.editId.length; j++){
                                    goodsSpec[j].id = this.editId[j];
                              }
                        }
                        // console.log(JSON.stringify(goodsSpec));
                        this.form.goods_spec = goodsSpec
                        
                  },
			submit() {
				// console.log(this.$refs.text.value);
			},
                  //上传图片相关方法
                  handleAvatarSuccess(res, file) {
                        this.form.goods_img = URL.createObjectURL(file.raw);
                  },
                  uploadImg(event,cat,index) {
                        var _this = this;
                        // console.log(cat);
                        var fileObj = event.target.files[0]; //获取input的图片file值
                        let param = new FormData(); // 创建form对象
                        param.append("action", "UploadVMKImagePath");
                        param.append('file', fileObj);//对应后台接收图片名
                        
                        resName.uploadImg(param).then(res => {
                              // console.log("上传成功："+JSON.stringify(res));
                              if(res.data.code === 1){
                                  _this.specs[cat]._list[index].img = res.data.data
                                  _this.specs[cat]._list[index].is_img = true
                              }
                              
                        }).catch(err => {
                              //错误处理
                              // console.log("失败："+JSON.stringify(err));
                        });
                  },
                  // 上传文件，获取文件流
                  handleChange(file) {
                        this.file = file.raw
                  },
                  uploadMainImg(){
                        var _this = this;
                        // 创建表单对象
                        let form = new FormData();
                        // 后端接受参数 ，可以接受多个参数
                        form.append("file",this.file)
                        form.append("action", "UploadVMKImagePath");
                        resName.uploadImg(form).then(res => {
                              if(res.data.code === 1){
                                    if(_this.form.goods_img !== ""){
                                          let imgUrl = _this.form.goods_img;
                                          resName.deleOldImg(imgUrl);
                                    }
                                  _this.form.goods_img = res.data.data
                              }
                              
                        }).catch(err => {
                              //错误处理
                              // console.log("失败："+JSON.stringify(err));
                        });
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
      
      function multiply(arr) {
            return arr.reduce(function(a, b) {
                return a * b;        //如果是相加return a + b 如果是相减return a - b
            })
      }
</script>

<style scoped lang="less">
	ul,
	li {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.ql-snow .ql-picker {
		line-height: initial;
	}

	.title {
		font-size: 16px;
		margin-bottom: 0px;
		margin-top: 0;
		border-bottom: 1px solid #e5e5e5;
		padding: 10px 0;
	}

	.specBox {
		padding: 10px;
		border: 1px solid #ccc;
		margin-top: 15px;
	}

	.specList li {
		padding: 5px 0;
	}

	.shoptip {
		width: 100%;
		height: 40px;
		margin-top: 15px;
		border: 1px dashed #f00;
		border-radius: 5px;
		line-height: 40px;
		color: red;
		text-indent: 6px;
		background: #ffffcc;
	}

	.upload-demo {
		display: inline-block;
	}
      .specItem .el-input{
            width: 200px;
      }
      .specItem{
            margin-bottom:10px;
      }
      .el-checkbox{
            margin-right:15px;
      }
      .am-table{
            width:100%;
            border-collapse:collapse;
      }
      .am-table .el-input{
            width: 120px;
      }
      .am-table>thead>tr>th {
            vertical-align: bottom;
            border-bottom: 1px solid #ddd;
      }
      .am-table>thead>tr>th{
            vertical-align: middle;
      }
      .am-table>thead>tr>th,.am-table>tbody>tr>td{
            padding: .7rem;
            line-height: 1.6;
            vertical-align: top;
            border: 1px solid #ddd;
            text-align: center;
      }
      span.red{
            color:#FF4e00;
      }
      .file {
            position: relative;
            display: inline-block;
            background: #D0EEFF;
            border: 1px solid #99D3F5;
            border-radius: 4px;
            padding: 4px 12px;
            overflow: hidden;
            color: #1E88C7;
            text-decoration: none;
            text-indent: 0;
            line-height: 20px;
            top: 12px;
      }
      .view-img {
            width: 30px;
      }
      #fileUpload {
            float: left;
      }     
      #picker {
            float: right;
            margin: 4px;
      }
      .file input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
      }
      .avatar-uploader .el-upload,.avatar-uploader2 .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
      }
      .avatar-uploader2{
            display: inline-block;
            position: relative;
            top: 12px;
      }
      .avatar-uploader .el-upload:hover,.avatar-uploader2 .el-upload:hover {
            border-color: #409EFF;
      }
      .avatar-uploader-icon,.avatar-uploader-icon2 {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
      }
      .avatar-uploader-icon2{
            line-height: 30px;
            text-align: center;
            width: 30px;     
            height: 30px;
      }
      .avatar {
            width: 178px;
            height: 178px;
            display: block;
      }
      .avatar2{
            width: 30px;     
            height: 30px;
            display: inline-block;
      }
      .showImg{
            position: relative;
            top:10px;
      }
      .el-tabs--border-card{
            box-shadow: none;
      }
      #container{
            background:#fff;
            -webkit-box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      }
      .btnBox{
            padding:10px 5px;
            border:1px solid #DCDFE6;
            border-top:none;
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
