const setupresponse = async (res, statusCode, data) => {
  // console.log('res=,','statusCode',statusCode,'data',data)
  if (statusCode === 200 && data != null && data["method"] == "get") {
    return res.status(200).json({
      success: true,
      message: `${data["email"]} details are: `,
      data: data,
    });
  } else if (statusCode === 404 && (data == null || data == undefined)) {
    // console.log('in the response',statusCode,data);
    return res.status(404).json({
      success: true,
      message: `Account not present with the given email`,
    });
  } else if (statusCode == 201 && data != null) {
    return res.status(201).json({
      success: true,
      message: `Account got created with the email ${data["email"]} successfully`,
      data: data,
    });
  } else if (statusCode == 400 && data != null) {
    return res.status(400).json({
      success: true,
      message: `Account already existed with the email ${data["email"]}`,
    });
  } else if (statusCode == 200 && data["method"] == "update") {
    return res.status(200).json({
      success: true,
      data: `Account updated successfully`,
    });
  } else if ((statusCode = 200 && data["method"] == "delete")) {
    return res.status(200).json({
      success: true,
      data: `Account with email ${data["email"]} got deleted succesfully`,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { setupresponse };
