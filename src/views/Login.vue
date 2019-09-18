<template>
  <div id="vBox">
    <div class="loginBox">
      <p class="wecText">Duotel BOSS</p>
      <div class="inputBox">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-container">
          <el-form-item prop="account" class="inputItem">
            <input type="text" v-model="ruleForm2.account" autocomplete="off" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="checkPass" class="inputItem psd">
            <input
              type="password"
              @keyup="handleSubmit1"
              v-model="ruleForm2.checkPass"
              autocomplete="off"
              placeholder="请输入密码"
            />
            <div class="login-icon" @click="handleSubmit2">
              <img src="../assets/images/rRight.png" alt />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="am-cf ba-foot">
      <div class="am-cf ba-foot-box">
        <img src="../assets/images/beian.png" height="18" /> 京公网安备 11010502037450号 京ICP备18031731号-2
        &nbsp;&nbsp;|&nbsp;&nbsp;
        Copyright © 2017-2019 Duotel Inc. 保留所有权利。
      </div>
    </div>
  </div>
</template>


<script>
import { resName } from "../api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        // account: [
        //   {
        //     required: true,
        //     message: "请输入账号",
        //     trigger: "blur"
        //   }
        // ],
        // checkPass: [
        //   {
        //     required: true,
        //     message: "请输入密码",
        //     trigger: "blur"
        //   }
        // ]
      },
      checked: true
    };
  },
  methods: {
    handleSubmit1(ev) {
      if (ev.keyCode == 13) {
        this.handleSubmit2();
      }
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            account_id: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          if(loginParams.account_id == ""){
              this.$message.error('请输入账号');
               return false;
          }else if( loginParams.password == ""){
              this.$message.error( '请输入密码');
              return false;
          }else{
            resName
              .requestLogin(loginParams)
              .then(res => {
                //数据处理
                if (res.status === 200) {
                  if (res.data.code === 1) {
                    _this.$store.state.userInfo = res.data.data; //保存当前用户信息
                    this.$store.state.leftNavLevel.length = 0;
                    sessionStorage.setItem("userCon", res.data.data);
                    sessionStorage.setItem("user", res.data.data.id);
                    _this.$router.replace("/home");
                  } else if (res.data.code === -7) {
                    this.$message({
                      message: res.data.msg,
                      type: "error"
                    });
                  }
                }
              })
              .catch(err => {
              //错误处理
              // console.log("失败："+JSON.stringify(err));
            });
          }
          
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#vBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #0b1016;
  background-size: 100% 100%;
  background-image: url(../assets/images/bg.jpg);
  background-position: right;
  background-repeat: no-repeat;
}

.el-form-item {
  margin-bottom: 0;
}

.loginBox {
  color: #fff;
  text-align: center;
  margin: 14% auto 15%;
}

.wecText {
  font-size: 22px;
  margin-bottom: 30px;
}

.inputBox {
  margin: 0 auto;
  width: 350px;
  height: 82px;

  font-size: 16px;
  color: #ddd;
  background-color: #fff;
  border-radius: 10px;
}

.inputItem {
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.inputItem input {
  width: 100%;
  border: 0px;
  background: none;
  text-indent: 1em;
  color: #333;
  outline: none;
  line-height: 40px;
}

.psd {
  position: relative;
}

.psd {
  border-bottom: none;
}

.login-icon {
  position: absolute;
  right: 15px;
  top: 5px;
  height: 30px;
  width: 30px;
  overflow: hidden;
  cursor: pointer;
}

.ba-foot {
      width: 100%;
    color: #666;
    font-size: 12px;
    text-align: center;
    bottom: 20px;
    position: absolute;
}

.ba-foot-box img {
  position: relative;
  top: 3px;
  margin-right: 2px;
}
input:internal-autofill-selected {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
</style>
