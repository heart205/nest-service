import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { jueEntitys } from 'src/entity/jue.entity';
import type { addSignInfo, result, signInfo } from './jue.interface';
@Injectable()
export class jueServices {
  constructor(
    @InjectRepository(jueEntitys)
    private readonly jueEntity: Repository<jueEntitys>,
  ) {}

  async sign(d: jueEntitys[]): Promise<any> {
    const res = await axios.request({
      url: 'https://api.juejin.cn/growth_api/v1/check_in',
      method: 'post',
      params: {
        aid: d[0].aid,
        uuid: d[0].uuid,
      },
      headers: {
        Cookie: d[0].cookies,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }

  async addSignInfo(data: addSignInfo): Promise<result> {
    const { aid, uuid, cookies } = data;
    try {
      const d = await this.jueEntity.save({ aid, uuid, cookies });
      return {
        msg: '新增数据成功',
        data: d.id,
        code: 1,
      };
    } catch (e) {
      console.log(e);
      return {
        msg: '新增失败',
        code: 0,
        data: e.sqlMessage,
      };
    }
  }

  async dialySign(data: signInfo): Promise<result> {
    const { id } = data;
    try {
      const d = await this.jueEntity.find({ where: { id } });
      // 请求签到接口
      if (d.length > 0) {
        const result = await this.sign(d);
        console.log('dialySign', result);
        return {
          code: 1,
          msg: result.err_msg || '签到成功',
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        code: 0,
        msg: '签到失败',
        data: e.sqlMessage,
      };
    }
  }

  async autoSign(): Promise<result> {
    try {
      const arr = await this.jueEntity.find();
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        const res = await this.sign([arr[i]]);
        result.push({
          ...res,
          id: arr[i].id,
        });
      }
      return {
        msg: '自动签到成功',
        code: 1,
        data: result,
      };
    } catch (e) {
      console.log(e);
      return {
        msg: e.sqlMessage,
        code: 0,
        data: null,
      };
    }
  }
}
