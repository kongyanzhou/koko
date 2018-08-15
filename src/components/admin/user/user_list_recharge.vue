<template>
    <div 
        class="dialog"
        transition="dialog-fade">
        <div class="dialog-content" ref="gridContainer">
            <div class="dialog-close" @click.stop="dialogClose"><Icon type="ios-close" ></Icon></div>
            <data-search
                :keyword-drop="gridSearch"
                @rechargeListGetByQueryParams="getByQueryParams"
            ></data-search>

            <data-grid
                :grid-config="gridConfig"
                @rechargeListGetByQueryPage="getByQueryPage"
                @rechargeListClickToolBar="clickToolBar"
            ></data-grid>

            <!-- 用户列表 - 充值记录 - 充值 -->
            <Modal
                v-model="models.rechargeModel"
                title="充值"
                :mask-closable="false"
                width="320">
                <Form ref="rechargeForm" :model="forms.rechargeForm" :rules="rules">
                    <FormItem  prop="pay">
                        <Input v-model.number="forms.rechargeForm.pay" placeholder="请输入充值金额">
                             <span slot="append">* 100元</span>
                        </Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="rechageCancel">取消</Button>
                    <Button type="primary" :loading="forms.rechargeForm.loading"  @click="rechageSubmit">确认充值</Button>
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
                dialogName: "rechargeList",
                type: "", // 充值方式
                
                // 搜索组件配置
                gridSearch: {
                    pageName: "rechargeList",
                    showDataPicker: true,
                    dataType: "datetimerange",
                    list: [],
                },

                // 表格组件配置
                gridConfig: {
                    pageName: "rechargeList",
                    title: {name: "用户管理 - 充值记录",icon: "card"},
                    interface: common.getApiUrl + "/payment/list", 
                    gridPage: "true",
                    take: "0",
                    columns: [
                        {title: '系统ID',key: 'id',align: 'center'},
                        {title: '充值金额',key: 'paid',align: 'center',render: (h,params) => {
                            return params.row.paid ? params.row.paid / 100 + "元" : "0";
                        }},
                        {title: '充值时间',key: 'created_at',align: 'center'},
                        {title: '充值方式',key: 'pay_type',align: 'center',render: (h,params) => {
                            return params.row.pay_type == "1" ? "管理后台" : (params.row.pay_type == "2" ? "支付宝" : (params.row.pay_type == "3" ? "微信" : "-"));},
                            // filters: [
                            //     {label: '管理后台',value: 1},
                            //     {label: '支付宝',value: 2},
                            //     {label: '微信',value: 3},
                            // ],
                            // filterMultiple: false,
                            // filterRemote (value, row) {
                            //     that.type = value[0];
                            // }
                        },
                    ],
                    data: [],
                    height: "",
                    loading: false,
                    btnGroups: [
                        {act: "recharge", name: "充值",type: "warning",icon: "social-yen"},
                    ],
                    gridTips: [],
                    queryParams: {},
                    pageParams: {},
                },
                // models弹框
                models: {
                   rechargeModel: false, // 充值
                },
                // 匹配规则
                rules: {
                    pay: [
                        {required: true, type: "number", message: '充值金额不能为空且必须为数字', trigger: 'blur'},
                    ],
                },
                // 表格组件
                forms: {
                    rechargeForm: {
                        pay: "",
                        loading: false,
                    }
                }
            };
        },
        methods: {
            // +***************************用户列表相关事件****************************+
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
            getListData () {
                var that = this;
                that.gridConfig.loading = true;
                var parameter = {};
                parameter.column = this.gridConfig.queryParams.column ? this.gridConfig.queryParams.column  : "";
                parameter.keyword = this.gridConfig.queryParams.keyword ? this.gridConfig.queryParams.keyword : "";
                parameter.start_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[0] : "";
                parameter.user_id = this.userId;
                parameter.end_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[1] : "";
                parameter.type = this.type;
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
                            this.userListGetPayMent();
                        }else {
                            this.$Message.error(backData.err);
                            this.gridConfig.loading = false;
                        }
                    }
                });
            },
            clickToolBar (item) {
                var act = item.act;
                if(act == "recharge") {
                   
                    this.forms.rechargeForm.loading = false;
                    this.$refs.rechargeForm.resetFields();
                    this.models.rechargeModel = true;
                }
            },
            rechageSubmit () {
                if(this.forms.rechargeForm.pay && this.forms.rechargeForm.pay * 1 < 0) {
                    this.$Message.error("充值金额不能为负数！");
                    return false;
                }
                this.$refs.rechargeForm.validate((valid) => {
                    if (valid) {
                        this.forms.rechargeForm.loading = true;
						var parameter = {};
						parameter.pay = this.forms.rechargeForm.pay;
                        parameter.user_id = this.userId;
						common.requestInterface({
							"url": common.getApiUrl + "/payment/add", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.status == 1) {
                                    this.$Message.success("充值成功！");
                                    this.models.rechargeModel = false;
                                    this.getListData();
								}else {
                                    this.$Message.error(backData.err);
                                    this.forms.rechargeForm.loading = false;
								}
							}
						});
					} 
                })
            },
            rechageCancel () {
                this.models.rechargeModel = false;
            },
            // 获取充值总金额
            userListGetPayMent () {
                var that = this;
                var parameter = {};
                parameter.user_id = this.userId;
                parameter.column = this.gridConfig.queryParams.column ? this.gridConfig.queryParams.column  : "";
                parameter.keyword = this.gridConfig.queryParams.keyword ? this.gridConfig.queryParams.keyword : "";
                parameter.start_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[0] : "";
                parameter.end_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[1] : "";
                parameter.type = this.type;
                common.requestInterface({
                   "url": common.getApiUrl + "/payment/all", 
                    "parameter": parameter, 
                    "successFun": (backData) => {
                        var payment = {name: "充值总金额",num: backData / 100,unit: "元"};
                        that.gridConfig.gridTips = [];
                        that.gridConfig.gridTips.push(payment);
                    }
                });
            },
           
            init () {
                this.gridConfig.height = this.$refs.gridContainer.offsetHeight -  160;
                var that = this;
                window.onresize = function(){
                    that.gridConfig.height = that.$refs.gridContainer.offsetHeight -  160;
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
