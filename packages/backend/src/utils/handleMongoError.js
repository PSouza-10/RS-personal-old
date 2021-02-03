const errorTypes = require('../errorTypes')

async function handleMongoError(error, response) {
  let errorMsg
  console.log(error.code === 11000)
  switch (error.code) {
    case 11000:
      errorMsg = errorTypes.RESOURCE_ALREADY_EXISTS
      break
    default:
      errorMsg = errorTypes.SERVER_ERROR
  }
  return response.status(400).send(errorMsg)
}

module.exports = handleMongoError
