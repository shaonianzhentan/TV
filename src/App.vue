<template>
  <div id="app">

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-appbar title="VIP视频" />
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="搜索" />
        <mu-list-item title="设置" to="/Setting" />
        <mu-list-item title="关于" to="/About" />
        <mu-list-item v-if="docked" @click.native="open = false" title="Close" />
      </mu-list>
    </mu-drawer>
    <mu-appbar :title="title ">
      <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
    </mu-appbar>
    <div id="app-progress">
      <mu-linear-progress color="#a4c639" v-if="IsLoading" />
    </div>
    <keep-alive>
    <router-view v-on:loading="loading" v-on:title="setTitle"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import light from '!raw-loader!muse-ui/dist/theme-default.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'

export default {
  name: 'app',
  data () {
    return {
      open: false,
      docked: true,
      IsLoading: false,
      title: 'VIP视频',
      themes: {
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  created () {
    var theme = localStorage['theme']
    const styleEl = this.getThemeStyle()
    styleEl.innerHTML = this.themes[theme] || ''
  },
  methods: {
    loading (flag) {
      this.IsLoading = flag
    },
    setTitle (title) {
      this.title = title
    },
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    getThemeStyle () {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    }
  }
}
</script>

<style>
  #app {height:100%;}
  #app-progress .mu-linear-progress{position: fixed;width:100%;top:56px;background:white;}
</style>
