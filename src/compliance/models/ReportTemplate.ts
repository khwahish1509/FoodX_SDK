/**
 * Component types in a report template
 */
export enum ReportComponentType {
  TABLE = 'table',
  CHART = 'chart',
  TEXT = 'text',
  IMAGE = 'image',
  HEADER = 'header',
  FOOTER = 'footer',
  PAGE_BREAK = 'page-break'
}

/**
 * Chart types available in reports
 */
export enum ReportChartType {
  BAR = 'bar',
  LINE = 'line',
  PIE = 'pie',
  SCATTER = 'scatter',
  AREA = 'area'
}

/**
 * Report parameter definition
 */
export interface ReportParameter {
  /**
   * Parameter name
   */
  name: string;
  
  /**
   * Human-readable label
   */
  label: string;
  
  /**
   * Parameter description
   */
  description?: string;
  
  /**
   * Parameter data type
   */
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  
  /**
   * Whether the parameter is required
   */
  required: boolean;
  
  /**
   * Default value for the parameter
   */
  defaultValue?: any;
  
  /**
   * For array and enum types, the possible values
   */
  options?: Array<{ value: any; label: string }>;
}

/**
 * Component in a report template
 */
export interface ReportComponent {
  /**
   * Component type
   */
  type: ReportComponentType;
  
  /**
   * Component identifier
   */
  id: string;
  
  /**
   * Component title
   */
  title?: string;
  
  /**
   * Data source for the component
   */
  dataSource?: {
    /**
     * Type of data source
     */
    type: 'query' | 'parameter' | 'static';
    
    /**
     * Query or data reference
     */
    value: string;
    
    /**
     * Parameters for the data source
     */
    parameters?: Record<string, any>;
  };
  
  /**
   * Component-specific configuration
   */
  config?: Record<string, any>;
  
  /**
   * For chart components, chart type
   */
  chartType?: ReportChartType;
  
  /**
   * Styling options for the component
   */
  style?: Record<string, any>;
}

/**
 * Report template definition
 */
export interface ReportTemplate {
  /**
   * Template identifier
   */
  id: string;
  
  /**
   * Human-readable name
   */
  name: string;
  
  /**
   * Template description
   */
  description?: string;
  
  /**
   * Template version
   */
  version: string;
  
  /**
   * When the template was created
   */
  createdAt: number;
  
  /**
   * User who created the template
   */
  createdBy: string;
  
  /**
   * When the template was last modified
   */
  modifiedAt?: number;
  
  /**
   * Parameters that can be passed to the report
   */
  parameters: ReportParameter[];
  
  /**
   * Components that make up the report
   */
  components: ReportComponent[];
  
  /**
   * Paper size and orientation
   */
  pageSettings?: {
    /**
     * Page size ('a4', 'letter', etc.)
     */
    size: string;
    
    /**
     * Page orientation
     */
    orientation: 'portrait' | 'landscape';
    
    /**
     * Margins in pixels
     */
    margins?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
} 