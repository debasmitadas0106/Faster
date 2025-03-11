const {
  createproviderBusiness,
  getproviderBusiness,
  deleteproviderBusiness,
  updateproviderBusiness,
} = require("../Business/providerBusiness");

const { setupresponse } = require("../../utils/Response");

const createprovidercontroller = async (req, res) => {
  try {
    const resp = await createproviderBusiness(req.body, req.query);
    let statusCode = 201;
    if (resp.statusCode == 400) {
      statusCode = 400;
    }
    finalresponse = setupresponse(res, statusCode, resp);
    return finalresponse;
  } catch (error) {
    console.error("Error in create provider controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while",
      error: error.message,
    });
  }
};

const getprovidercontroller = async (req, res) => {
  try {
    const resp = await getproviderBusiness(req.query, req.query);
    if (resp["useremployeedetail"] == null && resp["statusCode"] == 404) {
      const finalresponse = setupresponse(
        res,
        resp["statusCode"],
        resp["useremployeedetail"]
      );
      return finalresponse;
    }
    const statusCode = 200;
    resp["method"] = "get";
    const finalresponse = setupresponse(res, statusCode, resp);
    return finalresponse;
  } catch (error) {
    console.error("Error in get provider controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteprovidercontroller = async (req, res) => {
  try {
    let resp = await deleteproviderBusiness(req.query);
    if (resp["statusCode"] == 404) {
      const finalresponse = setupresponse(
        res,
        (statusCode = 404),
        (resp = null)
      );
      return finalresponse;
    }
    resp["method"] = "delete";
    resp["email"] = req.query["email"];
    const finalresponse = setupresponse(res, (statusCode = 200), resp);
    return finalresponse;
  } catch (error) {
    console.error("Error in delete provider controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const updateprovidercontroller = async (req, res) => {
  try {
    let resp = await updateproviderBusiness(req.body, req.query);
    resp["method"] = "update";
    if (resp["useremployeedetail"] == null && resp["statusCode"] == 404) {
      return setupresponse(res, (statusCode = 404), (resp = null));
    }
    const finalresponse = setupresponse(res, (statusCode = 200), resp);
    return finalresponse;
  } catch (error) {
    console.error("Error in update provider controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createprovidercontroller,
  getprovidercontroller,
  deleteprovidercontroller,
  updateprovidercontroller,
};
