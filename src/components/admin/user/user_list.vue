<template>
    <div class="grid-container">
        <div class="grid-container" ref="gridContainer">
            <!-- 用户列表 - 搜索框组件 -->
            <data-search
                :keyword-drop="keywordDrop"
                @userListGetByQueryParams="userListGetByQueryParams"
            ></data-search>

            <!-- 用户列表 - 数据表格组件 -->
            <data-grid
                :grid-config="gridConfig"
                @userListGetByQueryPage="getByQueryPage"
                @userListClickToolBar="clickToolBar"
            ></data-grid>

            <!-- 用户列表 - 添加用户 -->
            <Modal
                v-model="models.addUser"
                title="新增用户"
                :mask-closable="false"
                width="640">
                <Form ref="addUser" :model="forms.addUser" :rules="rules" :label-width="100">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="forms.addUser.username" placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="forms.addUser.email" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="forms.addUser.phone" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="forms.addUser.password" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="账号类型">
                        <Select v-model="forms.addUser.type">
                            <Option value="1">测试</Option>
                            <Option value="2">正式</Option>
                        </Select>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="addUserCancel">取消</Button>
                    <Button type="primary" :loading="forms.addUser.loading"  @click="addUserSubmit">确认添加</Button>
                </div>
            </Modal>

            <!-- 用户列表 - 编辑用户 -->
            <Modal
                v-model="models.editUser"
                title="编辑"
                :mask-closable="false"
                width="640">
                <Form ref="editUser" :model="forms.editUser" :rules="rules" :label-width="100">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="forms.editUser.username" placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="forms.editUser.email" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="forms.editUser.phone" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="forms.editUser.password" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="账号类型">
                        <Select v-model="forms.editUser.is_test_user">
                            <Option value="1">测试</Option>
                            <Option value="2">正式</Option>
                        </Select>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="editUserCancel">取消</Button>
                    <Button type="primary" :loading="forms.editUser.loading" @click="editUserSubmit">确认修改</Button>
                </div>
            </Modal>

            <!-- 用户列表 - 充值 -->
            <Modal
                v-model="models.recharge"
                title="充值"
                :mask-closable="false"
                width="320">
                <Form ref="rechage" :model="forms.recharge" :rules="rules">
                    <FormItem  prop="pay">
                        <Input v-model.number="forms.recharge.pay" placeholder="请输入充值金额" >
                             <span slot="append"> 元</span>
                        </Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="rechageCancel">取消</Button>
                    <Button type="primary" :loading="forms.recharge.loading"  @click="rechageSubmit">确认充值</Button>
                </div>
            </Modal>

            <!-- 用户列表 - 修改下线时间 -->
            <Modal
                v-model="models.updateTime"
                title="修改下线时间"
                :mask-closable="false"
                :styles="{overflow: 'visible'}"
                width="320">
                <Form ref="updateTime" :model="forms.updateTime" :rules="rules" :styles="{height: '360px'}">
                    <FormItem label="下线时间" prop="endtime">
                        <DatePicker v-model="forms.updateTime.endtime" :key="forms.updateTime.endtime"  type="datetime" @on-change="forms.updateTime.endtime=$event" placeholder="请输入下线时间" style="width: 200px"></DatePicker>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="updateTimeCancel">取消</Button>
                    <Button type="primary" :loading="forms.updateTime.loading" @click="updateTimeSubmit">确认修改</Button>
                </div>
            </Modal>
        </div>

        <!-- 消费记录列表 -->
        <user-list-consume
            v-if="models.consumeList"
            :user-id="rowIndex.id"
            @dialogClose="dialogClose">
        </user-list-consume>

        <!-- 充值记录列表 -->
        <user-list-recharge
            v-if="models.rechargeList"
            :user-id="rowIndex.id"
            @dialogClose="dialogClose">
        </user-list-recharge>

        <!-- 接口列表 -->
        <user-list-api
            v-if="models.apiList"
            :user-id="rowIndex.id"
            @dialogClose="dialogClose">
        </user-list-api>

        <!--appid列表 -->
        <user-list-appid
            v-if="models.appidList"
            :user-id="rowIndex.id"
            @dialogClose="dialogClose">
        </user-list-appid>

         <!-- 用户列表 - 修改企业定制权限 -->
        <Modal
            v-model="models.customAuth"
            title="企业定制权限"
            :mask-closable="false"
            width="640">
            <div class="ibox">
                素材分类
            </div>
            <CheckboxGroup v-model="forms.customAuth.classChoose">
                <Checkbox :label="item.id" v-for="(item,index) in forms.customAuth.classList" :key="index">{{item.category}}</Checkbox>
            </CheckboxGroup>

            <div  class="ibox">
                功能按钮
            </div>
            <CheckboxGroup v-model="forms.customAuth.btnsChoose">
                <Checkbox :label="item.id" v-for="(item,index) in forms.customAuth.btnsList" :key="index">{{item.button_name}}</Checkbox>
            </CheckboxGroup>
            
            <div slot="footer">
                <Button type="text" @click="customAuthCancel">取消</Button>
                <Button type="primary" :loading="forms.customAuth.loading" @click="customAuthSubmit">确认修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import common from 'assets/js/common';
    import dataSearch from 'components/admin/grid-components/dataSearch';
    import dataGrid from 'components/admin/grid-components/dataGrid';
    import dateUtil from 'iview/src/utils/date';
    
    // 消费记录列表
    import userListConsume from 'components/admin/user/user_list_consume';
    // 充值记录列表
    import userListRecharge from 'components/admin/user/user_list_recharge'; 
    // 接口列表
    import userListApi from 'components/admin/user/user_list_Api'; 
    // appid列表
    import userListAppid from 'components/admin/user/user_list_appid'; 

    export default {
        // components组件
        components: {
            dataSearch,
            dataGrid,
            userListConsume,
            userListRecharge,
            userListApi,
            userListAppid
        },
        // data数据信息
        data () {
            var that = this;
            return {
                rowIndex: "", // 操作的列选项

                // 关键字搜索下拉框
                keywordDrop: {
                    pageName: "userList",
                    first: "username",
                    showDataPicker: false,
                    dataType: "datetimerange",
                    list: [
                        {column: "username",name: "用户名"},
                        {column: "appid",name: "接口ID"},
                        {column: "phone",name: "手机号"},
                    ]
                },
                // 表格table配置
                gridConfig : {
                    pageName: "userList",
                    title: {name: "用户管理",icon: "person-stalker"},
                    interface: common.getApiUrl + "/user/list", 
                    gridPage: "true",
                    columns: [
                        {title: '用户ID',key: 'id',align: 'center',width: 120,},
                        {title: '用户名',key: 'username',align: 'center',width: 120},
                        {title: '手机号',key: 'phone',align: 'center',width: 160},
                        {title: '邮箱',key: 'email',align: 'center',width: 160},
                        // {title: '注册方式',key: '',align: 'center',width: 120},
                        {title: '注册时间',key: 'created_at',align: 'center',width: 160},
                        {title: '下线时间',key: 'endtime',align: 'center',width: 160},
                        {title: '最后登录时间',key: 'updated_at',align: 'center',width: 160},
                        {title: '账户余额',key: 'balance',align: 'center',width: 120,render: (h,params) => {
                            return params.row.balance ? params.row.balance / 100 + "元" : "0";
                        }},
                        {title: '操作',key: 'op',align: 'center', width: 650,render: (h,params) => {
                            var ops = params.row.op;
                            var btngroups = [];
                            for(var j = 0,len = ops.length; j < len; j++) {
                                var btn =  h('Button', {
                                    props: {type: 'text',size: 'small'},
                                    style: {marginRight: '5px'},
                                    on: {
                                        click: (event) => {
                                            this.clickCell(event,params.row);
                                        }
                                    }
                                }, ops[j].opName);
                                btngroups.push(btn);
                            }
                                return h('div',btngroups);
                            }
                        }
                    ],
                    data: [],
                    height: "",
                    loading: false,
                    btnGroups: [
                        {act: "add", name: "新增用户",type: "info",icon: "person-add"},
                    ],
                    queryParams: {},
                    pageParams: {},
                },
                // models弹框
                models: {
                    consumeList : false, // 用户管理 - 消费记录
                    rechargeList : false, // 用户管理 - 充值列表
                    apiList : false, // 用户管理 - 接口列表
                    appidList : false, // 用户管理 - appid列表
                    addUser : false, // 用户管理 - 添加
                    editUser : false, // 用户管理 - 编辑
                    recharge : false, // 用户管理 - 充值
                    updateTime : false, // 用户管理 - 修改下线时间
                    customAuth : false, // 用户管理 - 修改企业定制权限
                    
                },
                // 匹配规则
                rules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    pay: [
                        {required: true, type: "number", message: '充值金额不能为空且必须为数字', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '充值金额不能为空', trigger: 'blur'},
                    ],
                },
                // form表单提交相关
                forms: {
                    addUser: {
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                        type: '1',
                        loading: false,
                    },
                    editUser: {
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                        loading: false,
                        is_test_user: ""
                    },
                    recharge: {
                        pay: "",
                        loading: false,
                        uid: "",
                    },
                    updateTime: {
                        uid: "",
                        loading: false,
                        endtime : "",
                    },
                    customAuth: {
                        loading: false,
                        classList: [],
                        btnsList: [],
                        classChoose: [],
                        btnsChoose: [],
                    }
                }
            };
        },
        
        methods: {
            // +***************************用户列表相关事件****************************+
            userListGetByQueryParams (queryParams) {
                this.gridConfig.queryParams = queryParams;
                this.getListData();
            },
            getByQueryPage (pageParams) {
                this.gridConfig.pageParams = pageParams;
                this.getListData();
            },
            clickToolBar (item) {
                var act = item.act;
                if(act == "add") {
                    this.$refs.addUser.resetFields();
                    this.models.addUser = true;
                    this.forms.addUser.loading = false;
                }
            },
            clickCell (event,rowindex) { 
                var act = event.currentTarget.innerText;
                this.rowIndex = rowindex;
                this.userId = rowindex.id;
                if(act == "编辑") {
                    this.$refs.editUser.resetFields();
                    this.models.editUser = true; 
                    this.forms.editUser.username = this.rowIndex.username;
                    this.forms.editUser.email = this.rowIndex.email;
                    this.forms.editUser.phone = this.rowIndex.phone;
                    this.forms.editUser.password = this.rowIndex.password;
                    this.forms.editUser.is_test_user = this.rowIndex.is_test_user.toString();
                    this.forms.editUser.loading = false;
                }
                if(act == "充值") {
                    this.$refs.rechage.resetFields();
                    this.models.recharge = true;
                    this.forms.recharge.uid =  this.rowIndex.id;
                    this.forms.recharge.loading =  false;
                }
                if(act == "删除") {
                   var model =  this.$Modal.confirm({
                        title: "确认提示",
                        content: "您确定要删除此条数据吗",
                        loading: true,
                        closable: true,
                        width: "340px",
                        closable: true,
                        onOk:() => {
                            var parameter = {};
                            parameter.id = this.rowIndex.id;
                            common.requestInterface({
                                "url": common.getApiUrl + "/user/delete", 
                                "parameter": parameter, 
                                "successFun": (backData) => {
                                    if(backData.status == 1) {
                                        this.$Message.success("操作成功");
                                        this.$Modal.remove(model);
                                        this.getListData();
                                    }else {
                                        this.$Message.error(backData.err);
                                        this.$Modal.remove(model);
                                    }
                                }
                            });               
                        },
                    });
                };
                if(act == "修改下线时间") {
                    this.$refs.updateTime.resetFields();
                    this.models.updateTime = true;
                    this.forms.updateTime.uid =  this.rowIndex.id;
                    this.forms.updateTime.endtime = this.rowIndex.endtime;
                    this.forms.updateTime.loading =  false;
                }
                if(act == "消费记录") {
                    this.models.consumeList = true;
                }
                if(act == "充值记录") {
                    this.models.rechargeList = true;
                }
                if(act == "接口列表") {
                    this.models.apiList = true;
                }
                if(act == "appid查看") {
                    this.models.appidList = true;
                }
                if(act == "生成appid") {
                   var model =  this.$Modal.confirm({
                        title: "确认提示",
                        content: "您确定要为该用户生成appId吗",
                        loading: true,
                        closable: true,
                        width: "340px",
                        closable: true,
                        onOk:() => {
                            var parameter = {};
                            parameter.user_id = this.rowIndex.id;
                            common.requestInterface({
                                "url": common.getApiUrl + "/user/client/add", 
                                "parameter": parameter, 
                                "successFun": (backData) => {
                                    if(backData.status == 1) {
                                        this.$Message.success("操作成功");
                                        this.$Modal.remove(model);
                                        this.getListData();
                                    }else {
                                        this.$Message.error(backData.err);
                                        this.$Modal.remove(model);
                                    }
                                }
                            });               
                        },
                    });
                };

                if(act == "企业定制权限") {
                    this.models.customAuth = true;
                    this.forms.customAuth.loading = false;
                    this.forms.customAuth.classChoose = [];
                    this.forms.customAuth.btnsChoose = [];
                    var that = this;

                    this.rowIndex.source_category_ids.split(",").forEach(function(value,index) {
                        that.forms.customAuth.classChoose.push(value * 1)
                    });
                    this.rowIndex.custom_button_ids.split(",").forEach(function(value,index) {
                        that.forms.customAuth.btnsChoose.push(value * 1);
                    });
                };
            },
            addUserSubmit () {
                this.$refs.addUser.validate((valid) => {
                    if (valid) {
                        this.forms.addUser.loading = true;
						var parameter = {};
						parameter.username = this.forms.addUser.username;
						parameter.password = this.forms.addUser.password;
						parameter.phone = this.forms.addUser.phone;
						parameter.email = this.forms.addUser.email;
						parameter.type = this.forms.addUser.type;
						common.requestInterface({
							"url": common.getApiUrl + "/user/add", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success("添加成功！");
                                    this.models.addUser = false;
                                    this.forms.addUser.loading = false;
                                    this.getListData();
								}else {
                                    this.$Message.error(backData.err);
                                   this.forms.addUser.loading = false;
								}
							}
						});
					} 
                })
            },
            addUserCancel () {
                this.models.addUser = false;
            },
            editUserSubmit () {
                this.$refs.editUser.validate((valid) => {
                    if (valid) {
                        this.forms.editUser.loading = true;
						var parameter = {};
						parameter.username = this.forms.editUser.username;
						parameter.password = this.forms.editUser.password;
						parameter.phone = this.forms.editUser.phone;
						parameter.email = this.forms.editUser.email;
                        parameter.type = this.forms.editUser.is_test_user;
                        parameter.id = this.rowIndex.id;
						common.requestInterface({
							"url": common.getApiUrl + "/user/edit", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success("修改成功！");
                                    this.models.editUser = false;
								}else {
                                    this.$Message.error(backData.err);
                                   this.forms.editUser.loading = false;
								}
							}
						});
					} 
                })
            },
            editUserCancel () {
                this.models.editUser = false;
            },
            rechageSubmit () {
                if(this.forms.recharge.pay && this.forms.recharge.pay * 1 < 0) {
                    this.$Message.error("充值金额不能为负数！");
                    return false;
                }
                this.$refs.rechage.validate((valid) => {
                    if (valid) {
                        this.forms.recharge.loading = true;
						var parameter = {};
						parameter.pay = this.forms.recharge.pay;
						parameter.user_id = this.forms.recharge.uid;
						common.requestInterface({
							"url": common.getApiUrl + "/payment/add", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success("充值成功！");
                                    this.models.recharge = false;
                                    this.getListData();
								}else {
                                    this.$Message.error(backData.err);
                                    this.forms.recharge.loading = false;
								}
							}
						});
					} 
                })
            },
            rechageCancel () {
                this.models.recharge = false;
            },
            updateTimeSubmit () {
                this.$refs.updateTime.validate((valid) => {
                    if (valid) {
                        this.forms.updateTime.loading = true;
						var parameter = {};
						parameter.user_id = this.forms.updateTime.uid;
						parameter.endtime = dateUtil.format(this.forms.updateTime.endtime, 'yyyy-MM-dd HH:mm:ss');
						common.requestInterface({
							"url": common.getApiUrl + "/user/update/endtime", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success("修改成功！");
                                    this.models.updateTime = false;
                                    this.getListData();
								}else {
                                    this.$Message.error(backData.err);
                                    this.forms.updateTime.loading = false;
								}
							}
						});
					} 
                })
            },
            updateTimeCancel () {
                this.models.updateTime = false;
            },
            customAuthSubmit () {
                this.forms.customAuth.loading = true;
                var parameter = {};
                parameter.user_id = this.rowIndex.id;
                parameter.category_id =  this.forms.customAuth.classChoose.join(",");
                parameter.button_id = this.forms.customAuth.btnsChoose.join(",");

                common.requestInterface({
                    "url": common.getApiUrl + "/user/custom/update", 
                    "parameter": parameter, 
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            this.$Message.success("修改成功！");
                            this.models.customAuth = false;
                           
                            this.getListData();
                        }else {
                            this.$Message.error(backData.err);
                            this.forms.customAuth.loading = false;
                        }
                    }
                });

            },
            customAuthCancel () {
                this.models.customAuth = false;
            },
            getCustomClass () {
                var that = this;
                common.requestInterface({
                    "url": common.getApiUrl + "/user/category/list", 
                    "type": "post",
                    "parameter": {}, 
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            this.forms.customAuth.classList = backData.data;
                        }
                    }
                });

                common.requestInterface({
                    "url": common.getApiUrl + "/user/custom/list", 
                    "type": "post",
                    "parameter": {}, 
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            this.forms.customAuth.btnsList = backData.data;
                        }
                    }
                });
            },
            getListData () {
                var that = this;
                that.gridConfig.loading = true;
                var parameter = {};
                parameter.column = this.gridConfig.queryParams.column ? this.gridConfig.queryParams.column  : "";
                parameter.keyword = this.gridConfig.queryParams.keyword ? this.gridConfig.queryParams.keyword : "";
                parameter.start_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[0] : "";
                parameter.end_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[1] : "";
                parameter.page = this.gridConfig.pageParams.page ? this.gridConfig.pageParams.page : "1";
                parameter.pageSize = this.gridConfig.pageParams.pagesize ? this.gridConfig.pageParams.pagesize : "10";
                common.requestInterface({
                    "url": that.gridConfig.interface, 
                    "type": "get",
                    "parameter": parameter, 
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            that.gridConfig.data = backData.data.data;
                            that.gridConfig.total = backData.data.total;
                            this.gridConfig.loading = false;
                        }else {
                            this.$Message.error(backData.err);
                            this.gridConfig.loading = false;
                        }
                    }
                });
            },
            dialogClose (dialogName) {
                this.models[dialogName] = false;
            },
            // +***************************初始化****************************+
            init () {
                this.gridConfig.height = this.$refs.gridContainer.offsetHeight -  140;
                var that = this;
                window.onresize = function(){
                    that.gridConfig.height = that.$refs.gridContainer.offsetHeight -  140;
                }
                this.getListData();
                this.getCustomClass();
            }
        },
        mounted() {
            this.init();
        },
    };
</script>

<style lang="scss">
    @import "../../../assets/css/gridpage.scss";

    .ibox {
        border-bottom: 1px solid #e9e9e9;
        padding:6px 0 6px 0;
        margin:6px 0 6px 0;
        margin-top: 25px;

        &:nth-child(1) {
            margin-top: 0;
        }
    }
</style>
