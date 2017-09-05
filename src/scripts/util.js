export default {
  install (Vue, options) {
    class HomeService {
      constructor () {
        this.api = localStorage['REMOTE-IP'] || 'http://127.0.0.1:8888/'
      }

      setapi (url) {
        this.api = url
        localStorage['REMOTE-IP'] = url
      }

      getapi (cb) {
        cb()
      }
    }

    let hs = new HomeService()
    Vue.prototype.HomeService = hs
  }
}
