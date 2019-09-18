<template>
  <div id="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content grid1">
          <div class="left">
            <p>联网智能空间总量 (间)</p>
            <div class="font50">858780</div>
            <p>累计控制智能设备 5671904台</p>
          </div>
          <div class="right">
            <i class="iconfont icon icon-sitemap"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content grid2">
          <div class="left">
            <p>使用智能服务次数 (次)</p>
            <div class="font50">44380281</div>
            <p>累计提供智能轻应用 5741016个</p>
          </div>
          <div class="right">
            <i class="iconfont icon icon-skyatlas" style="font-size: 92px;margin-right: 24px;"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content grid3">
          <div class="left">
            <p>使用智能服务人数 (人)</p>
            <div class="font50">5164190</div>
            <p>累计消费总额 ¥62,050,895.98元</p>
          </div>
          <div class="right">
            <i class="iconfont icon icon-bed"></i>
          </div>
        </div>
      </el-col>
    </el-row>
	<div>
		<div class="Keyin7">
			<div class="Keyin7_tit">
				<h3>
					关键指标数据增量统计
					<span> &nbsp; - &nbsp; 数据统计最后更新 2019-08-21 15:00</span>
				</h3>
				<div class="Keyin7_div right">
					<span class="gloomy" v-bind:class="{totals:index==current}"
					v-for="(item,index) in Specific" :key="index" @click="speci(index)">{{item.name}}</span>
				</div>
			</div>
			<div class="Keyin7_con topnav_box" >
				<table>
					<tbody border>
						<tr v-for="(item,index) in tableData" :key="index">
							<td class="Merchant">{{item.name}}</td>
							<td class="character">{{item.value}}</td>
							<td class="Merchant">{{item.space}}</td>
							<td class="character">{{item.spaceNum}}</td>
							<td class="Merchant">{{item.user}}</td>
							<td class="character">{{item.userNum}}</td>
							<td class="Merchant">{{item.agent}}</td>
							<td class="character">{{item.agentNum}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="Keyin3">
			<div class="Keyin3_tit">
				<h3>全局状态</h3>
			</div>
			<div class="Keyin3_con topnav_box">
				<ul>
					<li v-for="(item,index) in Globalstate" :key="index">
						<i  :class="item.icon"></i>
						<span>{{item.value}}</span>
						<div class="right">
							<span>查看</span>
							<i class="el-icon-arrow-right"></i>
						</div>
					</li>
				</ul>
			</div>
			
		</div>
	</div> 
	<div>
		<div class="Keyin31" style="width:31%">
			<div class="Keyin31_tit">
				<h3>2019年 DuotelCube 销售情况概览</h3>
			</div>
			<table>
				<tbody border>
					<tr v-for="(item,index) in Overview" :key="index">
						<td class="Merchant">{{item.title}}</td>
						<td class="character">{{item.price}}</td>
						<td class="Merchant">{{item.magnitude}}</td>
						<td class="character">{{item.num}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="Keyin31" style="width:33.5%;margin-left:15px">
			<div class="Keyin31_tit">
				<h3>2019年 Duotel AIoT Suite 销售情况概览</h3>
			</div>
			<table>
				<tbody border>
					<tr v-for="(item,index) in Overview2" :key="index">
						<td class="Merchant">{{item.title}}</td>
						<td class="character">{{item.price}}</td>
						<td class="Merchant">{{item.magnitude}}</td>
						<td class="character">{{item.num}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="Keyin31 right" style="width:32%">
			<div class="Keyin31_tit">
				<h3>DuotelPartner 销售排行榜</h3>
				<div class="Keyin7_div right">
				<span class="gloomy" v-bind:class="{totals:index==currents}"
					v-for="(item,index) in Monthly" :key="index" @click="monthly(index)">{{item.name}}</span>
				</div>
			</div>
			<div class="Keyin31_con topnav_box">
				<ul>
				<li v-for="(item,index) in SalesList" :key="index">
					<span v-if="item.num != ''" :style="item.background">{{item.num}}</span>
					<span v-else style="display:none"></span>
					<span>{{item.RankingList}}</span>
					<span class="right">{{item.price}}</span>
				</li>
			</ul>
			</div>
			
		</div>
	</div>
  </div>
</template>

<script>
import { resName } from "../../api/api";
export default {
  data() {
      return {
        tableData:[
			{
				name:"商户",
				value:"720个",
				space:"空间",
				spaceNum:"7838间",
				user:"用户",
				userNum:"129个",
				agent:"代理",
				agentNum:"6945个",
			},{
				name:"主机",
				value:"9406台",
				space:"设备",
				spaceNum:"70542台",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"续费",
				value:"7830台",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"MT",
				value:"90	",
				space:"VoIP",
				spaceNum:"72",
				user:"LAPP",
				userNum:"82",
				agent:"-",
				agentNum:"-",
			},{
				name:"工单",
				value:"5445",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},{
				name:"-",
				value:"-",
				space:"-",
				spaceNum:"-",
				user:"-",
				userNum:"-",
				agent:"-",
				agentNum:"-",
			},
		],
		Globalstate:[
			{
				icon:"el-icon-bell",
				value:"当前 2845 份待处理工单"
			},{
				icon:"el-icon-info",
				value:"当前 9 条通讯线路故障"
			},{
				icon:"el-icon-bangzhu",
				value:" 当前 8 台服务器故障"
			},{
				icon:"el-icon-s-marketing",
				value:"当前 9 台服务器报错"
			},{
				icon:"el-icon-share",
				value:"当前 70 个接口错误提示消息"
			},{
				icon:"el-icon-s-tools",
				value:"当前 1519 台CUBE主机故障报错"
			},{
				icon:"el-icon-s-operation",
				value:"当前 2026 台设备待机/离线状态"
			},{
				icon:"el-icon-paperclip",
				value:"当前 9809 个外设配件故障报错"
			},{
				icon:"el-icon-folder-opened",
				value:"当前 5645 条系统云端故障报错"
			}

		],
		Overview:[
			{
				title:"Q1",
				price:"¥ 0.00",
				magnitude:"数量",
				num:"0"
			},{
				title:"Q2",
				price:"¥ 0.00",
				magnitude:"数量",
				num:"0"
			},{
				title:"Q3",
				price:"¥ 0.00",
				magnitude:"数量",
				num:"0"
			},{
				title:"Q4",
				price:"¥ 55,676,680.67",
				magnitude:"数量",
				num:"2704"
			},{
				title:"总额",
				price:"¥ 55,676,680.6",
				magnitude:"总量",
				num:"2704"
			}
		],
		Overview2:[
			{
				title:"Q1",
				price:"¥ 0.00",
				magnitude:"数量",
				num:"0"
			},{
				title:"Q2",
				price:"¥ 0.00",
				magnitude:"数量",
				num:"0"
			},{
				title:"Q3",
				price:"¥ 0.00",
				magnitude:"数量",
				num:"0"
			},{
				title:"Q4",
				price:"¥ 67,283,608.34",
				magnitude:"数量",
				num:"2860"
			},{
				title:"总额",
				price:"¥ 67,283,608.34",
				magnitude:"总量",
				num:"2860"
			}
		],
		SalesList:[
			{
				background:"background-color:#dd514c",
				num:"1",
				RankingList:"北京营销管理有限公司",
				price:"¥5,363,469.97元"
			},{
				background:"background-color:#F37B1D",
				num:"2",
				RankingList:"北京营销管理有限公司",
				price:"¥901,542.81元"
			},{
				background:"background-color:#5eb95e",
				num:"3",
				RankingList:"北京营销管理有限公司",
				price:"¥48,406.83元"
			},{
				background:"background-color:#999",
				num:"4",
				RankingList:"北京营销管理有限公司",
				price:"¥7,697.24元"
			},{
				background:"background-color:#999",
				num:"5",
				RankingList:"北京营销管理有限公司",
				price:"¥7,592.53元"
			},{
				background:"",
				num:"",
				RankingList:"北京营销管理有限公司",
				price:"¥9,655.58元"
			},{
				background:"",
				num:"",
				RankingList:"北京营销管理有限公司",
				price:"¥6,356.22元"
			},{
				background:"",
				num:"",
				RankingList:"北京营销管理有限公司",
				price:"¥1,327.46元"
			},{
				background:"",
				num:"",
				RankingList:"北京营销管理有限公司",
				price:"¥3,534.19元"
			},{
				background:"",
				num:"",
				RankingList:"北京营销管理有限公司",
				price:"¥3,254.70元"
			}
		],
		Specific:[
			{
				id:1,
				name:"日"
			},{
				id:2,
				name:"周"
			},{
				id:3,
				name:"月"
			},{
				id:4,
				name:"季"
			},{
				id:5,
				name:"年"
			}
		],
		Monthly:[
			{
				id:1,
				name:"月"
			},{
				id:2,
				name:"季"
			},{
				id:3,
				name:"年"
			}
		],
		current: 0,
		currents: 0,

      }
  },
  
  created() {},
  methods: {
	  speci(index){
		this.current = index;
	  },
	  monthly(index){
		this.currents = index;
	  }
  }
};
</script>


<style scoped lang="less">
#container{
	-webkit-box-shadow:none !important;
}

.th(@height) {
  height: @height;
}

.bg(@color) {
  background: @color;
}

.br(@num) {
  border-radius: @num;
}

.b(@w, @c) {
  border: @w solid @c;
}

.grid-content {
  padding-left: 20px;
	overflow: hidden;
  .br(10px);
}

.grid1 {
  .bg(#4b5357);
}
.grid1 p {
	line-height: 20px;
  color: #7b878d;
      margin-top: 10px
}
.grid2 {
  .bg(#1786aa);
}
.grid2 p {
  color: #9cdcf2;
  line-height: 20px;
      margin-top: 10px
}

.grid3 {
  .bg(#785799);
}
.grid3 p {
	line-height: 20px;
	color: #ded5e7;
	    margin-top: 10px
}
.left {
  float: left;
}
.right {
  float: right;
}
.font50 {
  font-size: 50px;
  color: #fff;
}
.icon {
  color: #7b878d;
  font-size: 95px;
  margin-right: 37px;
  line-height: 129px;
}
.icon-skyatlas {
  color: #1b9eca;
}
.icon-bed {
  color: #8a6aaa;
}
li{
	float: left;
	list-style: none;
}
.topnav_box::-webkit-scrollbar{    //滚动条整体部分
    width: 5px;  
    height:10px;   
   background-color:#b5b1b1;
}  
.topnav_box::-webkit-scrollbar-track {      //scroll轨道背景
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px; 
      background-color:rgb(245, 240, 240);    
}
.topnav_box::-webkit-scrollbar-thumb { //滚动条中能上下移动的小块
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
   background-color:#b5b1b1;
} 
.Keyin7{
	float: left;
	width: 66%;
	.th(330px);
	.br(10px);
	background: #f5f5f5;
	border:1px solid #ddd;
	margin-top: 20px;
}
.Keyin7_tit{
	border-bottom:1px solid #ddd;
}
.Keyin7_tit h3{
	font-size: 14px;
	margin-left: 20px;
	display:inline-block;
	span{
		font-size: 13px;
		font-weight: 100;
	}
}
.Keyin3_con ul{
	    padding: 0 ;
    margin: 0 ;
}
.Keyin31_con ul{
	    padding: 0 ;
    margin: 0 ;
}
.gloomy{
	background: #a5a5a5;
}
.totals {
  background: #3bb4f2;
}
.Keyin7_div span{
	width: 34px;
    height: 22px;
    display: inline-block;
    text-align: center;
    margin-top: 11px;
    line-height: 22px;
    margin-right: 8px;
    border-radius: 18px;
	font-size: 12px;
	color:#fff;
}
.Keyin3_tit{
	border-bottom:1px solid #ddd;
}
.Keyin31_tit{
	border-bottom:1px solid #ddd;
}
.Keyin31_tit h3{
	font-size: 14px;
	margin-left: 20px;
	display: inline-block;
}
.Keyin3_tit h3{
	font-size: 14px;
	margin-left: 20px;
}
.Keyin7_con{
	height:284px;
	overflow-y: scroll;
}
.Keyin7_con table{
	width:100%;
	background: #fff;
	border-collapse: collapse;
}
.Keyin7_con table tr{
	line-height: 30px;
	border-bottom:1px solid #ddd;
}
.Keyin31 table tr:last-child{
	border-bottom: none !important;
}
.Merchant{
	width: 10%;
    background-color: #f9f9f9;
    border: 0px;
    font-size: 14px;
    font-weight: bold;
	text-align: center;
	
}
.character{
	width: 15%;
    border: 0px;
	font-size: 14px;
	text-align: right;
	padding-right: 10px;
}
.Keyin3{
	float: right;
	width: 32%;
	.th(330px);
	border-radius:10px 10px 0  0;
	background: #f5f5f5;
	border:1px solid #ddd;
	margin-top: 20px;
}
.Keyin3_con {
	padding: 0;
	margin: 0;
	height:284px;
	overflow-y: scroll;
}

.Keyin31_con {
	padding: 0;
	margin: 0;
	height:183px;
	overflow-y: scroll;
}
.Keyin3_con li{
	width:100%;
	height: 35px;
	background: #fff;
	line-height: 35px;
	border-bottom:1px solid #ddd;
}
.Keyin3_con li>i:first-child{
	margin-left: 10px;
}
.Keyin31_con li{
	width:100%;
	height: 36px;
	background: #fff;
	line-height: 35px;
	border-bottom:1px solid #ddd;
}
.Keyin31_con li span:first-child{
	    width: 24px;
    height: 20px;
    display: inline-block;
    color: #fff;
    text-align: center;
    line-height: 20px;
    border-radius: 16px;
    margin-left: 10px;
}
.Keyin31_con li span:nth-child(2){
	margin-left: 10px;
}
.Keyin31_con li span:last-child{
	margin-right: 10px;
}
.Keyin31{
	.th(230px);
	border-radius:10px 10px 0  0;
	display: inline-block;
	background-color: #f5f5f5;
	border:1px solid #ddd;
	margin-top: 20px;
}
.Keyin31 table{
	width:100%;
	background: #fff;
	border-collapse: collapse;
}

.Keyin31 table tr{
	line-height: 34px;
	border-bottom:1px solid #ddd;
}
</style>
