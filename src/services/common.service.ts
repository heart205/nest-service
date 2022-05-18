import { Injectable } from '@nestjs/common'
import axios from 'axios'
import type { addressInfo, temperatureInterface } from 'src/types/utilsCommon'
import { useCurrentTemperature } from './hooks/useCurrentTemperature'
// 根据经纬度获取当前的实时天气信息：
// https://m.weather.com.cn/mweather/101320101.shtml
// http://m.weather.com.cn/d/town/index?lat=31.97958&lon=120.89371
@Injectable()
export default class commonService {
  // 获取地理位置信息
  async getLocationTemperature(
    params: addressInfo,
  ): Promise<temperatureInterface> {
    try {
      const { data } = await axios.get(
        `http://m.weather.com.cn/d/town/today?lat=${params.lat}&lon=${params.lon}`,
      )
      const weather = useCurrentTemperature(data)
      // TODO:后续继续扩展
      return weather
    } catch (e) {
      return Promise.reject(new Error('获取实时天气失败'))
    }
  }
}
