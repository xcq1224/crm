<template>
    <div class="has-tabbar page"> 
        <div class="main news">
            <group gutter='0'>
                <cell class="cell" is-link link="./notice">
                    <span class="icon" slot="icon"><i class="iconfont icon-xiaoxi" style="background: #6ccac9;"></i></span>
                    <div class="title" slot="title">系统消息</div>
                    <badge v-show="notifyNum" class="num" :text="notifyNum" slot=""></badge>
                </cell>
                <cell class="cell" is-link link="./letter">
                    <span class="icon" slot="icon"><i class="iconfont icon-yijianfankui" style="background: #1991eb;"></i></span>
                    <div class="title" slot="title">站内信</div>
                    <badge v-show="letterNum" class="num" :text="letterNum" slot=""></badge>
                </cell>
                <!-- <cell class="cell" is-link link="./approval">
                    <span class="icon" slot="icon"><i class="iconfont icon-shenpi" style="background: #a9d96c;"></i></span>
                    <div class="title" slot="title">待办事项</div>
                    <badge class="num" text="0" slot=""></badge>
                </cell> -->
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
                notifyNum: 0,
                letterNum: 0,
                isLogin: false,
            }
        },
        created(){
            this.query = this.$router.currentRoute.query
            if(this.query.state == 'qywx'){
                this.$store.state.wxType = "qywx"
                this.$vux.loading.show()
                this.$post("/crm/wechatPR/getQywxUserId", {code: this.query.code}, (data) => {
                    console.log(data)
                    this.$axios({
                        method:"POST",
                        url: "/pm/api/saasLogin",
                        data : {userId: data.userId, pwd: data.pwd},
                    }).then(r => {
                        if (r.data.flag == 'Y') {
                            console.log(r)
                            var params = new URLSearchParams();
                            params.append("organization", r.data.orgId)
                            params.append("username", r.data.userId)
                            params.append("password", r.data.pwd)
                            this.$axios({
                                method:"POST",
                                url: "/pm/com.wisdri.iims.main.Login.d",
                                data : params,
                            }).then(data => {
                                this.isLogin = true
                            }).catch(res=>{
                            })
                        }
                    })
                })
            }else{
                this.isLogin = true
                this.$store.state.wxType = ""
            }
        },
        activated(){
            if(this.isLogin){
                this.getNotify()
                this.getMail()
            }
        },
        methods: {
            getNotify(){
                this.$post("/api/NotifyPR/getNotify", {}, (data) => {
                    data.list.some((item, index) => {
                        if(item.state == '1'){
                            this.notifyNum = index
                            if(this.notifyNum > 99){
                                this.notifyNum = 99
                            }
                            return true
                        }
                    })
                })
            },
            getMail(){
                this.$post("/api/IimsMailPR/getUnread", {}, (data) => {
                    this.letterNum = data.num > 99 ? 99 : data.num
                })
            },
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



