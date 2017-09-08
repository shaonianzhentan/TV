<template>
<div>

<mu-grid-list class="gridlist-demo">
    <mu-sub-header>搜索列表</mu-sub-header>
    <mu-grid-tile v-for="(tile, index) in list" class="item" :key="index" @click.native="show(tile)">
      <img :src="tile.img"/>
      <span slot="title">{{tile.title}}</span>
      <span slot="subTitle">by <b>{{tile.source}}</b></span>
    </mu-grid-tile>
  </mu-grid-list>
  <center>
<mu-circular-progress :size="90" :strokeWidth="5" v-if="isLoading" />
  </center>


 <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    出现错误
  </mu-popup>

 <mu-dialog :open="dialog" title="好朋友提示">
    正在很努力的去获取播放链接，请骚等。。。预计30秒到达战场
    <mu-flat-button label="不等了" slot="actions" primary @click="close"/>
  </mu-dialog>

</div>
</template>

<script>
export default {
  data () {
    return {
      api: 'http://jiluxinqing.top:4000/',
      list: [],
      count: 0,
      isLoading: false,
      dialog: false,
      topPopup: false,
      isPlay: false
    }
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.$emit('title', '搜索结果')
      var key = this.$route.query.key
      this.list = []
      this.search('youku', key)
      this.search('qq', key)
      this.search('le', key)
      this.search('mg', key)
      this.isLoading = true
    },
    search (type, key) {
      this.$http.get(this.api + 'vipvideo/search/' + type + '?key=' + key).then(res => {
        res.body.forEach(ele => {
          this.list.push(ele)
        })
        this.count += 1
        console.log(res.body)
      })
    },
    show (item) {
      this.isPlay = this.dialog = true
      // 获取播放源
      this.$http.get(this.api + 'vipvideo/url?url=' + item.link).then(res => {
        if (this.isPlay) {
          this.close()
          let playUrl = res.body
          if (playUrl === '') {
            this.topPopup = true
            return
          }
          try {
            window.external.notify(JSON.stringify({
              type: 0,
              url: playUrl
            }))
          } catch (ex) {
            console.log(playUrl)
          }
          // 获取播放剧集
          this.$http.get(this.api + 'vipvideo/list/url?url=' + item.link).then(res => {
            var data = res.body
            try {
              window.external.notify(JSON.stringify({
                type: 1,
                list: data
              }))
            } catch (ex) {
              console.log(data)
            }
          })
        }
        console.log(res.body)
      }).catch(err => {
        console.log(err)
        this.topPopup = true
      })
    },
    close () {
      this.isPlay = this.dialog = false
    }
  },
  watch: {
    count (newVal, oldVal) {
      if (newVal >= 4) {
        this.isLoading = false
        this.count = 0
      }
    }
  }
}
</script>
<style scoped>
.item{cursor: pointer;}
</style>
