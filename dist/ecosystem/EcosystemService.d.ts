import { IEcosystemService } from './interfaces/IEcosystemService';
import { Plugin } from './models/Plugin';
import { Webhook } from './models/Webhook';
import { WebhookDelivery } from './models/WebhookDelivery';
import { AnalyticsMetric } from './models/AnalyticsMetric';
import { ConnectorConfig } from './models/ConnectorConfig';
/**
 * Implementation of the ecosystem service
 */
export declare class EcosystemService implements IEcosystemService {
    private _logger;
    constructor();
    initialize(): Promise<void>;
    getPlugins(): Promise<Plugin[]>;
    registerPlugin(plugin: Omit<Plugin, 'id'>): Promise<Plugin>;
    unregisterPlugin(pluginId: string): Promise<void>;
    createWebhook(webhook: Omit<Webhook, 'id'>): Promise<Webhook>;
    updateWebhook(webhookId: string, webhook: Partial<Webhook>): Promise<Webhook>;
    deleteWebhook(webhookId: string): Promise<void>;
    listWebhooks(): Promise<Webhook[]>;
    getWebhookDeliveries(webhookId: string, limit?: number, offset?: number): Promise<WebhookDelivery[]>;
    retryWebhookDelivery(deliveryId: string): Promise<WebhookDelivery>;
    getAnalytics(metrics: string[], timeRange: {
        start: number;
        end: number;
    }, dimensions?: string[], filters?: Record<string, any>): Promise<Record<string, AnalyticsMetric>>;
    registerCustomMetric(metric: Omit<AnalyticsMetric, 'id'>): Promise<AnalyticsMetric>;
    recordAnalyticsEvent(event: {
        type: string;
        value?: number;
        metadata?: Record<string, any>;
    }): Promise<void>;
    configureConnector(connectorType: string, config: ConnectorConfig): Promise<void>;
    getConnectorConfig(connectorType: string): Promise<ConnectorConfig>;
    testConnector(connectorType: string, config: ConnectorConfig): Promise<{
        success: boolean;
        message?: string;
    }>;
}
