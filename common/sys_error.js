'use strict';

const ErrorCode = require('./error_code');
const StatusCode = require('./status_code');

class SysError extends Error {
  constructor(message, errorCode = ErrorCode.UNKNOWN_ERROR, status = StatusCode.OK) {
    super(message);

    this.code = errorCode;
    this.status = status;
  }
}

module.exports = SysError;
