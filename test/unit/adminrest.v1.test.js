/**
 * (C) Copyright IBM Corp. 2024.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');
const AdminrestV1 = require('../../dist/adminrest/v1');

const adminrestServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'ibm.com/123456',
};

const adminrestService = new AdminrestV1(adminrestServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(adminrestService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('AdminrestV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = AdminrestV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(AdminrestV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(AdminrestV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(AdminrestV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = AdminrestV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AdminrestV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new AdminrestV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new AdminrestV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AdminrestV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('createTopic', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TopicCreateRequestConfigsItem
      const topicCreateRequestConfigsItemModel = {
        name: 'testString',
        value: 'testString',
      };

      function __createTopicTest() {
        // Construct the params object for operation createTopic
        const name = 'testString';
        const partitions = 26;
        const partitionCount = 1;
        const configs = [topicCreateRequestConfigsItemModel];
        const createTopicParams = {
          name,
          partitions,
          partitionCount,
          configs,
        };

        const createTopicResult = adminrestService.createTopic(createTopicParams);

        // all methods should return a Promise
        expectToBePromise(createTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.partitions).toEqual(partitions);
        expect(mockRequestOptions.body.partition_count).toEqual(partitionCount);
        expect(mockRequestOptions.body.configs).toEqual(configs);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __createTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __createTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTopicParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.createTopic(createTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.createTopic({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('alive', () => {
    describe('positive tests', () => {
      function __aliveTest() {
        // Construct the params object for operation alive
        const aliveParams = {};

        const aliveResult = adminrestService.alive(aliveParams);

        // all methods should return a Promise
        expectToBePromise(aliveResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/alive', 'GET');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __aliveTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __aliveTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __aliveTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const aliveParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.alive(aliveParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.alive({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listTopics', () => {
    describe('positive tests', () => {
      function __listTopicsTest() {
        // Construct the params object for operation listTopics
        const topicFilter = 'testString';
        const perPage = 38;
        const page = 38;
        const listTopicsParams = {
          topicFilter,
          perPage,
          page,
        };

        const listTopicsResult = adminrestService.listTopics(listTopicsParams);

        // all methods should return a Promise
        expectToBePromise(listTopicsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.topic_filter).toEqual(topicFilter);
        expect(mockRequestOptions.qs.per_page).toEqual(perPage);
        expect(mockRequestOptions.qs.page).toEqual(page);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTopicsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __listTopicsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __listTopicsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTopicsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.listTopics(listTopicsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.listTopics({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getTopic', () => {
    describe('positive tests', () => {
      function __getTopicTest() {
        // Construct the params object for operation getTopic
        const topicName = 'testString';
        const getTopicParams = {
          topicName,
        };

        const getTopicResult = adminrestService.getTopic(getTopicParams);

        // all methods should return a Promise
        expectToBePromise(getTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics/{topic_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.topic_name).toEqual(topicName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTopicParams = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getTopic(getTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.getTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.getTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTopic', () => {
    describe('positive tests', () => {
      function __deleteTopicTest() {
        // Construct the params object for operation deleteTopic
        const topicName = 'testString';
        const deleteTopicParams = {
          topicName,
        };

        const deleteTopicResult = adminrestService.deleteTopic(deleteTopicParams);

        // all methods should return a Promise
        expectToBePromise(deleteTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics/{topic_name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.topic_name).toEqual(topicName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __deleteTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __deleteTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTopicParams = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.deleteTopic(deleteTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.deleteTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.deleteTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTopic', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TopicUpdateRequestConfigsItem
      const topicUpdateRequestConfigsItemModel = {
        name: 'testString',
        value: 'testString',
        reset_to_default: true,
      };

      function __updateTopicTest() {
        // Construct the params object for operation updateTopic
        const topicName = 'testString';
        const newTotalPartitionCount = 38;
        const configs = [topicUpdateRequestConfigsItemModel];
        const updateTopicParams = {
          topicName,
          newTotalPartitionCount,
          configs,
        };

        const updateTopicResult = adminrestService.updateTopic(updateTopicParams);

        // all methods should return a Promise
        expectToBePromise(updateTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics/{topic_name}', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.new_total_partition_count).toEqual(newTotalPartitionCount);
        expect(mockRequestOptions.body.configs).toEqual(configs);
        expect(mockRequestOptions.path.topic_name).toEqual(topicName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __updateTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __updateTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTopicParams = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.updateTopic(updateTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.updateTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.updateTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTopicRecords', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RecordDeleteRequestRecordsToDeleteItem
      const recordDeleteRequestRecordsToDeleteItemModel = {
        partition: 38,
        before_offset: 26,
      };

      function __deleteTopicRecordsTest() {
        // Construct the params object for operation deleteTopicRecords
        const topicName = 'testString';
        const recordsToDelete = [recordDeleteRequestRecordsToDeleteItemModel];
        const deleteTopicRecordsParams = {
          topicName,
          recordsToDelete,
        };

        const deleteTopicRecordsResult =
          adminrestService.deleteTopicRecords(deleteTopicRecordsParams);

        // all methods should return a Promise
        expectToBePromise(deleteTopicRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics/{topic_name}/records', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.records_to_delete).toEqual(recordsToDelete);
        expect(mockRequestOptions.path.topic_name).toEqual(topicName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTopicRecordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __deleteTopicRecordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __deleteTopicRecordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTopicRecordsParams = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.deleteTopicRecords(deleteTopicRecordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.deleteTopicRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.deleteTopicRecords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createQuota', () => {
    describe('positive tests', () => {
      function __createQuotaTest() {
        // Construct the params object for operation createQuota
        const entityName = 'testString';
        const producerByteRate = 1024;
        const consumerByteRate = 1024;
        const createQuotaParams = {
          entityName,
          producerByteRate,
          consumerByteRate,
        };

        const createQuotaResult = adminrestService.createQuota(createQuotaParams);

        // all methods should return a Promise
        expectToBePromise(createQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/quotas/{entity_name}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.producer_byte_rate).toEqual(producerByteRate);
        expect(mockRequestOptions.body.consumer_byte_rate).toEqual(consumerByteRate);
        expect(mockRequestOptions.path.entity_name).toEqual(entityName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createQuotaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __createQuotaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __createQuotaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const entityName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createQuotaParams = {
          entityName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.createQuota(createQuotaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.createQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.createQuota();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateQuota', () => {
    describe('positive tests', () => {
      function __updateQuotaTest() {
        // Construct the params object for operation updateQuota
        const entityName = 'testString';
        const producerByteRate = 1024;
        const consumerByteRate = 1024;
        const updateQuotaParams = {
          entityName,
          producerByteRate,
          consumerByteRate,
        };

        const updateQuotaResult = adminrestService.updateQuota(updateQuotaParams);

        // all methods should return a Promise
        expectToBePromise(updateQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/quotas/{entity_name}', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.producer_byte_rate).toEqual(producerByteRate);
        expect(mockRequestOptions.body.consumer_byte_rate).toEqual(consumerByteRate);
        expect(mockRequestOptions.path.entity_name).toEqual(entityName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateQuotaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __updateQuotaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __updateQuotaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const entityName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateQuotaParams = {
          entityName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.updateQuota(updateQuotaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.updateQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.updateQuota();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteQuota', () => {
    describe('positive tests', () => {
      function __deleteQuotaTest() {
        // Construct the params object for operation deleteQuota
        const entityName = 'testString';
        const deleteQuotaParams = {
          entityName,
        };

        const deleteQuotaResult = adminrestService.deleteQuota(deleteQuotaParams);

        // all methods should return a Promise
        expectToBePromise(deleteQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/quotas/{entity_name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.entity_name).toEqual(entityName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteQuotaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __deleteQuotaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __deleteQuotaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const entityName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteQuotaParams = {
          entityName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.deleteQuota(deleteQuotaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.deleteQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.deleteQuota();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getQuota', () => {
    describe('positive tests', () => {
      function __getQuotaTest() {
        // Construct the params object for operation getQuota
        const entityName = 'testString';
        const getQuotaParams = {
          entityName,
        };

        const getQuotaResult = adminrestService.getQuota(getQuotaParams);

        // all methods should return a Promise
        expectToBePromise(getQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/quotas/{entity_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.entity_name).toEqual(entityName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getQuotaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getQuotaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getQuotaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const entityName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getQuotaParams = {
          entityName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getQuota(getQuotaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.getQuota({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.getQuota();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listQuotas', () => {
    describe('positive tests', () => {
      function __listQuotasTest() {
        // Construct the params object for operation listQuotas
        const listQuotasParams = {};

        const listQuotasResult = adminrestService.listQuotas(listQuotasParams);

        // all methods should return a Promise
        expectToBePromise(listQuotasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/quotas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listQuotasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __listQuotasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __listQuotasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listQuotasParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.listQuotas(listQuotasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.listQuotas({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listBrokers', () => {
    describe('positive tests', () => {
      function __listBrokersTest() {
        // Construct the params object for operation listBrokers
        const listBrokersParams = {};

        const listBrokersResult = adminrestService.listBrokers(listBrokersParams);

        // all methods should return a Promise
        expectToBePromise(listBrokersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/brokers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBrokersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __listBrokersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __listBrokersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBrokersParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.listBrokers(listBrokersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.listBrokers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getBroker', () => {
    describe('positive tests', () => {
      function __getBrokerTest() {
        // Construct the params object for operation getBroker
        const brokerId = 38;
        const getBrokerParams = {
          brokerId,
        };

        const getBrokerResult = adminrestService.getBroker(getBrokerParams);

        // all methods should return a Promise
        expectToBePromise(getBrokerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/brokers/{broker_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.broker_id).toEqual(brokerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBrokerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getBrokerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getBrokerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const brokerId = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBrokerParams = {
          brokerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getBroker(getBrokerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.getBroker({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.getBroker();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBrokerConfig', () => {
    describe('positive tests', () => {
      function __getBrokerConfigTest() {
        // Construct the params object for operation getBrokerConfig
        const brokerId = 38;
        const configFilter = 'testString';
        const verbose = true;
        const getBrokerConfigParams = {
          brokerId,
          configFilter,
          verbose,
        };

        const getBrokerConfigResult = adminrestService.getBrokerConfig(getBrokerConfigParams);

        // all methods should return a Promise
        expectToBePromise(getBrokerConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/brokers/{broker_id}/configs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.config_filter).toEqual(configFilter);
        expect(mockRequestOptions.qs.verbose).toEqual(verbose);
        expect(mockRequestOptions.path.broker_id).toEqual(brokerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBrokerConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getBrokerConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getBrokerConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const brokerId = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBrokerConfigParams = {
          brokerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getBrokerConfig(getBrokerConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.getBrokerConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.getBrokerConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCluster', () => {
    describe('positive tests', () => {
      function __getClusterTest() {
        // Construct the params object for operation getCluster
        const getClusterParams = {};

        const getClusterResult = adminrestService.getCluster(getClusterParams);

        // all methods should return a Promise
        expectToBePromise(getClusterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/cluster', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getClusterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getClusterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getClusterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getClusterParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getCluster(getClusterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.getCluster({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listConsumerGroups', () => {
    describe('positive tests', () => {
      function __listConsumerGroupsTest() {
        // Construct the params object for operation listConsumerGroups
        const groupFilter = 'testString';
        const perPage = 38;
        const page = 38;
        const listConsumerGroupsParams = {
          groupFilter,
          perPage,
          page,
        };

        const listConsumerGroupsResult =
          adminrestService.listConsumerGroups(listConsumerGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listConsumerGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/consumergroups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.group_filter).toEqual(groupFilter);
        expect(mockRequestOptions.qs.per_page).toEqual(perPage);
        expect(mockRequestOptions.qs.page).toEqual(page);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConsumerGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __listConsumerGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __listConsumerGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConsumerGroupsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.listConsumerGroups(listConsumerGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.listConsumerGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getConsumerGroup', () => {
    describe('positive tests', () => {
      function __getConsumerGroupTest() {
        // Construct the params object for operation getConsumerGroup
        const groupId = 'testString';
        const getConsumerGroupParams = {
          groupId,
        };

        const getConsumerGroupResult = adminrestService.getConsumerGroup(getConsumerGroupParams);

        // all methods should return a Promise
        expectToBePromise(getConsumerGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/consumergroups/{group_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.group_id).toEqual(groupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConsumerGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getConsumerGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getConsumerGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const groupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConsumerGroupParams = {
          groupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getConsumerGroup(getConsumerGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.getConsumerGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.getConsumerGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteConsumerGroup', () => {
    describe('positive tests', () => {
      function __deleteConsumerGroupTest() {
        // Construct the params object for operation deleteConsumerGroup
        const groupId = 'testString';
        const deleteConsumerGroupParams = {
          groupId,
        };

        const deleteConsumerGroupResult =
          adminrestService.deleteConsumerGroup(deleteConsumerGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteConsumerGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/consumergroups/{group_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.group_id).toEqual(groupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConsumerGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __deleteConsumerGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __deleteConsumerGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const groupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConsumerGroupParams = {
          groupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.deleteConsumerGroup(deleteConsumerGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.deleteConsumerGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.deleteConsumerGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateConsumerGroup', () => {
    describe('positive tests', () => {
      function __updateConsumerGroupTest() {
        // Construct the params object for operation updateConsumerGroup
        const groupId = 'testString';
        const topic = 'testString';
        const mode = 'testString';
        const value = 'testString';
        const execute = true;
        const updateConsumerGroupParams = {
          groupId,
          topic,
          mode,
          value,
          execute,
        };

        const updateConsumerGroupResult =
          adminrestService.updateConsumerGroup(updateConsumerGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateConsumerGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/consumergroups/{group_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.topic).toEqual(topic);
        expect(mockRequestOptions.body.mode).toEqual(mode);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.execute).toEqual(execute);
        expect(mockRequestOptions.path.group_id).toEqual(groupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateConsumerGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __updateConsumerGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __updateConsumerGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const groupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConsumerGroupParams = {
          groupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.updateConsumerGroup(updateConsumerGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await adminrestService.updateConsumerGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await adminrestService.updateConsumerGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getMirroringTopicSelection', () => {
    describe('positive tests', () => {
      function __getMirroringTopicSelectionTest() {
        // Construct the params object for operation getMirroringTopicSelection
        const getMirroringTopicSelectionParams = {};

        const getMirroringTopicSelectionResult = adminrestService.getMirroringTopicSelection(
          getMirroringTopicSelectionParams
        );

        // all methods should return a Promise
        expectToBePromise(getMirroringTopicSelectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/mirroring/topic-selection', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMirroringTopicSelectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getMirroringTopicSelectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getMirroringTopicSelectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMirroringTopicSelectionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getMirroringTopicSelection(getMirroringTopicSelectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.getMirroringTopicSelection({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('replaceMirroringTopicSelection', () => {
    describe('positive tests', () => {
      function __replaceMirroringTopicSelectionTest() {
        // Construct the params object for operation replaceMirroringTopicSelection
        const includes = ['testString'];
        const replaceMirroringTopicSelectionParams = {
          includes,
        };

        const replaceMirroringTopicSelectionResult =
          adminrestService.replaceMirroringTopicSelection(replaceMirroringTopicSelectionParams);

        // all methods should return a Promise
        expectToBePromise(replaceMirroringTopicSelectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/mirroring/topic-selection', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.includes).toEqual(includes);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceMirroringTopicSelectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __replaceMirroringTopicSelectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __replaceMirroringTopicSelectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceMirroringTopicSelectionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.replaceMirroringTopicSelection(replaceMirroringTopicSelectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.replaceMirroringTopicSelection({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getMirroringActiveTopics', () => {
    describe('positive tests', () => {
      function __getMirroringActiveTopicsTest() {
        // Construct the params object for operation getMirroringActiveTopics
        const getMirroringActiveTopicsParams = {};

        const getMirroringActiveTopicsResult = adminrestService.getMirroringActiveTopics(
          getMirroringActiveTopicsParams
        );

        // all methods should return a Promise
        expectToBePromise(getMirroringActiveTopicsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/mirroring/active-topics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMirroringActiveTopicsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getMirroringActiveTopicsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getMirroringActiveTopicsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMirroringActiveTopicsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getMirroringActiveTopics(getMirroringActiveTopicsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.getMirroringActiveTopics({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getStatus', () => {
    describe('positive tests', () => {
      function __getStatusTest() {
        // Construct the params object for operation getStatus
        const getStatusParams = {};

        const getStatusResult = adminrestService.getStatus(getStatusParams);

        // all methods should return a Promise
        expectToBePromise(getStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/status', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        adminrestService.enableRetries();
        __getStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        adminrestService.disableRetries();
        __getStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getStatusParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getStatus(getStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.getStatus({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
