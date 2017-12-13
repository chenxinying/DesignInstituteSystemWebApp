<template>
  <div>
    <x-header title="更改手机号码">
      <div slot="right" style="margin-top:-5px;">
        <x-button type="primary" mini @click.native="save" style="color:#fff">保存</x-button>
      </div>
    </x-header>
    <group>
      <x-input v-model="userInfo.mobile_phone" required ref="input" is-type="china-mobile" mask="999 9999 9999" :max="13"></x-input>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Loading } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Loading
  },
  methods: {
    ...mapActions(['editCellPhone']),
    save () {
      this.$vux.loading.show({
        text: '正在保存'
      })
      this.editCellPhone({mobile_phone: this.userInfo.mobile_phone}).then(()=>{
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
