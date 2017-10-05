<template>
  <div>

    <mu-grid-list>
      <mu-sub-header>搜索列表</mu-sub-header>
      <mu-grid-tile v-for="(tile, index) in list" class="item" :key="index" @click.native="show(tile)">
        <img :src="tile.img" />
        <span slot="title">{{tile.title}}</span>
        <span slot="subTitle">by
          <b>{{tile.source}}</b>
        </span>
      </mu-grid-tile>
    </mu-grid-list>
    <center>
      <mu-circular-progress :size="90" :strokeWidth="5" v-if="isLoading" />
    </center>

  </div>
</template>

<script>
export default {
  data () {
    return {
      api: 'http://jiluxinqing.top:4000/',
      list: [],
      count: 0,
      isLoading: false
    }
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.$emit('title', '搜索结果')
      var key = this.$route.query.key
      if (key === sessionStorage['searchResult-Key']) return
      sessionStorage['searchResult-Key'] = key
      this.list = []
      this.search('vipsp', key)
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
      this.$router.push({ name: 'Player', query: {link: item.link} })
    }
  },
  watch: {
    count (newVal, oldVal) {
      if (newVal >= 1) {
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
