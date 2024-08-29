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
 * The administration REST API for IBM Event Streams on Cloud.
 *
 * API Version: 1.3.1
 */

class AdminrestV1 extends BaseService {
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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
    }
  }

  /*************************
   * createTopic
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
   * @param {TopicCreateRequestConfigsItem[]} [params.configs] - The config properties to be set for the new topic.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public createTopic(
    params?: AdminrestV1.CreateTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'createTopic');

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
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * default
   ************************/

  /**
   * Basic health check for Admin REST API.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public alive(
    params?: AdminrestV1.AliveParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'alive');

    const parameters = {
      options: {
        url: '/alive',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * @param {number} [params.perPage] - The number of topic names to be returned.
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

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listTopics');

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
   * @param {string} params.topicName - The topic name for the topic to be described.
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

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getTopic');

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
   * @param {string} params.topicName - The topic name for the topic to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public deleteTopic(
    params: AdminrestV1.DeleteTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTopic');

    const parameters = {
      options: {
        url: '/admin/topics/{topic_name}',
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
   * Increase the number of partitions and/or update one or more topic configuration parameters.
   *
   * Increase the number of partitions and/or update one or more topic configuration parameters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.topicName - The topic name for the topic to be updated.
   * @param {number} [params.newTotalPartitionCount] - The new partition number to be increased to.
   * @param {TopicUpdateRequestConfigsItem[]} [params.configs] - The config properties to be updated for the topic.
   * Valid config names are 'cleanup.policy', 'retention.ms', 'retention.bytes', 'segment.bytes', 'segment.ms',
   * 'segment.index.bytes'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public updateTopic(
    params: AdminrestV1.UpdateTopicParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTopic');

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
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete records before the given offset on a topic.
   *
   * Delete records before the given offset on a topic.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.topicName - The topic name of the records to be deleted.
   * @param {RecordDeleteRequestRecordsToDeleteItem[]} [params.recordsToDelete] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public deleteTopicRecords(
    params: AdminrestV1.DeleteTopicRecordsParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['topicName'];
    const _validParams = ['topicName', 'recordsToDelete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'records_to_delete': _params.recordsToDelete,
    };

    const path = {
      'topic_name': _params.topicName,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTopicRecords');

    const parameters = {
      options: {
        url: '/admin/topics/{topic_name}/records',
        method: 'DELETE',
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

  /**
   * Create a new quota.
   *
   * Create a new quota.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.entityName - The entity name of the quotas can be `default` or an IAM Service ID that starts
   * with an `iam-ServiceId` prefix.
   * @param {number} [params.producerByteRate] - The producer byte rate quota value.
   * @param {number} [params.consumerByteRate] - The consumer byte rate quota value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public createQuota(
    params: AdminrestV1.CreateQuotaParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['entityName'];
    const _validParams = ['entityName', 'producerByteRate', 'consumerByteRate', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'producer_byte_rate': _params.producerByteRate,
      'consumer_byte_rate': _params.consumerByteRate,
    };

    const path = {
      'entity_name': _params.entityName,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'createQuota');

    const parameters = {
      options: {
        url: '/admin/quotas/{entity_name}',
        method: 'POST',
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

  /**
   * Update a quota.
   *
   * Update an entity's quota.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.entityName - The entity name of the quotas can be `default` or an IAM Service ID that starts
   * with an `iam-ServiceId` prefix.
   * @param {number} [params.producerByteRate] - The producer byte rate quota value.
   * @param {number} [params.consumerByteRate] - The consumer byte rate quota value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public updateQuota(
    params: AdminrestV1.UpdateQuotaParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['entityName'];
    const _validParams = ['entityName', 'producerByteRate', 'consumerByteRate', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'producer_byte_rate': _params.producerByteRate,
      'consumer_byte_rate': _params.consumerByteRate,
    };

    const path = {
      'entity_name': _params.entityName,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateQuota');

    const parameters = {
      options: {
        url: '/admin/quotas/{entity_name}',
        method: 'PATCH',
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

  /**
   * Delete a quota.
   *
   * Delete an entity's quota.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.entityName - The entity name of the quotas can be `default` or an IAM Service ID that starts
   * with an `iam-ServiceId` prefix.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public deleteQuota(
    params: AdminrestV1.DeleteQuotaParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['entityName'];
    const _validParams = ['entityName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'entity_name': _params.entityName,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteQuota');

    const parameters = {
      options: {
        url: '/admin/quotas/{entity_name}',
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
   * Get quota information for an entity.
   *
   * Get quota information for an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.entityName - The entity name of the quotas can be `default` or an IAM Service ID that starts
   * with an `iam-ServiceId` prefix.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.QuotaDetail>>}
   */
  public getQuota(
    params: AdminrestV1.GetQuotaParams
  ): Promise<AdminrestV1.Response<AdminrestV1.QuotaDetail>> {
    const _params = { ...params };
    const _requiredParams = ['entityName'];
    const _validParams = ['entityName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'entity_name': _params.entityName,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getQuota');

    const parameters = {
      options: {
        url: '/admin/quotas/{entity_name}',
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
   * List each entity's quota information.
   *
   * List each entity's quota information.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.QuotaList>>}
   */
  public listQuotas(
    params?: AdminrestV1.ListQuotasParams
  ): Promise<AdminrestV1.Response<AdminrestV1.QuotaList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listQuotas');

    const parameters = {
      options: {
        url: '/admin/quotas',
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
   * Get a list of brokers in the cluster.
   *
   * Get a list of brokers in the cluster.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.BrokerSummary[]>>}
   */
  public listBrokers(
    params?: AdminrestV1.ListBrokersParams
  ): Promise<AdminrestV1.Response<AdminrestV1.BrokerSummary[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listBrokers');

    const parameters = {
      options: {
        url: '/admin/brokers',
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
   * Get detailed information for a single broker.
   *
   * Get detailed information for a single broker.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.brokerId - The broker ID of the broker to be described.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.BrokerDetail>>}
   */
  public getBroker(
    params: AdminrestV1.GetBrokerParams
  ): Promise<AdminrestV1.Response<AdminrestV1.BrokerDetail>> {
    const _params = { ...params };
    const _requiredParams = ['brokerId'];
    const _validParams = ['brokerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'broker_id': _params.brokerId,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getBroker');

    const parameters = {
      options: {
        url: '/admin/brokers/{broker_id}',
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
   * Get all configuration parameters for a single broker.
   *
   * Get all configuration parameters for a single broker.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.brokerId - The broker ID of the broker to be described.
   * @param {string} [params.configFilter] - A filter to be applied to the config names. A simple filter can be
   * specified as a string with asterisk (`*`) wildcards representing 0 or more characters, e.g. `file*` will filter all
   * config names that begin with the string `file` followed by any character sequence. A more complex filter pattern
   * can be used by surrounding a regular expression in forward slash (`/`) delimiters, e.g. `/file.* /`.
   * @param {boolean} [params.verbose] - When true, all information about the config properties is returned including
   * the source of the configuration indicating its scope and whether it's dynamic.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.BrokerDetail>>}
   */
  public getBrokerConfig(
    params: AdminrestV1.GetBrokerConfigParams
  ): Promise<AdminrestV1.Response<AdminrestV1.BrokerDetail>> {
    const _params = { ...params };
    const _requiredParams = ['brokerId'];
    const _validParams = ['brokerId', 'configFilter', 'verbose', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'config_filter': _params.configFilter,
      'verbose': _params.verbose,
    };

    const path = {
      'broker_id': _params.brokerId,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getBrokerConfig');

    const parameters = {
      options: {
        url: '/admin/brokers/{broker_id}/configs',
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
   * Get information about the cluster.
   *
   * Get information about the cluster.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.Cluster>>}
   */
  public getCluster(
    params?: AdminrestV1.GetClusterParams
  ): Promise<AdminrestV1.Response<AdminrestV1.Cluster>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getCluster');

    const parameters = {
      options: {
        url: '/admin/cluster',
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
   * Get a list of consumer group IDs.
   *
   * Get a list of consumer group IDs.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.groupFilter] - A filter to be applied to the consumer group IDs. A simple filter can be
   * specified as a string with asterisk (`*`) wildcards representing 0 or more characters, e.g. `group_id*` will filter
   * all group IDs that begin with the string `group_id` followed by any character sequence. A more complex filter
   * pattern can be used by surrounding a regular expression in forward slash (`/`) delimiters, e.g. `/group_id.* /`.
   * @param {number} [params.perPage] - The number of consumer groups to be returned.
   * @param {number} [params.page] - The page number to be returned. The number 1 represents the first page. The default
   * value is 1.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<string[]>>}
   */
  public listConsumerGroups(
    params?: AdminrestV1.ListConsumerGroupsParams
  ): Promise<AdminrestV1.Response<string[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['groupFilter', 'perPage', 'page', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'group_filter': _params.groupFilter,
      'per_page': _params.perPage,
      'page': _params.page,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listConsumerGroups');

    const parameters = {
      options: {
        url: '/admin/consumergroups',
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
   * Get detailed information on a consumer group.
   *
   * Get detailed information on a consumer group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.groupId - The group ID for the consumer group to be described.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.GroupDetail>>}
   */
  public getConsumerGroup(
    params: AdminrestV1.GetConsumerGroupParams
  ): Promise<AdminrestV1.Response<AdminrestV1.GroupDetail>> {
    const _params = { ...params };
    const _requiredParams = ['groupId'];
    const _validParams = ['groupId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'group_id': _params.groupId,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getConsumerGroup');

    const parameters = {
      options: {
        url: '/admin/consumergroups/{group_id}',
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
   * Delete a consumer group.
   *
   * Delete a consumer group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.groupId - The group ID for the consumer group to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>}
   */
  public deleteConsumerGroup(
    params: AdminrestV1.DeleteConsumerGroupParams
  ): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['groupId'];
    const _validParams = ['groupId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'group_id': _params.groupId,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteConsumerGroup');

    const parameters = {
      options: {
        url: '/admin/consumergroups/{group_id}',
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
   * Update the offsets of a consumer group.
   *
   * Update the offsets of a consumer group using various modes, eg. latest, earliest, datetime,etc.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.groupId - The group ID for the consumer group to be updated.
   * @param {string} [params.topic] - The name of the topic to be reset. If missing or blank, the operation applies to
   * all topics read by the consumer group.
   * @param {string} [params.mode] - Mode of shift operation. Valid values are 'earliest', 'latest', 'datetime'.
   * @param {string} [params.value] - Value for resetting offsets, based on 'mode=datetime', omit for 'earliest' and
   * 'latest'.
   * @param {boolean} [params.execute] - Whether to execute the operation of resetting the offsets.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.GroupResetResultsItem[]>>}
   */
  public updateConsumerGroup(
    params: AdminrestV1.UpdateConsumerGroupParams
  ): Promise<AdminrestV1.Response<AdminrestV1.GroupResetResultsItem[]>> {
    const _params = { ...params };
    const _requiredParams = ['groupId'];
    const _validParams = ['groupId', 'topic', 'mode', 'value', 'execute', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'topic': _params.topic,
      'mode': _params.mode,
      'value': _params.value,
      'execute': _params.execute,
    };

    const path = {
      'group_id': _params.groupId,
    };

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateConsumerGroup');

    const parameters = {
      options: {
        url: '/admin/consumergroups/{group_id}',
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

  /**
   * Get the status of the instance.
   *
   * Get the status of the instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AdminrestV1.Response<AdminrestV1.InstanceStatus>>}
   */
  public getStatus(
    params?: AdminrestV1.GetStatusParams
  ): Promise<AdminrestV1.Response<AdminrestV1.InstanceStatus>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getStatus');

    const parameters = {
      options: {
        url: '/admin/status',
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
  export interface EmptyObject {}

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
    configs?: TopicCreateRequestConfigsItem[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `alive` operation. */
  export interface AliveParams {
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
    /** The number of topic names to be returned. */
    perPage?: number;
    /** The page number to be returned. The number 1 represents the first page. The default value is 1. */
    page?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTopic` operation. */
  export interface GetTopicParams {
    /** The topic name for the topic to be described. */
    topicName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTopic` operation. */
  export interface DeleteTopicParams {
    /** The topic name for the topic to be deleted. */
    topicName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTopic` operation. */
  export interface UpdateTopicParams {
    /** The topic name for the topic to be updated. */
    topicName: string;
    /** The new partition number to be increased to. */
    newTotalPartitionCount?: number;
    /** The config properties to be updated for the topic. Valid config names are 'cleanup.policy', 'retention.ms',
     *  'retention.bytes', 'segment.bytes', 'segment.ms', 'segment.index.bytes'.
     */
    configs?: TopicUpdateRequestConfigsItem[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTopicRecords` operation. */
  export interface DeleteTopicRecordsParams {
    /** The topic name of the records to be deleted. */
    topicName: string;
    recordsToDelete?: RecordDeleteRequestRecordsToDeleteItem[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createQuota` operation. */
  export interface CreateQuotaParams {
    /** The entity name of the quotas can be `default` or an IAM Service ID that starts with an `iam-ServiceId`
     *  prefix.
     */
    entityName: string;
    /** The producer byte rate quota value. */
    producerByteRate?: number;
    /** The consumer byte rate quota value. */
    consumerByteRate?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateQuota` operation. */
  export interface UpdateQuotaParams {
    /** The entity name of the quotas can be `default` or an IAM Service ID that starts with an `iam-ServiceId`
     *  prefix.
     */
    entityName: string;
    /** The producer byte rate quota value. */
    producerByteRate?: number;
    /** The consumer byte rate quota value. */
    consumerByteRate?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteQuota` operation. */
  export interface DeleteQuotaParams {
    /** The entity name of the quotas can be `default` or an IAM Service ID that starts with an `iam-ServiceId`
     *  prefix.
     */
    entityName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getQuota` operation. */
  export interface GetQuotaParams {
    /** The entity name of the quotas can be `default` or an IAM Service ID that starts with an `iam-ServiceId`
     *  prefix.
     */
    entityName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listQuotas` operation. */
  export interface ListQuotasParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listBrokers` operation. */
  export interface ListBrokersParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBroker` operation. */
  export interface GetBrokerParams {
    /** The broker ID of the broker to be described. */
    brokerId: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBrokerConfig` operation. */
  export interface GetBrokerConfigParams {
    /** The broker ID of the broker to be described. */
    brokerId: number;
    /** A filter to be applied to the config names. A simple filter can be specified as a string with asterisk (`*`)
     *  wildcards representing 0 or more characters, e.g. `file*` will filter all config names that begin with the
     *  string `file` followed by any character sequence. A more complex filter pattern can be used by surrounding a
     *  regular expression in forward slash (`/`) delimiters, e.g. `/file.* /`.
     */
    configFilter?: string;
    /** When true, all information about the config properties is returned including the source of the configuration
     *  indicating its scope and whether it's dynamic.
     */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCluster` operation. */
  export interface GetClusterParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConsumerGroups` operation. */
  export interface ListConsumerGroupsParams {
    /** A filter to be applied to the consumer group IDs. A simple filter can be specified as a string with asterisk
     *  (`*`) wildcards representing 0 or more characters, e.g. `group_id*` will filter all group IDs that begin with
     *  the string `group_id` followed by any character sequence. A more complex filter pattern can be used by
     *  surrounding a regular expression in forward slash (`/`) delimiters, e.g. `/group_id.* /`.
     */
    groupFilter?: string;
    /** The number of consumer groups to be returned. */
    perPage?: number;
    /** The page number to be returned. The number 1 represents the first page. The default value is 1. */
    page?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConsumerGroup` operation. */
  export interface GetConsumerGroupParams {
    /** The group ID for the consumer group to be described. */
    groupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConsumerGroup` operation. */
  export interface DeleteConsumerGroupParams {
    /** The group ID for the consumer group to be deleted. */
    groupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConsumerGroup` operation. */
  export interface UpdateConsumerGroupParams {
    /** The group ID for the consumer group to be updated. */
    groupId: string;
    /** The name of the topic to be reset. If missing or blank, the operation applies to all topics read by the
     *  consumer group.
     */
    topic?: string;
    /** Mode of shift operation. Valid values are 'earliest', 'latest', 'datetime'. */
    mode?: string;
    /** Value for resetting offsets, based on 'mode=datetime', omit for 'earliest' and 'latest'. */
    value?: string;
    /** Whether to execute the operation of resetting the offsets. */
    execute?: boolean;
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

  /** Parameters for the `getStatus` operation. */
  export interface GetStatusParams {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * BrokerDetailConfigsItem.
   */
  export interface BrokerDetailConfigsItem {
    /** The name of the config property. */
    name?: string;
    /** The value for a config property. */
    value?: string;
    /** When true, the value cannot be displayed and will be returned with a null value. */
    is_sensitive?: boolean;
  }

  /**
   * The new offset for one partition of one topic after resetting consumer group's offset.
   */
  export interface GroupResetResultsItem {
    topic?: string;
    partition?: number;
    offset?: number;
  }

  /**
   * The topic partitions assigned for the consumer group member.
   */
  export interface MemberAssignmentsItem {
    /** The name of the topic. */
    topic?: string;
    /** The ID of the partition. */
    partition?: number;
  }

  /**
   * RecordDeleteRequestRecordsToDeleteItem.
   */
  export interface RecordDeleteRequestRecordsToDeleteItem {
    /** The number of partitions. */
    partition?: number;
    /** The offset number before which records to be deleted. */
    before_offset?: number;
  }

  /**
   * TopicCreateRequestConfigsItem.
   */
  export interface TopicCreateRequestConfigsItem {
    /** The name of the config property. */
    name?: string;
    /** The value for a config property. */
    value?: string;
  }

  /**
   * TopicDetailReplicaAssignmentsItem.
   */
  export interface TopicDetailReplicaAssignmentsItem {
    /** The ID of the partition. */
    id?: number;
    brokers?: TopicDetailReplicaAssignmentsItemBrokers;
  }

  /**
   * TopicDetailReplicaAssignmentsItemBrokers.
   */
  export interface TopicDetailReplicaAssignmentsItemBrokers {
    replicas?: number[];
  }

  /**
   * TopicUpdateRequestConfigsItem.
   */
  export interface TopicUpdateRequestConfigsItem {
    /** The name of the config property. */
    name?: string;
    /** The value of a config property. */
    value?: string;
    /** When true, the value of the config property is reset to its default value. */
    reset_to_default?: boolean;
  }

  /**
   * BrokerDetail.
   */
  export interface BrokerDetail {
    /** The ID of the broker configured in the 'broker.id' broker config property. */
    id?: number;
    /** The hostname that the broker is listening on and which is configured in the 'advertised.listeners' broker
     *  config property.
     */
    host?: string;
    /** The port that the broker is listening on and which is configured in the 'advertised.listeners' broker config
     *  property.
     */
    port?: number;
    /** The rack of the broker used in rack aware replication assignment for fault tolerance. It is configure in the
     *  'broker.rack' broker config property.
     */
    rack?: string;
    configs?: BrokerDetailConfigsItem[];
  }

  /**
   * BrokerSummary.
   */
  export interface BrokerSummary {
    /** The ID of the broker configured in the 'broker.id' broker config property. */
    id?: number;
    /** The hostname that the broker is listening on and which is configured in the 'advertised.listeners' broker
     *  config property.
     */
    host?: string;
    /** The port that the broker is listening on and which is configured in the 'advertised.listeners' broker config
     *  property.
     */
    port?: number;
    /** The rack of the broker used in rack aware replication assignment for fault tolerance. It is configure in the
     *  'broker.rack' broker config property.
     */
    rack?: string;
  }

  /**
   * Cluster.
   */
  export interface Cluster {
    /** The ID of the cluster. */
    id?: string;
    controller?: BrokerSummary;
    /** List of brokers in the cluster. */
    brokers?: BrokerSummary[];
  }

  /**
   * EntityQuotaDetail.
   */
  export interface EntityQuotaDetail {
    /** The name of the entity. */
    entity_name: string;
    /** The producer byte rate quota value. */
    producer_byte_rate?: number;
    /** The consumer byte rate quota value. */
    consumer_byte_rate?: number;
  }

  /**
   * GroupDetail.
   */
  export interface GroupDetail {
    /** The ID of the consumer group. */
    group_id?: string;
    /** THe state of the consumer group. */
    state?: string;
    /** Members in the consumer group. */
    members?: Member[];
    /** The offsets of the consumer group. */
    offsets?: TopicPartitionOffset[];
  }

  /**
   * Information about the status of the instance.
   */
  export interface InstanceStatus {
    /** The status of the instance: * `available` - the instance is functioning as expected * `degraded` - the
     *  instance is in a degraded state, some operations may not complete successfully * `offline` - the instance is
     *  offline, all operations attempted against the instance will fail * `unknown` - the state of the instance is not
     *  known at this time.
     */
    status?: InstanceStatus.Constants.Status | string;
  }
  export namespace InstanceStatus {
    export namespace Constants {
      /** The status of the instance: * `available` - the instance is functioning as expected * `degraded` - the instance is in a degraded state, some operations may not complete successfully * `offline` - the instance is offline, all operations attempted against the instance will fail * `unknown` - the state of the instance is not known at this time. */
      export enum Status {
        AVAILABLE = 'available',
        DEGRADED = 'degraded',
        OFFLINE = 'offline',
        UNKNOWN = 'unknown',
      }
    }
  }

  /**
   * Member.
   */
  export interface Member {
    /** The consumer ID of the consumer group member. */
    consumer_id?: string;
    /** The client ID of the consumer group member. */
    client_id?: string;
    /** The hostname of the machine where the consumer group member is running. */
    host?: string;
    /** The assignments of the group member. */
    assignments?: MemberAssignmentsItem[];
  }

  /**
   * Topics that are being actively mirrored.
   */
  export interface MirroringActiveTopics {
    active_topics?: string[];
  }

  /**
   * Mirroring topic selection payload.
   */
  export interface MirroringTopicSelection {
    includes?: string[];
  }

  /**
   * QuotaDetail.
   */
  export interface QuotaDetail {
    /** The producer byte rate quota value. */
    producer_byte_rate?: number;
    /** The consumer byte rate quota value. */
    consumer_byte_rate?: number;
  }

  /**
   * A list of 'quota_detail' is returned.
   */
  export interface QuotaList {
    data?: EntityQuotaDetail[];
  }

  /**
   * TopicConfigs.
   */
  export interface TopicConfigs {
    /** The value of config property 'retention.bytes'. */
    'retention.bytes'?: string;
    /** The value of config property 'segment.bytes'. */
    'segment.bytes'?: string;
    /** The value of config property 'segment.index.bytes'. */
    'segment.index.bytes'?: string;
    /** The value of config property 'segment.ms'. */
    'segment.ms'?: string;
  }

  /**
   * TopicDetail.
   */
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
    replicaAssignments?: TopicDetailReplicaAssignmentsItem[];
  }

  /**
   * The offsets of a topic partition.
   */
  export interface TopicPartitionOffset {
    /** The name of the topic. */
    topic?: string;
    /** The ID of the partition. */
    partition?: number;
    /** Current offset of the partition. */
    current_offset?: number;
    /** End offset of the partition. */
    end_offset?: number;
  }
}

export = AdminrestV1;
