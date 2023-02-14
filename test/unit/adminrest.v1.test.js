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
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const AdminrestV1 = require('../../dist/adminrest/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://adminrest.cloud.ibm.com',
};

const adminrestService = new AdminrestV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(adminrestService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('AdminrestV1', () => {
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

      // ConfigCreate
      const configCreateModel = {
        name: 'testString',
        value: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTopic
        const name = 'testString';
        const partitions = 26;
        const partitionCount = 1;
        const configs = [configCreateModel];
        const params = {
          name: name,
          partitions: partitions,
          partitionCount: partitionCount,
          configs: configs,
        };

        const createTopicResult = adminrestService.createTopic(params);

        // all methods should return a Promise
        expectToBePromise(createTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/topics', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['partitions']).toEqual(partitions);
        expect(options.body['partition_count']).toEqual(partitionCount);
        expect(options.body['configs']).toEqual(configs);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.createTopic(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.createTopic({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listTopics', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTopics
        const topicFilter = 'testString';
        const perPage = 38;
        const page = 38;
        const params = {
          topicFilter: topicFilter,
          perPage: perPage,
          page: page,
        };

        const listTopicsResult = adminrestService.listTopics(params);

        // all methods should return a Promise
        expectToBePromise(listTopicsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/topics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['topic_filter']).toEqual(topicFilter);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.qs['page']).toEqual(page);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.listTopics(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTopic
        const topicName = 'testString';
        const params = {
          topicName: topicName,
        };

        const getTopicResult = adminrestService.getTopic(params);

        // all methods should return a Promise
        expectToBePromise(getTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/topics/{topic_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['topic_name']).toEqual(topicName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getTopic(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        try {
          await adminrestService.getTopic({});
        } catch (e) {
          expect(e.message).toMatch(/Missing required parameters/);
        }
      });

      test('should reject promise when required params are not given', done => {
        const getTopicPromise = adminrestService.getTopic();
        expectToBePromise(getTopicPromise);

        getTopicPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTopic', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTopic
        const topicName = 'testString';
        const params = {
          topicName: topicName,
        };

        const deleteTopicResult = adminrestService.deleteTopic(params);

        // all methods should return a Promise
        expectToBePromise(deleteTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/topics/{topic_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['topic_name']).toEqual(topicName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.deleteTopic(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        try {
          await adminrestService.deleteTopic({});
        } catch (e) {
          expect(e.message).toMatch(/Missing required parameters/);
        }
      });

      test('should reject promise when required params are not given', done => {
        const deleteTopicPromise = adminrestService.deleteTopic();
        expectToBePromise(deleteTopicPromise);

        deleteTopicPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateTopic', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigUpdate
      const configUpdateModel = {
        name: 'testString',
        value: 'testString',
        reset_to_default: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateTopic
        const topicName = 'testString';
        const newTotalPartitionCount = 38;
        const configs = [configUpdateModel];
        const params = {
          topicName: topicName,
          newTotalPartitionCount: newTotalPartitionCount,
          configs: configs,
        };

        const updateTopicResult = adminrestService.updateTopic(params);

        // all methods should return a Promise
        expectToBePromise(updateTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/topics/{topic_name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['new_total_partition_count']).toEqual(newTotalPartitionCount);
        expect(options.body['configs']).toEqual(configs);
        expect(options.path['topic_name']).toEqual(topicName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const topicName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          topicName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.updateTopic(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        try {
          await adminrestService.updateTopic({});
        } catch (e) {
          expect(e.message).toMatch(/Missing required parameters/);
        }
      });

      test('should reject promise when required params are not given', done => {
        const updateTopicPromise = adminrestService.updateTopic();
        expectToBePromise(updateTopicPromise);

        updateTopicPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getMirroringTopicSelection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMirroringTopicSelection
        const params = {};

        const getMirroringTopicSelectionResult = adminrestService.getMirroringTopicSelection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getMirroringTopicSelectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/mirroring/topic-selection', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getMirroringTopicSelection(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation replaceMirroringTopicSelection
        const includes = ['testString'];
        const params = {
          includes: includes,
        };

        const replaceMirroringTopicSelectionResult = adminrestService.replaceMirroringTopicSelection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(replaceMirroringTopicSelectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/mirroring/topic-selection', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['includes']).toEqual(includes);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.replaceMirroringTopicSelection(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMirroringActiveTopics
        const params = {};

        const getMirroringActiveTopicsResult = adminrestService.getMirroringActiveTopics(params);

        // all methods should return a Promise
        expectToBePromise(getMirroringActiveTopicsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/admin/mirroring/active-topics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        adminrestService.getMirroringActiveTopics(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        adminrestService.getMirroringActiveTopics({});
        checkForSuccessfulExecution(createRequestMock);
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
});
