<template>
    <div class="grid-content">
        <Card dis-hover>
            <p slot="title">
                <Icon :type="gridConfig.title.icon"></Icon>{{gridConfig.title.name}}
                <span class="gridTips" v-for="(item,index) in gridConfig.gridTips" :key="index">{{item.name}}：<em>{{item.num}}</em>{{item.unit}}</span>
            </p>  
            <Button v-for="(item,index) in gridConfig.btnGroups" slot="extra" :type="item.type" size="small" @click.stop="clickToolBar($event,item)" :key="index"> <Icon :type="item.icon"></Icon> {{item.name}}</Button>
            <Table 
                :columns="gridConfig.columns" 
                :data="gridConfig.data"
                stripe
                border
                size="small"
                :loading="gridConfig.loading"
                @on-selection-change="onSelectionChange"
                :height="gridConfig.height">
            </Table>
        </Card>
        
        <Page
            :total="gridConfig.total" 
            size="small"
            v-if="gridConfig.gridPage"
            show-elevator
            show-total	
            placement="top"
            :page-size="10" 
            :page-size-opts="[10,20,50]"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            style="textAlign: center;marginTop: 6px;"
            show-sizer>
        </Page>
    </div>
    
</template>

<script>
export default {
    name: 'dataGrid',
    props: {
        gridConfig: Object,
    },
    data () {
        return {
            queryPage: {
                page: "",
                pagesize: "",
            },
        }
    },

    methods: {
        refreshGridData() {
            this.$emit(this.gridConfig.pageName + 'GetByQueryPage',this.queryPage);
        },
        pageChange (page) {
            this.queryPage.page = page;
            this.refreshGridData();
        },
        pageSizeChange (pagesize) {
            this.queryPage.pagesize = pagesize;
            this.refreshGridData();
        },
        onSelectionChange (selection) {
            this.$emit(this.gridConfig.pageName + 'GetSelections',selection);
        },
        clickToolBar (event,item) {
            this.$emit(this.gridConfig.pageName + 'ClickToolBar',item);
        }
    },
};
</script>

<style lang="scss">

    .grid-content {
        margin-top: 4px;
        .ivu-card-head{
            padding: 8px 16px;
            p {
                font-size: 12px;
                color: #555;
            }
            .ivu-icon {
                margin-right: 5px;
                font-size: 14px;
            }
        }
        .ivu-card-body {
            padding: 4px;
        }
        .ivu-card-extra {
            top: 7px;
            button {
                margin-left: 8px;
            }
        }
        .ivu-table-small td {
            height: 36px;
        }
        .ivu-page-item-active {
            background: #2db7f5;
            border-color: #2db7f5;
        }
        .gridTips {
            color: #666;
            margin: 6px;
            &:nth-of-type(1) {
                margin-left: 40px;
            }
            em {
                color: #2db7f5;
                font-style: normal;
                margin-right: 2px;
            }

            
        }
    }
</style>