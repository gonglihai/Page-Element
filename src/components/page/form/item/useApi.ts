import { ref, watchEffect, toValue, computed } from 'vue'
import { get } from '../../util/Api'

export interface UseApiError {
  error: boolean
  message: string | null
}

export function useApi(url: string | undefined | null, params: any, options: any) {
  // 响应数据
  const responseData = ref<any>(null)
  // 错误状态
  const error = ref<UseApiError>({ error: false, message: null })
  // 加载状态
  const loadding = ref<boolean>(false)

  // 计算属性, thisOptions 选项
  const thisOptions = computed(() => {
    return toValue(url) ? responseData.value : options
  })

  // 加载数据
  const reload = () => {
    loadding.value = true
    const requestUrl = toValue(url)
    const requestParams = toValue(params)
    // url 不存在
    if (!requestUrl) {
      loadding.value = false
      return
    }
    // 请求
    get(requestUrl, requestParams)
      .then((r) => {
        responseData.value = r.data
        error.value.error = false
        error.value.message = null
      })
      .catch((r) => {
        error.value.error = true
        error.value.message = r.message
      })
      .finally(() => {
        loadding.value = false
      })
  }
  // watch
  watchEffect(reload)

  return { loadding, data: responseData, error, reload, thisOptions }
}
