<template class="login-container">

  <div class="login">
    <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <h3 class="logo">到云</h3>
    <div v-if="type === 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          class="input-bar"
          v-model="loginForm.username"
          name="username"
          label=""
          placeholder="请输入手机号或邮箱"
          :rules="[{ required: true}]"
          border
        />
        <van-field
          class="input-bar"
          v-model="loginForm.password"
          type="password"
          name="password"
          placeholder="密码"
          show
          :rules="[{ required: true}]"
        />
<!--        <div class="verify">-->
<!--          <Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'90%'" :height="'30px'" :fontSize="'16px'" :type="2"></Verify>-->
<!--        </div>-->
        <div class="login-button">
          <van-button round block type="info" color="#8726DA" native-type="submit">登录</van-button>
          <div class="link-forgot" @click="toggle('forgot')">忘记密码</div>
          <div class="link-register" @click="toggle('register')">立即注册</div>
        </div>
      </van-form>
    </div>
    <div v-else-if="type==='register'" class="login-body register">
      <van-form @submit="onRegister">
        <van-field
          class="input-bar"
          v-model="registerForm.username"
          name="username1"
          placeholder="请输入手机号"
          :rules="[{ required: true}]"
        />
        <van-field
          class="input-bar"
          v-model="registerForm.password"
          type="password"
          name="password1"
          placeholder="密码"
          :rules="[{ required: true}]"
        />
        <van-field
          class="input-bar"
          v-model="registerForm.sms"
          center
          clearable
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" color="#8726D5" round @click="getMsgCode">发送验证码</van-button>
        </van-field>
        <div class="login-button">
          <van-button round block type="info" color="#8726DA" >注册</van-button>
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onForgot">
        <van-field
          class="input-bar"
          v-model="forgotForm.phone"
          name="username1"
          placeholder="请输入手机号"
          :rules="[{ required: true}]"
        />
        <van-field
          class="input-bar"
          v-model="forgotForm.password"
          type="password"
          name="password1"
          placeholder="密码"
          :rules="[{ required: true}]"
        />
        <van-field
          class="input-bar"
          v-model="forgotForm.password1"
          type="password"
          name="password1"
          placeholder="密码"
          :rules="[{ required: true}]"
        />
        <van-field
          class="input-bar"
          v-model="forgotForm.sms"
          center
          clearable
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" color="#8726D5" round @click="getMsgCode">发送验证码</van-button>
        </van-field>
        <div class="login-button">
          <van-button round block type="info" color="#8726DA" >提交更改</van-button>
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
        </div>
      </van-form>
      <van-toast id="van-toast" />
    </div>
    <div class="third-login">
      <van-icon style="margin: auto" size="40px" name="arrow-up" @click="showThirdMenu"></van-icon>
      <van-popup v-model="show" position="bottom" :style="{ height: '20%' }" />
    </div>
  </div>
</template>

<script>
import Verify from 'vue2-verify'
import {postRequest} from '../utils/api'

import {Toast} from 'vant'
export default {
  data () {
    return {
      show: false,
      loginForm: {
        username: 'admin',
        password: '123456',
        smsCode: ''
      },
      registerForm: {
        username: 'username',
        password: '123456',
        sms: ''
      },
      forgotForm: {
        phone: '',
        password: '',
        password1: '',
        sms: ''
      },
      type: 'login',
      verify: false
    }
  },
  components: {
    Verify
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onForgot: function () {
      if (this.forgotForm.password !== this.forgotForm.password1) {
        Toast.fail('两次密码不一致！')
      }
    },
    showThirdMenu: function () {
      this.show = !this.show
    },
    toggle (v) {
      this.verify = false
      this.type = v
    },
    // 这里使用定义的数据
    onSubmit: function () { // 提交表单
      let _this = this
      this.loading = true
      if (_this.loginForm.username === 'admin' && _this.loginForm.password === '123456') { // 仅用来演示
        console.log('登录成功')
        _this.$store.commit('login', _this.loginForm)
        // let path = _this.$route.query.redirect
        _this.$router.push('/home')
      } else {
        _this.$router.push('/login')
      }
      // postRequest('/login', { // 被封装了的axios方法
      //   // 向服务器发送请求
      //   username: this.loginForm.username,
      //   password: this.loginForm.password
      // }).then(resp => {
      //   _this.loading = false
      //   if (resp.status === 200) { // 200 表示成功 300 表示重定向
      //     // 成功
      //     let json = resp.data
      //     if (json.status === 'success') { // 返回成功便跳转到home
      //       _this.$store.commit('login', _this.loginForm)
      //       _this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
      //     } else {
      //       Toast.fail('登录💩失败!')
      //     }
      //   } else {
      //     // 失败
      //     Toast.fail('登录💩失败!')
      //   }
      // }, resp => {
      //   console.log(resp.status)
      //   _this.loading = false
      //   Toast.fail('哎呀！找不到服务器⊙﹏⊙||!', '💩真尴尬!')
      // })
    },
    onRegister: function () {
      let _this = this
      this.loading = true
      postRequest('/register', {
        username: _this.registerForm.username,
        password: _this.registerForm.password,
        smsCode: _this.registerForm.sms
      }).then(resp => {})
    },
    getMsgCode () {
      var _this = this
      this.loading = false
      postRequest('/getcode', {
        code: this.loginForm.smsCode
      }).then(resp => {
        _this.$alert('验证码发送成功')
      })
    }

  }
}
</script>
<style>
.login {
  text-align: center;
}
.logo {
  font-size: 70px;
  font-weight: lighter;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 40px;
}
.input-bar {
  width: 90%;
  border: 2px solid #F4F4F4;
  border-radius: 30px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.verify {
  width: 90%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.link-register, .link-login {
  position: absolute;
  right: 21px;
  color: #5190EF;
  font-size: 13px;
  margin-top: 10px;
}
.link-forgot {
  position: absolute;
  left: 21px;
  color: #5190EF;
  font-size: 13px;
  margin-top: 10px;
}
.login-button {
  position: relative;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
}
.third-login {
  position: fixed;
  bottom: 0;
  text-align: center;
}
</style>
