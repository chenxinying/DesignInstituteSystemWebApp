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
import { XHeader, Group, XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  },
  methods: {
    save(){
      console.log(this.name)
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
