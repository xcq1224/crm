<template>
    <div class="page"> 
        <div class="header">
            <p><span class="wait">待审批</span>张三</p>
            <p>合同名称</p>
        </div>
        <div class="empty-box"></div>
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="50%" v-model="tabIndex">
                <tab-item class="vux-center" :selected="tabIndex == 0" @click="tabIndex = 0">详情</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 1" @click="tabIndex = 1">流程</tab-item>
            </tab>
            <swiper v-model="tabIndex" :show-dots="false" height="100%">
                <swiper-item>
                    <div class="table-box">
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                            <tr>
                                <td width='80'>合同编号</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td>合同名称</td>
                                <td>电视剧高科技四大皆空第三个看了电视剧里看过看见了第三轮可控硅</td>
                            </tr>
                            <tr>
                                <td width='80'>客户名称</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>合同总金额</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>营销机会</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>开始日期</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>结束日期</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>合同状态</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>客户签约人</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>我方签约人</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>签约日期</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>备注</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>合同负责人</td>
                                <td>2142135136</td>
                            </tr>
                            <tr>
                                <td width='80'>所属部门</td>
                                <td>2142135136</td>
                            </tr>
                        </x-table>
                    </div>
                    <div class="handle">
                        <a>不通过</a>
                        <a class="active">通过</a>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="follow">
                        <div class="follow-item">
                            <p>李四<span class="datetime">18/08/12 18:00</span></p>
                            <p>发起审批</p>
                        </div>
                        <div class="follow-item">
                            <p>张三审批<span class="datetime">18/08/12 18:00</span></p>
                            <p>审批中</p>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem } from 'vux'
    import { XTable } from 'vux'

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
            XTable,
        },
        data () {
            return {
                tabIndex: 0,
            }
        },
        activated(){
            // this.type = this.$router.currentRoute.query.type || this.type
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            abc(){
                console.log(3)
            }
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .header{
        padding: 12px;
        .wait{
            display: inline-block;
            width: 46px;
            height: 20px;
            line-height: 21px;
            border-radius: 4px;
            text-align: center;
            color: #fff;
            font-weight: normal;
            font-size: 12px;
            margin-right: 10px;
            background: @baseColor;
        }
        p{
            padding: 4px 0;
        }
    }
    .empty-box{
        height: 15px;
        background: #f2f2f2;
    }
    .main{
        padding-top: 99px;
        font-size: 12px;
        overflow: hidden;
        .vux-tab{
            height: 30px;
        }
        .vux-tab-wrap{
            z-index: 2;
        }
        .vux-slider{
            height: 100%;
            top: -44px;
            padding-top: 44px;
            box-sizing: border-box;
            z-index: 1;
            .vux-swiper-item{
                height: 100%;
                overflow: auto;
            }
        }
        .table-box{
            height: 100%;
            overflow: auto;
            padding-bottom: 46px;
            box-sizing: border-box;
        }
        .vux-table{
            margin-top: 15px;
            line-height: 20px;
            &:after, td:before{
                display: none;
            }
            td:first-of-type{
                text-align: right;
                padding: 0 10px 8px;
                vertical-align: text-top;
            }
            td:last-of-type{
                text-align: left;
                padding: 0 10px 8px;
            }
        }
        .handle{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 45px;
            border-top: 1px solid @baseColor;
            display: flex;
            font-size: 14px;
            background: #fff;
            z-index: 5;
            a{
                flex: 1;
                text-align: center;
                line-height: 45px;
                color: @baseColor;
                &.active{
                    background: @baseColor;
                    color: #fff;
                }
            }
        }
        .follow{
            margin: 0 18px 20px;
            padding: 30px 0 15px 10px;
            border-left: 1px solid #ddd;
            .follow-item{
                position: relative;
                background: #f2f2f2;
                margin-bottom: 30px;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 14px;
                color: #333;
                .datetime{
                    float: right;
                    color: #777;
                }
                p{
                    padding: 5px 0;
                    line-height: 18px;
                }
                &:after{
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: -15px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: @baseColor;
                }
            }
        }
    }
</style>



