<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0'>
                <cell class="cell">
                    <span slot="title"><i class="iconfont icon-gongsimingcheng"></i>中冶南方集团</span>
                </cell>
                <cell class="cell" is-link link="./feedback">
                    <span slot="title"><i class="iconfont icon-zuzhijiagoujiekou"></i>组织架构</span>
                </cell>
                <cell class="cell" is-link>
                    <span slot="title"><i class="iconfont icon-hezuohuoban"></i>外部联系人</span>
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
        // deactivated(){
        //     console.log(3);
        // },
        methods: {

        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        .cell{
            font-size: 14px;
            padding: 7px 15px;
            color: @baseColor;
            img{
                width: 64px;
                height: 64px;
                border-radius: 50%;
                float: left;
                margin: 20px 10px 20px 0;
            }
            .title{
                line-height: 26px;
            }
            i{
                font-size: 22px;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
    }
</style>


