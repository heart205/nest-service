import * as http from 'http'
import * as queryString from 'querystring'
import { formInterface } from '../types/magicSign'

export function magicSign(
  cookie: string,
  form: formInterface,
): Promise<boolean> {
  return new Promise((resolve) => {
    const optionsAjax = {
      port: 80,
      host: 'xgmf.g8n.cn',
      path: '/student/course/53901/profiles/29',
      method: 'post',
      timeout: 2000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
        Cookie: cookie,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    const req = http.request(optionsAjax, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        console.log('sign data', data)
        resolve(true)
      })
    })

    req.write(queryString.stringify(form))
    req.end()
  })
}
