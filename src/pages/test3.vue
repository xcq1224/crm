<template>
    <div class="has-tabbar page"> 
        <div class="header pst">
            <div class="search">
                <div class="search-box" @click="searchClick"><i class="weui-icon-search"></i>搜索</div>
                <search  
                    v-show="showSearch"
                    @on-result-click="resultClick"
                    @on-change="getResult"
                    v-model="value"
                    @on-focus="onFocus"
                    @on-cancel="onCancel"
                    @on-submit="onSubmit"
                    ref="search" style="position:absolute;top:0;">
                    <div slot="left">
                        <popover placement="bottom">
                            <div slot="content" class="search-tab-items">
                                <p @click="searchChoose(0)">全部1</p>
                                <p @click="searchChoose(1)">全部2</p>
                                <p @click="searchChoose(2)">全部3</p>
                                <p @click="searchChoose(3)">全部4</p>
                                <p @click="searchChoose(4)">全部5</p>
                            </div>
                            <span class="search-tab">全部<i class="iconfont icon-xia"></i></span>
                        </popover>
                    </div>
                    <div slot="">
                        <p v-for="(item, index) in results" :key="index">{{item.title}}</p>
                    </div>
                </search>
            </div>
            <router-link to="./news" class="news active"><i class="iconfont icon-icon--"></i></router-link>
        </div>
        <div class="main">
        </div>

    </div>
</template>

<script>
    import { Search, Popover} from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    const list = () => ['热门', '精选', '达人', '干货']
    export default {
        components: {
            Search,
            Popover,

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
                //  search
                results: [],
                value: '',

                //  tab
                index: 0,

                //  精选
                subnavIndex: 0,
                isShow1: false,
                isShow2: false,
                isShow1: false,
                isShow1: false,
                chosenTop: 0,       //  精选tab的scrollTop高度
                showSearch: false,

            }
        },
        activated(){
            
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            //  search
            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
                this.showSearch = false
                this.$refs.search.setBlur()
            },
            getResult (val) {
                console.log('on-change', val)
                this.results = val ? getResult(this.value) : []
            },
            onSubmit () {
                this.$refs.search.setBlur()
                
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus () {
                this.showSearch = true
                console.log('on focus')
            },
            onCancel () {
                console.log('on cancel')
                this.showSearch = false
            },
            searchClick(){

            },
            searchChoose(val){
                console.log(val)
            },






            //  tab
            //  跳转到详情
            toDetail(e){
                this.chosenTop = document.getElementsByClassName('chosen')[0].scrollTop;
                this.$router.push('./detail')
            },
            //  跳转到个人主页
            toHomepage(){
                this.$router.push('./homepage')
            },
        },
    }

    //  search
    function getResult (val) {
        let rs = []
        for (let i = 0; i < 20; i++) {
            rs.push({
            title: `${val} result: ${i + 1} `,
            other: i
            })
        }
        return rs
    }
</script>

<style lang="less" scoped>
    @baseColor: #b5e1fe;
    .header{
        background: #b5e1fe;
        display: flex;
        .search{
            flex: 1;
            .weui-search-bar{
                background: #b5e1fe;
            }
        }
        .news{
            line-height: 46px;
            padding-right: 13px;
            color: #fff;
            position: relative;
            i{
                font-size: 24px;
            }
            &.active:after{
                content: '';
                position: absolute;
                top: 10px;
                right: 15px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: red;
            }
        }
    }
    .main{
        padding-top: 46px;
        overflow: hidden;
    }
    .vux-tab-wrap{
        z-index: 2;
    }
    .vux-slider{
        height: 100%;
        top: -88px;
        padding-top: 88px;
        box-sizing: border-box;
        z-index: 1;
    }
    .vux-swiper-item{
        height: 100%;
        overflow: auto;
    }
    .hot-card{
        padding: 10px 10px 3px;
        background: #fff;
        margin-bottom: 15px;
        color: #777;
        .user-info{
            img{
                border-radius: 50%;
                vertical-align: middle;
            }
            a{
                float: right;
                margin-top: 3px;
                height: 25px;
                width: 50px;
                text-align: center;
                line-height: 24px;
                border-radius: 4px;
                font-size: 13px;
                border: 1px solid #ccc;
                color: #ccc;
                &.active{
                    color: #fff;    
                    background: @baseColor;
                    border-color: @baseColor;
                }
            }
        }
        video{
            width: 100%;
            height: auto;
        }
        .title{
            font-weight: bold;
            margin: 5px 0 3px 10px;
        }
        .handle{
            color: #ccc;
            i{
                float: right;
                margin-right: 10px;
                font-size: 20px;
                line-height: 22px;
            }
        }
    }

    .subnav{
        height: 34px;
        padding-top: 6px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 10px;
        background: #fff;
        position: relative;
        >div{
            width: 50%;
            height: 24px;
            float: left;
            text-align: center;
            line-height: 24px;
            box-sizing: border-box;
            &:first-of-type{
                border-right: 1px solid #e5e5e5;
            }
            .subnav-item.active{
                color: @baseColor;
            }
        }
        ul{
            position: absolute;
            width: 100vw;
            top: 41px;
            left: 0;
            background: #fff;
            padding: 3px 7px 10px;
            box-sizing: border-box;
            overflow: hidden;
            z-index: 2;
            li{
                width: 20%;
                float: left;
                list-style: none;
                a{
                    display: block;
                    margin: 7px;
                    border: 1px solid @baseColor;
                    text-align: center;
                    line-height: 22px;
                    border-radius: 10px;
                    font-size: 12px;
                    &.active{
                        background: @baseColor;
                        color: #fff;
                    }
                }
                &.title{
                    width: 100%; 
                    text-align: left;
                    padding-left: 16px;
                }
                &.title:not(:first-of-type){
                    margin-top: 10px;
                }
            }
        }
    }
    .chosen-card{
        padding: 12px 8px;
        margin-bottom: 1px;
        background: #fff;
        overflow: hidden;
        font-size: 12px;
        img{
            float: left;
            border-radius: 8px;
            margin-right: 10px;
            width: 118px;
            height: 70px;
        }
        p{
            color: #ccc;
            &.title{
                color: #777;
                font-weight: bold;
                height: 38px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .num{
                color: #777;
            }
            .sprice{
                float: right;
                color: #f00;
                margin-right: 18px;
                font-weight: bold;
            }
        }
    }
    .talent-card{
        margin-bottom: 1px;
        background: #fff;
        padding: 10px;
        font-size: 12px;
        position: relative;
        img{
            width: 64px;
            height: 64px;
            border-radius: 50%;
            margin: 0 10px;
            float: left;
        }
        p{
            line-height: 22px;
        }
        .title{
            color: #333;
            font-weight: bold;
        }
        .attention{
            position: absolute;
            right: 10px;
            top: 4px;
        }
    }
    .attention{
        display: block;
        height: 25px;
        width: 50px;
        text-align: center;
        line-height: 24px;
        border-radius: 4px;
        font-size: 13px;
        border: 1px solid #ccc;
        color: #ccc;
        &.active{
            color: #fff;    
            background: @baseColor;
            border-color: @baseColor;
        }
    }



    .search-tab{
        background: #fff;
        padding: 0 2px 0 6px;
        display: block;
        height: 28px;
        font-size: 14px;
        i{
            font-size: 20px;
            line-height: 28px;
            vertical-align: middle;
        }
    }
    .search-tab-items{
        width: 64px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        text-align: center;
        color: #777;
        p{
            line-height: 26px;
            &:not(:last-of-type){
                border-bottom: 1px solid #ddd;
            }
            &.active{
                color: @baseColor;
            }
        }
    }
    .search-box{
        background: #fff;
        text-align: center;
        margin: 9px 10px;
        color: #ccc;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        i{
            vertical-align: middle; 
            margin-right: 10px;
        }
    }
</style>

