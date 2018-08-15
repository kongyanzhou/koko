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
                @consumeListGetByQueryPage="getByQueryPage"
            ></data-grid>
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
                dialogName: "consumeList",
                status: "",
                // 搜索组件配置
                gridSearch: {
                    pageName: "consumeList",
                    first: "apiName",
                    showDataPicker: true,
                    dataType: "daterange",
                    list: [
                        // {column: "apiName",name: "接口名"},
                    ],
                },
                // 表格组件配置
                gridConfig: {
                    pageName: "consumeList",
                    title: {name: "用户管理 - 消费记录",icon: "android-playstore"},
                    interface: common.getApiUrl + "/user/cost/list",  
                    take: "0",
                    gridPage: "true",
                    columns: [
                        {title: '系统ID',key: 'id',align: 'center',width: 120},
                        {title: '接口价格（分）',key: 'cost',align: 'center',width: 180},
                        {title: '调用结果',key: '',align: 'center',width: 180,
                            // filters: [
                            //     {label: '调用成功',value: "1"},
                            //     {label: '调用失败',value: "0"},
                            // ],
                            // filterMultiple: false,
                            // filterRemote (value, row) {
                            //     that.status = value[0];
                            // },
                            render: (h,params) => {
                                var status = JSON.parse(params.row.response).status;
                                if(status == "1") {
                                    return "调用成功";
                                }else {
                                    return "调用失败";
                                }
                            }
                        },
                        {title: '调用参数',key: 'request_params',align: 'center',width: 180},
                        {title: '调用时间',key: 'updated_at',align: 'center',width: 180},
                        {title: '调用IP',key: 'ip_long',align: 'center',width: 160},
                    ],
                    data: [],
                    height: "",
                    loading: false,
                    gridTips: [
                        {name: "总调用次数",num:"0",unit: "次"},
                        {name: "总消耗",num:"0",unit: "R币"}
                    ],
                    queryParams: {},
                    pageParams: {},
                },

                // models弹框
                models: {
                   
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
            // 获取统计项
            getHeaderStatistics () {
                var that = this;
                var parameter = {};
                parameter.user_id = this.userId;
                parameter.column = this.gridConfig.queryParams.column ? this.gridConfig.queryParams.column  : "";
                parameter.keyword = this.gridConfig.queryParams.keyword ? this.gridConfig.queryParams.keyword : "";
                parameter.start_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[0] : "";
                parameter.end_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[1] : "";
                parameter.status = this.status;

                common.requestInterface({
                    "url": common.getApiUrl + "/user/cost/total", 
                    "type": "get",
                    "parameter": parameter, 
                    "successFun": (backData) => {
                        var payment = [
                            {name: "总调用次数",num:backData.count,unit: "次"},
                            {name: "总消耗",num:backData.money,unit: "R币"}
                        ];
                        that.gridConfig.gridTips = "";
                        that.gridConfig.gridTips = payment;
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
                parameter.user_id = this.userId;
                parameter.end_time = this.gridConfig.queryParams.dateTime ? this.gridConfig.queryParams.dateTime[1] : "";
                parameter.status = this.status;
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
                            this.getHeaderStatistics();
                        }else {
                            this.$Message.error(backData.err);
                            this.gridConfig.loading = false;
                        }
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
            status(newValue, oldValue) {
                this.getListData();
            },
        }
    };
</script>

<style lang="scss">
 @import "../../../assets/css/dialog.scss";
</style>
