export interface BaseResponse {
  success: boolean;
}

export interface SuccessResponse<T = unknown> extends BaseResponse {
  success: true;
  result: T;
}

export interface FailureResponse<T = unknown> extends BaseResponse {
  success: false;
  error: T;
  errorCode: number;
}
