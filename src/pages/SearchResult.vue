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





  <mu-dialog :open="dialog" title="好朋友提示">
    <p v-for="t in tips" :key="t">{{t}}</p>
    <mu-flat-button label="不等了" slot="actions" secondary @click="close" />
      <mu-raised-button label="播放" slot="actions" primary @click="play" v-if='canPlay' />
    
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
      isPlay: false,
      canPlay: false,
      playUrl: '',
      playListAPI: '',
      tips: []
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
      // 获取播放源
      this.playListAPI = this.api + 'vipvideo/list?url=' + item.link
      this.tips = []
      this.tips.push('正在很努力的获取播放链接，请骚等')
      this.isPlay = this.dialog = true
      this.canPlay = false
      this.tips.push('预计30秒到达战场')
      this.$http.get(this.api + 'vipvideo/url?url=' + item.link).then(res => {
        if (this.isPlay) {
          let playUrl = res.body
          if (playUrl === '') {
            this.tips.push('别等啦！出现错误啦！')
            return
          }
          this.canPlay = true
          this.playUrl = playUrl
          this.tips.push('获取视频成功，点击播放看看咯！')
        }
      }).catch(err => {
        console.log(err)
        this.tips.push('抱歉啦，出现错误了！再试一行不行就真的不行了')
      })
    },
    close () {
      this.isPlay = this.dialog = false
    },
    play () {
      try {
        this.tips.push('开始进入播放界面')
        // 使用win10原生播放器
        window.external.notify(JSON.stringify({
          type: 0,
          url: this.playUrl
        }))
      } catch (ex) {
        console.log(this.playUrl)
      }
      this.tips.push('获取电视剧的集数（如果有的话）')
      // 获取播放剧集
      this.$http.get(this.playListAPI).then(res => {
        this.tips.push('获取集数成功，正在解析')
        if (this.isPlay) {
          var data = res.body
          if (data.length === 0) {
            this.tips.push('没有获取到集数')
            return
          }
          this.tips.push('解析成功，正在显示到界面')
          try {
            // 将获取到的集数，传到win10界面
            window.external.notify(JSON.stringify({
              type: 1,
              list: data
            }))
          } catch (ex) {
            console.log(data)
          }
        }
      }).catch(() => {
        this.tips.push('获取集数失败啦！我只能说Sorry咯!')
      })
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
