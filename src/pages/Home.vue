<template>
<div>

<mu-grid-list class="gridlist-demo">
    <mu-sub-header>图片展示</mu-sub-header>
    <mu-grid-tile v-for="(tile, index) in list" :key="index">
      <img :src="tile.image"/>
      <span slot="title">{{tile.title}}</span>
      <span slot="subTitle">by <b>{{tile.author}}</b></span>
      <mu-icon-button icon="star_border" slot="action"/>
    </mu-grid-tile>
  </mu-grid-list>

</div>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      docked: true,
      list: []
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  }
}
</script>
