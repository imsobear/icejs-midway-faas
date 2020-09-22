/**
 * 该文件为 ICE 渲染页面函数，请勿删除
 * Render 配置文档：https://yuque.antfin-inc.com/ice/rdy99p/ds1xv0#uR3mM
 */

import { Provide, Func, Inject } from '@midwayjs/decorator';
import { FunctionHandler, FaaSContext } from '@ali/midway-faas';
import render from '@ali/ice-faas-render';

@Provide()
@Func('render.handler', { event: 'HTTP', path: '/*' })
export class RenderHandler implements FunctionHandler {
  @Inject()
  ctx: FaaSContext;

  @Inject('baseDir')
  baseDir: string;

  async handler() {
    render(this.ctx, {
      title: 'ICE & Midway Hooks',
      g_config: {},
      baseDir: this.baseDir,
      favicon: 'https://img.alicdn.com/tfs/TB1.WE9xkL0gK0jSZFAXXcA9pXa-200-200.png'
    });
  }
}
