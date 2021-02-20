
interface ServerResponse {
  status: number,
  data: any
}

export default function handleResponse(
  { status = 200, data  } : ServerResponse,
  messageHandler?: any
) {
  if (status.toString().charAt(0) === '2') {
    messageHandler && messageHandler(data)
    return data
  } else {
    messageHandler && messageHandler(data._id, data.msg)
    return {
      type: 'ERROR',
      info: {
        msg: data.msg
      }
    }
  }
}
