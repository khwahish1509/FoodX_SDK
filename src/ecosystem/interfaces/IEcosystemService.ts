import { Plugin } from '../models/Plugin';
import { Webhook } from '../models/Webhook';
import { WebhookDelivery } from '../models/WebhookDelivery';
import { AnalyticsMetric } from '../models/AnalyticsMetric';
import { ConnectorConfig } from '../models/ConnectorConfig';

/**
 * Interface for ecosystem integrations and extensions
 */
export interface IEcosystemService {
  /**
   * Initialize the ecosystem service
   */
  initialize(): Promise<void>;
  
  /**
   * Get all registered plugins
   */
  getPlugins(): Promise<Plugin[]>;
  
  /**
   * Register a new plugin
   * @param plugin Plugin details
   */
  registerPlugin(plugin: Omit<Plugin, 'id'>): Promise<Plugin>;
  
  /**
   * Unregister a plugin
   * @param pluginId Plugin identifier
   */
  unregisterPlugin(pluginId: string): Promise<void>;
  
  /**
   * Create a new webhook subscription
   * @param webhook Webhook details
   */
  createWebhook(webhook: Omit<Webhook, 'id'>): Promise<Webhook>;
  
  /**
   * Update an existing webhook
   * @param webhookId Webhook identifier
   * @param webhook Updated webhook details
   */
  updateWebhook(webhookId: string, webhook: Partial<Webhook>): Promise<Webhook>;
  
  /**
   * Delete a webhook
   * @param webhookId Webhook identifier
   */
  deleteWebhook(webhookId: string): Promise<void>;
  
  /**
   * List all webhooks
   */
  listWebhooks(): Promise<Webhook[]>;
  
  /**
   * Get webhook delivery history
   * @param webhookId Webhook identifier
   * @param limit Maximum number of deliveries to return
   * @param offset Offset for pagination
   */
  getWebhookDeliveries(
    webhookId: string, 
    limit?: number, 
    offset?: number
  ): Promise<WebhookDelivery[]>;
  
  /**
   * Retry a failed webhook delivery
   * @param deliveryId Delivery identifier
   */
  retryWebhookDelivery(deliveryId: string): Promise<WebhookDelivery>;
  
  /**
   * Get analytics metrics
   * @param metrics List of metrics to retrieve
   * @param timeRange Time range for the metrics
   * @param dimensions Optional dimensions to group by
   * @param filters Optional filters to apply
   */
  getAnalytics(
    metrics: string[], 
    timeRange: { start: number; end: number }, 
    dimensions?: string[],
    filters?: Record<string, any>
  ): Promise<Record<string, AnalyticsMetric>>;
  
  /**
   * Register a custom analytics metric
   * @param metric Metric definition
   */
  registerCustomMetric(metric: Omit<AnalyticsMetric, 'id'>): Promise<AnalyticsMetric>;
  
  /**
   * Record a custom analytics event
   * @param event Event details
   */
  recordAnalyticsEvent(event: {
    type: string;
    value?: number;
    metadata?: Record<string, any>;
  }): Promise<void>;
  
  /**
   * Configure a connector to an external system
   * @param connectorType Type of connector
   * @param config Connector configuration
   */
  configureConnector(
    connectorType: string, 
    config: ConnectorConfig
  ): Promise<void>;
  
  /**
   * Get connector configuration
   * @param connectorType Type of connector
   */
  getConnectorConfig(connectorType: string): Promise<ConnectorConfig>;
  
  /**
   * Test a connector configuration
   * @param connectorType Type of connector
   * @param config Connector configuration
   */
  testConnector(
    connectorType: string, 
    config: ConnectorConfig
  ): Promise<{ success: boolean; message?: string }>;
} 