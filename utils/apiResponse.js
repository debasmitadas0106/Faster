const apiResponse = async (status_code, err_msg, msg, data) => {
  //data = JSON.stringify(data);
  return { status: status_code, err_msg, msg, data };
};
module.exports = {
  apiResponse,
};
