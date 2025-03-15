const apiResponse = async (status_code,msg,data) => {
  //data = JSON.stringify(data);
  if (status_code==200){
    return data.status(200).json({
      success:true,
      data:msg
    });
  }
  else if(status_code==404){
    return data.status(404).json({
      success:false,
      message: `Data not found`
    })
  }
  else{
    return data.status(500).json({
      success:false,
      error:msg,
      message:'Internal server error'
    })
  }
}
module.exports = {
  apiResponse,
};
