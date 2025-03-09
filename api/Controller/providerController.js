const {providerBussiness,getproviderBussiness,deleteproviderBussiness}=require("../Business/providerBusiness")

const createprovidercontroller=async (req,res) =>{
    try{
        const resp=await providerBussiness(req.body,req.query);
        return res.status(200).json({
            success:true,
            data:resp,
        });
    }catch(error){
        console.error("Error in create provider controller:",error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
            error:error.message,
        });
    }
};

const getprovidercontroller=async(req,res) => {
    try{
        console.log('req=',req.query,'res=',res.query);
        const resp=await getproviderBussiness(req.query,res.query);
        // console.log('resp=',resp)
        return res.status(200).json({
            success:true,
            data:resp,
        });
    }
    catch(error){
        console.error("Error in get provider controller:",error);
        return res.status(500).json({
        success:false,
        message: "Internal server error",
        error:error.message,
    });
    }
}

const deleteprovidercontroller=async(req,res) => {
    try{
        console.log('req=',req.query,'res=',res.body)
        const resp=await deleteproviderBussiness(req.query,req.query);
        console.log('resp==',resp);
        return res.status(200).json({
            success:true,
            data:resp,
        });
    }
    catch(error){
        console.error("Error in delete provider controller",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

module.exports={createprovidercontroller,getprovidercontroller,deleteprovidercontroller};
