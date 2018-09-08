<template>
    <div class="has-tabbar page"> 
        <div class="main news">
            <group gutter='0'>
                <cell class="cell" is-link link="./notice">
                    <span class="icon" slot="icon"><i class="iconfont icon-xiaoxi" style="background: #6ccac9;"></i></span>
                    <div class="title" slot="title">通知</div>
                    <badge class="num" text="88" slot=""></badge>
                </cell>
                <cell class="cell" is-link link="./notice">
                    <span class="icon" slot="icon"><i class="iconfont icon-yijianfankui" style="background: #1991eb;"></i></span>
                    <div class="title" slot="title">站内信</div>
                    <badge class="num" text="888" slot=""></badge>
                </cell>
                <cell class="cell" is-link link="./approval">
                    <span class="icon" slot="icon"><i class="iconfont icon-shenpi" style="background: #a9d96c;"></i></span>
                    <div class="title" slot="title">待办事项</div>
                    <badge class="num" text="8" slot=""></badge>
                </cell>
            </group>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
        },
        data () {
            return {
                tabIndex: 0,
            }
        },
        activated(){
        },
        methods: {

        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        background: #fff;
    }
    .main{
        .cell{
            font-size: 14px;
            padding: 15px 15px 0 0;
            height: 40px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            .icon{
                display: block;
                overflow: hidden;
                background: #fff;
                padding-left: 10px;
                margin-right: 10px;
            }
            i{
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                position: relative;
                font-size: 32px;
                vertical-align: middle;
                z-index: 4;
                color: #fff;
            }
            .title{
                line-height: 40px;
                font-size: 14px;
                color: @baseColor;
                span{
                    float: right;
                }
            }
            .num{
                position: relative;
                top: -3px;
            }
            &:before{
                display: none;
            }
            &:active{
                background: #fff;
            }
        }
    }
</style>
<style lang="less">
    .news .weui-cells{
        overflow: inherit;
        &:after, &:before{
            display: none;
        }
    }
</style>



