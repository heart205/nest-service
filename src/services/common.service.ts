import { Injectable } from '@nestjs/common'
import axios from 'axios'
import type { addressInfo, temperatureInterface } from 'src/types/utilsCommon'
import magicSignEntity from 'src/entity/magicSign.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { useCurrentTemperature } from './hooks/useCurrentTemperature'
import { formInterface } from 'src/types/magicSign'
import { magicSign } from 'src/scripts/magicSign'
// 根据经纬度获取当前的实时天气信息：
// https://m.weather.com.cn/mweather/101320101.shtml
// http://m.weather.com.cn/d/town/index?lat=31.97958&lon=120.89371

@Injectable()
export default class commonService {
  constructor(
    @InjectRepository(magicSignEntity)
    private readonly magicSignObject: Repository<magicSignEntity>,
  ) {}
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

  // 打卡
  async magicSign(params: { id: number }): Promise<boolean> {
    try {
      console.log('id value', params.id)
      const form = await this.magicSignObject.findOne({
        where: {
          id: params.id,
        },
      })

      console.log(form)
      // 请求签到接口
      const data: formInterface = {
        form_id: 0,
        formid: 0,
        'formdata[fn_1]': '',
        'formdata[fn_2]': '',
        'formdata[fn_3]': '',
        'formdata[fn_4]': '',
        'formdata[fn_5]': '',
        'formdata[fn_6]': '',
        'formdata[gps_addr]': '',
        'formdata[gps_xy]': '',
      }
      Object.keys(form).reduce((pre, cur: string): formInterface => {
        if (cur === 'formId') {
          pre['form_id'] = form[cur]
        } else if (cur === 'formDataId') {
          pre['formid'] = form[cur]
        } else if (/formdata/.test(cur)) {
          pre[cur] = form[cur]
        }
        return pre
      }, data)
      return await magicSign(form.cookie, data)
    } catch (e) {
      console.log(e)
      return Promise.reject(new Error(e.message))
    }
  }
}
