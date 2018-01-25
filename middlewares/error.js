module.exports = () => {
  return async (ctx, next) => {
    await next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
          message: 'token认证失败'
        };
      } else {
        throw err;
      }
    });
  }
}