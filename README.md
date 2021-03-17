[![Build Status](https://travis-ci.com/IBM/eventstreams-node-sdk.svg?&branch=main)](https://travis-ci.com/IBM/eventstreams-node-sdk)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
<!--
[![npm-version](https://img.shields.io/npm/v/IBM/eventstreams-node-sdk.svg)](https://www.npmjs.com/package/adminrestv1)
[![codecov](https://codecov.io/gh/IBM/eventstreams-node-sdk/branch/main/graph/badge.svg)](https://codecov.io/gh/IBM/eventstreams-node-sdk)
-->
# IBM Cloud Eventstreams Node SDK Version 1.0.0

## Introduction

IBM Event Streams for IBM Cloud™ is a high-throughput message bus built with Apache Kafka. 
It is optimized for event ingestion into IBM Cloud and event stream distribution between your services and applications.

Event Streams provides a REST API to help connect your existing systems to your Event Streams Kafka cluster. 
Using the API, you can integrate Event Streams with any system that supports RESTful APIs.

Documentation [IBM Cloud Eventstreams Service APIs](https://cloud.ibm.com/apidocs/event-streams).

Disclaimer: this SDK is being released initially as a **pre-release** version.
Changes might occur which impact applications that use this SDK.

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      npx markdown-toc -i README.md
  -->

<!-- toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
- [REST API documentation](#event-streams-administration-rest-api)
- [Questions](#questions)
- [Issues](#issues)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud Eventstreams SDK Node.js SDK allows developers to programmatically interact with the following
IBM Cloud services:

Service Name | Import Path
--- | ---
[Admin Rest](https://cloud.ibm.com/apidocs/event-streams) | AdminRest

## Prerequisites

* An [IBM Cloud][https://cloud.ibm.com/registration] account.
* The [IBM Cloud CLI.](https://cloud.ibm.com/docs/cli?topic=cli-getting-started)
* An IAM API key to allow the SDK to access your account. Create one [here](https://cloud.ibm.com/iam/apikeys).
* A IBM Cloud Eventstreams Instance Create one [here](https://cloud.ibm.com/registration?target=/catalog/services/event-streams)
* **Node.js >=10**: This SDK is tested with Node.js versions 10 and up. It may work on previous versions but this is not officially supported.



## Installation

```sh
npm install eventstreams-sdk
```

## Using the SDK
For general SDK usage information, please see
[this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/README.md)

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/eventstreams-node-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).

# Event Streams Administration REST API

This REST API allows users of the
[IBM Event Streams service](https://cloud.ibm.com/docs/services/EventStreams/index.html)
to administer
[Kafka topics](#using-the-rest-api-to-administer-kafka-topics)
associated with an instance of the service. You can use this API to perform the following
operations:
  - [Create a Kafka topic](#creating-a-kafka-topic)
  - [List Kafka topics](#listing-kafka-topics)
  - [Get a Kafka topic](#getting-a-kafka-topic)
  - [Delete a Kafka topic](#deleting-a-kafka-topic)
  - [Update a Kafka topic configuration](#updating-kafka-topics-configuration)
  - [List which topics are mirrored](#list-current-mirroring-topic-selection)
  - [Replace selection of topics which are mirrored](#replace-mirroring-topic-selection)
  - [List active mirroring topics](#list-active-mirroring-topics)
  
The Admin REST API is also [documented using swagger](./admin-rest-api.yaml).

## Access control
---

All requests support below authorization methods:
 * Basic authorization with user and password. (
  For both standard, enterprise and lite plans, user is 'token', password is the API key from `ibmcloud resource service-keys` for the service instance.)
 * Bearer authorization with bearer token. (This token can be either API key or JWT token obtained from IAM upon login to IBM Cloud. Use `ibmcloud iam oauth-tokens` to retrieve the token after `ibmcloud login`)
 * `X-Auth-Token` header to be set to the API key. This header is deprecated.

##  Administration API endpoint
---
Administration API endpoint is the `kafka_admin_url` property in the service key for the service instance. This command can be used to retrieve this property.
```bash
$ibmcloud resource service-key "${service_instance_key_name}" --output json > jq -r '.[]|.credentials.kafka_admin_url'
```

## Environment Setup
In the examples you must set and export environment variables as follows:
- Either the `API_KEY` or `BEARER_TOKEN` to use for authentication.
- `KAFKA_ADMIN_URL` to point to your Eventstreams admin endpoint.

In addition, the `Content-type` header has to be set to `application/json`.

Common HTTP status codes:
- 200: Request succeeded.
- 202: Request was accepted.
- 400: Invalid request JSON.
- 401: The authentication header is not set or provided information is not valid.
- 403: Not authorized to perform the operation. Usually it means the API key used is missing a certain role. More details on what role can perform what operation refers to this [document](https://cloud.ibm.com/docs/services/EventStreams?topic=eventstreams-security).
- 404: Unable to find the topic with topic name given by user.
- 422: Semantically invalid request.
- 503: An error occurred handling the request.

Error responses carry a JSON body like the following:
```json
{"error_code":50301,"message":"Unknown Kafka Error", "incident_id": "17afe715-0ff5-4c49-9acc-a4204244a331"}
```
Error codes are of the format `HHHKK` where `HHH` is the HTTP Status Code and `KK` is the Kafka protocol error.  

For E2E debugging purposes, the transaction ID of every request is returned in the HTTP header `X-Global-Transaction-Id`.
If the header is set on the request, it will be honored. If not, it will be generated.
In the event of a non-200 error return code, the transaction ID is also returned in the JSON error response as `incident_id`.


## Using the REST API to administer Kafka topics
---

To run the example :-

Set the required environment variables
```sh
# Set you API KEY.
export API_KEY="abc123456789"

# Set the Admin Endpoint to point to your cluster.
export KAFKA_ADMIN_URL="https://xyzclustername.svc01.region.eventstreams.test.cloud.ibm.com"

```

You will need the extend package, so install using:
```
npm install extend
```

Run the example
```sh
    node ./example/example.js
```

## REST API 
---
The following sections explain how the REST API works with examples.

### Code Setup

```javascript
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
	const topicName = 'test-topic';
	let authenticator = new NoAuthAuthenticator({});
	/* eslint-disable no-console */
	
	// Code Setup End
```


### Authentication
---
Use one of the following methods to authenticate:

- To authenticate using Basic Auth:
  Place these values into the Authorization header of the HTTP request in the form Basic <credentials> 
  where <credentials> is the username and password joined by a single colon `:` base64 encoded. 
  For example:
  ```sh
  echo -n "token:<APIKEY>" | base64
  ```

- To authenticate using a bearer token:
  To obtain your token using the IBM Cloud CLI, first log in to IBM Cloud, then run the following command:
  ```
  ibmcloud iam oauth-tokens
  ```
  Place this token in the Authorization header of the HTTP request in the form Bearer. Both API key or JWT tokens are supported.

- To authenticate directly using the api_key:
  Place the key directly as the value of the X-Auth-Token HTTP header.

#### Example

Here's an example of how to create the authenticator using either an API key or a BEARER_TOKEN

```
```javascript
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
```

```


### Creating a client for the Admin REST API.
---
Create a new service object.

```javascript
	// Create Service
	// Construct the service client.
	const adminREST = new NewAdminrestV1({
	  authenticator,
	  serviceUrl: KAFKA_ADMIN_URL,
	});
	// End Create Service
```


### Creating a Kafka topic
---
To create a Kafka topic the admin REST SDK issues a POST request to the /admin/topics path. 
The body of the request contains a JSON document, for example:
```
{
    "name": "topicname",
    "partitions": 1,
    "configs": {
        "retentionMs": 86400000,
        "cleanupPolicy": "delete"
    }
}
```

The only required field is name. The partitions fields defaults to 1 if not set.

Expected HTTP status codes:

- 202: Topic creation request was accepted.
- 400: Invalid request JSON.
- 403: Not authorized to create topic.
- 422: Semantically invalid request.

If the request to create a Kafka topic succeeds then HTTP status code 202 (Accepted) is returned. If the operation fails then a HTTP status code of 422 (Un-processable Entity) is returned, and a JSON object containing additional information about the failure is returned as the body of the response.




#### Example

```
```javascript
	function createTopic(adminREST, topicName) {
	  console.log('Create Topic');
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
	  return createTopicResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'Accepted') {
	        console.log('\tname: ' + topicName);
	      }
	    },
	    err => {
	      console.log('\tError creating topics ' + err);
	    }
	  );
	} // func.end
```

```





### Deleting a Kafka topic
---
To delete a Kafka topic, the admin REST SDK issues a DELETE request to the `/admin/topics/TOPICNAME`
path (where `TOPICNAME` is the name of the Kafka topic that you want to delete).

Expected return codes:
- 202: Topic deletion request was accepted.
- 403: Not authorized to delete topic.
- 404: Topic does not exist.
- 422: Semantically invalid request.
  
A 202 (Accepted) status code is returned if the REST API accepts the delete
request or status code 422 (Un-processable Entity) if the delete request is
rejected. If a delete request is rejected then the body of the HTTP response 
will contain a JSON object which provides additional information about why 
the request was rejected.

Kafka deletes topics asynchronously. Deleted topics may still appear in the
response to a [list topics request](#listing-kafka-topics) for a short period
of time after the completion of a REST request to delete the topic.

#### Example

```
```javascript
	function deleteTopic(adminREST, topicName) {
	  console.log('Delete Topic');
	
	  // Construct the params object for operation deleteTopic
	  const params = {
	    topicName: topicName,
	  };
	
	  // Call the delete topic function on the service.
	  const deleteTopicResult = adminREST.deleteTopic(params);
	
	  // Look at the results of the promise.
	  return deleteTopicResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'Accepted') {
	        console.log('\tname: ' + topicName);
	      }
	    },
	    err => {
	      console.log('\tError deleting topic: ' + topicName + 'error: ' + err);
	    }
	  );
	} // func.end
```

```

### Listing Kafka topics
---
You can list all of your Kafka topics by issuing a GET request to the
`/admin/topics` path. 

Expected status codes:
- 200: the topic list is returned as JSON in the following format:
```json
[
  {
    "name": "topic1",
    "partitions": 1,
    "retentionMs": 86400000,
    "cleanupPolicy": "delete"
  },
  { "name": "topic2",
    "partitions": 2,
    "retentionMs": 86400000,
    "cleanupPolicy": "delete"
  }
]
```

A successful response will have HTTP status code 200 (OK) and contain an
array of JSON objects, where each object represents a Kafka topic and has the
following properties:

| Property name     | Description                                             |
|-------------------|---------------------------------------------------------|
| name              | The name of the Kafka topic.                            |
| partitions        | The number of partitions of the Kafka topic.            |
| retentionsMs      | The retention period for messages on the topic (in ms). |
| cleanupPolicy     | The cleanup policy of the Kafka topic.                  |

#### Example

```
```javascript
	function listTopics(adminREST) {
	  console.log('List Topics');
	
	  // Construct the params object for operation listTopics.
	  const params = {
	    // topicFilter defaults to an empty string to see all topics.
	    // or you can specify a topic name.
	    // topicFilter: '<You Topic Name>',
	  };
	
	  // Service operations can now be invoked using the 'adminREST' variable.
	  // Call listTopics on the service.
	  const listTopicsResult = adminREST.listTopics(params);
	
	  // Look at the results of the promise.
	  return listTopicsResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'OK') {
	        for (const val of result.result) {
	          console.log('\tname: ' + val.name);
	        }
	      }
	    },
	    err => {
	      console.log('Error listing topics ' + err);
	    }
	  );
	} // func.end
```

```

### Getting a Kafka topic
---
To get a Kafka topic detail information, issue a GET request to the `/admin/topics/TOPICNAME`
path (where `TOPICNAME` is the name of the Kafka topic that you want to get).  

Expected status codes
- 200: Retrieve topic details successfully in following format:
```json
{
  "name": "MYTOPIC",
  "partitions": 1,
  "replicationFactor": 3,
  "retentionMs": 86400000,
  "cleanupPolicy": "delete",
  "configs": {
    "cleanup.policy": "delete",
    "min.insync.replicas": "2",
    "retention.bytes": "1073741824",
    "retention.ms": "86400000",
    "segment.bytes": "536870912"
  },
  "replicaAssignments": [
    {
      "id": 0,
      "brokers": {
        "replicas": [
          3,
          2,
          4
        ]
      }
    }
  ]
}
```
- 403: Not authorized.
- 404: Topic does not exist.

#### Example

```
```javascript
	function topicDetails(adminREST, topicName) {
	  console.log('Topic Details');
	
	  // Construct the params object for operation getTopic
	  const params = {
	    topicName: topicName,
	  };
	
	  // Call the get topic function on the service.
	  const getTopicResult = adminREST.getTopic(params);
	
	  // Look at the results of the promise.
	  return getTopicResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'OK') {
	        console.log(util.inspect(result.result, false, null, true));
	      }
	    },
	    err => {
	      console.log('\tError getting topic details: ' + topicName + 'error: ' + err);
	    }
	  );
	} // func.end
```

```

### Updating Kafka topic's configuration
---
To increase a Kafka topic's partition number or to update a Kafka topic's configuration, issue a
`PATCH` request to `/admin/topics/TOPICNAME` with the following body:
(where TOPICNAME is the name of the Kafka topic that you want to update).
```json
{
  "new_total_partition_count": 4,
  "configs": [
    {
      "name": "cleanup.policy",
      "value": "compact"
    }
  ]
}
```
Supported configuration keys are 'cleanup.policy', 'retention.ms', 'retention.bytes', 'segment.bytes', 'segment.ms', 'segment.index.bytes'.
And partition number can only be increased, not decreased.

Expected status codes
- 202: Update topic request was accepted.
- 400: Invalid request JSON/number of partitions is invalid.
- 404: Topic specified does not exist.
- 422: Semantically invalid request.

#### Example

```
```javascript
	function updateTopic(adminREST, topicName) {
	  console.log('Update Topic Details');
	  // Construct the params object for operation updateTopic
	  const newTotalPartitionCount = 6;
	  const params = {
	    topicName: topicName,
	    newTotalPartitionCount: newTotalPartitionCount,
	  };
	
	  // Call the update topic function on the service.
	  const updateTopicResult = adminREST.updateTopic(params);
	
	  // Look at the results of the promise.
	  return updateTopicResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'Accepted') {
	        console.log('\tname: ' + topicName);
	      }
	    },
	    err => {
	      console.log('\tError updating topic details: ' + topicName + 'error: ' + err);
	    }
	  );
	} // func.end
```

```

### List current mirroring topic selection

Mirroring user controls are only available on the target cluster in a mirroring environment.

To get the current topic selection, issue an GET request to /admin/mirroring/topic-selection


Expected status codes
- 200: Retrieved topic selection successfully in following format:
```
{
  "includes": [
    "^prefix1_.*",
    "^prefix2_.*"
  ]
}
```
- 403: Unauthorized to use mirroring user controls.
- 404: Mirroring not enabled. The mirroring user control APIs are only available on the target cluster of a mirrored pair.
- 503: An error occurred handling the request.

#### Example

```
```javascript
	function getMirroringTopicSelection(adminREST) {
	  console.log('List Mirroring Topic Selection');
	  const params = {};
	
	  // Call the get mirroring topic selection function on the service.
	  const getMirroringTopicSelectionResult = adminREST.getMirroringTopicSelection(params);
	
	  // Look at the results of the promise.
	  return getMirroringTopicSelectionResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'OK') {
	        for (const val of result.result) {
	          console.log('\tname: ' + val.name);
	        }
	      }
	    },
	    err => {
	      console.log('Error listing mirroring topics selection ' + err);
	    }
	  );
	} // func.end
```

```

### Replace selection of topics which are mirrored

Replace mirroring topic selection

Mirroring user controls are available on the target cluster in a mirroring environment.

To replace the current topic selection, issue a POST request to /admin/mirroring/topic-selection

Expected status codes

- 200: Replaced topic selection successfully. The new selection is returned in following format:
```
{
  "includes": [
    "^prefix1_.*",
    "^prefix2_.*"
  ]
}
```
- 400: Invalid request. The request data cannot be parsed and used to replace the topic selection.
- 403: Unauthorized to use mirroring user controls.
- 404: Mirroring not enabled. The mirroring user control APIs are only available on the target cluster of a mirrored pair.
- 415: Unsupported media type. Content-Type header with application/json is required.
- 503: An error occurred handling the request.

#### Example

```
```javascript
	function replaceMirroringTopicSelection(adminREST, topicName) {
	  console.log('Replace Mirroring Topics');
	  // Construct the params object for operation replaceMirroringTopicSelection
	  const includes = topicName;
	  const params = {
	    includes: includes,
	  };
	
	  // Call the replace mirroring topic selection on the service.
	  const replaceMirroringTopicSelectionResult = adminREST.replaceMirroringTopicSelection(params);
	
	  // Look at the results of the promise.
	  return replaceMirroringTopicSelectionResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'OK') {
	        console.log('\tmirroring topic selection updated ' + topicName);
	      }
	    },
	    err => {
	      console.log('Error replacing mirroring topics selection ' + err);
	    }
	  );
	} // func.end
```

```

### List active mirroring topics
---
Mirroring user controls are available on the target cluster in a mirroring environment.

To get the list of currently mirrored topics, issue an GET request to /admin/mirroring/active-topics

Expected status codes

- 200: Retrieved active topics successfully in following format:
  ```
  {
    "active_topics": [
      "topic1",
      "topic2"
    ]
  }
  ```
- 403: Unauthorized to use mirroring user controls.
- 404: Mirroring not enabled. The mirroring user control APIs are only available on the target cluster of a mirrored pair.
- 503: An error occurred handling the request.

#### Example

```
```javascript
	function getListMirroringActiveTopics(adminREST) {
	  console.log('List Active Mirroring Topic Selection\n');
	  // Construct the params object for operation getMirroringActiveTopics
	  const params = {};
	
	  // Call the get mirroring active topic function on the service.
	  const getMirroringActiveTopicsResult = adminREST.getMirroringActiveTopics(params);
	
	  // Look at the results of the promise.
	  return getMirroringActiveTopicsResult.then(
	    result => {
	      if (HTTP.STATUS_CODES[result.status] == 'OK') {
	        for (const val of result.result) {
	          console.log('\tname: ' + val.name);
	        }
	      }
	    },
	    err => {
	      console.log('Error listing active mirroring topics selection ' + err);
	    }
	  );
	} // func.end
```

```
