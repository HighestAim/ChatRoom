import { EResponseStatus } from '../enums/EResponseStatus';

interface IResponseModel<T> {
  status?: number;
  errorMessage?: string;
  okMessage?: string;
  result?: T;
  errorCode?: number;
}

export default IResponseModel;
