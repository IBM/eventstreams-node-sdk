/**
 * (C) Copyright IBM Corp. 2023.
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
/// <reference types="node" />
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { BaseService, UserOptions } from 'ibm-cloud-sdk-core';
/**
 * The administration REST API for IBM Event Streams on Cloud.
 *
 * API Version: 1.3.0
 */
declare class AdminrestV1 extends BaseService {
    static DEFAULT_SERVICE_NAME: string;
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
    static newInstance(options: UserOptions): AdminrestV1;
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
    constructor(options: UserOptions);
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
    createTopic(params?: AdminrestV1.CreateTopicParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    alive(params?: AdminrestV1.AliveParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    listTopics(params?: AdminrestV1.ListTopicsParams): Promise<AdminrestV1.Response<AdminrestV1.TopicDetail[]>>;
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
    getTopic(params: AdminrestV1.GetTopicParams): Promise<AdminrestV1.Response<AdminrestV1.TopicDetail>>;
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
    deleteTopic(params: AdminrestV1.DeleteTopicParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    updateTopic(params: AdminrestV1.UpdateTopicParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    deleteTopicRecords(params: AdminrestV1.DeleteTopicRecordsParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    createQuota(params: AdminrestV1.CreateQuotaParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    updateQuota(params: AdminrestV1.UpdateQuotaParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    deleteQuota(params: AdminrestV1.DeleteQuotaParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    getQuota(params: AdminrestV1.GetQuotaParams): Promise<AdminrestV1.Response<AdminrestV1.QuotaDetail>>;
    /**
     * List each entity's quota information.
     *
     * List each entity's quota information.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.QuotaList>>}
     */
    listQuotas(params?: AdminrestV1.ListQuotasParams): Promise<AdminrestV1.Response<AdminrestV1.QuotaList>>;
    /**
     * Get a list of brokers in the cluster.
     *
     * Get a list of brokers in the cluster.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.BrokerSummary[]>>}
     */
    listBrokers(params?: AdminrestV1.ListBrokersParams): Promise<AdminrestV1.Response<AdminrestV1.BrokerSummary[]>>;
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
    getBroker(params: AdminrestV1.GetBrokerParams): Promise<AdminrestV1.Response<AdminrestV1.BrokerDetail>>;
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
    getBrokerConfig(params: AdminrestV1.GetBrokerConfigParams): Promise<AdminrestV1.Response<AdminrestV1.BrokerDetail>>;
    /**
     * Get information about the cluster.
     *
     * Get information about the cluster.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.Cluster>>}
     */
    getCluster(params?: AdminrestV1.GetClusterParams): Promise<AdminrestV1.Response<AdminrestV1.Cluster>>;
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
    listConsumerGroups(params?: AdminrestV1.ListConsumerGroupsParams): Promise<AdminrestV1.Response<string[]>>;
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
    getConsumerGroup(params: AdminrestV1.GetConsumerGroupParams): Promise<AdminrestV1.Response<AdminrestV1.GroupDetail>>;
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
    deleteConsumerGroup(params: AdminrestV1.DeleteConsumerGroupParams): Promise<AdminrestV1.Response<AdminrestV1.EmptyObject>>;
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
    updateConsumerGroup(params: AdminrestV1.UpdateConsumerGroupParams): Promise<AdminrestV1.Response<AdminrestV1.GroupResetResultsItem[]>>;
    /**
     * Get current topic selection for mirroring.
     *
     * Get current topic selection for mirroring.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>>}
     */
    getMirroringTopicSelection(params?: AdminrestV1.GetMirroringTopicSelectionParams): Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>>;
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
    replaceMirroringTopicSelection(params?: AdminrestV1.ReplaceMirroringTopicSelectionParams): Promise<AdminrestV1.Response<AdminrestV1.MirroringTopicSelection>>;
    /**
     * Get topics that are being actively mirrored.
     *
     * Get topics that are being actively mirrored.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
     * @returns {Promise<AdminrestV1.Response<AdminrestV1.MirroringActiveTopics>>}
     */
    getMirroringActiveTopics(params?: AdminrestV1.GetMirroringActiveTopicsParams): Promise<AdminrestV1.Response<AdminrestV1.MirroringActiveTopics>>;
}
/*************************
 * interfaces
 ************************/
declare namespace AdminrestV1 {
    /** An operation response. */
    interface Response<T = any> {
        result: T;
        status: number;
        statusText: string;
        headers: IncomingHttpHeaders;
    }
    /** The callback for a service request. */
    type Callback<T> = (error: any, response?: Response<T>) => void;
    /** The body of a service request that returns no response data. */
    interface EmptyObject {
    }
    /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
    interface JsonObject {
        [key: string]: any;
    }
    /*************************
     * request interfaces
     ************************/
    /** Parameters for the `createTopic` operation. */
    interface CreateTopicParams {
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
    interface AliveParams {
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `listTopics` operation. */
    interface ListTopicsParams {
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
    interface GetTopicParams {
        /** The topic name for the topic to be described. */
        topicName: string;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `deleteTopic` operation. */
    interface DeleteTopicParams {
        /** The topic name for the topic to be deleted. */
        topicName: string;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `updateTopic` operation. */
    interface UpdateTopicParams {
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
    interface DeleteTopicRecordsParams {
        /** The topic name of the records to be deleted. */
        topicName: string;
        recordsToDelete?: RecordDeleteRequestRecordsToDeleteItem[];
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `createQuota` operation. */
    interface CreateQuotaParams {
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
    interface UpdateQuotaParams {
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
    interface DeleteQuotaParams {
        /** The entity name of the quotas can be `default` or an IAM Service ID that starts with an `iam-ServiceId`
         *  prefix.
         */
        entityName: string;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `getQuota` operation. */
    interface GetQuotaParams {
        /** The entity name of the quotas can be `default` or an IAM Service ID that starts with an `iam-ServiceId`
         *  prefix.
         */
        entityName: string;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `listQuotas` operation. */
    interface ListQuotasParams {
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `listBrokers` operation. */
    interface ListBrokersParams {
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `getBroker` operation. */
    interface GetBrokerParams {
        /** The broker ID of the broker to be described. */
        brokerId: number;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `getBrokerConfig` operation. */
    interface GetBrokerConfigParams {
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
    interface GetClusterParams {
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `listConsumerGroups` operation. */
    interface ListConsumerGroupsParams {
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
    interface GetConsumerGroupParams {
        /** The group ID for the consumer group to be described. */
        groupId: string;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `deleteConsumerGroup` operation. */
    interface DeleteConsumerGroupParams {
        /** The group ID for the consumer group to be deleted. */
        groupId: string;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `updateConsumerGroup` operation. */
    interface UpdateConsumerGroupParams {
        /** The group ID for the consumer group to be updated. */
        groupId: string;
        /** The name of the topic to be reset.  If missing or blank, the operation applies to all topics read by the
         *  consumer group.
         */
        topic?: string;
        /** Mode of shift operation.  Valid values are 'earliest', 'latest', 'datetime'. */
        mode?: string;
        /** Value for resetting offsets, based on 'mode=datetime', omit for 'earliest' and 'latest'. */
        value?: string;
        /** Whether to execute the operation of resetting the offsets. */
        execute?: boolean;
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `getMirroringTopicSelection` operation. */
    interface GetMirroringTopicSelectionParams {
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `replaceMirroringTopicSelection` operation. */
    interface ReplaceMirroringTopicSelectionParams {
        includes?: string[];
        headers?: OutgoingHttpHeaders;
    }
    /** Parameters for the `getMirroringActiveTopics` operation. */
    interface GetMirroringActiveTopicsParams {
        headers?: OutgoingHttpHeaders;
    }
    /*************************
     * model interfaces
     ************************/
    /** BrokerDetailConfigsItem. */
    interface BrokerDetailConfigsItem {
        /** The name of the config property. */
        name?: string;
        /** The value for a config property. */
        value?: string;
        /** When true, the value cannot be displayed and will be returned with a null value. */
        is_sensitive?: boolean;
    }
    /** The new offset for one partition of one topic after resetting consumer group's offset. */
    interface GroupResetResultsItem {
        topic?: string;
        partition?: number;
        offset?: number;
    }
    /** The topic partitions assigned for the consumer group member. */
    interface MemberAssignmentsItem {
        /** The name of the topic. */
        topic?: string;
        /** The ID of the partition. */
        partition?: number;
    }
    /** RecordDeleteRequestRecordsToDeleteItem. */
    interface RecordDeleteRequestRecordsToDeleteItem {
        /** The number of partitions. */
        partition?: number;
        /** The offset number before which records to be deleted. */
        before_offset?: number;
    }
    /** TopicCreateRequestConfigsItem. */
    interface TopicCreateRequestConfigsItem {
        /** The name of the config property. */
        name?: string;
        /** The value for a config property. */
        value?: string;
    }
    /** TopicDetailReplicaAssignmentsItem. */
    interface TopicDetailReplicaAssignmentsItem {
        /** The ID of the partition. */
        id?: number;
        brokers?: TopicDetailReplicaAssignmentsItemBrokers;
    }
    /** TopicDetailReplicaAssignmentsItemBrokers. */
    interface TopicDetailReplicaAssignmentsItemBrokers {
        replicas?: number[];
    }
    /** TopicUpdateRequestConfigsItem. */
    interface TopicUpdateRequestConfigsItem {
        /** The name of the config property. */
        name?: string;
        /** The value of a config property. */
        value?: string;
        /** When true, the value of the config property is reset to its default value. */
        reset_to_default?: boolean;
    }
    /** BrokerDetail. */
    interface BrokerDetail {
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
    /** BrokerSummary. */
    interface BrokerSummary {
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
    /** Cluster. */
    interface Cluster {
        /** The ID of the cluster. */
        id?: string;
        controller?: BrokerSummary;
        /** List of brokers in the cluster. */
        brokers?: BrokerSummary[];
    }
    /** EntityQuotaDetail. */
    interface EntityQuotaDetail {
        /** The name of the entity. */
        entity_name: string;
        /** The producer byte rate quota value. */
        producer_byte_rate?: number;
        /** The consumer byte rate quota value. */
        consumer_byte_rate?: number;
    }
    /** GroupDetail. */
    interface GroupDetail {
        /** The ID of the consumer group. */
        group_id?: string;
        /** THe state of the consumer group. */
        state?: string;
        /** Members in the consumer group. */
        members?: Member[];
        /** The offsets of the consumer group. */
        offsets?: TopicPartitionOffset[];
    }
    /** Member. */
    interface Member {
        /** The consumer ID of the consumer group member. */
        consumer_id?: string;
        /** The client ID of the consumer group member. */
        client_id?: string;
        /** The hostname of the machine where the consumer group member is running. */
        host?: string;
        /** The assignments of the group member. */
        assignments?: MemberAssignmentsItem[];
    }
    /** Topics that are being actively mirrored. */
    interface MirroringActiveTopics {
        active_topics?: string[];
    }
    /** Mirroring topic selection payload. */
    interface MirroringTopicSelection {
        includes?: string[];
    }
    /** QuotaDetail. */
    interface QuotaDetail {
        /** The producer byte rate quota value. */
        producer_byte_rate?: number;
        /** The consumer byte rate quota value. */
        consumer_byte_rate?: number;
    }
    /** A list of 'quota_detail' is returned. */
    interface QuotaList {
        data?: EntityQuotaDetail[];
    }
    /** TopicConfigs. */
    interface TopicConfigs {
        /** The value of config property 'retention.bytes'. */
        'retention.bytes'?: string;
        /** The value of config property 'segment.bytes'. */
        'segment.bytes'?: string;
        /** The value of config property 'segment.index.bytes'. */
        'segment.index.bytes'?: string;
        /** The value of config property 'segment.ms'. */
        'segment.ms'?: string;
    }
    /** TopicDetail. */
    interface TopicDetail {
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
    /** The offsets of a topic partition. */
    interface TopicPartitionOffset {
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
