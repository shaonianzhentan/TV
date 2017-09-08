<template>
  <div>

    <mu-grid-list>
      <mu-sub-header>测试列表(可正常播放)</mu-sub-header>
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
  methods: {
    init () {
      this.$emit('title', '推荐')
      this.list.push({
        img: 'http://g1.ykimg.com/05160000597EEFF8859B5D03140898F2',
        title: '镇魂街 第一季(2017)',
        source: '优酷',
        link: 'http://v.youku.com/v_show/id_XMjkzNDEwMzM3Mg==.html'
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
