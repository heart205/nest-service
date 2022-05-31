/**
 * @author heart
 * @description
 * @Date 2022-05-18
 */

import { temperatureInterface } from '../../types/utilsCommon'

function getWeatherInfo(html: string, data, curReg: RegExp): string | null {
  // const reg = /wcontent\-temp\"\>(.*?)\<\/div/
  const reg = new RegExp(`${data}">(.*?)</div`)
  if (reg.test(html.toString())) {
    if (curReg.test(RegExp.$1)) {
      return RegExp.$1
    }
  }
}

export function useCurrentTemperature(html: string): temperatureInterface {
  // 匹配 wcontent-temp 之后的div内容
  const currentTemperature = getWeatherInfo(
    html,
    'wcontent-temp',
    /\>([^\<].*?)°/,
  )
  const weatherInfo = getWeatherInfo(html, 'weatherInfo', /\>([^\<].*?)\<\//)
  console.log(weatherInfo)
  return {
    currentTemperature: currentTemperature ? currentTemperature + '°C' : '',
    weatherInfo,
  }
}
