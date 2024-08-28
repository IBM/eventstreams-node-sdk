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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.93.0-c40121e6-20240729-182103
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Event Streams schema registry management
 *
 * API Version: 1.4.1
 */

class SchemaregistryV1 extends BaseService {
  static DEFAULT_SERVICE_NAME: string = 'schemaregistry';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SchemaregistryV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {SchemaregistryV1}
   */

  public static newInstance(options: UserOptions): SchemaregistryV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SchemaregistryV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a SchemaregistryV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SchemaregistryV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
  }

  /*************************
   * globalRules
   ************************/

  /**
   * Retrieve the configuration for a global rule.
   *
   * Retrieves the configuration for the specified global rule. The value of the global rule is used as the _default_
   * when a schema does not have a corresponding schema compatibility rule defined.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rule - The type of the global rule to retrieve. Currently only `COMPATIBILITY` is supported.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>>}
   */
  public getGlobalRule(
    params: SchemaregistryV1.GetGlobalRuleParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['rule'];
    const _validParams = ['rule', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'rule': _params.rule,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getGlobalRule');

    const parameters = {
      options: {
        url: '/rules/{rule}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the configuration for a global rule.
   *
   * Update the configuration for the specified global rule. The value of the global rule is used as the _default_ when
   * a schema does not have a corresponding schema compatibility rule defined.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rule - The type of the global rule to update. Currently only `COMPATIBILITY` is supported.
   * @param {string} params.type - The type of the rule. Currently only one type is supported (`COMPATIBILITY`).
   * @param {string} params.config - The configuration value for the rule. Which values are valid depends on the value
   * of this object's `type` property.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>>}
   */
  public updateGlobalRule(
    params: SchemaregistryV1.UpdateGlobalRuleParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['rule', 'type', 'config'];
    const _validParams = ['rule', 'type', 'config', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'config': _params.config,
    };

    const path = {
      'rule': _params.rule,
    };

    const sdkHeaders = getSdkHeaders(
      SchemaregistryV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateGlobalRule'
    );

    const parameters = {
      options: {
        url: '/rules/{rule}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * schemaRules
   ************************/

  /**
   * Create a schema rule.
   *
   * Create a new rule that controls compatibility checks for a particular schema. Schema rules override the registries
   * global compatibility rule setting.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the schema that the rule is to be associated with.
   * @param {string} params.type - The type of the rule. Currently only one type is supported (`COMPATIBILITY`).
   * @param {string} params.config - The configuration value for the rule. Which values are valid depends on the value
   * of this object's `type` property.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>>}
   */
  public createSchemaRule(
    params: SchemaregistryV1.CreateSchemaRuleParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'type', 'config'];
    const _validParams = ['id', 'type', 'config', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'config': _params.config,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SchemaregistryV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createSchemaRule'
    );

    const parameters = {
      options: {
        url: '/artifacts/{id}/rules',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a schema rule configuration.
   *
   * Retrieves the current configuration for a schema rule. If a schema rule exists then it overrides the corresponding
   * global rule that would otherwise be applied.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the schema to retrieve the rule for.
   * @param {string} params.rule - The type of rule to retrieve. Currently only the value that can be specified is
   * `COMPATIBILITY`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>>}
   */
  public getSchemaRule(
    params: SchemaregistryV1.GetSchemaRuleParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'rule'];
    const _validParams = ['id', 'rule', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
      'rule': _params.rule,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getSchemaRule');

    const parameters = {
      options: {
        url: '/artifacts/{id}/rules/{rule}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the configuration of a schema rule.
   *
   * Updates the configuration of an existing schema rule. The updated rule will be applied to the specified schema,
   * overriding the value set for the corresponding global rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the schema for which to update the rule configuration.
   * @param {string} params.rule - The type of rule to update. Currently only the value that can be specified is
   * `COMPATIBILITY`.
   * @param {string} params.type - The type of the rule. Currently only one type is supported (`COMPATIBILITY`).
   * @param {string} params.config - The configuration value for the rule. Which values are valid depends on the value
   * of this object's `type` property.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>>}
   */
  public updateSchemaRule(
    params: SchemaregistryV1.UpdateSchemaRuleParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'rule', 'type', 'config'];
    const _validParams = ['id', 'rule', 'type', 'config', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'config': _params.config,
    };

    const path = {
      'id': _params.id,
      'rule': _params.rule,
    };

    const sdkHeaders = getSdkHeaders(
      SchemaregistryV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateSchemaRule'
    );

    const parameters = {
      options: {
        url: '/artifacts/{id}/rules/{rule}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a schema rule.
   *
   * Delete a rule that controls compatibility checks for a particular schema. After this operation completes the schema
   * will be subject to compatibility checking defined by the global compatibility rule setting for the registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the schema that the rule is to be deleted from.
   * @param {string} params.rule - The type of rule to delete. Currently only the value that can be specified is
   * `COMPATIBILITY`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>>}
   */
  public deleteSchemaRule(
    params: SchemaregistryV1.DeleteSchemaRuleParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'rule'];
    const _validParams = ['id', 'rule', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
      'rule': _params.rule,
    };

    const sdkHeaders = getSdkHeaders(
      SchemaregistryV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteSchemaRule'
    );

    const parameters = {
      options: {
        url: '/artifacts/{id}/rules/{rule}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * schemaState
   ************************/

  /**
   * Set schema state.
   *
   * Sets schema state.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of a schema.
   * @param {string} params.state - The state of the schema or schema version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>>}
   */
  public setSchemaState(
    params: SchemaregistryV1.SetSchemaStateParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'state'];
    const _validParams = ['id', 'state', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'state': _params.state,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'setSchemaState');

    const parameters = {
      options: {
        url: '/artifacts/{id}/state',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * schemaVersionState
   ************************/

  /**
   * Set schema version state.
   *
   * Sets schema version state.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of a schema.
   * @param {number} params.version - The version number that identifies the particular schema version to return.
   * @param {string} params.state - The state of the schema or schema version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>>}
   */
  public setSchemaVersionState(
    params: SchemaregistryV1.SetSchemaVersionStateParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'version', 'state'];
    const _validParams = ['id', 'version', 'state', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'state': _params.state,
    };

    const path = {
      'id': _params.id,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      SchemaregistryV1.DEFAULT_SERVICE_NAME,
      'v1',
      'setSchemaVersionState'
    );

    const parameters = {
      options: {
        url: '/artifacts/{id}/versions/{version}/state',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * schemaVersions
   ************************/

  /**
   * List the versions of a schema.
   *
   * Returns an array containing the version numbers of all of the versions of the specified schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The schema ID for which the list of versions will be returned.
   * @param {string} [params.jsonformat] - format of the response to be returned, allowed values are 'number' and
   * 'object'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<number[]>>}
   */
  public listVersions(
    params: SchemaregistryV1.ListVersionsParams
  ): Promise<SchemaregistryV1.Response<number[]>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'jsonformat', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'jsonformat': _params.jsonformat,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listVersions');

    const parameters = {
      options: {
        url: '/artifacts/{id}/versions',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a new schema version.
   *
   * Creates a new version of a schema using the AVRO schema supplied in the request body.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - A schema ID. This identifies the schema for which a new version will be created.
   * @param {JsonObject} [params.schema] - The AVRO schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.SchemaMetadata>>}
   */
  public createVersion(
    params: SchemaregistryV1.CreateVersionParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.SchemaMetadata>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'schema', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'schema': _params.schema,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'createVersion');

    const parameters = {
      options: {
        url: '/artifacts/{id}/versions',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a version of the schema.
   *
   * Retrieve a particular version of the schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The schema ID identifying which schema to return a version from.
   * @param {number} params.version - The version number that identifies the particular schema version to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.AvroSchema>>}
   */
  public getVersion(
    params: SchemaregistryV1.GetVersionParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.AvroSchema>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'version'];
    const _validParams = ['id', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getVersion');

    const parameters = {
      options: {
        url: '/artifacts/{id}/versions/{version}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a version of the schema.
   *
   * Delete a version of the schema. If this was the only version of the schema then the whole schema will be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - A schema ID that identifies the schema to delete a version from.
   * @param {number} params.version - The schema version number to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>>}
   */
  public deleteVersion(
    params: SchemaregistryV1.DeleteVersionParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'version'];
    const _validParams = ['id', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVersion');

    const parameters = {
      options: {
        url: '/artifacts/{id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * schemas
   ************************/

  /**
   * List schema IDs.
   *
   * Returns an array containing the schema IDs of all of the schemas that are stored in the registry.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.jsonformat] - format of the response to be returned, allowed values are 'string' and
   * 'object'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<string[]>>}
   */
  public listSchemas(
    params?: SchemaregistryV1.ListSchemasParams
  ): Promise<SchemaregistryV1.Response<string[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['jsonformat', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'jsonformat': _params.jsonformat,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listSchemas');

    const parameters = {
      options: {
        url: '/artifacts',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a new schema.
   *
   * Create a new schema and populate it with an initial schema version containing the AVRO document in the request
   * body.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {JsonObject} [params.schema] - The AVRO schema.
   * @param {string} [params.xRegistryArtifactId] - The name to assign to the new schema. This must be unique. If this
   * value is not specified then a UUID is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.SchemaMetadata>>}
   */
  public createSchema(
    params?: SchemaregistryV1.CreateSchemaParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.SchemaMetadata>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['schema', 'xRegistryArtifactId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'schema': _params.schema,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'createSchema');

    const parameters = {
      options: {
        url: '/artifacts',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Registry-ArtifactId': _params.xRegistryArtifactId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get the latest version of a schema.
   *
   * Retrieves the lastest version of the specified schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of a schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.AvroSchema>>}
   */
  public getLatestSchema(
    params: SchemaregistryV1.GetLatestSchemaParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.AvroSchema>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SchemaregistryV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLatestSchema'
    );

    const parameters = {
      options: {
        url: '/artifacts/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a schema.
   *
   * Deletes a schema and all of its versions from the schema registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the schema to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>>}
   */
  public deleteSchema(
    params: SchemaregistryV1.DeleteSchemaParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSchema');

    const parameters = {
      options: {
        url: '/artifacts/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a schema.
   *
   * Updates a schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the schema to update.
   * @param {JsonObject} [params.schema] - The AVRO schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SchemaregistryV1.Response<SchemaregistryV1.SchemaMetadata>>}
   */
  public updateSchema(
    params: SchemaregistryV1.UpdateSchemaParams
  ): Promise<SchemaregistryV1.Response<SchemaregistryV1.SchemaMetadata>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'schema', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'schema': _params.schema,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SchemaregistryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSchema');

    const parameters = {
      options: {
        url: '/artifacts/{id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace SchemaregistryV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getGlobalRule` operation. */
  export interface GetGlobalRuleParams {
    /** The type of the global rule to retrieve. Currently only `COMPATIBILITY` is supported. */
    rule: GetGlobalRuleConstants.Rule | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getGlobalRule` operation. */
  export namespace GetGlobalRuleConstants {
    /** The type of the global rule to retrieve. Currently only `COMPATIBILITY` is supported. */
    export enum Rule {
      COMPATIBILITY = 'COMPATIBILITY',
    }
  }

  /** Parameters for the `updateGlobalRule` operation. */
  export interface UpdateGlobalRuleParams {
    /** The type of the global rule to update. Currently only `COMPATIBILITY` is supported. */
    rule: UpdateGlobalRuleConstants.Rule | string;
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    type: UpdateGlobalRuleConstants.Type | string;
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type`
     *  property.
     */
    config: UpdateGlobalRuleConstants.Config | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateGlobalRule` operation. */
  export namespace UpdateGlobalRuleConstants {
    /** The type of the global rule to update. Currently only `COMPATIBILITY` is supported. */
    export enum Rule {
      COMPATIBILITY = 'COMPATIBILITY',
    }
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    export enum Type {
      COMPATIBILITY = 'COMPATIBILITY',
    }
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type` property. */
    export enum Config {
      BACKWARD = 'BACKWARD',
      BACKWARD_TRANSITIVE = 'BACKWARD_TRANSITIVE',
      FORWARD = 'FORWARD',
      FORWARD_TRANSITIVE = 'FORWARD_TRANSITIVE',
      FULL = 'FULL',
      FULL_TRANSITIVE = 'FULL_TRANSITIVE',
      NONE = 'NONE',
    }
  }

  /** Parameters for the `createSchemaRule` operation. */
  export interface CreateSchemaRuleParams {
    /** The ID of the schema that the rule is to be associated with. */
    id: string;
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    type: CreateSchemaRuleConstants.Type | string;
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type`
     *  property.
     */
    config: CreateSchemaRuleConstants.Config | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSchemaRule` operation. */
  export namespace CreateSchemaRuleConstants {
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    export enum Type {
      COMPATIBILITY = 'COMPATIBILITY',
    }
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type` property. */
    export enum Config {
      BACKWARD = 'BACKWARD',
      BACKWARD_TRANSITIVE = 'BACKWARD_TRANSITIVE',
      FORWARD = 'FORWARD',
      FORWARD_TRANSITIVE = 'FORWARD_TRANSITIVE',
      FULL = 'FULL',
      FULL_TRANSITIVE = 'FULL_TRANSITIVE',
      NONE = 'NONE',
    }
  }

  /** Parameters for the `getSchemaRule` operation. */
  export interface GetSchemaRuleParams {
    /** The ID of the schema to retrieve the rule for. */
    id: string;
    /** The type of rule to retrieve. Currently only the value that can be specified is `COMPATIBILITY`. */
    rule: GetSchemaRuleConstants.Rule | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSchemaRule` operation. */
  export namespace GetSchemaRuleConstants {
    /** The type of rule to retrieve. Currently only the value that can be specified is `COMPATIBILITY`. */
    export enum Rule {
      COMPATIBILITY = 'COMPATIBILITY',
    }
  }

  /** Parameters for the `updateSchemaRule` operation. */
  export interface UpdateSchemaRuleParams {
    /** The ID of the schema for which to update the rule configuration. */
    id: string;
    /** The type of rule to update. Currently only the value that can be specified is `COMPATIBILITY`. */
    rule: UpdateSchemaRuleConstants.Rule | string;
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    type: UpdateSchemaRuleConstants.Type | string;
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type`
     *  property.
     */
    config: UpdateSchemaRuleConstants.Config | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSchemaRule` operation. */
  export namespace UpdateSchemaRuleConstants {
    /** The type of rule to update. Currently only the value that can be specified is `COMPATIBILITY`. */
    export enum Rule {
      COMPATIBILITY = 'COMPATIBILITY',
    }
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    export enum Type {
      COMPATIBILITY = 'COMPATIBILITY',
    }
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type` property. */
    export enum Config {
      BACKWARD = 'BACKWARD',
      BACKWARD_TRANSITIVE = 'BACKWARD_TRANSITIVE',
      FORWARD = 'FORWARD',
      FORWARD_TRANSITIVE = 'FORWARD_TRANSITIVE',
      FULL = 'FULL',
      FULL_TRANSITIVE = 'FULL_TRANSITIVE',
      NONE = 'NONE',
    }
  }

  /** Parameters for the `deleteSchemaRule` operation. */
  export interface DeleteSchemaRuleParams {
    /** The ID of the schema that the rule is to be deleted from. */
    id: string;
    /** The type of rule to delete. Currently only the value that can be specified is `COMPATIBILITY`. */
    rule: DeleteSchemaRuleConstants.Rule | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteSchemaRule` operation. */
  export namespace DeleteSchemaRuleConstants {
    /** The type of rule to delete. Currently only the value that can be specified is `COMPATIBILITY`. */
    export enum Rule {
      COMPATIBILITY = 'COMPATIBILITY',
    }
  }

  /** Parameters for the `setSchemaState` operation. */
  export interface SetSchemaStateParams {
    /** The ID of a schema. */
    id: string;
    /** The state of the schema or schema version. */
    state: SetSchemaStateConstants.State | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `setSchemaState` operation. */
  export namespace SetSchemaStateConstants {
    /** The state of the schema or schema version. */
    export enum State {
      ENABLED = 'ENABLED',
      DISABLED = 'DISABLED',
    }
  }

  /** Parameters for the `setSchemaVersionState` operation. */
  export interface SetSchemaVersionStateParams {
    /** The ID of a schema. */
    id: string;
    /** The version number that identifies the particular schema version to return. */
    version: number;
    /** The state of the schema or schema version. */
    state: SetSchemaVersionStateConstants.State | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `setSchemaVersionState` operation. */
  export namespace SetSchemaVersionStateConstants {
    /** The state of the schema or schema version. */
    export enum State {
      ENABLED = 'ENABLED',
      DISABLED = 'DISABLED',
    }
  }

  /** Parameters for the `listVersions` operation. */
  export interface ListVersionsParams {
    /** The schema ID for which the list of versions will be returned. */
    id: string;
    /** format of the response to be returned, allowed values are 'number' and 'object'. */
    jsonformat?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createVersion` operation. */
  export interface CreateVersionParams {
    /** A schema ID. This identifies the schema for which a new version will be created. */
    id: string;
    /** The AVRO schema. */
    schema?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVersion` operation. */
  export interface GetVersionParams {
    /** The schema ID identifying which schema to return a version from. */
    id: string;
    /** The version number that identifies the particular schema version to return. */
    version: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVersion` operation. */
  export interface DeleteVersionParams {
    /** A schema ID that identifies the schema to delete a version from. */
    id: string;
    /** The schema version number to delete. */
    version: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSchemas` operation. */
  export interface ListSchemasParams {
    /** format of the response to be returned, allowed values are 'string' and 'object'. */
    jsonformat?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSchema` operation. */
  export interface CreateSchemaParams {
    /** The AVRO schema. */
    schema?: JsonObject;
    /** The name to assign to the new schema. This must be unique. If this value is not specified then a UUID is
     *  used.
     */
    xRegistryArtifactId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLatestSchema` operation. */
  export interface GetLatestSchemaParams {
    /** The ID of a schema. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSchema` operation. */
  export interface DeleteSchemaParams {
    /** The ID of the schema to delete. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSchema` operation. */
  export interface UpdateSchemaParams {
    /** The ID of the schema to update. */
    id: string;
    /** The AVRO schema. */
    schema?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * AvroSchema.
   */
  export interface AvroSchema {
    /** The AVRO schema. */
    schema?: JsonObject;
  }

  /**
   * Rules define constraints on whether the schema registry will accept a new version of a schema.
   */
  export interface Rule {
    /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
    type: Rule.Constants.Type | string;
    /** The configuration value for the rule. Which values are valid depends on the value of this object's `type`
     *  property.
     */
    config: Rule.Constants.Config | string;
  }
  export namespace Rule {
    export namespace Constants {
      /** The type of the rule. Currently only one type is supported (`COMPATIBILITY`). */
      export enum Type {
        COMPATIBILITY = 'COMPATIBILITY',
      }
      /** The configuration value for the rule. Which values are valid depends on the value of this object's `type` property. */
      export enum Config {
        BACKWARD = 'BACKWARD',
        BACKWARD_TRANSITIVE = 'BACKWARD_TRANSITIVE',
        FORWARD = 'FORWARD',
        FORWARD_TRANSITIVE = 'FORWARD_TRANSITIVE',
        FULL = 'FULL',
        FULL_TRANSITIVE = 'FULL_TRANSITIVE',
        NONE = 'NONE',
      }
    }
  }

  /**
   * Information about a schema version.
   */
  export interface SchemaMetadata {
    /** Creation timestamp of the schema in UNIX epoc format. */
    createdOn: number;
    /** Globally unique ID assigned to the initial version of the schema. */
    globalId: number;
    /** The ID of the schema. This is either taken from the `X-Registry-ArtifactId` header when the request is made
     *  to create the schema or is an automatically assigned UUID value.
     */
    id: string;
    /** Last modification timestamp of the schema in UNIX epoc format. */
    modifiedOn: number;
    /** Type of the schema. Always the string `AVRO`. */
    type: string;
    /** Version number assigned to this version of the schema. */
    version: number;
  }
}

export = SchemaregistryV1;
