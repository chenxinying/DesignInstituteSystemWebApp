<template>
  <div>
    <x-header>个人信息</x-header>
    <group>
      <cell title="微信昵称" :value="userInfo.nickname"></cell>
      <cell title="微信地址" :value="userInfo.location" ></cell>
    </group>
    <group>
      <cell title="真实姓名" :value="userInfo.real_name"  is-link link="/personinfo/edit/name"></cell>
      <cell title="手机号码" :value="userInfo.mobile_phone" is-link link="/personinfo/edit/phone"></cell>
    </group>
    <group>
      <cell title="公司名称" :value="userInfo.company_name"></cell>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Group,
    Cell
  },
  computed: {
    ...mapState({
        openid : state => state.openid,
        userInfo : state => state.user_info
      })
  },
}
</script>
