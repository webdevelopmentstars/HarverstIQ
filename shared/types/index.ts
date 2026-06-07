/**
 * HarverstIQ - Shared Type Definitions
 * Used across web and api applications
 */

// ========== ENUMS ==========

export enum JobStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  STOPPED = 'stopped',
  ARCHIVED = 'archived',
}

export enum DatasetStatus {
  STAGING = 'staging',
  APPROVED = 'approved',
  ARCHIVED = 'archived',
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum Incremental {
  URL_HASH = 'url_hash',
  CONTENT_HASH = 'content_hash',
  DATE = 'date',
  NONE = 'none',
}

// ========== MAIN DOMAIN TYPES ==========

export interface User {
  user_id: string;
  email: string;
  password_hash?: string;
  role: UserRole;
  dataset_permissions: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Job {
  job_id: string;
  name: string;
  target_url: string;
  selector_template_id: string;
  schedule: string | null;
  status: JobStatus;
  proxy_enabled: boolean;
  incremental_method: Incremental;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  last_run: Date | null;
  last_run_duration_ms: number | null;
  total_runs: number;
  success_runs: number;
  failed_runs: number;
}

export interface Dataset {
  dataset_uuid: string;
  name: string;
  job_id: string;
  version: number;
  row_count: number;
  sheet_tab: string;
  status: DatasetStatus;
  created_at: Date;
  updated_at: Date;
}

export interface SelectorTemplate {
  template_id: string;
  name: string;
  site_pattern: string;
  selectors: {
    title?: string;
    content?: string;
    author?: string;
    date?: string;
    image?: string;
  };
  wait_for?: string | null;
  js_render: boolean;
  extra_headers?: Record<string, string>;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface DataRow {
  record_uuid: string;
  dataset_uuid: string;
  dataset_version: number;
  source_url: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_date: Date | null;
  scraped_at: Date;
  content_hash: string;
  status: string;
}

export interface AuditLog {
  action: string;
  entity_type: string;
  entity_id: string;
  performed_by: string;
  details: Record<string, unknown>;
  created_at: Date;
}

// ========== REQUEST/RESPONSE TYPES ==========

export interface AuthResponse {
  accessToken: string;
  user: Omit<User, 'password_hash'>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateJobRequest {
  name: string;
  target_url: string;
  selector_template_id: string;
  schedule?: string | null;
  proxy_enabled?: boolean;
  incremental_method?: Incremental;
}

export interface UpdateJobRequest {
  name?: string;
  target_url?: string;
  selector_template_id?: string;
  schedule?: string | null;
  proxy_enabled?: boolean;
  incremental_method?: Incremental;
}

export interface JobRunRequest {
  job_id: string;
}

export interface ApproveDatasetRequest {
  dataset_uuid: string;
}

// ========== SOCKET.IO EVENT TYPES ==========

export interface JobStartedEvent {
  job_id: string;
  timestamp: Date;
  target_url: string;
}

export interface JobProgressEvent {
  job_id: string;
  scraped: number;
  total?: number;
  current_url: string;
  eta?: number;
}

export interface JobCompletedEvent {
  job_id: string;
  rows_added: number;
  rows_skipped: number;
  duration_ms: number;
  timestamp: Date;
}

export interface JobFailedEvent {
  job_id: string;
  error: string;
  timestamp: Date;
}

export interface JobStoppedEvent {
  job_id: string;
  timestamp: Date;
}

export interface SheetWrittenEvent {
  dataset_uuid: string;
  row_count: number;
  tab: string;
  timestamp: Date;
}

export interface StagingUpdatedEvent {
  dataset_uuid: string;
  pending_count: number;
  timestamp: Date;
}

// ========== QUEUE TYPES ==========

export interface JobPayload {
  job_id: string;
  name: string;
  target_url: string;
  selector_template_id: string;
  proxy_enabled: boolean;
  incremental_method: Incremental;
  created_by: string;
  created_at: string;
}

export interface QueueStats {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
}

// ========== API RESPONSE TYPES ==========

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: Date;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'down';
  services: {
    mongodb: ServiceHealth;
    redis: ServiceHealth;
    google_sheets: ServiceHealth;
    scraper: ServiceHealth;
  };
  queue: QueueStats;
  jobs: {
    running: number;
    last_24h_success: number;
    last_24h_failed: number;
  };
  uptime_seconds: number;
}

export interface ServiceHealth {
  status: 'ok' | 'error' | 'down';
  latency_ms?: number;
  last_write?: Date;
}
