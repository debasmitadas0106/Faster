const {useremployeeSchema}=require("../../Schema/users");
const dbConnect=require("../../utils/connectionSetup");
const mongoose=require("mongoose");

const findproviderService=async (condition,dbURL="Faster") => {
    try{
        const conn=await dbConnect(dbURL);
        console.log(JSON.stringify(condition));
        const useremployeedetail=await conn.model("Providers",useremployeeSchema,"Providers").findOne(condition);
        return useremployeedetail
    }catch(error){
        console.log(error);
        throw error;
    }
};

const createproviderservice=async (Data,dbURL='Faster')=>{
    try{
        const conn=await dbConnect(dbURL);
        console.log(JSON.stringify(Data));
        const useremployeedetail=await conn.model("Providers",useremployeeSchema,"Providers").create(Data);
        return `${useremployeedetail} is created`;
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

module.exports={findproviderService,createproviderservice};