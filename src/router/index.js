import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Index from '../views/Index.vue'
/**
 *   样例页面
 */
import page1 from '../views/nav1/page1.vue'
/**
 *	 空组件
 */
import contemplate from '../components/contemplate.vue' //空组件
/**
 *	 订单管理
 */
import salesOrders from '../views/orderManagement/salesOrders.vue' //销售订单
import Orderdetails from '../views/orderManagement/Orderdetails.vue' //订单详情
import collectionOrders from '../views/orderManagement/collectionOrders.vue' //代收订单
import allCommodities from '../views/orderManagement/allCommodities.vue' //全部商品
import MerchandisePictures from '../views/orderManagement/MerchandisePictures.vue' //商品图片
import commoditiesIns from '../views/orderManagement/commoditiesIns.vue' //添加商品
import EditingCommodities from '../views/orderManagement/EditingCommodities.vue' //编辑商品
import DetailCommodities from '../views/orderManagement/DetailCommodities.vue' //编辑商品
import commodityTypes from '../views/orderManagement/commodityTypes.vue' //商品类型
import commoditySpecifications from '../views/orderManagement/commoditySpecifications.vue' //商品规格
/*
	概览（overview）
*/
import home from '../views/home/home.vue' //默认设置

/**
 *	 办公管理
 */
import depotManagement from '../views/officeManagement/inventory/depotManagement.vue' //出库管理
import stockManagement from '../views/officeManagement/inventory/stockManagement.vue' //库存管理
import warehousManagement from '../views/officeManagement/inventory/warehousManagement.vue' //入库管理
import AddtoStorage from '../views/officeManagement/inventory/AddtoStorage.vue' //入库管理
import EditStorage from '../views/officeManagement/inventory/EditStorage.vue' //编辑入库
import DetailStorage from '../views/officeManagement/inventory/DetailStorage.vue' //详情入库
import SuppliersManagement from '../views/officeManagement/officeSet/suppliersManagement.vue' //供应商管理
import DepartmentManagement from '../views/officeManagement/officeSet/departmentManagement.vue' //部门管理
import PayType from '../views/officeManagement/officeSet/payType.vue' //支出类别
import AddApproval from '../views/officeManagement/addApproval.vue' //添加审批单
import PaymentDetail from '../views/officeManagement/paymentDetail.vue' //审批单详情


import ApprovalManagement from '../views/officeManagement/approvalManagement.vue' //审批管理
import lossReport from '../views/officeManagement/approvalprocess/lossReport.vue' //报损单
import OverflowReport from '../views/officeManagement/approvalprocess/OverflowReport.vue' // 报溢单
import Invitationslip from '../views/officeManagement/approvalprocess/Invitationslip.vue' //请款单



/**
 *	 主机管理
 */
import defaultSetting from '../views/hostadmin/defaultSetting.vue' //默认设置
import allHosts from '../views/hostadmin/allHosts.vue' //全部主机


/**
 *	 项目管理
 */
import allproject from '../views/projectManagement/allproject.vue' //全部项目
import detailsList from '../views/projectManagement/detailsList.vue' //项目详情
import edittion from '../views/projectManagement/edittion.vue' //项目编辑
import addition from '../views/projectManagement/addition.vue' //项目添加
import ManagementCategories from '../views/projectManagement/projectSet/ManagementCategories.vue' //管理类别
import ManagementStar from '../views/projectManagement/projectSet/ManagementStar.vue' //管理星级
import Managementprogress from '../views/projectManagement/projectSet/Managementprogress.vue' //管理进度
import ProjectSource from '../views/projectManagement/projectSet/projectSource.vue' //项目来源
import ProjectOwner from '../views/projectManagement/projectSet/projectOwner.vue' //项目业主
import ProjectBrand from '../views/projectManagement/projectSet/projectBrand.vue' //项目品牌
import brandManagement from '../views/projectManagement/projectSet/brandManagement.vue' //品牌管理



/**
 *	 商户管理
 */
import realNameList from '../views/audit/realNameList' //全部商户
import auditDetail from '../views/audit/auditDetail' //详情页
import personDetail from '../views/audit/personDetail' //全部商户

/**
 *	 合伙人管理
 */
import allPartner from '../views/partneradmin/allPartner.vue' //代理商
import BranchOffice from '../views/partneradmin/BranchOffice.vue' //分公司
/**
 *	 开发者管理
 */
import developer from '../views/Developer/developer.vue' //全部开发者
import AllVirtualMachines from '../views/Developer/AllVirtualMachines.vue' //全部开发者
import Allapplications from '../views/Developer/Allapplications.vue' //全部虚拟机
/**
 *	 消息管理
 */
import allMessage from '../views/messageadmin/allMessage.vue' //全部消息
import tempPartner from '../views/messageadmin/tempPartner.vue' //模板消息
/**
 *	 售后管理
 */
import afterSaleMsg from '../views/aftersale/afterSaleMsg.vue' //售后信息
/**
 *	 VolP系统
 */
import volpadmin from '../views/volp/volpadmin.vue' //全部合伙人
/**
 *	 语音技能
 */
import allVoice from '../views/voiceSkills/allVoice.vue' //全部语音
/**
 *	 数据接口
 */
import allData from '../views/dataapi/allData.vue' //全部数据
import InterfaceDocument from '../views/dataapi/InterfaceDocument.vue' //全部数据
/**
 *	 轻应用管理
 */
import allLightApp from '../views/lightapp/allLightApp.vue' //全部轻应用
import editorLightApp from '../views/lightapp/editorLightApp.vue' //编辑轻应用
import addLightApp from '../views/lightapp/addLightApp.vue' //新增轻应用

/**
 *	 财务管理
 */
import allTransaction from '../views/finance/allTransaction.vue' //全部交易查询
import setBooks from '../views/finance/setBooks.vue' //账套管理
/**
 *	 官网管理
 */
import allInner from '../views/owebsite/allInner.vue' //全部内容
import allActivity from '../views/owebsite/allActivity.vue' //全部活动
import allArticle from '../views/owebsite/allArticle.vue' //全部文章
import editArticles from '../views/owebsite/editArticles.vue' //编辑文章
import addArticle from '../views/owebsite/addArticle.vue' //创建文章

/**
 *	 系统管理0
 */
import userList from '../views/system/systemUser/userList.vue' //用户列表
import jurGroup from '../views/system/systemUser/jurGroup.vue' //权限组
import jurList from '../views/system/systemUser/jurList.vue' //权限列表
import systemDaily from '../views/system/systemDaily.vue' //权限列表

/**
 *	 中台管理
 */
import language from '../views/config/language.vue' //多语言
import accounts from '../views/config/accounts.vue' //公众号管理
import equipment from '../views/config/device/equipment.vue' //设备管理
import Application from '../views/config/device/Application.vue' //设备管理
import panelView from '../views/config/device/panelView' //面板管理
import document from '../views/config/document.vue' //文案管理
import commonIssue from '../views/config/help/commonIssue.vue' //常用问题
import serviceInfo from '../views/config/help/serviceInfo.vue' //客服消息


let routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    redirect: '/home',
    component: Index,
    menuShow: true,
    meta: {
      requiresAuth: true
    },
    children: [{
        path: '/home',
        name: '概览',
        components: {
          content: home,
        },
        meta: {
          title: '概览'
        },
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-erji-ziyuangailan', // 图标样式class
        menuShow: true
      },
      {
        path: '/office',
        name: '办公管理',
        iconCls: 'iconfont icon-bangongguanli',
        components: {
          content: contemplate,
        },
        redirect: '/office/approvalManagement',
        meta: {
          title: '办公管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [
            {
                  path: '/office/approvalManagement',
                  name: '我的任务',
                  component: ApprovalManagement,
                  meta: {
                    title: '我的任务'
                  },
                  menuShow: true,
                  plevel: 1
                },
          {
            path: '/office/approval',
            name: '业务审批',
            components: {
              default: contemplate,
            },
            redirect: '/office/approval/Invitationslip',
            meta: {
              title: '业务审批'
            },
            levelThree: true,
            plevel: 1,
            menuShow: true,
              children: [{
                  path: '/office/approval/Invitationslip',
                  name: '请款单',
                  component: Invitationslip,
                  meta: {
                    title: '请款单'
                  },
                  menuShow: true,
                  levelThree: false,
                  levelArr: ["1", "1-1"],
                  plevel: 1
                },
            //     {
            //       path: '/office/approval/OverflowReport',
            //       name: '报溢单',
            //       component: OverflowReport,
            //       meta: {
            //         title: '报溢单'
            //       },
            //       menuShow: true,
            //       levelThree: false,
            //       plevel: 1,
            //       levelArr: ["1", "1-1"]
            //     },
            //     {
            //       path: '/office/approval/lossReport',
            //       name: '报损单',
            //       component: lossReport,
            //       meta: {
            //         title: '报损单'
            //       },
            //       menuShow: true,
            //       levelThree: false,
            //       levelArr: ["1", "1-1"],
            //       plevel: 1
            //     }
              ]
            }, 
          {
          path: '/officeManagement/inventory',
          name: '库存管理',
          components: {
            default: contemplate,
          },
          redirect: '/officeManagement/inventory/warehousManagement',
          meta: {
            title: '库存管理'
          },
          levelThree: true,
          plevel: 1,
          menuShow: false,
            children: [
              {
                path: '/officeManagement/inventory/warehousManagement',
                name: '入库管理',
                component: warehousManagement,
                meta: {
                  title: '入库管理'
                },
                menuShow: true,
                levelThree: false,
                levelArr: ["1", "1-2"],
                plevel: 1
              },
              {
                path: '/officeManagement/inventory/depotManagement',
                name: '出库管理',
                component: depotManagement,
                meta: {
                  title: '出库管理'
                },
                menuShow: true,
                levelThree: false,
                plevel: 1,
                levelArr: ["1", "1-2"],
              },
              {
                path: '/officeManagement/inventory/stockManagement',
                name: '库存盘点',
                component: stockManagement,
                meta: {
                  title: '库存盘点'
                },
                menuShow: true,
                levelThree: false,
                levelArr: ["1", "1-2"],
                plevel: 1
              },
              {
                path: '/office/inventory/AddtoStorage',
                name: '入库添加',
                component: AddtoStorage,
                meta: {
                  title: '入库添加'
                },
                menuShow: false,
                levelThree: false,
                levelArr: ["1", "1-2"],
                plevel: 1
              },
              {
                path: '/office/inventory/EditStorage',
                name: '入库编辑',
                component: EditStorage,
                meta: {
                  title: '入库编辑'
                },
                menuShow: false,
                levelThree: false,
                levelArr: ["1", "1-2"],
                plevel: 1
              },
              {
                path: '/office/inventory/DetailStorage',
                name: '入库详情',
                component: DetailStorage,
                meta: {
                  title: '入库详情'
                },
                menuShow: false,
                levelThree: false,
                levelArr: ["1", "1-2"],
                plevel: 1
              },
            ]
          },
          {
            path: '/office/addApproval',
            name: '添加审批',
            component: AddApproval,
            meta: {
              title: '添加审批'
            },
            menuShow: false,
            levelThree: false,
            plevel: 1
          },
          {
            path: '/office/paymentDetail',
            name: '审批详情',
            component: PaymentDetail,
            meta: {
              title: '审批详情'
            },
            menuShow: false,
            levelThree: false,
            plevel: 1
          },
        ]
      },
      {
        path: '/order',
        name: '订单管理',
        iconCls: 'iconfont icon-dingdan',
        components: {
          content: contemplate,
        },
        redirect: '/order/salesOrders',
        meta: {
          title: '订单管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
            path: '/order/salesOrders',
            name: '销售订单',
            component: salesOrders,
            meta: {
              title: '销售订单'
            },
            menuShow: true,
            levelThree: false,
            plevel: 2
          },
          {
            path: '/order/Orderdetails',
            name: '订单详情',
            component: Orderdetails,
            meta: {
              title: '订单详情'
            },
            menuShow: false,
            levelThree: false,
            plevel: 2
          },
          {
            path: '/order/collectionOrders',
            name: '代收付订单',
            component: collectionOrders,
            meta: {
              title: '代收付订单'
            },
            menuShow: true,
            levelThree: false,
            plevel: 2
          }
        ]
      },
      {
        path: '/projectManagement',
        name: '项目管理',
        iconCls: 'iconfont icon-xiangmu',
        components: {
          content: contemplate,
        },
        redirect: '/projectManagement/allproject',
        meta: {
          title: '项目管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
            path: '/projectManagement/allproject',
            name: '全部项目',
            component: allproject,
            meta: {
              title: '全部项目'
            },
            menuShow: true,
            levelThree: false,
            plevel: 3
          },
          {
            path: '/project/detailsList',
            name: '项目详情',
            component: detailsList,
            meta: {
              title: '项目详情'
            },
            menuShow: false,
            levelThree: false,
            plevel: 3
          }, {
            path: '/project/addition',
            name: '项目添加',
            component: addition,
            meta: {
              title: '项目添加'
            },
            menuShow: false,
            levelThree: false,
            plevel: 3
          },
          {
            path: '/project/edittion',
            name: '项目编辑',
            component: edittion,
            meta: {
              title: '项目编辑'
            },
            menuShow: false,
            levelThree: false,
            plevel: 3
          },
          {
            path: '/project/projectSet',
            name: '项目设定',
            components: {
              default: contemplate,
            },
            redirect: '/project/projectSet/ManagementCategories',
            meta: {
              title: '项目设定'
            },
            levelThree: true,
            plevel: 3,
            menuShow: true,
            children: [{
                path: '/project/projectSet/ManagementCategories',
                name: '类别管理',
                component: ManagementCategories,
                meta: {
                  title: '类别管理'
                },
                menuShow: true,
                levelThree: false,
                levelArr: ["3", "3-4"],
                plevel: 0
              }, {
                path: '/project/projectSet/ManagementStar',
                name: '星级管理',
                component: ManagementStar,
                meta: {
                  title: '星级管理'
                },
                menuShow: true,
                levelThree: false,
                levelArr: ["3", "3-4"],
                plevel: 0
              },
              {
                path: '/project/projectSet/Managementprogress',
                name: '进程管理',
                component: Managementprogress,
                meta: {
                  title: '进程管理'
                },
                menuShow: true,
                levelThree: false,
                plevel: 0,
                levelArr: ["3", "3-4"],
              },
              {
                path: '/project/projectSet/ProjectSource',
                name: '来源管理',
                component: ProjectSource,
                meta: {
                  title: '来源管理'
                },
                menuShow: true,
                levelThree: false,
                plevel: 0,
                levelArr: ["3", "3-4"],
              },
              {
                path: '/project/projectSet/ProjectBrand',
                name: '品牌管理',
                component: ProjectBrand,
                meta: {
                  title: '品牌管理'
                },
                menuShow: true,
                levelThree: false,
                plevel: 0,
                levelArr: ["3", "3-4"],
              },
              {
                path: '/project/projectSet/ProjectOwner',
                name: '业主管理',
                component: ProjectOwner,
                meta: {
                  title: '业主管理'
                },
                menuShow: true,
                levelThree: false,
                plevel: 0,
                levelArr: ["3", "3-4"],
              },
              {
                path: '/project/projectSet/brandManagement',
                name: '品牌管理 ',
                component: brandManagement,
                meta: {
                  title: '品牌管理'
                },
                menuShow: false,
                levelThree: false,
                plevel: 0,
                levelArr: ["3", "3-4"],
              },
            ]
          },
          
        ]
      },
      
      // {
      //       path: '/partner',
      //       name: '渠道管理',
      //       iconCls: 'iconfont icon-qudao1',
      //       components: {
      //         content: contemplate,
      //       },
      //       redirect: '/partner/allPartner',
      //       meta: {
      //         title: '渠道管理'
      //       },
      //       leaf: false, // 只有一个节点
      //       menuShow: true,
      //       children: [{
      //         path: '/partner/allPartner',
      //         name: '代理商',
      //         component: allPartner,
      //         meta: {
      //           title: '代理商'
      //         },
      //         menuShow: true,
      //         levelThree: false,
      //         plevel: 4
      //       }, {
      //         path: '/partner/BranchOffice',
      //         name: '分公司',
      //         component: BranchOffice,
      //         meta: {
      //           title: '分公司'
      //         },
      //         menuShow: true,
      //         levelThree: false,
      //         plevel: 4
      //       }]
      //     },
      {
        path: '/allHosts',
        name: '商户管理',
        iconCls: 'iconfont icon-ai-connection',
        components: {
          content: contemplate,
        },
        redirect: '/audit/realNameList',
        meta: {
          title: '商户管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
          path: '/audit/realNameList',
          name: '全部商户',
          component: realNameList,
          meta: {
            title: '全部商户'
          },
          menuShow: true,  
          levelThree: false,         
          plevel: 4
        }
        ,{
          path: '/audit/auditDetail',
          name: '商户详情',
          component: auditDetail,
          meta: {
            title: '商户详情'
          },
          menuShow: false,           
          plevel: 4
        },{
          path: '/audit/personDetail',
          name: '个人详情',
          component: personDetail,
          meta: {
            title: '个人详情'
          },
          menuShow: false,           
          plevel: 4
        }
      ]
      },
      {
        path: '/merchants',
        name: '主机管理',
        iconCls: 'iconfont icon-shebei',
        components: {
          content: contemplate,
        },
        meta: {
          title: '主机管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        redirect: '/merchants/HostManagement',
        children: [{
          path: '/merchants/HostManagement',
          name: '全部主机',
          component: allHosts,
          meta: {
            title: '全部主机'
          },
          menuShow: true,           
          plevel: 5
        }]
      },
      {
        path: '/developer',
        name: '开发者管理',
        iconCls: 'iconfont icon-kaifa',
        components: {
          content: contemplate,
        },
        redirect: '/developer/developer',
        meta: {
          title: '开发者管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
          path: '/developer/developer',
          name: '全部开发者',
          component: developer,
          meta: {
            title: '全部开发者'
          },
          menuShow: true,
          levelThree: false,
          plevel: 6
        }, 
        // {
        //   path: '/developer/AllVirtualMachines',
        //   name: '全部应用',
        //   component: AllVirtualMachines,
        //   meta: {
        //     title: '全部应用'
        //   },
        //   menuShow: true,
        //   levelThree: false,
        //   plevel: 7
        // }, {
        //   path: '/developer/Allapplications',
        //   name: '全部虚拟机',
        //   component: Allapplications,
        //   meta: {
        //     title: '全部虚拟机'
        //   },
        //   menuShow: true,
        //   levelThree: false,
        //   plevel: 7
        // }
      ]
      },
      // {
      //   path: '/message',
      //   name: '消息管理',
      //   iconCls: 'iconfont icon-xiaoxi',
      //   components: {
      //     content: contemplate,
      //   },
      //   redirect: '/message/allMessage',
      //   meta: {
      //     title: '消息管理'
      //   },
      //   leaf: false, // 只有一个节点
      //   menuShow: true,
      //   children: [{
      //       path: '/message/allMessage',
      //       name: '全部消息',
      //       component: allMessage,
      //       meta: {
      //         title: '全部消息'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 8
      //     },
      //     {
      //       path: '/message/tempPartner',
      //       name: '模板消息',
      //       component: tempPartner,
      //       meta: {
      //         title: '模板消息'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 8
      //     }
      //   ]
      // },
      {
        path: '/aftersale',
        name: '工单管理',
        iconCls: 'iconfont icon-order',
        components: {
          content: contemplate,
        },
        redirect: '/aftersale/afterSaleMsg',
        meta: {
          title: '工单管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
          path: '/aftersale/afterSaleMsg',
          name: '全部工单',
          component: afterSaleMsg,
          meta: {
            title: '全部工单'
          },
          menuShow: true,
          levelThree: false,
          plevel: 7
        }]
      },
      // {
      //   path: '',
      //   name: 'VolP系统',
      //   iconCls: 'iconfont icon-dianhua',
      //   components: {
      //     content: contemplate,
      //   },
      //   // redirect: '/volp/volpadmin',
      //   meta: {
      //     title: 'VolP系统'
      //   },
      //   leaf: true, // 只有一个节点
      //   menuShow: true,
      //   levelThree: false,
        // children: [{
        //       path: '/volp/volpadmin',
        //       name: 'VloP管理',
        //       component: volpadmin,
        //       meta: {
        //             title: 'VloP管理'
        //       },
        //       menuShow: true,
        //       levelThree: false,
        //       plevel: 8
        // }]
      // },
      // {
      //   path: '',
      //   name: '语音技能',
      //   iconCls: 'iconfont icon-yuyin',
      //   components: {
      //     content: contemplate,
      //   },
      //   // redirect: '/voice/allVoice',
      //   meta: {
      //     title: '语音技能'
      //   },
      //   leaf: true, // 只有一个节点
      //   menuShow: true,
      //   levelThree: false,
        // children: [{
        //       path: '/voice/allVoice',
        //       name: '全部语音',
        //       component: allVoice,
        //       meta: {
        //             title: '全部语音'
        //       },
        //       menuShow: true,
        //       levelThree: false,
        //       plevel: 9
        // }]
      // },
      {
        path: '/data',
        name: '数据管理',
        iconCls: 'iconfont icon-shuju',
        components: {
          content: contemplate,
        },
        redirect: '/data/allData',
        meta: {
          title: '数据管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
          path: '/data/allData',
          name: '全部数据',
          component: allData,
          meta: {
            title: '全部数据'
          },
          menuShow: true,
          levelThree: false,
          plevel: 8
        }, {
          path: '/data/InterfaceDocument',
          name: '接口文档',
          component: InterfaceDocument,
          meta: {
            title: '接口文档'
          },
          menuShow: true,
          levelThree: false,
          plevel: 8
        }]
      },
      // {
      //   path: '/lightapp',
      //   name: '轻应用管理',
      //   iconCls: 'iconfont icon-qingyingyongxuanzhong',
      //   components: {
      //     content: contemplate,
      //   },
      //   redirect: '/lightapp/allLightApp',
      //   meta: {
      //     title: '轻应用管理'
      //   },
      //   leaf: false, // 只有一个节点
      //   menuShow: true,
      //   children: [{
      //       path: '/lightapp/allLightApp',
      //       name: '全部轻应用',
      //       component: allLightApp,
      //       meta: {
      //         title: '全部轻应用'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 13
      //     },
      //     //轻应用编辑
      //     {
      //       path: '/lightapp/editorLightApp',
      //       name: '轻应用编辑',
      //       component: editorLightApp,
      //       meta: {
      //         title: '轻应用编辑'
      //       },
      //       hidden: true
      //     },
      //     {
      //       path: '/addLightApp',
      //       component: addLightApp,
      //       name: '添加轻应用',
      //       meta: {
      //         title: '添加轻应用'
      //       },
      //       hidden: true
      //     },
      //   ]
      // },
      {
        path: '/finance',
        name: '财务管理',
        iconCls: 'iconfont icon-finance',
        components: {
          content: contemplate,
        },
        redirect: '/finance/allTransaction',
        meta: {
          title: '财务管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [{
            path: '/finance/allTransaction',
            name: '全部交易',
            component: allTransaction,
            meta: {
              title: '全部交易'
            },
            menuShow: true,
            levelThree: false,
            plevel: 9
          },
          {
            path: '/finance/setBooks',
            name: '账套管理',
            component: setBooks,
            meta: {
              title: '账套管理'
            },
            menuShow: true,
            levelThree: false,
            plevel: 9
          },
      //     {
      //       path: '/',
      //       name: '发票管理',
      //       component: setBooks,
      //       meta: {
      //         title: '发票管理'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 14
      //     },
      //     {
      //       path: '/',
      //       name: '凭证管理',
      //       component: setBooks,
      //       meta: {
      //         title: '凭证管理'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 14
      //     },
      //     {
      //       path: '/',
      //       name: '财务设定',
      //       component: setBooks,
      //       meta: {
      //         title: '财务设定'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 14
      //     }
        ]
      },
      // {
      //   path: '/owebsite',
      //   name: '官网管理',
      //   iconCls: 'iconfont icon-guanwang',
      //   components: {
      //     content: contemplate,
      //   },
      //   redirect: '/order/allInner',
      //   meta: {
      //     title: '官网管理'
      //   },
      //   leaf: false, // 只有一个节点
      //   menuShow: true,
      //   children: [{
      //       path: '/order/allInner',
      //       name: '全部分类',
      //       component: allInner,
      //       meta: {
      //         title: '全部分类'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 15
      //     },
      //     {
      //       path: '/order/allActivity',
      //       name: '活动列表',
      //       component: allActivity,
      //       meta: {
      //         title: '活动列表'
      //       },
      //       menuShow: true,
      //       levelThree: false,
      //       plevel: 15,
      //     },
      //     {
      //       path: '/allArticle',
      //       component: allArticle,
      //       name: '文章列表',
      //       meta: {
      //         title: '文章列表'
      //       },
      //       hidden: true
      //     },
      //     {
      //       path: '/editArticles',
      //       component: editArticles,
      //       name: '编辑文章',
      //       meta: {
      //         title: '编辑文章'
      //       },
      //       hidden: true
      //     },
      //     {
      //       path: '/addArticle',
      //       component: addArticle,
      //       name: '新增文章',
      //       meta: {
      //         title: '新增文章'
      //       },
      //       hidden: true
      //     }
      //   ]
      // },
      {
        path: '/config',
        name: '中台管理',
        iconCls: 'iconfont icon-tongji',
        components: {
          content: contemplate,
        },
        redirect: '/config/language',
        meta: {
          title: '中台管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [
           {
            path: '/config/language',
            name: '语言管理',
            component: language,
            meta: {
              title: '语言管理'
            },
            levelThree: false,
            plevel: 10,
            menuShow: true,
        },
          // {
          //   path: '/config/help',
          //   name: '使用帮助',
          //   components: {
          //     default: contemplate,
          //   },
          //   redirect: '/config/help/commonIssue',
          //   meta: {
          //     title: '使用帮助'
          //   },
          //   levelThree: true,
          //   plevel: 16,
          //   menuShow: true,
          //   children: [{
          //       path: '/config/help/commonIssue',
          //       name: '常见问题',
          //       component: commonIssue,
          //       meta: {
          //         title: '常见问题'
          //       },
          //       menuShow: true,
          //       plevel: 0,
          //       levelArr: ["16", "16-0"],
          //     },
          //     {
          //       path: '/config/help/serviceInfo',
          //       name: '客服消息',
          //       component: serviceInfo,
          //       meta: {
          //         title: '客服消息'
          //       },
          //       menuShow: true,
          //       levelArr: ["16", "16-0"],
          //       plevel: 16
          //     },
          //   ]
          // },
          {
            path: '/device',
            name: '设备管理',
            components: {
              default: contemplate,
            },
            meta: {
              title: '设备管理'
            },
            redirect: '/device/panelView',
            menuShow: true,
            levelThree: true,
            plevel: 10,
            children: [
            {
              path: '/device/panelView',
              name: '面板管理',
              component: panelView,
              meta: {
                title: '面板管理'
              },
              menuShow: true,
              levelThree: false,
              levelArr: ["10", "10-1"],
              // plevel: 0
            },
            {
              path: '/device/Application',
              name: '应用管理',
              component: Application,
              meta: {
                title: '应用管理'
              },
              menuShow: true,
              levelThree: false,
              levelArr: ["10", "10-1"],
              // plevel: 0
            },
            {
              path: '/device/equipment',
              name: '规则管理',
              component: equipment,
              meta: {
                title: '规则管理'
              },
              menuShow: true,
              levelThree: false,
              levelArr: ["10", "10-1"],
              // plevel: 0
            },
            ]
          },
          {
            path: '/order',
            name: '商品管理',
            components: {
              default: contemplate,
            },
            redirect: '/order/allCommodities',
            meta: {
              title: '商品管理'
            },
            levelThree: true,
            plevel: 10,
            menuShow: true,
            children: [
              {
                path: '/order/allCommodities',
                name: '全部商品',
                component: allCommodities,
                meta: {
                  title: '全部商品'
                },
                menuShow: true,
                levelThree: false,
                levelArr: ["10", "10-2"],
                plevel: 0
              }, {
                path: '/order/MerchandisePictures',
                name: '商品图片',
                component: MerchandisePictures,
                meta: {
                  title: '商品图片'
                },
                menuShow: true,
                levelThree: false,
                levelArr: ["10", "10-2"],
                plevel: 0
              },
              {
                path: '/order/commoditiesIns',
                name: '添加商品',
                component: commoditiesIns,
                meta: {
                  title: '添加商品'
                },
                menuShow: false,
                levelThree: false,
                plevel: 0,
                levelArr: ["10", "10-2"],
              },
              {
                path: '/order/EditingCommodities',
                name: '编辑商品',
                component: EditingCommodities,
                meta: {
                  title: '编辑商品'
                },
                menuShow: false,
                levelThree: false,
                plevel: 0,
                levelArr: ["10", "10-2"],
              },
              {
                  path: '/order/DetailCommodities',
                  name: '商品详情',
                  component: DetailCommodities,
                  meta: {
                    title: '商品详情'
                  },
                  menuShow: false,
                  levelThree: false,
                  plevel: 0,
                  levelArr: ["10", "10-2"],
                },
              {
                path: '/order/commodityTypes',
                name: '商品类型',
                component: commodityTypes,
                meta: {
                  title: '商品类型'
                },
                menuShow: true,
                levelThree: false,
                plevel: 0,
                levelArr: ["10", "10-2"],
              },
              {
                path: '/order/commoditySpecifications',
                name: '商品规格',
                component: commoditySpecifications,
                meta: {
                  title: '商品规格'
                },
                menuShow: true,
                levelThree: false,
                plevel: 0,
                levelArr: ["10", "10-2"],
              },
            ]
          },
          // {
          //   path: '/config/language',
          //   name: '多语言',
          //   component: language,
          //   meta: {
          //     title: '多语言'
          //   },
          //   menuShow: true,
          // },
          
            // {
            //   path: '/config/accounts',
            //   name: '公众号管理',
            //   component: accounts,
            //   meta: {
            //     title: '公众号管理'
            //   },
            //   menuShow: true,
            //   levelThree: false,
            //   plevel: 16
            // },
        ]
      },
      {
        path: '/system',
        name: '系统管理',
        iconCls: 'iconfont icon-xitong',
        components: {
          content: contemplate,
        },
        redirect: '/system/systemUser',
        meta: {
          title: '系统管理'
        },
        leaf: false, // 只有一个节点
        menuShow: true,
        children: [
          {
            path: '/system/systemUser',
            name: '系统用户',
            components: {
              default: contemplate,
            },
            redirect: '/system/systemUser/userList',
            meta: {
              title: '系统用户'
            },
            levelThree: true,
            plevel: 11,
            menuShow: true,
              children: [{
                  path: '/system/systemUser/userList',
                  name: '用户列表',
                  component: userList,
                  meta: {
                    title: '用户列表'
                  },
                  menuShow: true,
                  levelThree: false,
                  levelArr: ["11", "11-0"],
                },
                {
                  path: '/system/systemUser/jurList',
                  name: '权限列表',
                  component: jurList,
                  meta: {
                    title: '权限列表'
                  },
                  menuShow: true,
                  levelThree: false,
                  levelArr: ["11", "11-0"],
                },
                {
                  path: '/system/systemUser/jurGroup',
                  name: '权限组',
                  component: jurGroup,
                  meta: {
                    title: '权限组'
                  },
                  menuShow: true,
                  levelThree: false,
                  levelArr: ["11", "11-0"],
                },
              ]
            }, 
          // {
          //   path: '/office/officeSet',
          //   name: '办公设定',
          //   components: {
          //     default: contemplate,
          //   },
          //   redirect: '/office/officeSet/suppliersManagement',
          //   meta: {
          //     title: '办公设定'
          //   },
          //   levelThree: true,
          //   plevel: 17,
          //   menuShow: true,
          //     children: [{
          //         path: '/office/officeSet/suppliersManagement',
          //         name: '供应商管理',
          //         component: SuppliersManagement,
          //         meta: {
          //           title: '供应商管理'
          //         },
          //         menuShow: true,
          //         levelThree: false,
          //         levelArr: ["17", "17-2"],
          //         plevel: 0
          //       },
          //       {
          //         path: '/office/officeSet/departmentManagement',
          //         name: '部门管理',
          //         component: DepartmentManagement,
          //         meta: {
          //           title: '部门管理'
          //         },
          //         menuShow: true,
          //         levelThree: false,
          //         levelArr: ["17", "17-2"],
          //         plevel: 0
          //       },
          //       {
          //         path: '/office/officeSet/payType',
          //         name: '支出类别',
          //         component: PayType,
          //         meta: {
          //           title: '支出类别'
          //         },
          //         menuShow: true,
          //         levelThree: false,
          //         levelArr: ["17", "17-2"],
          //         plevel: 0
          //       },
          //     ]
          // }, 
          
          {
            path: '/system/systemUser',
            name: '内容管理',
            components: {
              default: contemplate,
            },
            redirect: '/system/systemUser/userList',
            meta: {
              title: '内容管理'
            },
            levelThree: true,
            plevel: 11,
            menuShow: true,
              children: [
                {
                  path: '/order/allInner',
                  name: '全部内容',
                  component: allInner,
                  meta: {
                    title: '全部内容'
                  },
                  menuShow: true,
                  levelThree: false,
                  plevel: 11,
                  levelArr: ["11", "11-1"],
                },
                {
                  path: '/order/allActivity',
                  name: '全部活动',
                  component: allActivity,
                  meta: {
                    title: '全部活动'
                  },
                  menuShow: true,
                  levelThree: false,
                  plevel: 11,
                  levelArr: ["11", "11-1"],
                },
                {
                  path: '/allArticle',
                  component: allArticle,
                  name: '文章列表',
                  meta: {
                    title: '文章列表'
                  },
                  hidden: true
                },
                {
                  path: '/editArticles',
                  component: editArticles,
                  name: '编辑文章',
                  meta: {
                    title: '编辑文章'
                  },
                  hidden: true
                },
                {
                  path: '/addArticle',
                  component: addArticle,
                  name: '新增文章',
                  meta: {
                    title: '新增文章'
                  },
                  hidden: true
                }
              ]
          }, 
          {
            path: '/system/systemDaily',
            name: '系统日志',
            component: systemDaily,
            meta: {
              title: '系统日志'
            },
            leaf: false,
            menuShow: true,
            levelThree: false,
            plevel: 11,
            
          },
        ]
      },
    ]
  },
]


export default routes;
