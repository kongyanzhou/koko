<template>
    <div class="grid-container" ref="gridContainer">
        
        <!-- 接口列表 - 搜索框组件 -->
        <data-search
            :keyword-drop="keywordDrop"
            @apiListGetByQueryParams="getByQueryParams"
        ></data-search>

        <!-- 接口列表 - 数据表格组件 -->
        <data-grid
            :grid-config="gridConfig"
            @apiListGetByQueryPage="getByQueryPage"
            @apiListClickToolBar="clickToolBar"
        ></data-grid>

        <!-- 接口列表 - 新增接口 -->
        <Modal
            v-model="models.addApi"
            title="添加接口"
            :mask-closable="false"
            width="640">
            <Form ref="addApi" :model="forms.addApi" :rules="rules" :label-width="100">
                <FormItem label="接口名" prop="apiname">
                    <Input v-model="forms.addApi.apiname" placeholder="请输入接口名"></Input>
                </FormItem>
                <FormItem label="接口地址" prop="apiurl">
                    <Input v-model="forms.addApi.apiurl" placeholder="请输入接口地址"></Input>
                </FormItem>
                <FormItem label="接口定价" prop="apiprice">
                    <Input v-model="forms.addApi.apiprice" placeholder="请输入接口定价（10-1000正整数）"></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="text" @click="addApiCancel">取消</Button>
                <Button type="primary" :loading="forms.addApi.loading"  @click="addApiSubmit">确认添加</Button>
            </div>
        </Modal>

        <!-- 接口列表 - 编辑接口 -->
        <Modal
            v-model="models.editApi"
            title="编辑接口"
            :mask-closable="false"
            width="640">
            <Form ref="editApi" :model="forms.editApi" :rules="rules" :label-width="100">
                <FormItem label="接口名" prop="apiname">
                    <Input v-model="forms.editApi.apiname" placeholder="请输入接口名"></Input>
                </FormItem>
                <FormItem label="接口地址" prop="apiurl">
                    <Input v-model="forms.editApi.apiurl" placeholder="请输入接口地址"></Input>
                </FormItem>
                <FormItem label="接口定价" prop="apiprice">
                    <Input v-model="forms.editApi.apiprice" placeholder="请输入接口定价（10-1000正整数）"></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="text" @click="editApiCancel">取消</Button>
                <Button type="primary" :loading="forms.editApi.loading"  @click="editApiSubmit">确认修改</Button>
            </div>
        </Modal>
    </div>
    
</template>
<script>

    import common from 'assets/js/common';
    import dataSearch from 'components/admin/grid-components/dataSearch';
    import dataGrid from 'components/admin/grid-components/dataGrid';

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
                rowIndex: "", // 操作的列选项
                keywordDrop: {
                    pageName: "apiList",
                    first: "apiname",
                    showDataPicker: false,
                    list: [
                        {column: "apiname",name: "接口名"},
                        {column: "appid",name: "接口ID"},
                    ]
                },
                // 表格table配置
                gridConfig : {
                    pageName: "apiList",
                    title: {name: "接口管理",icon: "social-buffer"},
                    interface: common.getApiUrl + "/api/list", 
                    gridPage: "true",
                    columns: [
                        {title: '接口ID',key: 'id',align: 'center'},
                        {title: '接口名',key: 'alias',align: 'center'},
                        {title: '接口定价（分）',key: 'default_price',align: 'center'},
                        {title: '接口地址',key: 'path',align: 'center'},
                        {title: '操作',key: 'op',align: 'center',render: (h,params) => {
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
                        {act: "add", name: "添加接口",type: "info",icon: "android-add-circle"},
                    ],
                    queryParams: {},
                    pageParams: {},
                },
                // models弹框
                models: {
                    addApi : false, // 用户管理 - 添加
                    editApi : false, // 用户管理 - 编辑
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
                    addApi: {
                        apiname: '',
                        apiurl: '',
                        apiprice: '',
                        loading: false
                    },
                    editApi: {
                        apiname: '',
                        apiurl: '',
                        apiprice: '',
                        loading: false
                    },
                }
            };
        },
        methods: {
            // +***************************用户列表相关事件****************************+
            getByQueryParams (queryParams) {
                this.gridConfig.queryParams = queryParams;
                this.getApiListData();
            },
            getByQueryPage (pageParams) {
                this.gridConfig.pageParams = pageParams;
                this.getApiListData();
            },
            clickToolBar (item) {
                var act = item.act;
                if(act == "add") {
                    this.$refs.addApi.resetFields();
                    this.models.addApi = true;
                    this.forms.addApi.loading = false;
                    
                }
            },
            clickCell (event,rowindex) { 
                var act = event.currentTarget.innerText;
                this.rowIndex = rowindex;

                if(act == "编辑接口") {
                    this.$refs.editApi.resetFields();
                    this.forms.editApi.apiname = this.rowIndex.alias;
                    this.forms.editApi.apiurl = this.rowIndex.path;
                    this.forms.editApi.apiprice = this.rowIndex.default_price.toString();
                    this.models.editApi = true;
                    this.forms.editApi.loading = false;
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
            addApiCancel () {
                this.models.addApi = false;
            },
            addApiSubmit () {
                this.$refs.addApi.validate((valid) => {
                    if (valid) {
                        this.forms.addApi.loading = true;
						var parameter = {};
						parameter.name = this.forms.addApi.apiname;
						parameter.api_path = this.forms.addApi.apiurl;
                        parameter.default_price = this.forms.addApi.apiprice;
						common.requestInterface({
							"url": common.getApiUrl + "/api/add", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success(backData.err);
                                    this.models.addApi = false;
                                    this.forms.addApi.loading = false;
                                    this.getApiListData();
								}else {
                                    this.$Message.error(backData.err);
                                   this.forms.addApi.loading = false;
								}
							}
						});
					} 
                })
            },
            editApiCancel () {
                this.models.editApi = false;
            },
            editApiSubmit () {
                this.$refs.editApi.validate((valid) => {
                    if (valid) {
                        this.forms.editApi.loading = true;
						var parameter = {};
						parameter.id = this.rowIndex.id;
						parameter.name = this.forms.editApi.apiname;
						parameter.api_path = this.forms.editApi.apiurl;
                        parameter.default_price = this.forms.editApi.apiprice;
                        
						common.requestInterface({
							"url": common.getApiUrl + "/api/edit", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success(backData.err);
                                    this.models.editApi = false;
                                    this.forms.editApi.loading = false;
                                    this.getApiListData();
								}else {
                                    this.$Message.error(backData.err);
                                   this.forms.editApi.loading = false;
								}
							}
						});
					} 
                })
            },
            getApiListData () {
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

            init () {
                this.gridConfig.height = this.$refs.gridContainer.offsetHeight -  140;
                var that = this;
                window.onresize = function(){
                    that.gridConfig.height = that.$refs.gridContainer.offsetHeight -  140;
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

    .newPage {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(55,55,55,.6);
        z-index: 11111;
            padding: 60px;

        .inner {
            width: 100%;
            height: 100%;
            background: #fff;
        }
    }
    
    .grid-container {
        width: 100%;
        height: 100%;
    }
    .ivu-modal-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
    // reset弹框表格
    .ivu-modal-wrap {
        width: 100%;
        height: 100%;
    }

    .ivu-modal {
        max-height: 100%;
        overflow: auto;
    }

    .ivu-modal-confirm-body {
        font-size: 14px;
    }

    .modelTableList {
        .ivu-modal-footer {
            display: none;
        }
    }
</style>
