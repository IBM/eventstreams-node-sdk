"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * IBM OpenAPI SDK Code Generator Version: 3.25.0-2b3f843a-20210115-164628
 */
var extend = require("extend");
var ibm_cloud_sdk_core_1 = require("ibm-cloud-sdk-core");
var common_1 = require("../lib/common");
/**
 * The administration REST API for IBM Event Streams on Cloud.
 */
var AdminrestV1 = /** @class */ (function (_super) {
    __extends(AdminrestV1, _super);
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
    function AdminrestV1(options) {
        var _this = this;
        options = options || {};
        _this = _super.call(this, options) || this;
        if (options.serviceUrl) {
            _this.setServiceUrl(options.serviceUrl);
        }
        else {
            _this.setServiceUrl(AdminrestV1.DEFAULT_SERVICE_URL);
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
     * @param {string} [options.serviceUrl] - The URL for the service
     * @returns {AdminrestV1}
     */
    AdminrestV1.newInstance = function (options) {
        options = options || {};
        if (!options.serviceName) {
            options.serviceName = this.DEFAULT_SERVICE_NAME;
        }
        if (!options.authenticator) {
            options.authenticator = ibm_cloud_sdk_core_1.getAuthenticatorFromEnvironment(options.serviceName);
        }
        var service = new AdminrestV1(options);
        service.configureService(options.serviceName);
        if (options.serviceUrl) {
            service.setServiceUrl(options.serviceUrl);
        }
        return service;
    };
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
    AdminrestV1.prototype.createTopic = function (params) {
        var _params = Object.assign({}, params);
        var body = {
            'name': _params.name,
            'partitions': _params.partitions,
            'partition_count': _params.partitionCount,
            'configs': _params.configs
        };
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'createTopic');
        var parameters = {
            options: {
                url: '/admin/topics',
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
    ;
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
    AdminrestV1.prototype.listTopics = function (params) {
        var _params = Object.assign({}, params);
        var query = {
            'topic_filter': _params.topicFilter,
            'per_page': _params.perPage,
            'page': _params.page
        };
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'listTopics');
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
    ;
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
    AdminrestV1.prototype.getTopic = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['topicName'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'topic_name': _params.topicName
        };
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getTopic');
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
    ;
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
    AdminrestV1.prototype.deleteTopic = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['topicName'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var path = {
            'topic_name': _params.topicName
        };
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTopic');
        var parameters = {
            options: {
                url: '/admin/topics/{topic_name}',
                method: 'DELETE',
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
    ;
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
    AdminrestV1.prototype.updateTopic = function (params) {
        var _params = Object.assign({}, params);
        var requiredParams = ['topicName'];
        var missingParams = ibm_cloud_sdk_core_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return Promise.reject(missingParams);
        }
        var body = {
            'new_total_partition_count': _params.newTotalPartitionCount,
            'configs': _params.configs
        };
        var path = {
            'topic_name': _params.topicName
        };
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTopic');
        var parameters = {
            options: {
                url: '/admin/topics/{topic_name}',
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
    ;
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
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getMirroringTopicSelection');
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
    ;
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
        var _params = Object.assign({}, params);
        var body = {
            'includes': _params.includes
        };
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceMirroringTopicSelection');
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
    ;
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
        var _params = Object.assign({}, params);
        var sdkHeaders = common_1.getSdkHeaders(AdminrestV1.DEFAULT_SERVICE_NAME, 'v1', 'getMirroringActiveTopics');
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
    ;
    AdminrestV1.DEFAULT_SERVICE_URL = 'https://adminrest.cloud.ibm.com';
    AdminrestV1.DEFAULT_SERVICE_NAME = 'adminrest';
    return AdminrestV1;
}(ibm_cloud_sdk_core_1.BaseService));
module.exports = AdminrestV1;
//# sourceMappingURL=v1.js.map