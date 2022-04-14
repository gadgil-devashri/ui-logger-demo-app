export default function browserDetails() {
  const module = {
    options: [],
    header: [
      navigator.platform,
      navigator.userAgent,
      navigator.appVersion,
      navigator.vendor,
      window.opera
    ],
    dataos: [
      {
        name: 'Windows Phone',
        value: 'Windows Phone',
        version: 'OS'
      },
      { name: 'Windows', value: 'Win', version: 'NT' },
      { name: 'iPhone', value: 'iPhone', version: 'OS' },
      { name: 'iPad', value: 'iPad', version: 'OS' },
      { name: 'Kindle', value: 'Silk', version: 'Silk' },
      { name: 'Android', value: 'Android', version: 'Android' },
      { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
      { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
      { name: 'Macintosh', value: 'Mac', version: 'OS X' },
      { name: 'Linux', value: 'Linux', version: 'rv' },
      { name: 'Palm', value: 'Palm', version: 'PalmOS' }
    ],
    databrowser: [
      { name: 'Edge', value: 'Edge', version: 'Edge' },
      { name: 'Edge', value: 'Edg', version: 'Edg' },
      { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
      { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
      { name: 'Safari', value: 'Safari', version: 'Version' },
      {
        name: 'Internet Explorer',
        value: 'rv',
        version: 'rv'
      },
      {
        name: 'Internet Explorer',
        value: 'MSIE',
        version: 'MSIE'
      },
      { name: 'Opera', value: 'Opera', version: 'Opera' },
      { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
      { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
    ],
    init() {
      const isUiWebview = /((iPhone|iPod|iPad).*AppleWebKit(?!.*Version)|; wv)/i.test(
        navigator.userAgent
      )
      const agent = this.header.join(' ')
      const os = this.matchItem(agent, this.dataos)
      const browser = this.matchItem(agent, this.databrowser)

      return {
        os,
        browser: {
          ...browser,
          name: isUiWebview ? 'Mobile Webview' : browser.name
        }
      }
    },
    matchItem(string, data) {
      let i = 0
      let j = 0
      let regex
      let regexv
      let match
      let matches
      let version

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, 'i')
        match = regex.test(string)
        if (match) {
          regexv = new RegExp(`${data[i].version}[- /:;]([\\d._]+)`, 'i')
          matches = string.match(regexv)
          version = ''

          if (matches) {
            matches = matches?.[1]?.split(/[._]+/)
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += `${matches[j]}.`
              } else {
                version += matches[j]
              }
            }
          } else {
            version = '0'
          }
          return {
            name: data[i].name,
            version: parseFloat(version)
          }
        }
      }
      return { name: 'unknown', version: 0 }
    }
  }

  const e = module.init()
  return {
    browserOS: e.os.name,
    OSVersion: e.os.version,
    browserName: e.browser.name,
    browserVersion: e.browser.version,
    userAgent: navigator.userAgent,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    vendor: navigator.vendor
  }
}
