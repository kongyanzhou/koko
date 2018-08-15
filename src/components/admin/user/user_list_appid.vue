<template>
    <div 
        class="dialog"
        transition="dialog-fade">
        <div class="dialog-content" ref="gridContainer">
            <div class="dialog-close" @click.stop="dialogClose"><Icon type="ios-close-empty" ></Icon></div>

            <data-search
                :keyword-drop="gridSearch"
            ></data-search>
            
            <data-grid
                :grid-config="gridConfig"
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
                dialogName: "appidList",
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
                    title: {name: "用户管理 - appid查看",icon: "social-buffer"},
                    interface: common.getApiUrl + "/user/client/list", 
                    take: "0",
                    gridPage: false,
                    columns: [
                        {title: '接口ID',key: 'app_id',align: 'center'},
                        {title: '接口秘钥',key: 'secret',align: 'center'},
                        {title: '创建时间',key: 'created_at',align: 'center'},
                    ],
                    data: [],
                    height: "",
                    loading: false,
                    btnGroups: [],
                    queryParams: {},
                    pageParams: {},
                },
               
                // models弹框
                models: {
                  
                },
                // 匹配规则
                rules: {
                     
                },
                // 表单
                forms: {
                   
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
    };
</script>

<style lang="scss">
 @import "../../../assets/css/dialog.scss";
</style>
