/**
 * Types of access control policies
 */
export declare enum PolicyType {
    ROLE_BASED = "role-based",
    ATTRIBUTE_BASED = "attribute-based",
    HYBRID = "hybrid"
}
/**
 * Defines a role and its permissions
 */
export interface Role {
    /**
     * Unique role identifier
     */
    id: string;
    /**
     * Human-readable name
     */
    name: string;
    /**
     * Role description
     */
    description?: string;
    /**
     * List of permissions granted to this role
     */
    permissions: Permission[];
    /**
     * Parent roles this role inherits permissions from
     */
    inheritsFrom?: string[];
}
/**
 * Defines a permission to access a resource
 */
export interface Permission {
    /**
     * Resource being accessed
     */
    resource: string;
    /**
     * Allowed actions on the resource
     */
    actions: string[];
    /**
     * Constraints on the permission (e.g., only own data)
     */
    constraints?: Record<string, any>;
}
/**
 * Attribute-based access control rule
 */
export interface AttributeRule {
    /**
     * Resource being accessed
     */
    resource: string;
    /**
     * Action being performed
     */
    action: string;
    /**
     * Condition expression that must evaluate to true
     */
    condition: string;
    /**
     * Priority of the rule (higher numbers = higher priority)
     */
    priority: number;
    /**
     * Effect if condition is true ('allow' or 'deny')
     */
    effect: 'allow' | 'deny';
}
/**
 * Access control configuration
 */
export interface AccessControl {
    /**
     * Type of policy in use
     */
    policyType: PolicyType;
    /**
     * Defined roles for role-based access control
     */
    roles?: Role[];
    /**
     * Attribute rules for attribute-based access control
     */
    attributeRules?: AttributeRule[];
    /**
     * Default effect if no rules match ('allow' or 'deny')
     */
    defaultEffect: 'allow' | 'deny';
}
