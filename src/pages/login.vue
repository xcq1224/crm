<template>
    <div class="page login" v-show="isShow"> 
        <div class="main">
            <div class="logo">睿协作</div>
            <x-input text-align="center" class="input" v-model="username" placeholder="用户名" ref='username' :show-clear='false'></x-input>
            <x-input text-align="center" class="input" v-model="password" placeholder="密码" type="password" ref='password' :show-clear='false'></x-input>
            <a class="input btn-submit" @click="login">登录</a>
        </div>
    </div>
</template>

<script>

    import { XHeader, XButton, XInput } from 'vux'

    export default {
        components: {
            XHeader,
            XButton,
            XInput,
        },
        data () {
            return {
                username: '',
                password: '',
                isShow: false,
            }
        },
        created(){
            if(this.getCookie('crmUserName')){
                this.$vux.loading.show()
                this.$axios({
                    method:"POST",
                    url: "/pm/api/saasLogin",
                    data : {userId: this.getCookie('crmUserName'), pwd: this.getCookie('crmpassword')},
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
                            this.$vux.loading.hide()
                            this.replaceRouter("./index")
		                }).catch(res=>{
                            this.isShow = true
                            this.$vux.loading.hide()
                        })
					} else {
                        this.isShow = true
                        this.$vux.loading.hide()
					}
                }).catch(res=>{
                        this.isShow = true
                        this.$vux.loading.hide()
                    }
                )
            }else{
                this.isShow = true
            }
        },
        activated(){
            if(!this.getCookie('crmUserName')){
                this.isShow = true
            }
        },
        methods: {
            login(){
                if(!this.username.trim()){
                    this.toastFail("请输入用户名", "200px")
                    return;
                }
                if(!this.password.trim()){
                    this.toastFail("请输入密码", "200px")
                    return;
                }
                this.$vux.loading.show()
                this.$axios({
                    method:"POST",
                    url: "/pm/api/saasLogin",
                    data : {userId: this.username, pwd: this.password},
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
                            this.$vux.loading.hide()
                            this.setCookie("crmUserName", this.username, 365)
                            this.setCookie("crmpassword", this.password, 365)
                            this.toastSuccess('登录成功')
                            this.replaceRouter("./index")
		                }).catch(res=>{
                                this.$vux.loading.hide()
                                this.toastFail('网络异常，请稍后再试', '200px')
                            }
                        )
					} else {
                        this.$vux.loading.hide()
                        this.toastFail(r.data.errInfo, '200px')
					}
                }).catch(res=>{
                        this.$vux.loading.hide()
                        this.toastFail('网络异常，请稍后再试', '200px')
                    }
                )
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding: 100px 30px 0;
        background: linear-gradient(170deg, rgba(0, 198, 251, 1) 0%, rgba(0, 198, 251, 1) 0%, rgba(0, 91, 234, 1) 100%, rgba(0, 91, 234, 1) 100%);
        .logo{
            font-family: '幼圆 Bold', '幼圆';
            font-weight: 700;
            font-style: normal;
            font-size: 36px;
            color: #FFFFFF;
            text-align: center;
            margin-bottom: 50px;
        }
        .input{
            width: 100%;
            height: 40px;
            padding: 0;
            border: 1px solid #fff;
            border-radius: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            margin-bottom: 20px;
            color: #fff;
            &:before{
                display: none;
            }
        }
        ::-webkit-input-placeholder{
            color: #fff;
        }
        .btn-submit{
            display: block;
            background: #fff;
            color: @baseColor;
        }
        p{
            text-align: center;
        }
    }
</style>



