"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * IBM OpenAPI SDK Code Generator Version: 3.93.0-c40121e6-20240729-182103
 */
var extend = require("extend");
var ibm_cloud_sdk_core_1 = require("ibm-cloud-sdk-core");
var common_1 = require("../lib/common");
/**
 * The administration REST API for IBM Event Streams on Cloud.
 *
 * API Version: 1.3.0
 */
var AdminrestV1 = /** @class */ (function (_super) {
    __extends(AdminrestV1, _super);
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
    function AdminrestV1(options) {
        var _this = this;
        options = options || {};
        _this = _super.call(this, options) || this;
        if (options.serviceUrl) {
            _this.setServiceUrl(options.serviceUrl);
        }
        return _this;
    }
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
    AdminrestV1.newInstance = function (options) {
        options = options || {};
        if (!options.serviceName) {
            options.serviceName = this.DEFAULT_SERVICE_NAME;
        }
        if (!options.authenticator) {
            options.authenticator = (0, ibm_cloud_sdk_core_1.getAuthenticatorFromEnvironment)(options.serviceName);
        }
        var service = new AdminrestV1(options);
        service.configureService(options.serviceName);
        if (options.serviceUrl) {
            service.setServiceUrl(options.serviceUrl);
        }
        return service;
    };
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
    AdminrestV1.prototype.createTopic = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['name', 'partitions', 'partitionCount', 'configs', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'name': _params.name,
            'partitions': _params.partitions,
            'partition_count': _params.partitionCount,
            'configs': _params.configs,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'createTopic');
        var parameters = {
            options: {
                url: '/admin/topics',
                method: 'POST',
                body: body,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.alive = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'alive');
        var parameters = {
            options: {
                url: '/alive',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {}, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.listTopics = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['topicFilter', 'perPage', 'page', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var query = {
            'topic_filter': _params.topicFilter,
            'per_page': _params.perPage,
            'page': _params.page,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listTopics');
        var parameters = {
            options: {
                url: '/admin/topics',
                method: 'GET',
                qs: query,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.getTopic = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['topicName'];
        var _validParams = ['topicName', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'topic_name': _params.topicName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getTopic');
        var parameters = {
            options: {
                url: '/admin/topics/{topic_name}',
                method: 'GET',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.deleteTopic = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['topicName'];
        var _validParams = ['topicName', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'topic_name': _params.topicName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTopic');
        var parameters = {
            options: {
                url: '/admin/topics/{topic_name}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {}, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.updateTopic = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['topicName'];
        var _validParams = ['topicName', 'newTotalPartitionCount', 'configs', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'new_total_partition_count': _params.newTotalPartitionCount,
            'configs': _params.configs,
        };
        var path = {
            'topic_name': _params.topicName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTopic');
        var parameters = {
            options: {
                url: '/admin/topics/{topic_name}',
                method: 'PATCH',
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.deleteTopicRecords = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['topicName'];
        var _validParams = ['topicName', 'recordsToDelete', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'records_to_delete': _params.recordsToDelete,
        };
        var path = {
            'topic_name': _params.topicName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTopicRecords');
        var parameters = {
            options: {
                url: '/admin/topics/{topic_name}/records',
                method: 'DELETE',
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.createQuota = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['entityName'];
        var _validParams = ['entityName', 'producerByteRate', 'consumerByteRate', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'producer_byte_rate': _params.producerByteRate,
            'consumer_byte_rate': _params.consumerByteRate,
        };
        var path = {
            'entity_name': _params.entityName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'createQuota');
        var parameters = {
            options: {
                url: '/admin/quotas/{entity_name}',
                method: 'POST',
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.updateQuota = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['entityName'];
        var _validParams = ['entityName', 'producerByteRate', 'consumerByteRate', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'producer_byte_rate': _params.producerByteRate,
            'consumer_byte_rate': _params.consumerByteRate,
        };
        var path = {
            'entity_name': _params.entityName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateQuota');
        var parameters = {
            options: {
                url: '/admin/quotas/{entity_name}',
                method: 'PATCH',
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.deleteQuota = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['entityName'];
        var _validParams = ['entityName', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'entity_name': _params.entityName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteQuota');
        var parameters = {
            options: {
                url: '/admin/quotas/{entity_name}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {}, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.getQuota = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['entityName'];
        var _validParams = ['entityName', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'entity_name': _params.entityName,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getQuota');
        var parameters = {
            options: {
                url: '/admin/quotas/{entity_name}',
                method: 'GET',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * List each entity's quota information.
     *
     * List each entity's quota information.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.QuotaList>>}
     */
    AdminrestV1.prototype.listQuotas = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listQuotas');
        var parameters = {
            options: {
                url: '/admin/quotas',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * Get a list of brokers in the cluster.
     *
     * Get a list of brokers in the cluster.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.BrokerSummary[]>>}
     */
    AdminrestV1.prototype.listBrokers = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listBrokers');
        var parameters = {
            options: {
                url: '/admin/brokers',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.getBroker = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['brokerId'];
        var _validParams = ['brokerId', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'broker_id': _params.brokerId,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getBroker');
        var parameters = {
            options: {
                url: '/admin/brokers/{broker_id}',
                method: 'GET',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.getBrokerConfig = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['brokerId'];
        var _validParams = ['brokerId', 'configFilter', 'verbose', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var query = {
            'config_filter': _params.configFilter,
            'verbose': _params.verbose,
        };
        var path = {
            'broker_id': _params.brokerId,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getBrokerConfig');
        var parameters = {
            options: {
                url: '/admin/brokers/{broker_id}/configs',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * Get information about the cluster.
     *
     * Get information about the cluster.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.Cluster>>}
     */
    AdminrestV1.prototype.getCluster = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getCluster');
        var parameters = {
            options: {
                url: '/admin/cluster',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.listConsumerGroups = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['groupFilter', 'perPage', 'page', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var query = {
            'group_filter': _params.groupFilter,
            'per_page': _params.perPage,
            'page': _params.page,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listConsumerGroups');
        var parameters = {
            options: {
                url: '/admin/consumergroups',
                method: 'GET',
                qs: query,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.getConsumerGroup = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['groupId'];
        var _validParams = ['groupId', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'group_id': _params.groupId,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getConsumerGroup');
        var parameters = {
            options: {
                url: '/admin/consumergroups/{group_id}',
                method: 'GET',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.deleteConsumerGroup = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['groupId'];
        var _validParams = ['groupId', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var path = {
            'group_id': _params.groupId,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteConsumerGroup');
        var parameters = {
            options: {
                url: '/admin/consumergroups/{group_id}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {}, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * Update the offsets of a consumer group.
     *
     * Update the offsets of a consumer group using various modes, eg. latest, earliest, datetime,etc.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.groupId - The group ID for the consumer group to be updated.
     * @param {string} [params.topic] - The name of the topic to be reset.  If missing or blank, the operation applies to
     * all topics read by the consumer group.
     * @param {string} [params.mode] - Mode of shift operation.  Valid values are 'earliest', 'latest', 'datetime'.
     * @param {string} [params.value] - Value for resetting offsets, based on 'mode=datetime', omit for 'earliest' and
     * 'latest'.
     * @param {boolean} [params.execute] - Whether to execute the operation of resetting the offsets.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.GroupResetResultsItem[]>>}
     */
    AdminrestV1.prototype.updateConsumerGroup = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = ['groupId'];
        var _validParams = ['groupId', 'topic', 'mode', 'value', 'execute', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'topic': _params.topic,
            'mode': _params.mode,
            'value': _params.value,
            'execute': _params.execute,
        };
        var path = {
            'group_id': _params.groupId,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateConsumerGroup');
        var parameters = {
            options: {
                url: '/admin/consumergroups/{group_id}',
                method: 'PATCH',
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * Get current topic selection for mirroring.
     *
     * Get current topic selection for mirroring.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>>}
     */
    AdminrestV1.prototype.getMirroringTopicSelection = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getMirroringTopicSelection');
        var parameters = {
            options: {
                url: '/admin/mirroring/topic-selection',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
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
    AdminrestV1.prototype.replaceMirroringTopicSelection = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['includes', 'headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var body = {
            'includes': _params.includes,
        };
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceMirroringTopicSelection');
        var parameters = {
            options: {
                url: '/admin/mirroring/topic-selection',
                method: 'POST',
                body: body,
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * Get topics that are being actively mirrored.
     *
     * Get topics that are being actively mirrored.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringActiveTopics>>}
     */
    AdminrestV1.prototype.getMirroringActiveTopics = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getMirroringActiveTopics');
        var parameters = {
            options: {
                url: '/admin/mirroring/active-topics',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    /**
     * Get the status of the instance.
     *
     * Get the status of the instance.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.InstanceStatus>>}
     */
    AdminrestV1.prototype.getStatus = function (params) {
        var _params = __assign({}, params);
        var _requiredParams = [];
        var _validParams = ['headers'];
        var _validationErrors = (0, ibm_cloud_sdk_core_1.validateParams)(_params, _requiredParams, _validParams);
        if (_validationErrors) {
            return Promise.reject(_validationErrors);
        }
        var sdkHeaders = (0, common_1.getSdkHeaders)(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getStatus');
        var parameters = {
            options: {
                url: '/admin/status',
                method: 'GET',
            },
            defaultOptions: extend(true, {}, this.baseOptions, {
                headers: extend(true, sdkHeaders, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters);
    };
    AdminrestV1.DEFAULT_SERVICE_NAME = 'adminrest';
    return AdminrestV1;
}(ibm_cloud_sdk_core_1.BaseService));
/*************************
 * interfaces
 ************************/
(function (AdminrestV1) {
    var InstanceStatus;
    (function (InstanceStatus) {
        var Constants;
        (function (Constants) {
            /** The status of the instance: * `available` - the instance is functioning as expected * `degraded` - the instance is in a degraded state, some operations may not complete successfully * `offline` - the instance is offline, all operations attempted against the instance will fail * `unknown` - the state of the instance is not known at this time. */
            var Status;
            (function (Status) {
                Status["AVAILABLE"] = "available";
                Status["DEGRADED"] = "degraded";
                Status["OFFLINE"] = "offline";
                Status["UNKNOWN"] = "unknown";
            })(Status = Constants.Status || (Constants.Status = {}));
        })(Constants = InstanceStatus.Constants || (InstanceStatus.Constants = {}));
    })(InstanceStatus = AdminrestV1.InstanceStatus || (AdminrestV1.InstanceStatus = {}));
})(AdminrestV1 || (AdminrestV1 = {}));
module.exports = AdminrestV1;
//# sourceMappingURL=v1.js.map