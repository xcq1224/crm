<template>
    <div class="page"> 
        <div class="main">
            <div class="notice-item">
                <p class="active">张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p class="active">张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p class="active">张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p class="active">张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p class="active">张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p class="active">张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p>张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <div class="notice-item">
                <p>张三审批驳回了你的合同，事故发生快乐按时发货撒即可更好解决考试大纲的顾客拉开了困死了大开发卡萨开放接口</p>
                <span class="datetime">2018-10-03 19:20</span>
            </div>
            <divider>已经到底了</divider>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
        },
        data () {
            return {
                tabIndex: 0,

            }
        },
        activated(){

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
    .main{
        font-size: 12px;
        .notice-item{
            padding: 10px;
            border-bottom: 1px solid #ddd;
            p{
                line-height: 18px;
                margin: 5px 0;
                &.active{
                    font-weight: bold;
                    color: #333;
                }
            }
            .datetime{
                color: #ccc;
            }
            &:last-of-type{
                border-bottom: none;
            }
        }
    }
</style>



