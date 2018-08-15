<template>
    <div class="grid-search">
        <Row :gutter="16">
            <Col span="9" v-if="keywordDrop.list.length > 0">
                <Input  placeholder="请输入关键字" v-model="queryParams.keyword" >
                    <Select slot="prepend" style="width: 120px;" v-model="queryParams.column">
                        <Option v-for="(item,index) in keywordDrop.list" :value="item.column" :key="index">{{item.name}}</Option>
                    </Select>
                    <Button slot="append" icon="ios-search" type="primary" @click.stop="refreshGridData"></Button>
                </Input>
            </Col>
            <Col span="7" v-if="keywordDrop.showDataPicker">
                <DatePicker 
                    :type="keywordDrop.dataType" 
                    confirm
                    @on-ok="dateTimeOk"
                    @on-change="dateTimeChange"
                    @on-clear="dateTimeClear"
                    :options="dataOptions"
                    placeholder="请输入搜索开始以及结束时间" 
                    style="width: 100%;margin-top: 1px">
                </DatePicker>
            </Col>
        </Row>
    </div>
    
</template>

<script>
export default {
    name: 'dataSearch',
    props: {
        keywordDrop: Object,
    },
    data () {
        return {
            queryParams: {
                column: this.keywordDrop.first,
                keyword: "",
                dateTime: "",
            },
            dataOptions: {
                shortcuts: [
                    {
                        text: '近期一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '近期一月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '近期三月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    },
                    {
                        text: '近期一年',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
                            return [start, end];
                        }
                    },
                ]
            },
        }
    },

    methods: {
        refreshGridData() {
            this.$emit(this.keywordDrop.pageName + 'GetByQueryParams',this.queryParams);
        },
        dateTimeChange (date) {
            this.queryParams.dateTime = date;
        },
       dateTimeOk () {
           this.refreshGridData();
        },
        dateTimeClear () {
            this.queryParams.dateTime = "";
            this.refreshGridData();
        },
        
    },
};
</script>

<style lang="scss">
    .grid-search {
        height: 43px;
        background: #fff;
        padding: 5px 10px 0;
    }
</style>

