const response = async (resp) => {
  if (resp.status == 200) {
    return {
      status: "success",
      ...(resp.msg && { message: resp.msg }),
      data: resp.data || null,
    };
  } else {
    return {
      status: "error",
      err_msg: resp.err_msg || "An error occurred",
    };
  }
};

module.exports = {
  response,
};
