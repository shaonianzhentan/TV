<template>
  <div>    
    <mu-list>
      <mu-sub-header>主题</mu-sub-header>
      <mu-divider/>
      <mu-list-item title="LIGHT" @click="changeTheme('light')">
        <mu-radio  slot="right" name="group" nativeValue="light" :value="theme" uncheckIcon="favorite_border" checkedIcon="favorite"
        @click.native="changeTheme('light')" />        
      </mu-list-item>
      <mu-list-item title="DARK" @click="changeTheme('dark')">
        <mu-radio  slot="right" name="group" nativeValue="dark" :value="theme" uncheckIcon="favorite_border" checkedIcon="favorite"
        @click.native="changeTheme('dark')" />        
      </mu-list-item>
      <mu-list-item title="CARBON" @click="changeTheme('carbon')">
        <mu-radio  slot="right" name="group" nativeValue="carbon" :value="theme" uncheckIcon="favorite_border" checkedIcon="favorite"
        @click.native="changeTheme('carbon')" />
      </mu-list-item>
      <mu-list-item title="TEAL" @click="changeTheme('teal')">
        <mu-radio  slot="right" name="group" nativeValue="teal" :value="theme" uncheckIcon="favorite_border" checkedIcon="favorite"
        @click.native="changeTheme('teal')" />
      </mu-list-item>
    </mu-list>    
  </div>
</template>

<script>
import light from '!raw-loader!muse-ui/dist/theme-default.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'

export default {
  data () {
    return {
      theme: 'light',
      themes: {
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  activated () {
    this.$emit('title', '设置')
  },
  methods: {
    changeTheme (theme) {
      this.theme = theme
      const styleEl = this.getThemeStyle()
      styleEl.innerHTML = this.themes[theme] || ''
      localStorage['theme'] = theme
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
