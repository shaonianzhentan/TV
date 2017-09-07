<template>
    <div id="Search">
        <div class="search-panel">
            <mu-text-field label="输入要搜索的影片" v-model="key" @keyup.enter.native="search" fullWidth labelFloat icon="movie" helpText="支持优酷、乐视、腾讯视频、芒果TV" />
            <br/><br/>
            <mu-divider />
        </div>

        <mu-list>

            <mu-sub-header>搜索记录</mu-sub-header>
            <mu-list-item :title="item" v-for="(item,index) in list" :key="index">
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
  methods: {
    init () {
      this.$emit('title', '搜索')
      try {
        this.list = JSON.parse(localStorage['search-list'])
      } catch (ex) {
        this.list = []
      }
    },
    save () {
      localStorage['search-list'] = JSON.stringify(this.list)
    },
    search () {
      if (this.key.trim() === '') return
      var key = this.key
      this.list.push(key)
      console.log(this.list)
      this.save()
      this.key = ''
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
.search-panel{height:101px;position: fixed;top:60px;width:100%;background:white;z-index:100;}

</style>
