import {
      request
} from './request';
var url = process.env.BASEURL;
export const resName = {
      requestLogin(pramas) {               //登录方法
            return request({
                  method: 'POST',
                  url: 'boss/login/user_login',
                  params: pramas
            })
      },
      userList(pramas) {                   //获取用户列表
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/user_list',
                  params: pramas
            })
      },
      GetJobNumber(pramas) {                //获取新工号
            return request({
                  method: 'GET',
                  url: 'boss_api/auth/get_new_user_info',
                  params: pramas
            })
      },
      CheckWorkId(pramas) {                //检查用户工号是否存在
            return request({
                  method: 'GET',
                  url: 'boss_api/auth/check_work_id',
                  params: pramas
            })
      },
      UserAdd(pramas) {                          //添加用户
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/user_add',
                  params: pramas
            })
      },
      ChangeUserStatus(pramas) {                 //更改用户状态
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/user_status',
                  params: pramas
            })
      },
      GetUserInfo(pramas) {                      //获取用户详细信息
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/user_info',
                  params: pramas
            })
      },
      UserInfoEdit(pramas) {                      //编辑用户
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/user_edit',
                  params: pramas
            })
      },
      ResetPwd(pramas) {                      //重置密码
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/reset_pwd',
                  params: pramas
            })
      },
      useRetrievePwd(pramas) {                      //用户修改密码
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/user_retrieve_pwd',
                  params: pramas
            })
      },
      GetRoleGroupList(pramas) {                      //获取角色组列表
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/role_list',
                  params: pramas
            })
      },
      RoleGroupAdd(pramas) {                      //添加角色组
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/role_add',
                  params: pramas
            })
      },
      messageTplList(pramas) {                      //消息模板列表
            return request({
                  method: 'GET',
                  url: 'boss_api/messagetpl/message_tpl_list',
                  params: pramas
            })
      },
      meTplEdit(pramas) {                      //编辑消息模板
            return request({
                  method: 'POST',
                  url: 'boss_api/messagetpl/message_tpl_edit',
                  params: pramas
            })
      },
      messageTplAdd(pramas) {                      //添加消息模板
            return request({
                  method: 'POST',
                  url: 'boss_api/messagetpl/message_tpl_add',
                  params: pramas
            })
      },
      messageTplDel(pramas) {                      //删除消息模板
            return request({
                  method: 'POST',
                  url: 'boss_api/messagetpl/message_tpl_del',
                  params: pramas
            })
      },
      CategoryGetTree(pramas) {                      //获取所有栏目
            return request({
                  method: 'POST',
                  url: 'boss_api/website/category_get_tree',
                  params: pramas
            })
      },


      // cube列表
      cubeList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/cube/cube_list',
                  params: pramas
            })
      },
      //认证审核列表
      authList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/auth/auth_audit_list',
                  params: pramas
            })
      },
      //审核通过
      authAudit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/auth_audit',
                  params: pramas
            })
      },
      //审核驳回
      authrejection(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/auth_audit',
                  params: pramas
            })
      },
      //商户修改
      iduotelEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/iduotel_edit',
                  params: pramas
            })
      },
      //详情
      authreParticulars(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/auth/auth_audit_detail',
                  params: pramas
            })
      },
       //商户列表删除
       delauthreList(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/iduotel_del',
                  params: pramas
            })
      },
      //常见问题列表
      configproblemList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/problem/problem_list',
                  params: pramas
            })
      },
      //常见问题编辑
      configproblemEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/problem/problem_edit',
                  params: pramas
            })
      },
      //常见创建问题
      configproblemAdd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/problem/problem_add',
                  params: pramas
            })
      },
      //消息列表
      configmessageList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/message/message_List',
                  params: pramas
            })
      },
      //发送消息
      configmessageAdd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/message/message_add',
                  params: pramas
            })
      },
      //消息编辑
      configmessageEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/message/message_edit',
                  params: pramas
            })
      },
      // 商品分类列表
      GoodsTypeList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/goods_type_list',
                  params: pramas
            })
      },
      // 商品分类
      goodsTypeList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/goods_type',
                  params: pramas
            })
      },
      // 官网获取列表
      websiteList(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/category_get_tree',
                  params: pramas
            })
      },
      // 官网创建活动
      webactivityadd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/activity_add',
                  params: pramas
            })
      },
      // 官网更改活动状态
      webactivitystatus(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/activity_status',
                  params: pramas
            })
      },
      // 官网后台搜索栏目/文章
      websearchCategory(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/website/searchCategory(searchArticle)',
                  params: pramas
            })
      },
      // 官网活动编辑
      webactivityedit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/activity_edit',
                  params: pramas
            })
      },
      // 发布/取消发布文章
      webarticlerelease(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/article_release',
                  params: pramas
            })
      },
      // 查询枚举数据
      webgetcommonsdata(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/commons/get_commons_data',
                  params: pramas
            })
      },
      // 添加枚举数据
      addCommonsData(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/commons/add_commons_data',
                  params: pramas
            })
      },
      // 删除枚举数据
      delCommonsData(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/commons/del_commons_data',
                  params: pramas
            })
      },
      // 编辑枚举数据
      editCommonsData(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/commons/edit_commons_data',
                  params: pramas
            })
      },
      // 官网编辑栏目
      editcategory(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/category_edit',
                  params: pramas
            })
      },
      // 官网新增栏目
      addcategory(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/category_add',
                  params: pramas
            })
      },
      // 文章详情
      articleInfo(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/article_info',
                  params: pramas
            })
      },

      // 官网查看栏目下所有文章
      articleList(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/get_article_list',
                  params: pramas
            })
      },
      // 商品列表
      GoodsList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/goods_list',
                  params: pramas
            })
      },
      // 商品上下架
      GoodsRacks(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/update_sale',
                  params: pramas
            })
      },
      GetGoodsType(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/get_goods_type',
                  params: pramas
            })
      },

      GetPermission(pramas) {                      //获取权限列表
            return request({
                  method: 'POST',
                  url: 'boss_api/auth/permission_list',
                  params: pramas
            })
      },
      




      // 官网新增文章
      addarticle(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/article_add',
                  params: pramas
            })
      },
      // 官网编辑文章
      editarticle(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/article_edit',
                  params: pramas
            })
      },
      // 官网活动列表
      webactivities(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/website/activity_list',
                  params: pramas
            })
      },
      // 官网删除栏目
      delcategory(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/category_del',
                  params: pramas
            })
      },
      // 官网删除文章
      delarticle(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/article_del',
                  params: pramas
            })
      },

      // 官网删除活动
      webactivitydel(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/activity_del',
                  params: pramas
            })
      },
      //根据商品类型获取规格
      GetSpec(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/get_spec_by_goods_type',
                  params: pramas
            })
      },
      //商品添加
      GoodsAdd(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/goods/goods_add',
                  params: pramas
            })
      },
      //商品编辑
      GoodsEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/goods_edit',
                  params: pramas
            })
      },
      //商品详情
      GoodsDetail(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/goods_detail',
                  params: pramas
            })
      },
      //删除商品
      GoodsDel(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/goods_del',
                  params: pramas
            })
      },
      //添加项目
      projectAdd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/project_add',
                  params: pramas
            })
      },
       //删除项目列表
       projectOrderDel(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/project_del',
                  params: pramas
            })
      },
       //查看供应商
       getSupplier(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/get_supplier',
                  params: pramas
            })
      },
       //添加项目图纸
       addProjectDrawings(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/add_project_drawings',
                  params: pramas
            })
      },
       //编辑项目图纸
       editProjectDrawings(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/edit_project_drawings',
                  params: pramas
            })
      },
       //删除项目图纸
       delProjectDrawings(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/del_project_drawings',
                  params: pramas
            })
      },
       //项目品牌列表
       projectBrandList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/project_brand_list',
                  params: pramas
            })
      },
       //获取项目列表
       getProjectBrand(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/get_project_brand',
                  params: pramas
            })
      },
       //项目品牌树
       projectBrandTree(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/project_brand_tree',
                  params: pramas
            })
      },
       //添加项目品牌
       addProjectBrand(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/add_project_brand',
                  params: pramas
            })
      },
       // 编辑项目品牌
       editProjectBrand(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/edit_project_brand',
                  params: pramas
            })
      },
      // 删除项目品牌
      delProjectBrand(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/del_project_brand',
                  params: pramas
            })
      },
      //编辑项目
      projecteEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/project/project_edit',
                  params: pramas
            })
      },
      //获取已完成的cube房间数量
      getBindCubeNum(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/get_bind_cube_num',
                  params: pramas
            })
      },
      //获取项目经理
      getProjectManager(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/get_project_manager',
                  params: pramas
            })
      },
      //获取成交金额
      getCompleteMoney(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/get_complete_money',
                  params: pramas
            })
      },
      //销售订单列表
      orderList(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/order/order_list',
                  params: pramas
            })
      },
      //订单详情
      orderDetai(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/order/order_detail',
                  params: pramas
            })
      },
       //订单备货
       orderStocking(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/order/order_stocking',
                  params: pramas
            })
      },
      //订单确认发货
      confirmDelivery(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/order/confirm_the_delivery',
                  params: pramas
            })
      },
      //上传图片接口
      uploadImg(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/website/upload',
                  params: pramas
            })
      },
      // 上传文件
      // projectUpload(pramas) {
      //       return request({
      //             method: 'POST',
      //             url: 'boss_api/project/upload',
      //             params: pramas
      //       })
      // },
      
      //添加商品分类goodsTypeAdd
      goodsTypeAdd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/goods_type_add',
                  params: pramas
            })
      },
      //编辑商品分类goodsTypeEdit
      goodsTypeEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/goods_type_edit',
                  params: pramas
            })
      },
      //删除商品分类
      goodsTypeDel(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/goods_type_del',
                  params: pramas
            })
      },
      //规格列表
      specList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/goods/spec_list',
                  params: pramas
            })
      },
      //添加规格
      specAdd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/spec_add',
                  params: pramas
            })
      },
      //编辑规格
      specEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/goods/spec_edit',
                  params: pramas
            })
      },
      //多语言所属页面
      getLanguagePage(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/commons/iduotel_language_page',
                  params: pramas
            })
      },
      //多语言列表
      getLanguageList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/commons/iduotel_language_list',
                  params: pramas
            })
      },
      //添加多语言
      LanguageAdd(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/commons/iduotel_language_add',
                  params: pramas
            })
      },
      //多语言编辑
      LanguageEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/commons/iduotel_language_edit',
                  params: pramas
            })
      },
      //文案列表
      copyList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/copy/copy_list',
                  params: pramas
            })
      },
      //添加文案
      createCopy(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/copy/create_copy',
                  params: pramas
            })
      },
      //文案编辑
      copyEdit(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/copy/copy_edit',
                  params: pramas
            })
      },
      //项目列表
      projectList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/project/project_list',
                  params: pramas
            })
      },
      //删除原来上传的图片(接口)
      deleOldImgApi(pramas) {
            return request({
                  method: 'POST',
                  url: 'boss_api/qiniu/delete',
                  params: pramas
            })
      },

      //上传图片地址(公共方法返回)
      tarUrl() {
            return url + "boss_api/website/upload"
      },
      // 上传文件
      projectUpload() {
            return url + "/boss_api/project/upload"
      },
      //删除原来上传的图片(公共方法)
      deleOldImg(imgUrl) {
            let pra = {
                  filename: imgUrl
            }
            this.deleOldImgApi(pra).then(res => {
                  // console.log("删除原来图片返回："+JSON.stringify(res));
                  if (res.data.code === 1) {
                        console.log("已删除");
                  } else {
                        console.log("未删除");
                  }
            }).catch(err => {
                  console.log("删除出错");
            })
      },
      //轻应用
      //轻应用列表
      allLightAppList(pramas) {
            return request({
                  method: 'GET',
                  url: 'boss_api/lightapp/list',
                  params: pramas
            })
      },
      //轻应用通过审核
      lightAppAudit(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/lightapp/verify',
                  params: pramas
            })
      },
      //轻应用驳回审核
      lightAppAuditReject(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/lightapp/verify',
                  params: pramas
            })
      },

      //删除轻应用
      deleteLightApp(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/lightapp/delete',
                  params: params
            })
      },
      //轻应用类型列表
      lightAppType(params) {
            return request({
                  method: 'GET',
                  url: '/boss_api/lightapp/app_type_list',
                  params: params
            })
      },
      //添加轻应用
      addLightApp(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/lightapp/add',
                  params: params
            })
      },
      //轻应用详情
      lightAppDetail(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/lightapp/info',
                  params: params
            })
      },
      //编辑轻应用
      editorLightApp(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/lightapp/edit',
                  params: params
            })
      },
      //项目管理中项目列表
      projectList(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/project/project_list',
                  params: pramas
            })
      },
      //项目管理中项目详情
      projectDetails(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/project/project_detail',
                  params: pramas
            })
      },
      //项目管理中项目编辑
      projectEdit(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/project/project_edit',
                  params: pramas
            })
      },
      //项目管理中项目图纸列表
      projectDrawing(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/project/project_drawings_list',
                  params: pramas
            })
      },
      //项目管理中项目删除图纸
      delDrawing(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/project/del_project_drawings',
                  params: pramas
            })
      },
      //项目管理中项目编辑图纸
      editDrawing(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/project/edit_project_drawings',
                  params: pramas
            })
      },
      //项目管理中项目订单列表
      projectOrder(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/project/project_order_list',
                  params: pramas
            })
      },
      //项目管理中新增项目订单列表
      addprojectOrder(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/project/add_order',
                  params: pramas
            })
      },
      //项目管理中删除项目订单列表
      delprojectOrder(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/project/project_order_del',
                  params: pramas
            })
      },
      //获取物流信息
      logisticInfo(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/order/logistic_info',
                  params: pramas
            })
      },
      //物流单号识别
      shipperCode(pramas) {
            return request({
                  method: 'GET',
                  url: '/boss_api/order/shipper_code',
                  params: pramas
            })
      },
       //订单发货
       orderDelivery(pramas) {
            return request({
                  method: 'POST',
                  url: '/boss_api/order/order_delivery',
                  params: pramas
            })
      },
      //面板管理列表
      panelList(params) {
            return request({
                  method: 'GET',
                  url: '/boss_api/control_panel/list',
                  params: params
            })
      },
      //面板管理刪除
      pannelDelete(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/control_panel/delete',
                  params: params    
            })
      },
      //面板编辑
      pannelEdit(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/control_panel/edit',
                  params: params    
            })     
      },
      //面板添加
      pannelAdd(params) {
            return request({
                  method: 'POST',
                  url: '/boss_api/control_panel/add',
                  params: params    
            })     
      },
      	//项目管理中项目列表
	  projectList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/project/project_list',
			params: pramas
		})
	  },
	  //项目管理中项目详情
	  projectDetails(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/project/project_detail',
			params: pramas
		})
        },
        //项目管理中项目编辑
	  projectEdit(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/project/project_edit',
			params: pramas
		})
        },
        //项目管理中项目图纸列表
	  projectDrawing(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/project/project_drawings_list',
			params: pramas
		})
        },
        //项目管理中项目删除图纸
	  delDrawing(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/project/del_project_drawings',
			params: pramas
		})
        },
        //项目管理中项目编辑图纸
	  editDrawing(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/project/edit_project_drawings',
			params: pramas
		})
        },
        //项目管理中项目订单列表
	  projectOrder(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/project/project_order_list',
			params: pramas
		})
        },
        //项目管理中新增项目订单列表
	  addprojectOrder(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/project/add_order',
			params: pramas
		})
        },
        //项目管理中删除项目订单列表
	  delprojectOrder(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/project/project_order_del',
			params: pramas
		})
    },
        //项目管理中客户服务列表
	  customerService(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/project/customer_service',
			params: pramas
		})
    },
        //办公室管理中供应商id列表
	  supplierList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/goods/get_supplier',
			params: pramas
		})
    },
        //办公室管理中添加供应商
	  addSuppliers(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/goods/supplier_add',
			params: pramas
		})
	  },
	  //办公室管理中编辑供应商
	  editSuppliers(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/goods/supplier_edit',
			params: pramas
		})
	  },
	  //办公室管理中删除供应商
	  delSuppliers(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/goods/supplier_del',
			params: pramas
		})
      },
        //办公室管理中入库单号列表
	  ordernoList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/inbound_order/get_order_no',
			params: pramas
		})
    },
        //办公室管理中经办人列表
	  agentList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/inbound_order/get_staff',
			params: pramas
		})
    },
        //办公室管理中物流信息
	  getlogistics(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/inbound_order/get_logistics_by_order_on',
			params: pramas
		})
    },
        //办公室管理中添加入库单
	  addWare(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/inbound_order/inbound_order_add',
			params: pramas
		})
    },
    //办公室管理中部门列表
    departmentList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/payment_request/department_list',
			params: pramas
		})
	},
	//办公室管理中支出类别列表
    paymentTypeList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/payment_request/payment_type_list',
			params: pramas
		})
	},
	//办公室管理中审批列表
    paymentrequestList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/payment_request/payment_request_list',
			params: pramas
		})
    },
    //办公室管理中根据供应商id获取商品列表
    suppliergoodsList(pramas) {
		return request({
			method: 'GET',
			url: '/boss_api/goods/get_goods_by_supplier',
			params: pramas
		})
	},
	//办公室管理中添加请款单
    addApprolierList(pramas) {
		return request({
			method: 'POST',
			url: '/boss_api/payment_request/payment_request_add',
			params: pramas
		})
      },
      //办公室管理中请款单详情
    approlierDetail(pramas) {
      return request({
            method: 'POST',
            url: '/boss_api/payment_request/payment_request_info',
            params: pramas
      })
},

}
