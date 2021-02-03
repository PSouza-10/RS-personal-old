export default function handleResponse(
  { status = 200, data = {} },
  messageHandler
) {
  if (status.toString().charAt(0) === '2') {
    messageHandler && messageHandler()
    return data
  } else {
    messageHandler && messageHandler(data._id, data.msg)
    return {
      type: 'ERROR',
      info: data
    }
  }
}
