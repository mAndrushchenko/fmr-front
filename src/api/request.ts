import type { IEndpoint, IHeaders, TResponse } from 'src/types/api'

export const request = async ({
  url, method = 'GET', body: bodyData, token, fd
}: IEndpoint): Promise<TResponse> => {
  let body
  const headers: IHeaders = {}

  try {
    if (bodyData) {
      body = JSON.stringify(bodyData)
      headers['Content-Type'] = 'application/json'
    } else if (fd) {
      body = fd
      // log for develop
      for (const key of body) {
        console.log(key)
      }
    }
    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    const response: Response = await fetch(url, { method, body, headers })
    const status = response.ok
    const resData = await response.json()

    if (status) {
      const { message, data } = resData
      return { status, data, message }
    }
    // Just for now. Next we will change that on alert from Material
    console.error(resData.message)
    return { status, message: resData.message, data: null }
  } catch (err) {
    return { message: err.message, status: err.status, data: null }
  }
}
