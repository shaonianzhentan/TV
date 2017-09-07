export default {
  install (Vue, options) {
    class API {
      constructor () {
        this.api = 'http://jiluxinqing.top:4000'
      }
    }

    let hs = new API()
    Vue.prototype.API = hs
  }
}
