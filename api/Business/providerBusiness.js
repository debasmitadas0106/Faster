const {
    findproviderService,
    createproviderservice,
    deleteproviderservice}=require("../Service/providerService");

const providerBussiness=async (payload,query) =>{
    try{
        let{username,password,email}=payload;
    const dbPayload={
        ...payload,
    };
    const getprovider=await findproviderService({
        $or:[{username},{email}],
    });
    if(getprovider){
        return getprovider.username===username
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

const getproviderBussiness=async (payload,query) => {
    try{
        let {username,password,email}=payload;
        const dbPayload={
            ...payload,
        };
        const getprovider=await findproviderService({
            $or:[{username},{email}],
        });
        return getprovider;

    }
    catch(error){
        console.log(error);
    }
}

const deleteproviderBussiness=async (payload,query) => {
    try{
        let {username,email}=payload;
        const dbPayload={
            ...payload,
        };
        const deleteprovider=await findproviderService({
            $or:[(username),{email}],
        });
        const providerdetails=await deleteproviderservice(dbPayload);
        return providerdetails
    }
    catch(error){
        console.log(error);
    }
}

module.exports={providerBussiness,getproviderBussiness,deleteproviderBussiness};