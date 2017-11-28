<template>
  <div>
    <x-header>个人信息</x-header>
    <group>
      <cell title="微信昵称" :value="userInfo.nickname" @click.native="onClick"></cell>
      <cell title="微信地址" value="中国 广东 深圳" @click.native="onClick"></cell>
    </group>
    <group>
      <cell title="真实姓名" value="陈新颖" @click.native="onClick" is-link></cell>
      <cell title="手机号码" value="13613078294" @click.native="onClick" is-link></cell>
      <cell title="QQ" value="805898592" @click.native="onClick" is-link></cell>
    </group>
    <group>
      <cell title="i配模到期时间" value="2017-12-13 11:27:06" @click.native="onClick"></cell>
    </group>
    <group>
      <cell title="公司名称" :value="userInfo.company_name" @click.native="onClick"></cell>
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
