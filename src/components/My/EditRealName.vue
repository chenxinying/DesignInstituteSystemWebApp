<template>
  <div>
    <x-header title="更改真实姓名">
      <div slot="right" style="margin-top:-5px;">
        <x-button type="primary" mini @click.native="save" style="color:#fff">保存</x-button>
      </div>
    </x-header>
    <group>
      <x-input v-model="userInfo.real_name" required ref="input"></x-input>
    </group>
  </div>
</template>

<script>
import Vue from 'vue'
import { XHeader, Group, XInput, XButton, Loading, LoadingPlugin } from 'vux'
import { mapState, mapActions } from 'vuex'
Vue.use(LoadingPlugin)

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Loading
  },
  methods: {
     ...mapActions(['editRealName']),
    save(){
      this.$vux.loading.show({
        text: '正在保存'
      })
      this.editRealName({real_name: this.userInfo.real_name}).then(()=>{
        this.$vux.loading.hide()
        this.$router.go(-1)
      })
    }
  },
  computed: {
    ...mapState({
        openid : state => state.openid,
        userInfo : state => state.user_info
      })
  },
  activated () {
    this.$refs.input.focus()
  }
}
</script>

<style>
.vux-header-right{
  top: 10px
}
</style>
