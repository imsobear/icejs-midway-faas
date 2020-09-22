import { useContext } from '@ali/midway-hooks';

/**
 * 获取请求 Method（GET/POST）
 * Hooks 概览：https://yuque.antfin-inc.com/fanyi.lzj/hooks/syntax
 */
export function useMethod() {
  const { method } = useContext();
  return method;
}
