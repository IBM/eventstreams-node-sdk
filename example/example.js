/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

// Code Setup

const HTTP = require('http');
const util = require('util');
const KAFKA_ADMIN_URL = process.env.KAFKA_ADMIN_URL;
const API_KEY = process.env.API_KEY;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const NewAdminrestV1 = require('../dist/adminrest/v1');
const { BasicAuthenticator } = require('../dist/auth');
const { BearerTokenAuthenticator } = require('../dist/auth');
const { NoAuthAuthenticator } = require('../dist/auth');
const topicName = "test-topic";
var authenticator = new NoAuthAuthenticator({});

console.log("Eventstreams Admin Rest SDK Example");
// Code Setup End

// Create Authenticator
if (KAFKA_ADMIN_URL === undefined || !KAFKA_ADMIN_URL) {
    console.log("Please set env KAFKA_ADMIN_URL");
    process.exit(1);
}

if ((API_KEY === undefined || !API_KEY) && (BEARER_TOKEN === undefined || !BEARER_TOKEN)) {
    console.log("Please set either an API_KEY or a BEARER_TOKEN");
    process.exit(1);
}

if (API_KEY && BEARER_TOKEN){
    console.log("Please set either an API_KEY or a BEARER_TOKEN not both");
    process.exit(1);
}

if (API_KEY) {
    // Create an Basic IAM authenticator.
    authenticator = new BasicAuthenticator({
        username: "token",
        password: API_KEY,
    });
} else {
    // Create an IAM Bearer Token authenticator.
    authenticator = new BearerTokenAuthenticator ({
        bearerToken: BEARER_TOKEN,
    });
}
// End Authenticator


// Create Service
// Construct the service client.
const adminREST = new NewAdminrestV1({
  authenticator,                       
  serviceUrl: KAFKA_ADMIN_URL,
});
// End Create Service

// Step through the examples.
listTopics(adminREST).then( () =>{
    createTopic(adminREST,topicName).then( () =>{
        listTopics(adminREST).then( () =>{
            topicDetails(adminREST,topicName).then( () =>{
                updateTopic(adminREST,topicName).then( () =>{
                    topicDetails(adminREST,topicName).then( () =>{
                        deleteTopic(adminREST,topicName).then( () =>{
                            listTopics(adminREST);
                        });
                    });
                }); 
            });
        });
    });
});

// Uncomment these examples if you are running against a Event Streams Mirrored Target Cluster.
// getListMirroringActiveTopics(adminREST)
// replaceMirroringTopicSelection(adminREST,topicName)
// getMirroringTopicSelection(adminREST)

function listTopics(adminREST) {
    console.log("List Topics");

    // Construct the params object for operation listTopics.
    const params = {
        // topicFilter defaults to an empty string to see all topics.
        // or you can specify a topic name.
        // topicFilter: "<You Topic Name>",
    };
    
    // Service operations can now be invoked using the "adminREST" variable.
    // Call listTopics on the service.
    const listTopicsResult = adminREST.listTopics(params);
   
    // Look at the results of the promise.
    return listTopicsResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "OK" ) {
            for(const val of result.result) {
                console.log("\tname: " + val.name);
                }
            }
        }, err => {
            console.log("Error listing topics " + err); 
    });
} // func.end


function createTopic(adminREST,topicName) {
    console.log("Create Topic");
    // Construct the params object for operation createTopic
    const name = topicName;
    const partitions = 3;
    const params = {
      name: name,
      partitions: partitions,
    };

    // Call the create topic function on the service.
    const createTopicResult = adminREST.createTopic(params);

    // Look at the results of the promise.
    return createTopicResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "Accepted" ) {
            console.log("\tname: " + topicName);
        }
    }, err => {
        console.log("\tError creating topics " + err); 
    });
} // func.end


function deleteTopic(adminREST,topicName){
    console.log("Delete Topic");

    // Construct the params object for operation deleteTopic
    const params = {
        topicName: topicName,
    };

    // Call the delete topic function on the service.
    const deleteTopicResult = adminREST.deleteTopic(params);

    // Look at the results of the promise.
    return deleteTopicResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "Accepted" ) {
            console.log("\tname: " + topicName)
        }
    }, err => {
        console.log("\tError deleting topic: " + topicName + "error: " + err); 
    });
} // func.end

function topicDetails(adminREST,topicName) {
    console.log("Topic Details");

    // Construct the params object for operation getTopic
    const params = {
        topicName: topicName,
    };

    // Call the get topic function on the service.
    const getTopicResult = adminREST.getTopic(params);

    // Look at the results of the promise.
    return getTopicResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "OK" ) {
            console.log(util.inspect(result.result, false, null, true));
        }
    }, err => {
        console.log("\tError getting topic details: " + topicName + "error: " + err); 
    });
} // func.end

function updateTopic(adminREST,topicName) {
    console.log("Update Topic Details");
    // Construct the params object for operation updateTopic
    const newTotalPartitionCount = 6;
    const params = {
        topicName: topicName,
        newTotalPartitionCount: newTotalPartitionCount,
    };

    // Call the update topic function on the service.
    const updateTopicResult = adminREST.updateTopic(params);

    // Look at the results of the promise.
    return updateTopicResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "Accepted" ) {
            console.log("\tname: " + topicName);
        }
    }, err => {
        console.log("\tError updating topic details: " + topicName + "error: " + err); 
    });
} // func.end
 
function getListMirroringActiveTopics(adminREST) {
    console.log("List Active Mirroring Topic Selection\n");
     // Construct the params object for operation getMirroringActiveTopics
     const params = {};

     // Call the get mirroring active topic function on the service.
     const getMirroringActiveTopicsResult = adminREST.getMirroringActiveTopics(params);
     
     // Look at the results of the promise.
     return getMirroringActiveTopicsResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "OK" ) {
            console.log("\tname: " + val.name);
        }
    }, err => {
        console.log("Error listing active mirroring topics selection " + err); 
    });
} // func.end


function replaceMirroringTopicSelection(adminREST,topicName) {
    console.log("Replace Mirroring Topics");
    // Construct the params object for operation replaceMirroringTopicSelection
    const includes = topicName
    const params = {
        includes: includes,
    };

    // Call the replace mirroring topic selection on the service.
    const replaceMirroringTopicSelectionResult = adminREST.replaceMirroringTopicSelection(params);
    
    // Look at the results of the promise.
    return replaceMirroringTopicSelectionResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "OK" ) {
            console.log("\tmirroring topic selection updated " + topicName);
        }
    }, err => {
        console.log("Error replacing mirroring topics selection " + err); 
    });
} // func.end


function getMirroringTopicSelection(adminREST) {
    console.log("List Mirroring Topic Selection");
    const params = {};

    // Call the get mirroring topic selection function on the service.
    const getMirroringTopicSelectionResult = adminREST.getMirroringTopicSelection(params);

    // Look at the results of the promise.
    return getMirroringTopicSelectionResult.then((result) => {
        if ( HTTP.STATUS_CODES[result.status] == "OK" ) {
            for(const val of result.result) {
                console.log("\tname: " + val.name);
            }
        }
    }, err => {
        console.log("Error listing mirroring topics selection " + err); 
    });
} // func.end
