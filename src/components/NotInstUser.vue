<script>
import Vue from 'vue'
import { AlertPlugin, Alert } from 'vux'

Vue.use(AlertPlugin)

export default {
  components: {
    Alert
  },
  mounted () {
    this.$vux.alert.show({
      title: '抱歉，您不是本设计院用户',
      content: '将跳转至鈤励官网',
      onHide () {
        window.location.href = "http://www.rili-tech.com"
      }
    })

    setTimeout(() => {
        this.$vux.alert.hide()
        window.location.href = "http://www.rili-tech.com"
      }, 3000)
  }
}
</script>
