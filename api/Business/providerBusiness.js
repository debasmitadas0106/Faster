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
    const userDetails = await createproviderservice(dbpayload);
    // console.log('bussiness details in createexist',userDetails);
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
    const deleteprovider = await findproviderService({ email });
    console.log("deletebussin", deleteprovider);
    if (deleteprovider["statusCode"] != 404) {
      const providerdetails = await deleteproviderservice(dbPayload);
      return providerdetails;
    }
    return deleteprovider;
  } catch (error) {
    console.log(error);
  }
};
const updateproviderBusiness = async (payload, query) => {
  try {
    let { email } = query;
    const dbpayload = {
      ...payload,
    };
    const condition = {
      email: email,
    };
    const provider = await findproviderService({ email });

    if (provider["statusCode"] != 404) {
      console.log("providerbussinesin==", provider);
      const providerdetails = await updateproviderservice(condition, dbpayload);
      return providerdetails;
    }

    return provider;
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
