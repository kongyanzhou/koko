<template>
  <div 
    class="dialog"
    
      transition="dialog-fade">
      <div class="dialog-content" ref="gridContainer">
        <data-search
            :keyword-drop="keywordDrop.apiList"
            @apiListGetByQueryParams="apiListGetByQueryParams"
        ></data-search>

        <!-- 接口列表 - 数据表格组件 -->
        <data-grid
            :grid-config="gridConfig.apiList"
            @apiListGetByQueryPage="apiListGetByQueryPage"
            @apiListClickToolBar="apiListClickToolBar"
        ></data-grid>


        <!-- 接口列表 - 新增接口 -->
        <Modal
                v-model="models.apiList.addApiModel"
                title="添加接口"
                width="640">
                <Form ref="apiListAddApiForm" :model="forms.apiList.addApiForm" :rules="rules" :label-width="100">
                    <FormItem label="接口名" prop="apiname">
                        <Input v-model="forms.apiList.addApiForm.apiname" placeholder="请输入接口名"></Input>
                    </FormItem>
                    <FormItem label="接口地址" prop="apiurl">
                        <Input v-model="forms.apiList.addApiForm.apiurl" placeholder="请输入接口地址"></Input>
                    </FormItem>
                    <FormItem label="接口定价" prop="apiprice">
                        <Input v-model="forms.apiList.addApiForm.apiprice" placeholder="请输入接口定价（10-1000正整数）"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="apiListAddApiCancel">取消</Button>
                    <Button type="primary" :loading="forms.apiList.addApiForm.loading"  @click="apiListAddApiSubmit">确认添加</Button>
                </div>
            </Modal>

            <!-- 接口列表 - 编辑接口 -->
            <Modal
                v-model="models.apiList.editApiModel"
                title="添加接口"
                width="640">
                <Form ref="apiListEditApiForm" :model="forms.apiList.editApiForm" :rules="rules" :label-width="100">
                    <FormItem label="接口名" prop="alias">
                        <Input v-model="forms.apiList.editApiForm.alias" placeholder="请输入接口名"></Input>
                    </FormItem>
                    <FormItem label="接口地址" prop="api_path">
                        <Input v-model="forms.apiList.editApiForm.api_path" placeholder="请输入接口地址"></Input>
                    </FormItem>
                    <FormItem label="接口定价" prop="default_price">
                        <Input v-model="forms.apiList.editApiForm.default_price" placeholder="请输入接口定价（10-1000正整数）"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="apiListEditApiCancel">取消</Button>
                    <Button type="primary" :loading="forms.apiList.editApiForm.loading"  @click="apiListEditApiSubmit">确认添加</Button>
                </div>
            </Modal>




      </div>
  </div>
    
</template>
<script>
import common from "assets/js/common";
import dataSearch from "components/admin/grid-components/dataSearch";
import dataGrid from "components/admin/grid-components/dataGrid";

export default {
        // components组件
        components: {
            dataSearch,
            dataGrid,
        },
        // data数据信息
        data () {
            return {
                // 关键字搜索下拉框
                keywordDrop: {
                    apiList: {
                        pageName: "apiList",
                        first: "apiname",
                        showDataPicker: false,
                        list: [
                            {column: "apiname",name: "接口名"},
                            {column: "appid",name: "接口ID"},
                        ]
                    },
                },
                // 表格table配置
                gridConfig : {
                    apiList: {
                        pageName: "apiList",
                        title: {name: "接口管理",icon: "social-buffer"},
                        interface: common.getApiUrl + "/api/list", 
                        gridPage: "true",
                        columns: [
                            {title: '接口ID',key: 'id',align: 'center'},
                            {title: '接口名',key: 'alias',align: 'center'},
                            {title: '操作',key: 'op',align: 'center',render: (h,params) => {
                                var ops = params.row.op;
                                var btngroups = [];
                                for(var j = 0,len = ops.length; j < len; j++) {
                                    var btn =  h('Button', {
                                        props: {type: 'text',size: 'small'},
                                        style: {marginRight: '5px'},
                                        on: {
                                            click: (event) => {
                                                this.apiListClickCell(event,params.row);
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
                            {act: "add", name: "添加接口",type: "info",icon: "android-add-circle"},
                        ],
                        queryParams: {},
                        pageParams: {},
                    },
                },
                // models弹框
                models: {
                    apiList: {
                        addApiModel : false, // 用户管理 - 添加
                        editApiModel : false, // 用户管理 - 编辑
                        editPriceModel : false, // 用户管理 - 编辑价格
                    },
                },
                // 匹配规则
                rules: {
                    apiname: [
                        {required: true, message: '接口名不能为空', trigger: 'blur'}
                    ],
                    apiurl: [
                        {required: true, message: '接口地址不能为空', trigger: 'blur'},
                        {type: 'url', message: 'url链接地址格式不正确', trigger: 'blur'}
                    ],
                    apiprice: [
                        {required: true, message: '接口定价不能为空', trigger: 'blur'},
                    ],
                },
                // form表单提交相关
                forms: {
                    rowIndex: "",
                    apiList: {
                        addApiForm: {
                            apiname: '',
                            apiurl: '',
                            apiprice: '',
                            loading: false
                        },
                        editApiForm: {
                            alias: '',
                            api_path: '',
                            default_price: '',
                            loading: false
                        },
                    },
                }
            };
        },
        methods: {
            // +***************************用户列表相关事件****************************+
            apiListGetByQueryParams (queryParams) {
                this.gridConfig.apiList.queryParams = queryParams;
                this.getApiListData();
            },
            apiListGetByQueryPage (pageParams) {
                this.gridConfig.apiList.pageParams = pageParams;
                this.getApiListData();
            },
            apiListClickToolBar (item) {
                var act = item.act;
                if(act == "add") {
                    this.$refs.apiListAddApiForm.resetFields();
                    this.models.apiList.addApiModel = true;
                    this.forms.apiList.addApiForm.loading = false;
                    
                }
            },
            apiListClickCell (event,rowindex) { 
                var act = event.currentTarget.innerText;
                this.forms.rowIndex = rowindex;
                if(act == "编辑接口") {
                    this.models.apiList.editApiModel = true; 
                    this.forms.apiList.editApiForm = rowindex;
                    this.forms.apiList.editApiForm.loading = false;
                }
                if(act == "删除") {
                   var model =  this.$Modal.confirm({
                        title: "确认提示",
                        content: "您确定要删除该接口数据吗",
                        loading: true,
                        closable: true,
                        width: "340px",
                        closable: true,
                        onOk:() => {
                            var parameter = {};
                            parameter.id = this.forms.rowIndex.id;
                            common.requestInterface({
                                "url": common.getApiUrl + "/api/delete", 
                                "parameter": parameter, 
                                "successFun": (backData) => {
                                    if(backData.status == 1) {
                                        this.$Message.success("操作成功");
                                        this.$Modal.remove(model);
                                        this.getApiListData();
                                    }else {
                                        this.$Message.error(backData.err);
                                        this.$Modal.remove(model);
                                    }
                                }
                            });               
                        },
                    });
                };
            },
            apiListAddApiCancel () {
                this.models.apiList.addApiModel = false;
            },
            apiListAddApiSubmit () {
                this.$refs.apiListAddApiForm.validate((valid) => {
                    if (valid) {
                        this.forms.apiList.addApiForm.loading = true;
						var parameter = {};
						parameter.name = this.forms.apiList.addApiForm.apiname;
						parameter.api_path = this.forms.apiList.addApiForm.apiurl;
						parameter.default_price = this.forms.apiList.addApiForm.apiprice;
						common.requestInterface({
							"url": common.getApiUrl + "/api/add", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success(backData.err);
                                    this.models.apiList.addApiModel = false;
                                    this.forms.apiList.addApiForm.loading = false;
                                    this.getApiListData();
								}else {
                                    this.$Message.error(backData.err);
                                   this.forms.apiList.addApiForm.loading = false;
								}
							}
						});
					} 
                })
            },
            apiListEditApiCancel () {
                this.models.apiList.editApiModel = false;
            },
            apiListEditApiSubmit () {
                this.$refs.apiListEditApiForm.validate((valid) => {
                    if (valid) {
                        this.forms.apiList.EditApiForm.loading = true;
						var parameter = {};
						parameter.id = this.forms.rowIndex.id;
						parameter.name = this.forms.apiList.EditApiForm.apiname;
						parameter.api_path = this.forms.apiList.EditApiForm.apiurl;
						parameter.default_price = this.forms.apiList.EditApiForm.apiprice;
						common.requestInterface({
							"url": common.getApiUrl + "/api/edit", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success(backData.err);
                                    this.models.apiList.editApiModel = false;
                                    this.forms.apiList.editApiForm.loading = false;
                                    this.getApiListData();
								}else {
                                    this.$Message.error(backData.err);
                                   this.forms.apiList.editApiForm.loading = false;
								}
							}
						});
					} 
                })
            },
            getApiListData () {
                var that = this;
                that.gridConfig.apiList.loading = true;
                var parameter = {};
                parameter.column = this.gridConfig.apiList.queryParams.column ? this.gridConfig.apiList.queryParams.column  : "";
                parameter.keyword = this.gridConfig.apiList.queryParams.keyword ? this.gridConfig.apiList.queryParams.keyword : "";
                parameter.start_time = this.gridConfig.apiList.queryParams.dateTime ? this.gridConfig.apiList.queryParams.dateTime[0] : "";
                parameter.end_time = this.gridConfig.apiList.queryParams.dateTime ? this.gridConfig.apiList.queryParams.dateTime[1] : "";
                parameter.page = this.gridConfig.apiList.pageParams.page ? this.gridConfig.apiList.pageParams.page : "1";
                parameter.pageSize = this.gridConfig.apiList.pageParams.pagesize ? this.gridConfig.apiList.pageParams.pagesize : "10";
                common.requestInterface({
                    "url": that.gridConfig.apiList.interface, 
                    "type": "get",
                    "parameter": parameter, 
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            that.gridConfig.apiList.data = backData.data.data;
                            that.gridConfig.apiList.total = backData.data.total;
                            this.gridConfig.apiList.loading = false;
                        }else {
                            this.$Message.error(backData.err);
                            this.gridConfig.apiList.loading = false;
                        }
                    }
                });
            },

            init () {
                this.gridConfig.apiList.height = this.$refs.gridContainer.offsetHeight -  160;
                var that = this;
                window.onresize = function(){
                    that.gridConfig.apiList.height = that.$refs.gridContainer.offsetHeight -  160;
                }
                this.getApiListData();
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style lang="scss">
.dialog {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background-color: rgba(55, 55, 55, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  height: 90%;
}

.dialog-fade-transition {
  transition: opacity 0.3s linear;
}

.dialog-fade-enter,
.dialog-fade-leave {
  opacity: 0;
}
</style>
