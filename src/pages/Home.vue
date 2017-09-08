<template>
  <div>
      <mu-sub-header>好朋友提示</mu-sub-header>
  <mu-content-block>
   程序重新改版，网上的接口不稳定<br/>如遇到任何问题<br/>请点击左上角三条杠杠【关于】联系方式反馈BUG
  </mu-content-block>
    <mu-divider />
    <mu-grid-list>
      <mu-sub-header>推荐列表</mu-sub-header>
      <mu-grid-tile v-for="(tile, index) in list" class="item" :key="index" @click.native="show(tile)">
        <img :src="tile.img" />
        <span slot="title">{{tile.title}}</span>
        <span slot="subTitle">by
          <b>{{tile.source}}</b>
        </span>
      </mu-grid-tile>
    </mu-grid-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.$emit('title', 'VIP视频')
  },
  methods: {
    init () {
      this.list.push({
        img: 'http://g1.ykimg.com/05160000597EEFF8859B5D03140898F2',
        title: '镇魂街 第一季(2017)',
        source: '优酷',
        link: 'http://v.youku.com/v_show/id_XMjkzNDEwMzM3Mg==.html'
      })
      this.list.push({
        img: 'http://pic5.qiyipic.com/image/20170809/3f/92/a_100094407_m_601_m3_180_236.jpg',
        title: '鬼吹灯之牧野诡事2',
        source: '爱奇艺',
        link: 'http://www.iqiyi.com/v_19rr8ketuo.html'
      })
    },
    show (item) {
      this.$router.push({ name: 'Player', query: {link: item.link} })
    }
  }
}
</script>
<style scoped>
.item{cursor: pointer;}
</style>
