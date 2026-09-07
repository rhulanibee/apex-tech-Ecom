const formatResponse = (success, data = null, message = null, errors = null) => ({
  success,
  data,
  message,
  errors,
});

export default formatResponse;
