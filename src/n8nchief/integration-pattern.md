---
title: "Integration Patterns"
tags: ["N8N", "Integration"]
description: "Proven patterns for system integration"
layout: "layouts/n8nchief-detail"
permalink: /n8nchief/integration-patterns/
---

# Integration Patterns

## Overview

System integration is both an art and a science. With experience integrating hundreds of services and APIs, I've developed proven patterns that ensure reliable, maintainable, and scalable integrations.

## Common Integration Challenges

### 1. API Limitations
- Rate limiting and throttling
- Pagination handling
- Data format inconsistencies
- Authentication complexities

### 2. Data Synchronization
- Real-time vs batch processing
- Conflict resolution
- Data consistency guarantees
- Error recovery mechanisms

### 3. System Dependencies
- Service availability
- Network reliability
- Latency considerations
- Failover strategies

## Integration Patterns

### 1. Request-Response Pattern
```javascript
// Synchronous API call
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const result = await response.json();
```

**Use Cases**: 
- REST API integrations
- Database queries
- Real-time data retrieval

**Best Practices**:
- Implement timeout handling
- Add retry logic with exponential backoff
- Validate responses
- Handle edge cases

### 2. Webhook Pattern
```javascript
// Webhook receiver setup
app.post('/webhook', (req, res) => {
  // Verify webhook signature
  if (!verifySignature(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  // Process webhook data
  processWebhookData(req.body);
  
  // Acknowledge receipt
  res.status(200).send('OK');
});
```

**Use Cases**:
- Event-driven integrations
- Real-time notifications
- Third-party system callbacks

**Best Practices**:
- Always verify webhook signatures
- Implement idempotency
- Queue processing for reliability
- Monitor webhook delivery

### 3. Polling Pattern
```javascript
// Polling implementation
async function pollEndpoint(interval, maxAttempts) {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'complete') {
      return data;
    }
    
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error('Polling timeout');
}
```

**Use Cases**:
- Asynchronous job monitoring
- Systems without webhooks
- Legacy system integration

**Best Practices**:
- Use exponential backoff
- Set maximum retry limits
- Implement timeout handling
- Cache results when appropriate

### 4. Message Queue Pattern
```javascript
// Queue producer
await queue.send('processing-queue', {
  jobId: generateId(),
  data: payload,
  timestamp: Date.now()
});

// Queue consumer
queue.consume('processing-queue', async (message) => {
  try {
    await processMessage(message);
    await message.ack();
  } catch (error) {
    await message.nack();
  }
});
```

**Use Cases**:
- High-volume data processing
- Decoupled system architecture
- Load balancing
- Guaranteed delivery

**Best Practices**:
- Implement dead letter queues
- Monitor queue depth
- Handle message ordering
- Scale consumers dynamically

## Data Transformation Patterns

### 1. Mapping Transformation
```javascript
// Field mapping example
const transformData = (input) => ({
  newField1: input.oldField1,
  newField2: input.oldField2.toUpperCase(),
  newField3: new Date(input.oldField3).toISOString(),
  newField4: calculateDerivedValue(input.oldField4)
});
```

### 2. Aggregation Pattern
```javascript
// Data aggregation
const aggregateData = (records) => {
  return records.reduce((acc, record) => {
    const key = record.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(record);
    return acc;
  }, {});
};
```

### 3. Enrichment Pattern
```javascript
// Data enrichment
const enrichData = async (data) => {
  const additionalInfo = await fetchAdditionalData(data.id);
  return {
    ...data,
    ...additionalInfo,
    enrichedAt: new Date().toISOString()
  };
};
```

## Security Considerations

### Authentication Strategies
- OAuth 2.0 with refresh tokens
- API key management
- JWT token handling
- Certificate-based authentication

### Data Protection
- Encryption in transit (TLS)
- Encryption at rest
- Data masking for sensitive fields
- Audit logging for compliance

## Monitoring & Observability

### Key Metrics
- Integration success rates
- Response times
- Error rates by type
- Queue depths
- Resource utilization

### Alerting Strategies
- Threshold-based alerts
- Anomaly detection
- Multi-channel notifications
- Escalation procedures

## Case Study: Multi-Platform CRM Integration

### Challenge
Synchronize customer data across Salesforce, HubSpot, and custom CRM in real-time

### Solution Architecture
```
Webhook (Salesforce) → Validation → Transformation → 
[HubSpot API, Custom CRM API] → Confirmation → Logging
```

### Results
- **Sync Latency**: <5 seconds
- **Data Consistency**: 99.99%
- **Error Rate**: 0.05%
- **Uptime**: 99.95%