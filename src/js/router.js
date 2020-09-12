class Router {
  constructor() {
    this.routes = []
  }

  get(uri, callback) {
    const route = {
      uri,
      callback,
    }
    this.routes.push(route)
  }

  init() {
    this.routes.some((route) => {
      let regEx = new RegExp(`^${route.uri}$`)
      let path = window.location.pathname

      if (path.match(regEx)) {
        let req = { path }
        return route.callback.call(this, req)
      }
    })
  }
}

export default Router
