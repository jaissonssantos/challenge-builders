import axios, { AxiosError } from 'axios';
import * as AxiosLogger from 'axios-logger';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

const handleError = (err: AxiosError): string => {
  if(!err.response){
    return 'Não foi possível comunicar com o servidor, tente novamente em alguns minutos.'
  }

  if(err.response.data.message){
    return err.response.data.message
  }

  if(err.response.data){
    return err.response.data.message
  } else {
    return 'Erro desconhecido, tente novamente em breve.'
  }
}

// REQUEST LOGGER
api.interceptors.request.use(AxiosLogger.requestLogger)

// RESPONSE LOGGER
api.interceptors.response.use(AxiosLogger.responseLogger);

api.interceptors.response.use(
  response => response,
  err => {
    err.message = handleError(err);
    return Promise.reject(err);
  },
);

export { AxiosError }
export default api;
