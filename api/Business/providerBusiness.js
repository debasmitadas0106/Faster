const {
  findproviderService,
  createproviderservice,
  deleteproviderservice,
  updateproviderservice,
} = require("../Service/providerService");

const createproviderBusiness = async (payload, query) => {
  try {
    let { username, password, email } = payload;
    const dbpayload = {
      ...payload,
    };
    console.log("createbusinesspayload=", dbpayload);
    const getprovider = await findproviderService({
      $or: [{ username }, { email }],
    });
    if (getprovider) {
      return getprovider.username === username
        ? "Username already exists in provider"
        : "Email already exists in provider";
    }
    const userDetails = await createproviderservice(dbpayload);
    return userDetails;
  } catch (error) {
    console.log(error);
  }
};

const getproviderBusiness = async (payload, query) => {
  try {
    let { username, email } = payload;
    const condition = {
      $or: [{ username }, { email }],
    };
    const getprovider = await findproviderService(condition);
    return getprovider;
  } catch (error) {
    console.log(error);
  }
};

const deleteproviderBusiness = async (payload, query) => {
  try {
    let { username, email } = payload;
    const dbPayload = {
      ...payload,
    };
    // const deleteprovider=await findproviderService({
    //     $or:[(username),{email}],
    // });
    const providerdetails = await deleteproviderservice(dbPayload);
    return providerdetails;
  } catch (error) {
    console.log(error);
  }
};
const updateproviderBusiness = async (payload, query) => {
  try {
    console.log("payload==", payload);
    let { email } = query;
    const dbpayload = {
      ...payload,
    };
    const condition = {
      email: email,
    };
    const providerdetails = await updateproviderservice(condition, dbpayload);
    return providerdetails;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createproviderBusiness,
  getproviderBusiness,
  deleteproviderBusiness,
  updateproviderBusiness,
};
