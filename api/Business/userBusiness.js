const { generateSHA256 } = require("../../utils/encryption");
const {
  createUserService,
  findUserService,
} = require("../Service/userService");

const createUserDetailsBusiness = async (payload, query) => {
  try {
    let { userName, password, email } = payload;
    password = generateSHA256(password);

    const dbPayload = {
      ...payload,
    };
    const getUser = await findUserService({
      $or: [{ userName }, { email }],
    });

    if (getUser) {
      return getUser.userName === userName
        ? "Username already exists"
        : "Email already exists";
    }
    const userDetails = await createUserService(dbPayload);
    return userDetails;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {createUserDetailsBusiness}
