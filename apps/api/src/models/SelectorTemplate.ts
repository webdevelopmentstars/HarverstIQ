import mongoose, { Schema, Document } from 'mongoose';

export interface ISelectorTemplate extends Document {
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

const selectorTemplateSchema = new Schema<ISelectorTemplate>(
  {
    template_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    site_pattern: {
      type: String,
      required: true,
    },
    selectors: {
      title: String,
      content: String,
      author: String,
      date: String,
      image: String,
    },
    wait_for: {
      type: String,
      default: null,
    },
    js_render: {
      type: Boolean,
      default: false,
    },
    extra_headers: {
      type: Map,
      of: String,
      default: {},
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
  },
  { collection: 'selector_templates' }
);

selectorTemplateSchema.index({ created_by: 1 });

export const SelectorTemplate = mongoose.model<ISelectorTemplate>(
  'SelectorTemplate',
  selectorTemplateSchema
);
