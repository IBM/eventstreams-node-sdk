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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.45.0-05af0f12-20220209-193923
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The administration REST API for IBM Event Streams on Cloud.
 *
 * API Version: 1.1.1
 */

class AdminrestV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://adminrest.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'adminrest';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of AdminrestV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {AdminrestV1}
   */

  public static newInstance(options: UserOptions): AdminrestV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AdminrestV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a AdminrestV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AdminrestV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(AdminrestV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * default
   ************************/

  /**
   * Create a new topic.
   *
   * Create a new topic.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of topic to be created.
   * @param {number} [params.partitions] - The number of partitions.
   * @param {number} [params.partitionCount] - The number of partitions, this field takes precedence over 'partitions'.
   * Default value is 1 if not specified.
   * @param {ConfigCreate[]} [params.configs] - The config properties to be set for the new topic.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.Empty>>}
   */
  public createTopic(
    params?: AdminrestV1.CreateTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['name', 'partitions', 'partitionCount', 'configs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'partitions': _params.partitions,
      'partition_count': _params.partitionCount,
      'configs': _params.configs,
    };

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createTopic'
    );

    const parameters = {
      options: {
        url: '/admin/topics',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a list of topics.
   *
   * Returns a list containing information about all of the Kafka topics that are defined for an instance of the Event
   * Streams service. If there are currently no topics defined then an empty list is returned.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.topicFilter] - A filter to be applied to the topic names. A simple filter can be specified
   * as a string with asterisk (`*`) wildcards representing 0 or more characters, e.g. `topic-name*` will filter all
   * topic names that begin with the string `topic-name` followed by any character sequence. A more complex filter
   * pattern can be used by surrounding a regular expression in forward slash (`/`) delimiters, e.g. `/topic-name.* /`.
   * @param {number} [params.perPage] - The number of topic names to be returns.
   * @param {number} [params.page] - The page number to be returned. The number 1 represents the first page. The default
   * value is 1.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.TopicDetail[]>>}
   */
  public listTopics(
    params?: AdminrestV1.ListTopicsParams
  ): Promise<AdminrestV1.Response<AdminrestV1.TopicDetail[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['topicFilter', 'perPage', 'page', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'topic_filter': _params.topicFilter,
      'per_page': _params.perPage,
      'page': _params.page,
    };

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listTopics'
    );

    const parameters = {
      options: {
        url: '/admin/topics',
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
   * Get detailed information on a topic.
   *
   * Get detailed information on a topic.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.topicName - The topic name for the topic to be listed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.TopicDetail>>}
   */
  public getTopic(
    params: AdminrestV1.GetTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.TopicDetail>> {
    const _params = { ...params };
    const _requiredParams = ['topicName'];
    const _validParams = ['topicName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'topic_name': _params.topicName,
    };

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getTopic'
    );

    const parameters = {
      options: {
        url: '/admin/topics/{topic_name}',
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
   * Delete a topic.
   *
   * Delete a topic.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.topicName - The topic name for the topic to be listed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.Empty>>}
   */
  public deleteTopic(
    params: AdminrestV1.DeleteTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['topicName'];
    const _validParams = ['topicName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'topic_name': _params.topicName,
    };

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteTopic'
    );

    const parameters = {
      options: {
        url: '/admin/topics/{topic_name}',
        method: 'DELETE',
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
   * Increase the number of partitions and/or update one or more topic configuration parameters.
   *
   * Increase the number of partitions and/or update one or more topic configuration parameters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.topicName - The topic name for the topic to be listed.
   * @param {number} [params.newTotalPartitionCount] - The new partition number to be increased.
   * @param {ConfigUpdate[]} [params.configs] - The config properties to be updated for the topic. Valid config keys are
   * 'cleanup.policy', 'retention.ms', 'retention.bytes', 'segment.bytes', 'segment.ms', 'segment.index.bytes'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.Empty>>}
   */
  public updateTopic(
    params: AdminrestV1.UpdateTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['topicName'];
    const _validParams = ['topicName', 'newTotalPartitionCount', 'configs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'new_total_partition_count': _params.newTotalPartitionCount,
      'configs': _params.configs,
    };

    const path = {
      'topic_name': _params.topicName,
    };

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateTopic'
    );

    const parameters = {
      options: {
        url: '/admin/topics/{topic_name}',
        method: 'PATCH',
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
   * Get current topic selection for mirroring.
   *
   * Get current topic selection for mirroring.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>>}
   */
  public getMirroringTopicSelection(
    params?: AdminrestV1.GetMirroringTopicSelectionParams
  ): Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getMirroringTopicSelection'
    );

    const parameters = {
      options: {
        url: '/admin/mirroring/topic-selection',
        method: 'GET',
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
   * Replace topic selection for mirroring.
   *
   * Replace topic selection for mirroring. This operation replaces the complete set of mirroring topic selections.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.includes] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>>}
   */
  public replaceMirroringTopicSelection(
    params?: AdminrestV1.ReplaceMirroringTopicSelectionParams
  ): Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['includes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'includes': _params.includes,
    };

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceMirroringTopicSelection'
    );

    const parameters = {
      options: {
        url: '/admin/mirroring/topic-selection',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get topics that are being actively mirrored.
   *
   * Get topics that are being actively mirrored.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringActiveTopics>>}
   */
  public getMirroringActiveTopics(
    params?: AdminrestV1.GetMirroringActiveTopicsParams
  ): Promise<AdminrestV1.Response<AdminrestV1.MirroringActiveTopics>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      AdminrestV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getMirroringActiveTopics'
    );

    const parameters = {
      options: {
        url: '/admin/mirroring/active-topics',
        method: 'GET',
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
}

/*************************
 * interfaces
 ************************/

namespace AdminrestV1 {
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createTopic` operation. */
  export interface CreateTopicParams {
    /** The name of topic to be created. */
    name?: string;
    /** The number of partitions. */
    partitions?: number;
    /** The number of partitions, this field takes precedence over 'partitions'. Default value is 1 if not
     *  specified.
     */
    partitionCount?: number;
    /** The config properties to be set for the new topic. */
    configs?: ConfigCreate[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTopics` operation. */
  export interface ListTopicsParams {
    /** A filter to be applied to the topic names. A simple filter can be specified as a string with asterisk (`*`)
     *  wildcards representing 0 or more characters, e.g. `topic-name*` will filter all topic names that begin with the
     *  string `topic-name` followed by any character sequence. A more complex filter pattern can be used by surrounding
     *  a regular expression in forward slash (`/`) delimiters, e.g. `/topic-name.* /`.
     */
    topicFilter?: string;
    /** The number of topic names to be returns. */
    perPage?: number;
    /** The page number to be returned. The number 1 represents the first page. The default value is 1. */
    page?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTopic` operation. */
  export interface GetTopicParams {
    /** The topic name for the topic to be listed. */
    topicName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTopic` operation. */
  export interface DeleteTopicParams {
    /** The topic name for the topic to be listed. */
    topicName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTopic` operation. */
  export interface UpdateTopicParams {
    /** The topic name for the topic to be listed. */
    topicName: string;
    /** The new partition number to be increased. */
    newTotalPartitionCount?: number;
    /** The config properties to be updated for the topic. Valid config keys are 'cleanup.policy', 'retention.ms',
     *  'retention.bytes', 'segment.bytes', 'segment.ms', 'segment.index.bytes'.
     */
    configs?: ConfigUpdate[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMirroringTopicSelection` operation. */
  export interface GetMirroringTopicSelectionParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceMirroringTopicSelection` operation. */
  export interface ReplaceMirroringTopicSelectionParams {
    includes?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMirroringActiveTopics` operation. */
  export interface GetMirroringActiveTopicsParams {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** ReplicaAssignmentBrokers. */
  export interface ReplicaAssignmentBrokers {
    replicas?: number[];
  }

  /** ConfigCreate. */
  export interface ConfigCreate {
    /** The name of the config property. */
    name?: string;
    /** The value for a config property. */
    value?: string;
  }

  /** ConfigUpdate. */
  export interface ConfigUpdate {
    /** The name of the config property. */
    name?: string;
    /** The value for a config property. */
    value?: string;
    /** When true, the value of the config property is reset to its default value. */
    reset_to_default?: boolean;
  }

  /** Topics that are being actively mirrored. */
  export interface MirroringActiveTopics {
    active_topics?: string[];
  }

  /** Mirroring topic selection payload. */
  export interface MirroringTopicSelection {
    includes?: string[];
  }

  /** ReplicaAssignment. */
  export interface ReplicaAssignment {
    /** The ID of the partition. */
    id?: number;
    brokers?: ReplicaAssignmentBrokers;
  }

  /** TopicConfigs. */
  export interface TopicConfigs {
    /** The value of config property 'cleanup.policy'. */
    'cleanup.policy'?: string;
    /** The value of config property 'min.insync.replicas'. */
    'min.insync.replicas'?: string;
    /** The value of config property 'retention.bytes'. */
    'retention.bytes'?: string;
    /** The value of config property 'retention.ms'. */
    'retention.ms'?: string;
    /** The value of config property 'segment.bytes'. */
    'segment.bytes'?: string;
    /** The value of config property 'segment.index.bytes'. */
    'segment.index.bytes'?: string;
    /** The value of config property 'segment.ms'. */
    'segment.ms'?: string;
  }

  /** TopicDetail. */
  export interface TopicDetail {
    /** The name of the topic. */
    name?: string;
    /** The number of partitions. */
    partitions?: number;
    /** The number of replication factor. */
    replicationFactor?: number;
    /** The value of config property 'retention.ms'. */
    retentionMs?: number;
    /** The value of config property 'cleanup.policy'. */
    cleanupPolicy?: string;
    configs?: TopicConfigs;
    /** The replia assignment of the topic. */
    replicaAssignments?: ReplicaAssignment[];
  }
}

export = AdminrestV1;
