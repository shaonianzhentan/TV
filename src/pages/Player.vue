<template>
    <div>
        <mu-card>

            <mu-card-text>
                <p v-for="t in tips" :key="t">{{t}}</p>
                <p>计时开始：{{timeout}}秒</p>
            </mu-card-text>
             <mu-divider />
            <mu-card-actions>
                <mu-flat-button label="返回" secondary @click="close" />
                <mu-flat-button label="播放" primary @click="play" v-if='canPlay' />
            </mu-card-actions>
        </mu-card>
<mu-list>
    <mu-list-item :title="item.title" v-for="(item,index) in playList" :key="index"
    @click.native="show(item.link)">
      <mu-icon slot="right" value="play_circle_outline"/>
    </mu-list-item>
  </mu-list>

    </div>
</template>

<script>
export default {
  data () {
    return {
      api: 'http://jiluxinqing.top:4000/',
      playListAPI: '',
      playUrl: '',
      tips: [],
      playList: [],
      isPlay: false,
      canPlay: false,
      timeout: 0,
      timer: null
    }
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.$emit('title', '播放视频')
      var link = this.$route.query.link
      this.show(link)
      this.timer = setInterval(() => {
        this.timeout ++
      }, 1000)
    },
    show (link) {
      // 获取播放源
      this.playListAPI = this.api + 'vipvideo/list?url=' + link
      this.tips = []
      this.tips.push('正在很努力的获取视频链接，请==')
      this.isPlay = true
      this.canPlay = false
      this.tips.push('预计30秒到达战场')
      this.$http.get(this.api + 'vipvideo/url?url=' + link).then(res => {
        if (this.isPlay) {
          let playUrl = res.body
          if (playUrl === '') {
            this.tips.push('别等啦！出现错误啦！')
            return
          }
          this.canPlay = true
          this.playUrl = playUrl
          this.tips.push('获取视频成功，点击播放看看咯！')
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
              this.playList = data
              this.stop()
            }
          }).catch(() => {
            this.tips.push('获取集数失败啦！')
            this.stop()
          })
        }
      }).catch(err => {
        console.log(err)
        this.tips.push('抱歉啦，出现错误了！再试一行不行就真的不行了')
        this.stop()
      })
    },
    close () {
      this.isPlay = false
      this.stop()
      history.back()
    },
    stop () {
      clearTimeout(this.timer)
    },
    play () {
      try {
        this.tips.push('开始进入播放界面')
        // 使用win10原生播放器
        window.external.notify(this.playUrl)
      } catch (ex) {
        console.log(this.playUrl)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
