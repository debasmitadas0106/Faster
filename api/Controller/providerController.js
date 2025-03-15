const {
  createproviderBusiness,
  getproviderBusiness,
  deleteproviderBusiness,
  updateproviderBusiness,
} = require("../Business/providerBusiness");
const {apiResponse}=require('../../utils/apiResponse')

const createprovidercontroller = async (req, res) => {
  try {
    const resp = await createproviderBusiness(req.body, req.query);
    return apiResponse(status_code=200,message=resp,res);
  } catch (error) {
    console.error("Error in create provider controller:", error);
    return apiResponse(status_code=500,message=error,res);
  }
};

const getprovidercontroller = async (req, res) => {
  try {
    console.log("req=", req.query, "res=", res.query);
    const resp = await getproviderBusiness(req.query, req.query);
    console.log('resp=in control=',resp)
    if(resp==null){
      return apiResponse(status_code=404,message=resp,res);
    }
    else{
      return apiResponse(status_code=200,message=resp,res);
    }
  } catch (error) {
    console.error("Error in get provider controller:", error);
    return apiResponse(status_code=500,message=error,res);
  }
};

const deleteprovidercontroller = async (req, res) => {
  try {
    const resp = await deleteproviderBusiness(req.query);
    console.log("resp==", resp);
    if (resp['deletedCount']==0){
    return apiResponse(status_code=404,message=resp,res);
    }
    return apiResponse(status_code=200,message=`${req.query['email']} Data got deleted`,res);
  } catch (error) {
    console.error("Error in delete provider controller", error);
    return apiResponse(status_code=500,message=error,res);
  }
};
const updateprovidercontroller = async (req, res) => {
  try {
    const resp = await updateproviderBusiness(req.body, req.query);
    if (resp["matchedCount"]==0){
    return apiResponse(status_code=404,message=resp,res);
    }
    else{
      return apiResponse(status_code=200,message=`${req.body['email']} Data got updated`,res);
    }
  } catch (error) {
    console.error("Error in delete provider controller", error);
    return apiResponse(status_code=500,message=error,res);
  }
};

module.exports = {
  createprovidercontroller,
  getprovidercontroller,
  deleteprovidercontroller,
  updateprovidercontroller,
};
