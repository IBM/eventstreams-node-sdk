/**
 * (C) Copyright IBM Corp. 2021-2023.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Code Setup
const HTTP = require('http');
const util = require('util');

const { KAFKA_ADMIN_URL } = process.env;
const { API_KEY } = process.env;
const { BEARER_TOKEN } = process.env;
const NewAdminrestV1 = require('../dist/adminrest/v1');
const { BasicAuthenticator } = require('../dist/auth');
const { BearerTokenAuthenticator } = require('../dist/auth');
const { NoAuthAuthenticator } = require('../dist/auth');

const topicName = 'test-topic';
let authenticator = new NoAuthAuthenticator({});
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// Code Setup End

// Create Authenticator
if (KAFKA_ADMIN_URL === undefined || !KAFKA_ADMIN_URL) {
  console.log('Please set env KAFKA_ADMIN_URL');
  throw new Error('error KAFKA_ADMIN_URL not set');
}

if ((API_KEY === undefined || !API_KEY) && (BEARER_TOKEN === undefined || !BEARER_TOKEN)) {
  console.log('Please set either an API_KEY or a BEARER_TOKEN');
  throw new Error('error: API_KEY or BEARER_TOKEN not set');
}

if (API_KEY && BEARER_TOKEN) {
  console.log('Please set either an API_KEY or a BEARER_TOKEN not both');
  throw new Error('error: API_KEY and BEARER_TOKEN can not both be set');
}

if (API_KEY) {
  // Create an Basic IAM authenticator.
  authenticator = new BasicAuthenticator({
    username: 'token',
    password: API_KEY,
  });
} else {
  // Create an IAM Bearer Token authenticator.
  authenticator = new BearerTokenAuthenticator({
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

/** @listTopics */
function listTopics(adminrest) {
  console.log('List Topics');

  // Construct the params object for operation listTopics.
  const params = {
    // topicFilter defaults to an empty string to see all topics.
    // or you can specify a topic name.
    // topicFilter: '<You Topic Name>',
  };

  // Service operations can now be invoked using the 'adminREST' variable.
  // Call listTopics on the service.
  const listTopicsResult = adminrest.listTopics(params);

  // Look at the results of the promise.
  return listTopicsResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        result.result.forEach((val) => {
          console.log(`\tname: ${val.name}`);
        });
      }
    },
    (err) => {
      console.log(`Error listing topics ${err}`);
    }
  );
} // func.end

/** @createTopic */
function createTopic(adminrest, topicname) {
  console.log('Create Topic');
  // Construct the params object for operation createTopic
  const name = topicname;
  const partitions = 3;
  const params = {
    name,
    partitions,
  };

  // Call the create topic function on the service.
  const createTopicResult = adminrest.createTopic(params);

  // Look at the results of the promise.
  return createTopicResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'Accepted') {
        console.log(`\tname: ${topicName}`);
      }
    },
    (err) => {
      console.log(`\tError creating topics ${err}`);
    }
  );
} // func.end

/** @deleteTopic */
function deleteTopic(adminrest, topicname) {
  console.log('Delete Topic');

  // Construct the params object for operation deleteTopic
  const params = {
    topicName: topicname,
  };

  // Call the delete topic function on the service.
  const deleteTopicResult = adminrest.deleteTopic(params);

  // Look at the results of the promise.
  return deleteTopicResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'Accepted') {
        console.log(`\tname: ${topicName}`);
      }
    },
    (err) => {
      console.log(`\tError deleting topic: ${topicName}error: ${err}`);
    }
  );
} // func.end

/** @topicDetails */
function topicDetails(adminrest, topicname) {
  console.log('Topic Details');

  // Construct the params object for operation getTopic
  const params = {
    topicName: topicname,
  };

  // Call the get topic function on the service.
  const getTopicResult = adminrest.getTopic(params);

  // Look at the results of the promise.
  return getTopicResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        console.log(util.inspect(result.result, false, null, true));
      }
    },
    (err) => {
      console.log(`\tError getting topic details: ${topicName}error: ${err}`);
    }
  );
} // func.end

/** @updateTopic */
function updateTopic(adminrest, topicname) {
  console.log('Update Topic Details');
  // Construct the params object for operation updateTopic
  const newTotalPartitionCount = 6;
  const params = {
    topicName: topicname,
    newTotalPartitionCount,
  };

  // Call the update topic function on the service.
  const updateTopicResult = adminrest.updateTopic(params);

  // Look at the results of the promise.
  return updateTopicResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'Accepted') {
        console.log(`\tname: ${topicName}`);
      }
    },
    (err) => {
      console.log(`\tError updating topic details: ${topicName}error: ${err}`);
    }
  );
} // func.end

/** @getListMirroringActiveTopics */
function getListMirroringActiveTopics(adminrest) {
  console.log('List Active Mirroring Topic Selection\n');
  // Construct the params object for operation getMirroringActiveTopics
  const params = {};

  // Call the get mirroring active topic function on the service.
  const getMirroringActiveTopicsResult = adminrest.getMirroringActiveTopics(params);

  // Look at the results of the promise.
  return getMirroringActiveTopicsResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        result.result.forEach((val) => {
          console.log(`\tname: ${val.name}`);
        });
      }
    },
    (err) => {
      console.log(`Error listing active mirroring topics selection ${err}`);
    }
  );
} // func.end

/** @replaceMirroringTopicSelection */
function replaceMirroringTopicSelection(adminrest, topicname) {
  console.log('Replace Mirroring Topics');
  // Construct the params object for operation replaceMirroringTopicSelection
  const includes = topicname;
  const params = {
    includes,
  };

  // Call the replace mirroring topic selection on the service.
  const replaceMirroringTopicSelectionResult = adminrest.replaceMirroringTopicSelection(params);

  // Look at the results of the promise.
  return replaceMirroringTopicSelectionResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        console.log(`\tmirroring topic selection updated ${topicname}`);
      }
    },
    (err) => {
      console.log(`Error replacing mirroring topics selection ${err}`);
    }
  );
} // func.end

/** @getMirroringTopicSelection */
function getMirroringTopicSelection(adminrest) {
  console.log('List Mirroring Topic Selection');
  const params = {};

  // Call the get mirroring topic selection function on the service.
  const getMirroringTopicSelectionResult = adminREST.getMirroringTopicSelection(params);

  // Look at the results of the promise.
  return getMirroringTopicSelectionResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        result.result.forEach((val) => {
          console.log(`\tname: ${val.name}`);
        });
      }
    },
    (err) => {
      console.log(`Error listing mirroring topics selection ${err}`);
    }
  );
} // func.end

/** @listQuotas */
function listQuotas(adminrest) {
  console.log('List Quotas');

  // Construct the params object for operation listQuotas.
  const params = {};

  // Service operations can now be invoked using the 'adminREST' variable.
  // Call listQuotas on the service.
  const llistQuotasResult = adminrest.listQuotas(params);

  // Look at the results of the promise.
  return llistQuotasResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        result.result.forEach((val) => {
          let quotaDetail = `\tentity_name: ${val.entity_name}`;
          if (val.producer_byte_rate) {
            quotaDetail += `, producer_byte_rate: ${val.producer_byte_rate}`;
          }
          if (val.consumer_byte_rate) {
            quotaDetail += `, consumer_byte_rate: ${val.consumer_byte_rate}`;
          }
          console.log(quotaDetail);
        });
      }
    },
    (err) => {
      console.log(`Error listing quotas ${err}`);
    }
  );
} // func.end

/** @createQuota */
function createQuota(adminrest, entityName) {
  console.log('Create Quota');
  // Construct the params object for operation createQuota
  const params = {
    entityName,
    producerByteRate: 1024,
    consumerByteRate: 1024,
  };

  // Call the create quota function on the service.
  const createQuotaResult = adminrest.createQuota(params);

  // Look at the results of the promise.
  return createQuotaResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'Created') {
        console.log(`\tentity_name: ${entityName}`);
      }
    },
    (err) => {
      console.log(`\tError creating quota ${err}`);
    }
  );
} // func.end

/** @deleteQuota */
function deleteQuota(adminrest, entityName) {
  console.log('Delete Quota');

  // Construct the params object for operation deleteTopic
  const params = {
    entityName,
  };

  // Call the delete quota function on the service.
  const deleteQuotaResult = adminrest.deleteQuota(params);

  // Look at the results of the promise.
  return deleteQuotaResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'Accepted') {
        console.log(`\tentity_name: ${entityName}`);
      }
    },
    (err) => {
      console.log(`\tError deleting quota: ${err}`);
    }
  );
} // func.end

/** @quotaDetails */
function quotaDetails(adminrest, entityName) {
  console.log('Quota Details');

  // Construct the params object for operation getQuota
  const params = {
    entityName,
  };

  // Call the get quota function on the service.
  const getQuotaResult = adminrest.getQuota(params);

  // Look at the results of the promise.
  return getQuotaResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'OK') {
        console.log(`\t${util.inspect(result.result, false, null, true)}`);
      }
    },
    (err) => {
      console.log(`\tError getting quota details: ${err}`);
    }
  );
} // func.end

/** @updateQuota */
function updateQuota(adminrest, entityName) {
  console.log('Update Quota Details');
  // Construct the params object for operation updateQuota
  const params = {
    entityName,
    producerByteRate: 2048,
    consumerByteRate: 2048,
  };

  // Call the update quota function on the service.
  const updateQuotaResult = adminrest.updateQuota(params);

  // Look at the results of the promise.
  return updateQuotaResult.then(
    (result) => {
      if (HTTP.STATUS_CODES[result.status] === 'Accepted') {
        console.log(`\tentity_name: ${entityName}`);
      }
    },
    (err) => {
      console.log(`\tError updating quota details: ${err}`);
    }
  );
} // func.end

/* eslint-enable no-unused-vars */

// Step through the examples.
listTopics(adminREST).then(() => {
  createTopic(adminREST, topicName).then(() => {
    listTopics(adminREST).then(() => {
      topicDetails(adminREST, topicName).then(() => {
        updateTopic(adminREST, topicName).then(() => {
          topicDetails(adminREST, topicName).then(() => {
            deleteTopic(adminREST, topicName).then(() => {
              listTopics(adminREST).then(() => {
                // Uncomment these examples if you are running against an Event Streams Enterprise plan instance
                // const testEntityName = 'iam-ServiceId-12345678-aaaa-bbbb-cccc-1234567890xy';
                // listQuotas(adminREST).then(() => {
                //   createQuota(adminREST, testEntityName).then(() => {
                //     listQuotas(adminREST).then(() => {
                //       quotaDetails(adminREST, testEntityName).then(() => {
                //         updateQuota(adminREST, testEntityName).then(() => {
                //           quotaDetails(adminREST, testEntityName).then(() => {
                //             deleteQuota(adminREST, testEntityName).then(() => {
                //               listQuotas(adminREST);
                //             });
                //           });
                //         });
                //       });
                //     });
                //   });
                // });
              });
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
