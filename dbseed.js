import  mysql from 'mysql';

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  
  const secret_name = "prod/v1.0.0/node-rds/earth";
  
  const client = new SecretsManagerClient({
    region: "ap-southeast-2",
  });
  
  let response;
  
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  
  const secret = response.SecretString;

  const secretsManagerResponse = JSON.parse(secret);

  const {DB_USERNAME, DB_PASSWORD} = secretsManagerResponse;
  
  // Your code goes here

const con = mysql.createConnection({
    host: "houserentdbe.c7om482wqwx6.ap-southeast-2.rds.amazonaws.com",
    user: "admin",
    password: "1uwQ7nDLgU2vTbYK1vOG"
});

// connect to the MySQL database
con.connect(function(err) {
    if (err) throw err;

    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), '+
    'email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
});


export default con;