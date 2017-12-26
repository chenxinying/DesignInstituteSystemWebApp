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
    <!--<checklist title="身份详情" disabled label-position="left" :options="checklist" v-model="checklist"></checklist>-->
  </div>
</template>

<script>
import { XHeader, Group, Cell, Checklist } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Checklist
  },
  computed: {
    ...mapState({
        openid : state => state.openid,
        userInfo : state => state.user_info
      }),
    checklist: function(){
      // var checklist = []
      // this.userInfo.roles.forEach(element => {
      //   checklist.push(element.name)
      // });
      // return checklist
    }
  },
}
</script>
