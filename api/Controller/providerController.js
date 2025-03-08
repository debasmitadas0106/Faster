const {providerBussiness}=require("../Business/providerBusiness")

const createprovidercontroller=async (req,res) =>{
    try{
        const resp=providerBussiness(req.body,req.query);
        return res.status(200).json({
            success:true,
            data:resp,
        });
    }catch(error){
        console.error("Error in provider controller:",error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
            error:error.message,
        });
    }
};

module.exports={createprovidercontroller};