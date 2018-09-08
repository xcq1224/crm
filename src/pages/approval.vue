<template>
    <div class="page"> 
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="70%" v-model="tabIndex">
                <tab-item class="vux-center" selected>待审批的</tab-item>
                <tab-item class="vux-center">抄送我的</tab-item>
                <tab-item class="vux-center">我发起的</tab-item>
                <tab-item class="vux-center">已审批的</tab-item>
            </tab>
            <swiper v-model="tabIndex" :threshold="80" :min-moving-distance="20" :show-dots="false" height="100%">
                <swiper-item>
                    <div class="item" @click="toDetail(1)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item" @click="toDetail(1)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item" @click="toDetail(1)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item" @click="toDetail(1)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item" @click="toDetail(1)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item" @click="toDetail(1)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item" @click="toDetail(2)">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title">张三 提交了 [xxx合同] 合同审批请求</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="item">
                        <p class="title"><span class="success">通过</span>[xxx合同] 合同审批通过</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title"><span class="fail">不通过</span>[xxx合同] 合同审批失败</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title"><span class="wait">审批中</span>[xxx合同] 合同审批中</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="item">
                        <p class="title"><span class="success">通过</span>[xxx合同] 合同审批通过</p>
                        <span class="datetime">2018-08-08 08:08</span>
                    </div>
                    <div class="item">
                        <p class="title"><span class="fail">不通过</span>[xxx合同] 合同审批失败</p>
                        <span class="datetime">2018-08-08 08:08</span>
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
            toDetail(id){
                this.$router.push('./approval_detail?id='+id)
            }
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        font-size: 12px;
        overflow: hidden;
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
        .item{
            padding: 8px 12px;
            border-bottom: 1px solid #ddd;
            .title{
                font-size: 14px;
                font-weight: bold;
                color: #333;
                line-height: 24px;
                span{
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
                }
                .success{
                    background: @baseColor;
                }
                .fail{
                    background: #f60;
                }
                .wait{
                    background: #ccc;
                }
            }
            .datetime{
                color: #ccc;
            }
        }
    }
</style>



