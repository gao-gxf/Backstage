<template>
     <!--列表-->
      <div id="container">
        <el-tabs type="border-card">
            <el-tab-pane label="创建品牌" >
                <el-form
                :model="dataList"
                ref="dataList"
                :rules="dataListRules"
                :hide-required-asterisk="false"
                label-width="100px"
                v-loading="listLoading"
                showClose="false">
                <el-form-item label="品牌名称" prop="project_names">
                    <el-input v-model="dataList.project_brand"></el-input>
                </el-form-item>
                    <div class="btnBox">
                        <el-button type="primary" size="small" @click='submitAdd'>提交</el-button>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="编辑品牌">
                <el-form
                :model="dataList"
                ref="dataList"
                :rules="dataListRules"
                :hide-required-asterisk="false"
                label-width="100px"
                v-loading="listLoading"
                showClose="false">
                <el-form-item label="品牌名称" prop="project_names">
                    <el-input v-model="dataList.project_brand"></el-input>
                </el-form-item>
                    <div class="btnBox">
                        <el-button type="primary" size="small" @click='submitEdit'>提交</el-button>
                    </div>
                </el-form>
            </el-tab-pane>
        </el-tabs>
         
      </div>
</template>
<script>
import { resName } from "../../../api/api";
import axios from 'axios';
export default {
    data(){
        return{
            listLoading:false,
            dataList:{
                project_brand:''
            },
            dataListRules: {
                project_brand: [
                {
                    required: true,
                    message: "请输入品牌名称",
                    trigger: "change"
                }
                ]
            },
        }
    },
    created(){
      
    },
    methods:{
        submitAdd:function(){
            console.log("新增提交")
        },
        submitEdit:function(){
            console.log("编辑提交")
        }
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
        width:40%;
        display:inline-block;
        margin-bottom:20px;
        margin-right:20px;
    }
    .dockingbut{
        margin-left:60px;
    }
    .gline{
         margin-bottom:30px;
    }
</style>
