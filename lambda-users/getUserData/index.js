"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
/**
 * handler: one function that is exported
 */
exports.handler = async (event, context) => {
  //   const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
  });

  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  // Describe the item that we want to pull out from DynamoDB
  const params = {
    TableName: "Users",
    Key: {
      id: id
    }
  };

  try {
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get user data`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      myHeader: "test"
    },
    body: responseBody
  };

  return response;
};
