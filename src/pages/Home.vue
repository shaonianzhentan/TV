<template>
  <div>
    {{text}}
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      text: 'hello word'
    }
  },
  methods: {
    handleChange (val) {
      this.text = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
