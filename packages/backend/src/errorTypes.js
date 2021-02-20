module.exports = {
  NOT_FOUND: {
    _id: 'NOT_FOUND',
    msg: 'O recurso solicitado não foi encontrado'
  },
  ACCESS_DENIED: {
    _id: 'ACCESS_DENIED',
    msg: 'Você não tem permissão para acessar esse recurso'
  },
  INVALID_CREDENTIALS: {
    _id: 'INVALID_CREDENTIALS',
    msg: 'As credenciais enviadas são inválidas'
  },
  RESOURCE_ALREADY_EXISTS: {
    _id: 'RESOURCE_ALREADY_EXISTS',
    msg: 'Já existe um recurso com esse nome ou título'
  },
  USER_NOT_FOUND: {
    _id: 'USER_NOT_FOUND',
    msg: 'Não foi encontrado um usuário com as credenciais enviadas'
  },
  SERVER_ERROR: {
    _id: 'SERVER_ERROR',
    msg: 'Ocorreu um erro no servidor'
  }
}
