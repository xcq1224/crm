<template>
    <div class="page"> 
        <div class="operating-box">
            <div class="operating-flex">
                <div class="vux-1px-r" @click="chooseClassify">
                    <span>{{ list1[value1].value }}<i class="iconfont icon-xia"></i></span>
                </div>
                <div class="vux-1px-r filter" @click="showPopupPicker2 = true">
                    <span>筛选<i class="iconfont icon-xia"></i></span>
                </div>
                <div class="vux-1px-r filter" @click="showPopupPicker3 = true">
                    <span>排序<i class="iconfont icon-xia"></i></span>
                </div>
                <div class="vux-1px-r icon" @click="search">
                    <span><i class="iconfont icon-chaxun"></i></span>
                </div>
                <router-link class="icon" to="./clue_add?handleType=0">
                    <span><i class="iconfont icon-add1"></i></span>
                </router-link>
            </div>
        </div>
        <div class="main">
            <router-link :to="'./clue_detail?id=' + item.id" class="list-item" v-for="(item, index) in tableData" :key="index">
                <p>
                    <span  class="inline_block text-ellipsis w270 text_333">{{item.name}}</span>
                    <span class="float_r font12">{{item.marketingClueState}}</span>
                </p> 
                <p><span class="inline_block w_100 text-ellipsis">{{item.customerName}}</span></p>
            </router-link>
        </div>
        <search
            v-show="is_search"
            @on-submit="getTableData(1)"
            v-model="value"
            placeholder="请输入线索名称"
            @on-cancel="onCancel"
            ref="search" style="position:absolute;top:0;">
        </search>
        <popup-radio ref="classify" v-show="false" @on-change="onChange1" :options="list1" v-model="value1"></popup-radio>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker2" @on-change="onChange2" :show-cell="false" :data="list2" v-model="value2" :columns="2"></popup-picker>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker3" @on-change="onChange3" :show-cell="false" :data="list3" v-model="value3" :columns="2"></popup-picker>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker, PopupRadio } from 'vux'
    import { Search } from 'vux'
    import { setTimeout } from 'timers';

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            Card,
            PopupPicker,
            Search,
            PopupRadio,
        },  
        data () {
            return {
                value1: 0,
                showPopupPicker1: false,
                list1: [{
                        value: '全部',
                        key: 0
                    }, {
                        value: '我拥有的',
                        key: 1
                    }, {
                        value: '我参与的',
                        key: 2
                }],
                value2: ['marketingClueState', ''],
                showPopupPicker2: false,
                list2: [{
                        name: '线索状态',
                        value: 'marketingClueState',
                        parent: 0
                    }, {
                        name: '跟进状态',
                        value: 'state',
                        parent: 0
                    }, {
                        name: '线索来源',
                        value: 'type',
                        parent: 0
                    }, {
                        name: '请选择',
                        value: '',
                        parent: 'marketingClueState'
                    }, {
                        name: '进行中',
                        value: '0',
                        parent: 'marketingClueState'
                    }, {
                        name: '已转化',
                        value: '1',
                        parent: 'marketingClueState'
                    }, {
                        name: '已关闭',
                        value: '2',
                        parent: 'marketingClueState'
                    }, {
                        name: '请选择',
                        value: '',
                        parent: 'state'
                    }, {
                        name: '请选择',
                        value: '',
                        parent: 'type'
                }],
                value3: ['createTime', '-1'],
                showPopupPicker3: false,
                list3: [{
                        name: '创建时间',
                        value: 'createTime',
                        parent: 0
                    }, {
                        name: '跟进时间',
                        value: 'lastFollowTime',
                        parent: 0
                    }, {
                        name: '线索名称',
                        value: 'name',
                        parent: 0
                    }, {
                        name: '升序',
                        value: '1',
                        parent: 'createTime'
                    }, {
                        name: '降序',
                        value: '-1',
                        parent: 'createTime'
                    }, {
                        name: '升序',
                        value: '1',
                        parent: 'lastFollowTime'
                    }, {
                        name: '降序',
                        value: '-1',
                        parent: 'lastFollowTime'
                    }, {
                        name: '升序',
                        value: '1',
                        parent: 'name'
                    }, {
                        name: '降序',
                        value: '-1',
                        parent: 'name'
                }],
                value: '',
                is_search: false,
                currentPage: 1,
                pageSize: 2000,
                tableData: []
            }
        },
        mounted() {
            //  获取数据字典
            let list = ["crm-xs-gjzt", "crm-xsly"]
            this.$post("/crm/getDict", {"list": list}, (data) => {
                data['crm-xs-gjzt'].map((item, index) => {
                    this.list2.push({ 
                            name: item,
                            value: item,
                            parent: 'state'
                    })
                })
                data['crm-xsly'].map((item, index) => {
                    this.list2.push({ 
                            name: item,
                            value: item,
                            parent: 'type'
                    })
                })
            })
        },
        activated(){
            this.value2 = ['state', '']
            this.value3 = ['createTime', '-1']
            this.getTableData(1)
        },
        methods: {
            onChange1(val){
                this.getTableData(1)
            },
            onChange2(){
                this.getTableData(1)
            },
            onChange3(){
                this.getTableData(1)
            },

            //  获取线索
            getTableData(val){
                this.currentPage = val
                let params = {
                    prop: this.value3[0], 
                    order: parseInt(this.value3[1]),
                }
                params.currentPage = val
                params.pageSize = this.pageSize
                params.name = this.value
                params.classify = this.value1.toString()
                params[this.value2[0]] = this.value2[1]
                this.$vux.loading.show()
                this.$post("/crm/marketingCluePR/queryMarketingClue", params, (data) => {
                    this.tableData = data.list;
                    this.is_search = false
                    this.value = ''
                })
            },
            search(){
                this.is_search = true
                setTimeout(() => {
                    this.$refs.search.setFocus()
                },0)
            },
            onCancel () {
                this.is_search = false
            },
            //  选择分类
            chooseClassify(){
                this.$refs.classify.$el.click()
                this.$refs.classify.$el.click()
            },
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-top: 46px;
    }
    .popup-picker:before{
        display: none;
    }
</style>



