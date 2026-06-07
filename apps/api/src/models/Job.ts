import mongoose, { Schema, Document } from 'mongoose';
import { JobStatus, Incremental } from '../../../shared/types';

export interface IJob extends Document {
  job_id: string;
  name: string;
  target_url: string;
  selector_template_id?: string;
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

const jobSchema = new Schema<IJob>(
  {
    job_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    target_url: {
      type: String,
      required: true,
      match: /^https?:\/\/.+/,
    },
    selector_template_id: {
      type: String,
      ref: 'SelectorTemplate',
    },
    schedule: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.PENDING,
      index: true,
    },
    proxy_enabled: {
      type: Boolean,
      default: false,
    },
    incremental_method: {
      type: String,
      enum: Object.values(Incremental),
      default: Incremental.NONE,
    },
    created_by: {
      type: String,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    last_run: {
      type: Date,
      default: null,
    },
    last_run_duration_ms: {
      type: Number,
      default: null,
    },
    total_runs: {
      type: Number,
      default: 0,
    },
    success_runs: {
      type: Number,
      default: 0,
    },
    failed_runs: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'jobs' }
);

jobSchema.index({ status: 1, created_by: 1 });

export const Job = mongoose.model<IJob>('Job', jobSchema);
