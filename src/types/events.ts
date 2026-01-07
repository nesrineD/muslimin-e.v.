/**
 * Event Badge Types
 * Shared types for event badges used across event components
 */

export type BadgeVariant =
  | "open"
  | "register"
  | "members"
  | "online"
  | "presence"
  | "limited";

export interface EventBadge {
  label: string;
  variant: BadgeVariant;
}
