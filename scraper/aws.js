const AWS = require("aws-sdk");
const s3 = new AWS.S3();

async function save(data, type) {
    console.log("Inside save() ");


    const s3Bucket = "stock-ui-bucket";
    const objectType = "application/json";
    var objectName = "";

    if(type === "inidividual")
      objectName = "data/" + data.stockId;
    if(type === "category"){
      objectName = "category/" + data.name;
    }
  
    await saveToS3(s3Bucket, objectName, data, objectType);

    console.log("save() => Successfully saved");
}



async function saveToS3(s3Bucket, objectName, data, objectType) {
  console.log("Inside saveToS3() ");

  const params = {
    Bucket: s3Bucket,
    Key: objectName,
    Body: JSON.stringify(data),
    ContentType: objectType,
  };

  await s3.putObject(params).promise();

  console.log("saveToS3() => Successfully saved to S3 !!! ");
}

module.exports = {save};