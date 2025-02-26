const {
  createUserDetailsBusiness,
} = require("../Business/userBusiness");

const createUserDetailsController = async (req, res) => {
  try {
    // Pass request body and query params to the business logic
    const resp = await createUserDetailsBusiness(req.body, req.query);

    // Send a success response
    return res.status(200).json({
      success: true,
      data: resp,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in createEmployeeDetailsController:", error);

    // Send an error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createUserDetailsController };
