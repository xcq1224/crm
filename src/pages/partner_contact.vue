<template>
    <div class="page"> 
        <div class="main">
            <div class="scroll-box" :style="isModify? '' : 'padding-bottom: 0;'">
                <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                    <tr>
                        <td width='100'>照片</td>
                        <td><img v-show="baseInfo.avatarPath" width="60" height="60" :src="baseInfo.avatarPath" /></td>
                    </tr>
                    <tr v-for="(item, index) in addLabel" :key="index">
                        <td>{{item.label}}</td>
                        <td>{{baseInfo[item.name]}}</td>
                    </tr>
                    <tr>
                        <td>标签</td>
                        <td class="tag-box" style="border: none;">
                            <span class="el-tag" v-for="(item, index) in baseInfo.tags" :key="index">{{item}}</span>
                        </td>
                    </tr>
                </x-table>
            </div>
            <div class="footer" v-if="isModify">
                <div class="footer-tab vux-1px-l"><router-link style="display: block;" :to="'./contacts_add?id=' + baseInfo.id + '&handleType=1'">编辑</router-link></div>
                <div class="footer-tab vux-1px-l" v-if="isOwner" @click="delcontact">删除</div>
            </div>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTable } from 'vux'

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
                baseInfo: {},               //  详细信息
                isModify: false,            //  是否能编辑
                isOwner: false,             //  是否是拥有者
                query: {},                  //  页面传参
                addLabel: [],       
            }
        },
        activated(){
            this.$vux.loading.show()
            this.query = this.$router.currentRoute.query
            this.$post("/crm/contactsDetailPR/queryContactsForOne", {id: this.query.id}, (data) => {
                this.baseInfo = data.contact
                this.isModify = data.isModify
                this.isOwner = data.isOwner
            })
            this.getField()
            
        },
        deactivated(){

        },
        methods: {
            //  获取联系人字段
            getField(){
                this.$post("/crm/extFieldPR/getField", {tableName: 'crm_contacts'}, (data) => {
                    this.addLabel = data.list;
                })
            },
            //  删除联系人
            delcontact(){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.$post('/crm/contactsPR/deleteCrmContacts', {"list": [this.baseInfo.id]}, (data) => {
                            if(data.message){
                                this.toastFail(data.message, "200px")
                            }else{
                                this.toastSuccess("删除成功！")
                                this.goBack()
                            }
                        })
                    }
                })
            },
            
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
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
    }
    .scroll-box{
        height: 100%;
        overflow: auto;
        padding-bottom: 46px;
        box-sizing: border-box;
        .vux-table{
            margin-top: 15px;
            line-height: 20px;
            &:after, td:before{
                display: none;
            }
            td:first-of-type{
                text-align: left;
                padding: 0 0 8px 20px;
                vertical-align: text-top;
            }
            td:last-of-type{
                text-align: left;
                padding: 0 10px 8px;
            }
        }
        .contacts{
            position: relative;
            padding: 8px 12px;
            border-bottom: 1px solid #ddd;
            .img{
                position: relative;
                float: left;
                i{
                    position: absolute;
                    top: 20px;
                    right: 8px;
                    display: block;
                    color: #f00;
                    font-size: 14px;
                    background: #fff;
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    &:before{
                        position: relative;
                        top: -5px;
                        left: -1px;
                    }
                }
                img{
                    margin-right: 8px;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
            .edit{
                position: absolute;
                color: #ccc;
                right: 10px;
                top: 8px;
                i{
                    font-size: 24px;
                }
            }
        }
    }
    .handle{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        border-top: 1px solid @baseColor;
        display: flex;
        font-size: 14px;
        background: #fff;
        z-index: 5;
        a{
            flex: 1;
            text-align: center;
            line-height: 40px;
            color: @baseColor;
            &.active{
                background: @baseColor;
                color: #fff;
            }
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: #fff;
        border-top: 1px solid #ddd;
        z-index: 2;
        display: flex;
        text-align: center;
        line-height: 40px;
        .footer-tab{
            flex: 1;
            position: relative;
        }
    }
    .tab-item3 .list-item, .tab-item4 .list-item{
        padding: 10px 10px;
    }
</style>




