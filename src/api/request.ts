import { IEndpoint } from '@types-fmr/api'

export const request = async ({ uri, method = 'GET', body, token, headers = {} }: IEndpoint): Promise<any> => {
  try {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response: Response = await fetch(uri, { method, body, headers })
    const status = response.ok
    const statusNumber = response.status

    if (!status) {
      const data = await response.json()
      const message = data.message
      console.error(message) // Just for now. Next we will change that on alert from Material
    }
    if (statusNumber !== 204) {
      const userData = await response.json()
      return { status, userData }
    }
    return { status, userData: {} }
  } catch (err) {
    return { message: err.message }
  }
}

