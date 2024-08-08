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
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');
const SchemaregistryV1 = require('../../dist/schemaregistry/v1');

const schemaregistryServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'ibm.com/123456',
};

const schemaregistryService = new SchemaregistryV1(schemaregistryServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(schemaregistryService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('SchemaregistryV1', () => {
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
      const testInstance = SchemaregistryV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(SchemaregistryV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(SchemaregistryV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(SchemaregistryV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = SchemaregistryV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(SchemaregistryV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new SchemaregistryV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SchemaregistryV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SchemaregistryV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getGlobalRule', () => {
    describe('positive tests', () => {
      function __getGlobalRuleTest() {
        // Construct the params object for operation getGlobalRule
        const rule = 'COMPATIBILITY';
        const getGlobalRuleParams = {
          rule,
        };

        const getGlobalRuleResult = schemaregistryService.getGlobalRule(getGlobalRuleParams);

        // all methods should return a Promise
        expectToBePromise(getGlobalRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules/{rule}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.rule).toEqual(rule);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGlobalRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __getGlobalRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __getGlobalRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rule = 'COMPATIBILITY';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGlobalRuleParams = {
          rule,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.getGlobalRule(getGlobalRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.getGlobalRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.getGlobalRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateGlobalRule', () => {
    describe('positive tests', () => {
      function __updateGlobalRuleTest() {
        // Construct the params object for operation updateGlobalRule
        const rule = 'COMPATIBILITY';
        const type = 'COMPATIBILITY';
        const config = 'BACKWARD';
        const updateGlobalRuleParams = {
          rule,
          type,
          config,
        };

        const updateGlobalRuleResult =
          schemaregistryService.updateGlobalRule(updateGlobalRuleParams);

        // all methods should return a Promise
        expectToBePromise(updateGlobalRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/rules/{rule}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.path.rule).toEqual(rule);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateGlobalRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __updateGlobalRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __updateGlobalRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rule = 'COMPATIBILITY';
        const type = 'COMPATIBILITY';
        const config = 'BACKWARD';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateGlobalRuleParams = {
          rule,
          type,
          config,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.updateGlobalRule(updateGlobalRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.updateGlobalRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.updateGlobalRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSchemaRule', () => {
    describe('positive tests', () => {
      function __createSchemaRuleTest() {
        // Construct the params object for operation createSchemaRule
        const id = 'testString';
        const type = 'COMPATIBILITY';
        const config = 'BACKWARD';
        const createSchemaRuleParams = {
          id,
          type,
          config,
        };

        const createSchemaRuleResult =
          schemaregistryService.createSchemaRule(createSchemaRuleParams);

        // all methods should return a Promise
        expectToBePromise(createSchemaRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSchemaRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __createSchemaRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __createSchemaRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const type = 'COMPATIBILITY';
        const config = 'BACKWARD';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSchemaRuleParams = {
          id,
          type,
          config,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.createSchemaRule(createSchemaRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.createSchemaRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.createSchemaRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSchemaRule', () => {
    describe('positive tests', () => {
      function __getSchemaRuleTest() {
        // Construct the params object for operation getSchemaRule
        const id = 'testString';
        const rule = 'COMPATIBILITY';
        const getSchemaRuleParams = {
          id,
          rule,
        };

        const getSchemaRuleResult = schemaregistryService.getSchemaRule(getSchemaRuleParams);

        // all methods should return a Promise
        expectToBePromise(getSchemaRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/rules/{rule}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.rule).toEqual(rule);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSchemaRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __getSchemaRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __getSchemaRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const rule = 'COMPATIBILITY';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSchemaRuleParams = {
          id,
          rule,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.getSchemaRule(getSchemaRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.getSchemaRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.getSchemaRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSchemaRule', () => {
    describe('positive tests', () => {
      function __updateSchemaRuleTest() {
        // Construct the params object for operation updateSchemaRule
        const id = 'testString';
        const rule = 'COMPATIBILITY';
        const type = 'COMPATIBILITY';
        const config = 'BACKWARD';
        const updateSchemaRuleParams = {
          id,
          rule,
          type,
          config,
        };

        const updateSchemaRuleResult =
          schemaregistryService.updateSchemaRule(updateSchemaRuleParams);

        // all methods should return a Promise
        expectToBePromise(updateSchemaRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/rules/{rule}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.rule).toEqual(rule);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSchemaRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __updateSchemaRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __updateSchemaRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const rule = 'COMPATIBILITY';
        const type = 'COMPATIBILITY';
        const config = 'BACKWARD';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSchemaRuleParams = {
          id,
          rule,
          type,
          config,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.updateSchemaRule(updateSchemaRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.updateSchemaRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.updateSchemaRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSchemaRule', () => {
    describe('positive tests', () => {
      function __deleteSchemaRuleTest() {
        // Construct the params object for operation deleteSchemaRule
        const id = 'testString';
        const rule = 'COMPATIBILITY';
        const deleteSchemaRuleParams = {
          id,
          rule,
        };

        const deleteSchemaRuleResult =
          schemaregistryService.deleteSchemaRule(deleteSchemaRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteSchemaRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/rules/{rule}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.rule).toEqual(rule);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSchemaRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __deleteSchemaRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __deleteSchemaRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const rule = 'COMPATIBILITY';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSchemaRuleParams = {
          id,
          rule,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.deleteSchemaRule(deleteSchemaRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.deleteSchemaRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.deleteSchemaRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('setSchemaState', () => {
    describe('positive tests', () => {
      function __setSchemaStateTest() {
        // Construct the params object for operation setSchemaState
        const id = 'testString';
        const state = 'ENABLED';
        const setSchemaStateParams = {
          id,
          state,
        };

        const setSchemaStateResult = schemaregistryService.setSchemaState(setSchemaStateParams);

        // all methods should return a Promise
        expectToBePromise(setSchemaStateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/state', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setSchemaStateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __setSchemaStateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __setSchemaStateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const state = 'ENABLED';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setSchemaStateParams = {
          id,
          state,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.setSchemaState(setSchemaStateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.setSchemaState({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.setSchemaState();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('setSchemaVersionState', () => {
    describe('positive tests', () => {
      function __setSchemaVersionStateTest() {
        // Construct the params object for operation setSchemaVersionState
        const id = 'testString';
        const version = 38;
        const state = 'ENABLED';
        const setSchemaVersionStateParams = {
          id,
          version,
          state,
        };

        const setSchemaVersionStateResult = schemaregistryService.setSchemaVersionState(
          setSchemaVersionStateParams
        );

        // all methods should return a Promise
        expectToBePromise(setSchemaVersionStateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/versions/{version}/state', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setSchemaVersionStateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __setSchemaVersionStateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __setSchemaVersionStateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const version = 38;
        const state = 'ENABLED';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setSchemaVersionStateParams = {
          id,
          version,
          state,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.setSchemaVersionState(setSchemaVersionStateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.setSchemaVersionState({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.setSchemaVersionState();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listVersions', () => {
    describe('positive tests', () => {
      function __listVersionsTest() {
        // Construct the params object for operation listVersions
        const id = 'testString';
        const jsonformat = 'testString';
        const listVersionsParams = {
          id,
          jsonformat,
        };

        const listVersionsResult = schemaregistryService.listVersions(listVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.jsonformat).toEqual(jsonformat);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __listVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __listVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVersionsParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.listVersions(listVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.listVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.listVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createVersion', () => {
    describe('positive tests', () => {
      function __createVersionTest() {
        // Construct the params object for operation createVersion
        const id = 'testString';
        const schema = { anyKey: 'anyValue' };
        const createVersionParams = {
          id,
          schema,
        };

        const createVersionResult = schemaregistryService.createVersion(createVersionParams);

        // all methods should return a Promise
        expectToBePromise(createVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.schema).toEqual(schema);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __createVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __createVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVersionParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.createVersion(createVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.createVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.createVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getVersion', () => {
    describe('positive tests', () => {
      function __getVersionTest() {
        // Construct the params object for operation getVersion
        const id = 'testString';
        const version = 38;
        const getVersionParams = {
          id,
          version,
        };

        const getVersionResult = schemaregistryService.getVersion(getVersionParams);

        // all methods should return a Promise
        expectToBePromise(getVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/versions/{version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __getVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __getVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const version = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVersionParams = {
          id,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.getVersion(getVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.getVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.getVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteVersion', () => {
    describe('positive tests', () => {
      function __deleteVersionTest() {
        // Construct the params object for operation deleteVersion
        const id = 'testString';
        const version = 38;
        const deleteVersionParams = {
          id,
          version,
        };

        const deleteVersionResult = schemaregistryService.deleteVersion(deleteVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}/versions/{version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __deleteVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __deleteVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const version = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVersionParams = {
          id,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.deleteVersion(deleteVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.deleteVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.deleteVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSchemas', () => {
    describe('positive tests', () => {
      function __listSchemasTest() {
        // Construct the params object for operation listSchemas
        const jsonformat = 'testString';
        const listSchemasParams = {
          jsonformat,
        };

        const listSchemasResult = schemaregistryService.listSchemas(listSchemasParams);

        // all methods should return a Promise
        expectToBePromise(listSchemasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.jsonformat).toEqual(jsonformat);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSchemasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __listSchemasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __listSchemasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSchemasParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.listSchemas(listSchemasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        schemaregistryService.listSchemas({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createSchema', () => {
    describe('positive tests', () => {
      function __createSchemaTest() {
        // Construct the params object for operation createSchema
        const schema = { anyKey: 'anyValue' };
        const xRegistryArtifactId = 'testString';
        const createSchemaParams = {
          schema,
          xRegistryArtifactId,
        };

        const createSchemaResult = schemaregistryService.createSchema(createSchemaParams);

        // all methods should return a Promise
        expectToBePromise(createSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Registry-ArtifactId', xRegistryArtifactId);
        expect(mockRequestOptions.body.schema).toEqual(schema);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __createSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __createSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSchemaParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.createSchema(createSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        schemaregistryService.createSchema({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getLatestSchema', () => {
    describe('positive tests', () => {
      function __getLatestSchemaTest() {
        // Construct the params object for operation getLatestSchema
        const id = 'testString';
        const getLatestSchemaParams = {
          id,
        };

        const getLatestSchemaResult = schemaregistryService.getLatestSchema(getLatestSchemaParams);

        // all methods should return a Promise
        expectToBePromise(getLatestSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLatestSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __getLatestSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __getLatestSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLatestSchemaParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.getLatestSchema(getLatestSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.getLatestSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.getLatestSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSchema', () => {
    describe('positive tests', () => {
      function __deleteSchemaTest() {
        // Construct the params object for operation deleteSchema
        const id = 'testString';
        const deleteSchemaParams = {
          id,
        };

        const deleteSchemaResult = schemaregistryService.deleteSchema(deleteSchemaParams);

        // all methods should return a Promise
        expectToBePromise(deleteSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __deleteSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __deleteSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSchemaParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.deleteSchema(deleteSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.deleteSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.deleteSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSchema', () => {
    describe('positive tests', () => {
      function __updateSchemaTest() {
        // Construct the params object for operation updateSchema
        const id = 'testString';
        const schema = { anyKey: 'anyValue' };
        const updateSchemaParams = {
          id,
          schema,
        };

        const updateSchemaResult = schemaregistryService.updateSchema(updateSchemaParams);

        // all methods should return a Promise
        expectToBePromise(updateSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/artifacts/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.schema).toEqual(schema);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.enableRetries();
        __updateSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        schemaregistryService.disableRetries();
        __updateSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSchemaParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        schemaregistryService.updateSchema(updateSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await schemaregistryService.updateSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await schemaregistryService.updateSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
