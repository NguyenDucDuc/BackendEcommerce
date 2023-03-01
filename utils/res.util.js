module.exports = {
  successful: (code, data = [], message = '') => {
    return {
      code: code,
      data: {
        status: code,
        data: data,
        message: message,
      },
    };
  },
  clientError: (code, message) => {
    return {
      code: code,
      data: {
        status: code,
        message: message,
      },
    };
  },
  serverError: () => {
    return {
      code: 500,
      data: {
        status: 500,
        message: 'Đã có lỗi xảy ra !',
      },
    };
  },
};
