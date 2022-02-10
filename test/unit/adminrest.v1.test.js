/**
 * (C) Copyright IBM Corp. 2022.
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

const adminrestServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://adminrest.cloud.ibm.com',
};

const adminrestService = new AdminrestV1(adminrestServiceOptions);

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

      function __createTopicTest() {
        // Construct the params object for operation createTopic
        const name = 'testString';
        const partitions = 26;
        const partitionCount = 1;
        const configs = [configCreateModel];
        const createTopicParams = {
          name: name,
          partitions: partitions,
          partitionCount: partitionCount,
          configs: configs,
        };

        const createTopicResult = adminrestService.createTopic(createTopicParams);

        // all methods should return a Promise
        expectToBePromise(createTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics', 'POST');
        const expectedAccept = 'application/json';
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
  describe('listTopics', () => {
    describe('positive tests', () => {
      function __listTopicsTest() {
        // Construct the params object for operation listTopics
        const topicFilter = 'testString';
        const perPage = 38;
        const page = 38;
        const listTopicsParams = {
          topicFilter: topicFilter,
          perPage: perPage,
          page: page,
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
          topicName: topicName,
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
          topicName: topicName,
        };

        const deleteTopicResult = adminrestService.deleteTopic(deleteTopicParams);

        // all methods should return a Promise
        expectToBePromise(deleteTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics/{topic_name}', 'DELETE');
        const expectedAccept = 'application/json';
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

      // ConfigUpdate
      const configUpdateModel = {
        name: 'testString',
        value: 'testString',
        reset_to_default: true,
      };

      function __updateTopicTest() {
        // Construct the params object for operation updateTopic
        const topicName = 'testString';
        const newTotalPartitionCount = 38;
        const configs = [configUpdateModel];
        const updateTopicParams = {
          topicName: topicName,
          newTotalPartitionCount: newTotalPartitionCount,
          configs: configs,
        };

        const updateTopicResult = adminrestService.updateTopic(updateTopicParams);

        // all methods should return a Promise
        expectToBePromise(updateTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/admin/topics/{topic_name}', 'PATCH');
        const expectedAccept = 'application/json';
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
  describe('getMirroringTopicSelection', () => {
    describe('positive tests', () => {
      function __getMirroringTopicSelectionTest() {
        // Construct the params object for operation getMirroringTopicSelection
        const getMirroringTopicSelectionParams = {};

        const getMirroringTopicSelectionResult = adminrestService.getMirroringTopicSelection(getMirroringTopicSelectionParams);

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
          includes: includes,
        };

        const replaceMirroringTopicSelectionResult = adminrestService.replaceMirroringTopicSelection(replaceMirroringTopicSelectionParams);

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

        const getMirroringActiveTopicsResult = adminrestService.getMirroringActiveTopics(getMirroringActiveTopicsParams);

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
});
