export class BaseResponse {
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}

export class SuccessResponse<T = string> extends BaseResponse {
  result: T;

  constructor(result: T) {
    super(true);
    this.result = result;
  }
}

export class FailureResponse<T = string> extends BaseResponse {
  error: T;
  errorCode: number;

  constructor(error: T, errorCode: number) {
    super(false);
    this.error = error;
    this.errorCode = errorCode;
  }
}
