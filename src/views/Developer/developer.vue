<template>
  <section>
    <el-row :model="filter" type="flex" class="row-bg" justify="space-between">
      <div></div>
      <div style="float:right;width:300px;right:0">
        <el-input placeholder="Duotel ID" v-model="filter.ID" style="width:75%" size="mini"></el-input>
        <el-button type="primary" style="margin-left:10px" size="mini" @click="authListPage">查询</el-button>
      </div>
    </el-row>

    <!-- 列表 -->
    <el-table
      :data="tableList"
      style="width: 99.9%;margin-bottom: 20px;"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      text-align="center"
      v-loading="listLoading"
    >
      <el-table-column prop="id" width="80" align="center" sortable label="ID"></el-table-column>
      <el-table-column prop="duotel_id" width="170" align="center" sortable label="duotel ID"></el-table-column>
      <el-table-column align="center" sortable label="开发者名称" width="150" prop="company_name">
          <template slot-scope="scope">
            <p v-html="scope.row.user_type== '1' ? scope.row.company_name : scope.row.personal_name"></p>
         
          </template>
      </el-table-column>
      <el-table-column align="center" sortable label="类别" prop="user_type">
        <template slot-scope="scope">
          <p v-html="scope.row.user_type== '1' ? '商户' : '个人' "></p>
        </template>
      </el-table-column>
      <el-table-column  align="center" sortable label="省"  prop="province_id">
        <template slot-scope="scope">
          <div class="hoveTitle">{{scope.row.province_id}}</div>
        </template>
      </el-table-column>
      <el-table-column  align="center" sortable label="市" prop="city_id">
        <template slot-scope="scope">
          <div class="hoveTitle">{{scope.row.city_id}}</div>
        </template>
      </el-table-column>
      <el-table-column  align="center" sortable label="区" prop="area_id">
        <template slot-scope="scope">
          <div class="hoveTitle">{{scope.row.area_id}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <div v-if="scope.row.developer_status == '0'">
            <el-button
              type="success"
              @click="authPass(scope.$index, scope.row)"
              size="mini"
              plain
            >通过</el-button>
            <el-button
              type="danger"
              @click="authReject(scope.row.id)"
              size="mini"
              plain
            >驳回</el-button>
            <el-button
              size="mini"
              plain
              type="info"
              @click="Particulars(scope.$index, scope.row)"
            >详情</el-button>
          </div>
          <div v-else-if="scope.row.developer_status == '1'">
            <el-button type="success" size="mini">已审核</el-button>
            <el-button
              size="mini"
              plain
              type="info"
              @click="Particulars(scope.$index, scope.row)"
            >详情</el-button>
          </div>
          <div v-else-if="scope.row.developer_status == '-1'">
            <el-button type="danger" size="mini">已驳回</el-button>
            <el-button
              size="mini"
              plain
              type="info"
              @click="Particulars(scope.$index, scope.row)"
            >详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情 -->
    <!-- 商户 -->
    <el-dialog :visible.sync="dialogParticularsa">
      <el-form :model="form" style="overflow:hidden">
        <el-form-item label="DuotelID" :label-width="formLabelWidth">
          <el-input v-model="form.duotel_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省级名称" :label-width="formLabelWidth">
          <el-input :span="12" v-model="form.province_id" prop="province_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市名称" :label-width="formLabelWidth">
          <el-input :span="12" v-model="form.city_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="form.area_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.company_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="执照号码" :label-width="formLabelWidth">
          <el-input v-model="form.company_license_num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" :label-width="formLabelWidth">
          <el-input v-model="form.company_license_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="form.company_contact_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" :label-width="formLabelWidth">
          <el-input v-model="form.company_bank" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支行名称" :label-width="formLabelWidth">
          <el-input v-model="form.company_bank_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" :label-width="formLabelWidth">
          <el-input v-model="form.company_bank_account" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogParticularsa = false">我知道了</el-button>
      </div>
    </el-dialog>

    <!-- 个人 -->
    <el-dialog :visible.sync="dialogParticulars">
      <el-form :model="form" style="overflow:hidden">
        <el-form-item label="DuotelID" :label-width="formLabelWidth">
          <el-input v-model="form.duotel_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省级名称" :label-width="formLabelWidth">
          <el-input :span="12" v-model="form.province_id" prop="province_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市名称" :label-width="formLabelWidth">
          <el-input :span="12" v-model="form.city_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="form.area_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="真实名称" :label-width="formLabelWidth">
          <el-input v-model="form.personal_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="form.personal_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件号码" :label-width="formLabelWidth">
          <el-input v-model="form.personal_id_card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件正面" :label-width="formLabelWidth">
          <el-input v-model="form.personal_id_card_img_front" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件背面" :label-width="formLabelWidth">
          <el-input v-model="form.personal_id_card_img_reverse" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogParticulars = false">我知道了</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { resName } from "../../api/api";
export default {
  data() {
    return {
      DuotelID: "",
      dialogVisible: false,
      tableList: [],
      rejection: "", //驳回原因
      dialogFormVisible: false,
      dialogParticularsa: false,
      dialogParticulars: false,
      listLoading: false,
      form: {
        duotel_id: "",
        username: "",
        nickname: "",
        province_id: "",
        city_id: "",
        area_id: "",
        address: "",
        //商户
        company_name: "",
        company_license_num: "",
        company_license_url: "",
        company_contact_phone: "",
        company_bank: "",
        company_bank_name: "",
        company_bank_account: "",
        // 个人
        personal_name: "",
        personal_phone: "",
        personal_id_card: "",
        personal_id_card_img_front: "",
        personal_id_card_img_reverse: ""
      },
      id: "",
      formLabelWidth: "120px",
      filter: {
        ID: ""
      }
    };
  },
  created() {
    this.authListPage();
  },
  methods: {
    // 通过审核
    authPass(index, row) {
      let pass = {
        status: 1,
        user_info_id: row.id,
        rejected: "1",
        identity:"developer"
      };
      resName
        .authAudit(pass)
        .then(res => {
          //数据处理
          if (res.data.code == "1" || res.data.code == "-15") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.authListPage();
          } else if (res.data.code === -3) {
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
    //驳回审核
    authReject(id) {
      this.id = id;
      let obj = {};
        obj = this.tableList.find(item => {
          return item.id === id; //筛选出匹配数据
        });
        this.$prompt('驳回原因','提示',{
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => { 
            let rejects = {
              status: -1,
              user_info_id: obj.id,
              rejected: value,
              identity:"developer"
            };
          resName.authrejection(rejects).then(res => {
            if (res.data.code == "1") {
              this.dialogFormVisible = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.authListPage();
            } else if (res.data.code === -3) {
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
    // 审核列表
    authListPage() {
      let pages = {
        search_key: this.filter.ID,
        identity: "developer",
        page: 1,
        per_page: 10
      };
      this.listLoading = true;
      resName
        .authList(pages)
        .then(res => {
          if (res.code === 1) {
            this.tableList = res.data.data;
            this.listLoading = false;
          } else if (res.code === -3) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    //详情
    Particulars(index, row) {
      let userID = {
        user_info_id: row.id
      };
      resName
        .authreParticulars(userID)
        .then(res => {
          if (res.code === 1) {
            console.log(row, 555555);
            this.form.duotel_id = res.data.duotel_id;
            this.form.username = res.data.username;
            this.form.nickname = res.data.nickname;
            this.form.province_id = res.data.province_id;
            this.form.city_id = res.data.city_id;
            this.form.area_id = res.data.area_id;
            this.form.address = res.data.address;
            if (row.user_type == 1) {
              this.dialogParticularsa = true;
              this.dialogParticulars = false;
              //商户
              this.form.company_name = res.data.company_name;
              this.form.company_license_num = res.data.company_license_num;
              this.form.company_license_url = res.data.company_license_url;
              this.form.company_contact_phone = res.data.company_contact_phone;
              this.form.company_bank = res.data.company_bank;
              this.form.company_bank_name = res.data.company_bank_name;
              this.form.company_bank_account = res.data.company_bank_account;
            } else if (row.user_type == 2) {
              console.log(row, 3333333333);
              this.dialogParticulars = true;
              this.dialogParticularsa = false;
              //个人
              this.form.personal_name = row.personal_name;
              this.form.personal_phone = row.personal_phone;
              this.form.personal_id_card = row.personal_id_card;
              this.form.personal_id_card_img_front =
                row.personal_id_card_img_front;
              this.form.personal_id_card_img_reverse =
                row.personal_id_card_img_reverse;
            }
          } else if (res.data.code === -3) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped lang="less">
.el-form-item {
  width: 45%;
  float: left;
  margin-right: 1%;
}
.dialog-footer {
  clear: both;
  text-align: center;
}
.el-row {
  margin-bottom: 10px;
  border-radius: 4px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 12px 10px;
  background: #fff;
}
.el-table td,
.el-table th {
  text-align: center;
}
.hoveTitle {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
