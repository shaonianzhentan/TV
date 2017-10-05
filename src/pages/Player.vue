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
                <mu-flat-button label="重试" @click="init" v-if='isReset' />
                <mu-flat-button label="播放" primary @click="play" v-if='canPlay' />
            </mu-card-actions>
        </mu-card>
        <mu-list>
            <template v-for="(item,index) in playList">
                <mu-list-item :title="item.title" :key="index" @click.native="show(item.link)">
                    <mu-icon slot="right" value="play_circle_outline" />
                </mu-list-item>
                <mu-divider :key="index" />
            </template>
        </mu-list>
    </div>
</template>

<script>
export default {
  data () {
    return {
      api: 'http://localhost:4000/http/request?op=',
      playListAPI: '',
      playUrl: '',
      tips: [],
      playList: [],
      isPlay: false,
      canPlay: false,
      timeout: 0,
      timer: null,
      isReset: false
    }
  },
  activated () {
    this.init()
  },
  methods: {
    getUrl (args) {
      return this.api + encodeURIComponent(JSON.stringify(args))
    },
    init () {
      this.$emit('title', '播放视频')
      var link = this.$route.query.link
      this.$http.get(this.getUrl({url: link})).then(res => {
        var body = res.body
        var data = body.match(/:'(\S+\*_\*)/)[1] + body.match(/<span class='shipy' >(\S*?)<\/span>/)[1]
        this.$http.get(this.getUrl({
          url: 'http://www.vipsp.cc/ps.html',
          method: 'POST',
          form: {
            data: data,
            t: '{tokens1}'
          }
        })).then(res => {
          var vjszy = document.getElementById('vjszy')
          if (!vjszy) {
            vjszy = document.createElement('div')
            vjszy.id = 'vjszy'
            vjszy.style.display = 'none'
            document.body.appendChild(vjszy)
          }
          vjszy.innerHTML = res.body
          this.getlist(vjszy)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取集数
    getlist (vjsz) {
      console.log(vjsz)
      var arr = []
      var a = vjsz.querySelectorAll('a')
      for (var i = 0; i < a.length; i++) {
        let ele = a[i]
        var tmp = ele.getAttribute('href')
        arr.push({
          title: ele.innerText,
          link: tmp
        })
        // console.log(ele)
      }
      /*
      a.forEach((ele) => {
        var tmp = ele.getAttribute('onclick')
        .replace('bofang(\'', '')
        .replace('\',\'\',this)', '')
        var tmp = ele.getAttribute('href')
        arr.push({
          title: ele.innerText,
          link: tmp
        })
        console.log(ele)
      })
      */
      this.playList = arr
    },
    show (link) {
      document.querySelector('.mu-card').scrollIntoView()
      this.tips = []
      this.tips.push('正在很努力的获取视频链接，请==')
      this.isPlay = true
      this.isReset = false
      this.canPlay = false
      this.timeout = 0


      this.ff.src = 'https://vip.api.47ks.com/cp0309/?v=' + link
      this.ff.onload = () => {
        /*
        this.timer = setInterval(() => {
          var videoPlayer = this.ff.contentDocument.querySelector('#videoPlayer')
          if (videoPlayer) {
            this.stop()
            this.tips.push('获取视频成功，点击播放看看咯！')
            this.canPlay = true
            this.playUrl = videoPlayer.src
          }
          console.log(videoPlayer)
          this.timeout ++
          if (this.timeout >= 20) {
            this.tips.push('别等啦！没有找到视频链接哇！')
            this.stop()
          }
        }, 1000)
        */
      }
      /*
      // 获取播放源
      this.playListAPI = this.api + 'vipvideo/list?url=' + link
      this.tips = []
      this.playList = []
      this.tips.push('正在很努力的获取视频链接，请==')
      this.isPlay = true
      this.isReset = false
      this.canPlay = false
      this.timeout = 0
      this.timer = setInterval(() => {
        this.timeout ++
      }, 1000)
      this.tips.push('预计30秒到达战场')
      this.$http.get(this.api + 'vipvideo/url?url=' + link).then(res => {
        if (this.isPlay) {
          let playUrl = res.body
          if (playUrl === '') {
            this.tips.push('别等啦！没有找到视频链接哇！')
            this.stop()
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
        this.isReset = true
        this.stop()
      })
      */
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
