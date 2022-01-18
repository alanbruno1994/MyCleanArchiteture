const OperationBeenSucceeded = 200; // Usado para operacoes bem sucedidas
const DataCreatedSuccess = 201; // Usado para operacoes em algum dado e criado
const OperationBeenSucceededNoReply = 204; // Usado para uma operacao feita com sucesso mais que nao deve ter retorno
const DataInvalid = 400; // Aqui e usado quando acontece um erro de validacao, ou seja, quando o usaurio passa dados incorretos ao servidor
const InvalidCredentials = 401; // Aqui seria usado quando os dados passados para fazer um login nao esta valido
const NotAuhtorized = 403; // Aqui e usado quando o token nao esta valido ou quando nao tem o nivel de acesso apropriado a um recuso
const NotFound = 404; // Aqui se refere a um rota que nao existe ou no caso de nao for encontrado um recurso
const MetaDataError = 415; // Os metadatos enviados na requisicao nao estao corretos
const InternalServerError = 500; // Usado quando acontece um erro no servidor
export {
  OperationBeenSucceeded,
  DataCreatedSuccess,
  OperationBeenSucceededNoReply,
  DataInvalid,
  InvalidCredentials,
  NotAuhtorized,
  NotFound,
  MetaDataError,
  InternalServerError,
};
