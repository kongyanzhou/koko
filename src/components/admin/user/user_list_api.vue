<template>
    <div 
        class="dialog"
        transition="dialog-fade">
        <div class="dialog-content" ref="gridContainer">
            <div class="dialog-close" @click.stop="dialogClose"><Icon type="ios-close-empty" ></Icon></div>

            <data-search
                :keyword-drop="gridSearch"
                @consumeListGetByQueryParams="getByQueryParams"
            ></data-search>
            
            <data-grid
                :grid-config="gridConfig"
                @apiListClickToolBar="clickToolBar"
            ></data-grid>

            <!-- 用户列表 - 接口列表 - 添加接口 -->
            <Modal
                v-model="models.addApi"
                title=" "
                :mask-closable="false"
                width="85%">
                <data-grid
                    :grid-config="gridConfig_addApi"
                    @addApiGetSelections="getSelections"
                ></data-grid>
                <div slot="footer">
                    <Button type="text" @click="addApiCancel">取消</Button>
                    <Button type="primary" :loading="forms.addApi.loading"  @click="addApiSubmit">确认添加</Button>
                </div>
            </Modal>

             <!-- 用户列表 - 接口列表 - 编辑价格 -->
            <Modal
                v-model="models.editPrice"
                title="编辑价格"
                :mask-closable="false"
                width="360">
                <Form ref="editPrice" :model="forms.editPrice" :rules="rules" >
                    <FormItem prop="price">
                        <Input v-model="forms.editPrice.price" placeholder="百分比价格范围为50-100" type="number">
                            <span slot="prepend">{{rowIndex.default_price}} R币 * </span>
                            <span slot="append"> % </span>
                        </Input> 
                        
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="editPriceCancel">取消</Button>
                    <Button type="primary" :loading="forms.editPrice.loading"  @click="editPriceSubmit">确认修改</Button>
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
        props: {
            userId: [String,Number],
        },
        // data数据信息
        data () {
            var that = this;
            return {
                dialogName: "apiList",
                rowIndex: "", // 操作的列选项
                
                // 搜索组件配置
                gridSearch: {
                    pageName: "apiList",
                    showDataPicker: false,
                    dataType: "daterange",
                    list: [],
                },
                // 表格组件配置
                gridConfig: {
                    pageName: "apiList",
                    title: {name: "用户管理 - 接口列表",icon: "social-buffer"},
                    interface: common.getApiUrl + "/user/api/price/list", 
                    take: "0",
                    gridPage: false,
                    columns: [
                        {title: '接口ID',key: 'api_id',align: 'center'},
                        {title: '接口名',key: 'alias',align: 'center'},
                        {title: '接口定价（分）',key: 'default_price',align: 'center'},
                        {title: '接口价格（分）',key: 'api_price',align: 'center'},
                        {title: '操作',key: 'op',align: 'center', width: 400,render: (h,params) => {
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
                        {act: "addApi", name: "添加接口",type: "info",icon: "android-add-circle"},
                    ],
                    queryParams: {},
                    pageParams: {},
                },
                // 添加接口表格配置
                gridConfig_addApi: {
                    pageName: "addApi",
                    title: {name: "用户管理 - 接口列表 - 添加接口",icon: "social-buffer"},
                    interface: common.getApiUrl + "/user/api/no", 
                    take: "0",
                    gridPage: false,
                    columns: [
                        {type: 'selection',width: 60,align: 'center'},
                        {title: '接口ID',key: 'id',align: 'center'},
                        {title: '接口名',key: 'alias',align: 'center'},
                        {title: '价格',key: 'default_price',align: 'center'},
                    ],
                    data: [],
                    height: "",
                    loading: false,
                    queryParams: {},
                    pageParams: {},
                },
                // models弹框
                models: {
                   addApi: false, // 添加接口
                   editPrice: false, // 添加接口
                },
                // 匹配规则
                rules: {
                     price: [
                        {required: true, message: '输入项不能为空', trigger: 'blur'},
                    ],
                },
                // 表单
                forms: {
                    addApi: {
                        loading: false,
                        selections: "",
                    },
                    editPrice: {
                        price: "",
                        loading: false,
                    },
                }
            };
        },
        methods: {
            // +***************************用户列表事件****************************+
            getByQueryParams (queryParams) {
                this.gridConfig.queryParams = queryParams;
                this.getListData();
            },
            getByQueryPage (pageParams) {
                this.gridConfig.pageParams = pageParams;
                this.getListData();
            },
            dialogClose () {
                this.$emit("dialogClose",this.dialogName);
            },
            clickToolBar (item) {
                var act = item.act;
                if(act == "addApi") {
                    this.models.addApi = true;
                    this.forms.addApi.selections = "";
                    this.forms.addApi.loading = false;
                    this.getApiAddListData();
                }
            },
            clickCell (event,rowindex) { 
                var act = event.currentTarget.innerText;
                this.rowIndex = rowindex;

                if(act == "编辑价格") {
                    this.$refs.editPrice.resetFields();
                    this.models.editPrice = true; 
                    this.forms.editPrice.price = "";
                    this.forms.editPrice.loading = false;
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
                            parameter.user_id = this.userId;
						    parameter.id = this.rowIndex.api_id;
                            common.requestInterface({
                                "url": common.getApiUrl + "/user/api/del", 
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
            },
            editPriceCancel() {
                this.models.editPrice = false;
            },
            editPriceSubmit () {
                this.$refs.editPrice.validate((valid) => {
                    if (valid) {
                        this.forms.editPrice.loading = true;
						var parameter = {};
						parameter.price = this.forms.editPrice.price;
						parameter.user_id = this.userId;
						parameter.api_id = this.rowIndex.api_id;
						common.requestInterface({
							"url": common.getApiUrl + "/user/api/set/price", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success("修改成功！");
                                    this.models.editPrice = false;
                                    this.getListData();
								}else {
                                    this.$Message.error(backData.err);
                                    this.forms.editPrice.loading = false;
								}
							}
						});
					} 
                })
            },
            getListData () {
                var that = this;
                that.gridConfig.loading = true;
                var parameter = {};
                parameter.user_id = this.userId;
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
                            that.gridConfig.data = backData.data;
                            this.gridConfig.loading = false;
                        }else {
                            this.$Message.error(backData.err);
                            this.gridConfig.loading = false;
                        }
                    }
                });
            },

            // +***************************添加接口事件****************************+
            
            // 添加接口取消操作
            addApiCancel () {
                this.models.addApi = false;
            },
            // 添加接口确认操作
            addApiSubmit () {
                this.forms.addApi.loading = true;
                var selections = []; // 已选复选框
                for(var i = 0, len = this.forms.addApi.selections.length; i < len; i++) {
                    selections.push(this.forms.addApi.selections[i].id);
                }
                if(selections.length <= 0) {
                    this.$Message.error("请选择需要添加的接口项");
                    this.forms.addApi.loading = false;
                    return false;
                }
                var parameter = {};
                parameter.appid = selections.join(",");
                parameter.user_id = this.userId;
                common.requestInterface({
                    "url": common.getApiUrl + "/user/api/add", 
                    "parameter": parameter, 
                    "type": "get",
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            this.$Message.success("添加成功！");
                            this.models.addApi = false;
                            this.getListData();
                        }else {
                            this.$Message.error(backData.err);
                            this.forms.addApi.loading = false;
                        }
                    }
                });
            },
            // 获取复选框选择项
            getSelections (selections) {
                this.forms.addApi.selections = selections;
            },

            
            // 获取添加接口列表
            getApiAddListData () {
                var that = this;
                that.gridConfig_addApi.loading = true;
                var parameter = {};
                parameter.user_id = this.userId;
                common.requestInterface({
                    "url": that.gridConfig_addApi.interface, 
                    "type": "get",
                    "parameter": parameter, 
                    "successFun": (backData) => {
                        if(backData.status == 1) {
                            that.gridConfig_addApi.data = backData.data;
                            this.gridConfig_addApi.loading = false;
                        }else {
                            this.$Message.error(backData.err);
                            this.gridConfig_addApi.loading = false;
                        }
                    }
                });
            },
            init () {
                this.gridConfig.height = this.$refs.gridContainer.offsetHeight -  160;
                this.gridConfig_addApi.height = this.$refs.gridContainer.offsetHeight -  160;
                var that = this;
                window.onresize = function(){
                    that.gridConfig.height = that.$refs.gridContainer.offsetHeight -  160;
                    that.gridConfig_addApi.height = that.$refs.gridContainer.offsetHeight -  160;
                }
                this.getListData();
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            type (newValue, oldValue) {
                this.getListData();
            },
        }
    };
</script>

<style lang="scss">
 @import "../../../assets/css/dialog.scss";
</style>
