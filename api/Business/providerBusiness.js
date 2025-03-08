const {
    findproviderService,
    createproviderservice}=require("../Service/providerService");

const providerBussiness=async (payload,query) =>{
    try{
        let{userName,password,email}=payload;
    const dbPayload={
        ...payload,
    };
    const getprovider=await findproviderService({
        $or:[{userName},{email}],
    });
    if(getprovider){
        return getprovider.userName===userName
        ? "Username already exists in provider"
        : "Email already exists in provider";
    }
    const userDetails=await createproviderservice(dbPayload);
    return userDetails;
}
catch(error){
    console.log(error);
}
};

module.exports={providerBussiness};