export class RouterURL {
  #url

  constructor(foo, opts = {}) {
    this.#url = new URL(foo)
    this.base = opts.base ?? ''
  }

  set url (val) {
    this.#url = new URL(val)
  }

  get url () {
    return this.#url.href
  }

  get hash () {
    return this.#url.hash
  }

  get path () {
    return this.#url.pathname.replace(this.base, '')
  }

  get query () {
    return Object.fromEntries(
      new URLSearchParams(
        this.#url.href.indexOf('?') > -1 ? this.#url.href.split('?').pop() : ''
      )
    )
  }

  resolve (path, params, replace = false) {
    const l = this.#url.origin + this.base + path
    const r = replace
      ? new URLSearchParams(params).toString()
      : new URLSearchParams({ ...this.query, ...params }).toString()
    this.url = l + (r ? '?' + r : '') + this.#url.hash
    return this
  }
}
