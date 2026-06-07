// MongoDB initialization script
// Creates database, admin user, and required indexes

db = db.getSiblingDB('harvestiq');

// Create admin user if not exists
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'harvestiq',
    },
  ],
});

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'email', 'password_hash', 'role', 'created_at'],
      properties: {
        user_id: { bsonType: 'string' },
        email: { bsonType: 'string' },
        password_hash: { bsonType: 'string' },
        role: { enum: ['admin', 'editor', 'viewer'] },
        dataset_permissions: { bsonType: 'array' },
        created_at: { bsonType: 'date' },
        updated_at: { bsonType: 'date' },
      },
    },
  },
});

db.createCollection('jobs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['job_id', 'name', 'target_url', 'status', 'created_at'],
      properties: {
        job_id: { bsonType: 'string' },
        name: { bsonType: 'string' },
        target_url: { bsonType: 'string' },
        selector_template_id: { bsonType: 'string' },
        schedule: { bsonType: ['string', 'null'] },
        status: { enum: ['pending', 'queued', 'running', 'completed', 'failed', 'stopped', 'archived'] },
        proxy_enabled: { bsonType: 'bool' },
        incremental_method: { enum: ['url_hash', 'content_hash', 'date', 'none'] },
        created_by: { bsonType: 'string' },
        created_at: { bsonType: 'date' },
        updated_at: { bsonType: 'date' },
        last_run: { bsonType: ['date', 'null'] },
        total_runs: { bsonType: 'int' },
        success_runs: { bsonType: 'int' },
        failed_runs: { bsonType: 'int' },
      },
    },
  },
});

db.createCollection('datasets', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['dataset_uuid', 'name', 'job_id', 'version', 'created_at'],
      properties: {
        dataset_uuid: { bsonType: 'string' },
        name: { bsonType: 'string' },
        job_id: { bsonType: 'string' },
        version: { bsonType: 'int' },
        row_count: { bsonType: 'int' },
        sheet_tab: { bsonType: 'string' },
        status: { enum: ['staging', 'approved', 'archived'] },
        created_at: { bsonType: 'date' },
        updated_at: { bsonType: 'date' },
      },
    },
  },
});

db.createCollection('selector_templates');
db.createCollection('hashes');
db.createCollection('audit_logs');
db.createCollection('settings');

// Create indexes for performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ user_id: 1 }, { unique: true });

db.jobs.createIndex({ status: 1 });
db.jobs.createIndex({ created_by: 1 });
db.jobs.createIndex({ job_id: 1 }, { unique: true });

db.datasets.createIndex({ job_id: 1, version: 1 }, { unique: true });
db.datasets.createIndex({ dataset_uuid: 1 }, { unique: true });

db.hashes.createIndex({ hash: 1 }, { unique: true });
db.hashes.createIndex({ job_id: 1 });

db.audit_logs.createIndex({ entity_id: 1 });
db.audit_logs.createIndex({ performed_by: 1 });
db.audit_logs.createIndex({ created_at: 1 });

db.selector_templates.createIndex({ template_id: 1 }, { unique: true });
db.selector_templates.createIndex({ created_by: 1 });

print('HarverstIQ MongoDB initialization complete');
