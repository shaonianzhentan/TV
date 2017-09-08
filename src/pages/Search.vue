<template>
    <div id="Search">
        <div class="search-panel mu-card">
            <mu-text-field label="输入要搜索的影片" v-model="key" @keyup.enter.native="search" fullWidth labelFloat icon="movie" helpText="支持优酷、乐视、腾讯视频、芒果TV" />
            <br/><br/>
            <mu-divider />
        </div>

        <mu-list>

            <mu-sub-header>搜索记录</mu-sub-header>
            <mu-list-item :title="item" v-for="(item,index) in list" :key="index" 
            @click.native="search(item)">
                <mu-avatar color="pinkA200" :style="{'margin-left': '-8px'}" backgroundColor="transparent" slot="leftAvatar">
                    {{item[0]}}</mu-avatar>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                    <mu-menu-item title="删除" @click="del(index)" />
                </mu-icon-menu>
            </mu-list-item>

        </mu-list>
        <mu-divider inset/>
        <mu-list>

            <mu-sub-header>推荐</mu-sub-header>
            <mu-list-item :title="item" v-for="(item,index) in tj" :key="index">
                <mu-avatar color="pinkA200" :style="{'margin-left': '-8px'}" backgroundColor="transparent" slot="leftAvatar">
                    {{item[0]}}</mu-avatar>
            </mu-list-item>

        </mu-list>

    </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      tj: [],
      key: ''
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.$emit('title', '搜索')
  },
  methods: {
    init () {
      try {
        this.list = JSON.parse(localStorage['search-list'])
      } catch (ex) {
        this.list = []
      }
      this.tj.push('女生怎么这样啊')
      this.tj.push('朋友都很好啊')
      this.tj.push('友情果然比爱情靠谱')
      this.tj.push('不过，有时还好啦')
      this.tj.push('让我一次写个够')
      this.tj.push('写点东西挺好的')
      this.tj.push('程咬金有三板斧，我没有')
      this.tj.push('序章从这里开始')
      this.tj.push('啊啊啊啊啊啊啊啊')
    },
    save () {
      localStorage['search-list'] = JSON.stringify(this.list)
    },
    search (args) {
      if (typeof args === 'string') this.key = args
      if (this.key.trim() === '') return
      var key = this.key
      var index = this.list.findIndex((ele) => {
        return key === ele
      })
      if (index < 0) this.list.push(key)
      console.log(this.list)
      this.save()
      this.key = ''
      this.$router.push({ name: 'SearchResult', query: {key: key} })
    },
    del (index) {
      this.list.splice(index, 1)
      this.save()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Search{padding-top:100px;}
.search-panel{height:101px;position: fixed;top:56px;width:100%;z-index:100;}
</style>
