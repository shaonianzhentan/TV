<template>
    <div>
        <mu-list>
            <mu-sub-header>程序信息</mu-sub-header>
            <mu-list-item title="名称" describeText="VIP视频">
                <mu-icon slot="left" value="inbox" />
            </mu-list-item>
            <mu-list-item title="版本" :describeText="ver">
                <mu-icon slot="left" value="grade" />
            </mu-list-item>
            <mu-list-item title="声明" describeText="本程序不提供数据存储，内容均来自网络抓取">
                <mu-icon slot="left" value="description" />
            </mu-list-item>
            <mu-list-item title="评分" describeText="我 VIP视频 打分"
            href="ms-windows-store://review/?ProductId=9pcgrgcp93d7">
                <mu-icon slot="left" value="description" />
            </mu-list-item>            
        </mu-list>
        <mu-divider/>
        <mu-list>
            <mu-sub-header>联系方式</mu-sub-header>
            <mu-list-item title="QQ" describeText="635147515" 
                href="http://sighttp.qq.com/authd?IDKEY=51ee8227c75bf1ef6ca750357cc5594313c4379984863d38" target="_blank">
                <mu-icon slot="left" value="textsms" />
            </mu-list-item>
            <mu-list-item title="QQ群" describeText="429569316"
                href="http://shang.qq.com/wpa/qunwpa?idkey=6c46d4163e7d2180d213c7c5f590a982b961b10a47f1d1b2d511aece389d7aef" target="_blank">
                <mu-icon slot="left" value="sentiment_very_satisfied" />
            </mu-list-item>
            <mu-list-item title="邮箱" describeText="jiluxinqing@qq.com" href="mailto:jiluxinqing@qq.com?subject=VIP视频应用反馈">
                <mu-icon slot="left" value="drafts" />
            </mu-list-item>            
        </mu-list>
    </div>
</template>

<script>
export default {
  data () {
    return {
      ver: 'v1.0.0'
    }
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.$emit('title', '关于')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
