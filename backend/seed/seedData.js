import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Report from '../models/Report.js';
import Activity from '../models/Activity.js';
import connectDB from '../config/db.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    console.log('[Seed] Purging existing database collections...');
    await User.deleteMany();
    await Report.deleteMany();
    await Activity.deleteMany();

    console.log('[Seed] Inserting users...');
    const adminUser = await User.create({
      name: 'Alexander Vance',
      email: 'admin@pulse.io',
      password: 'pulse123',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });

    const analystUser = await User.create({
      name: 'Sarah Connor',
      email: 'sarah.analyst@pulse.io',
      password: 'pulse123',
      role: 'Analyst',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    });

    console.log('[Seed] Inserting rich reports...');
    const reports = [
      {
        title: 'Q3 Enterprise Revenue & Churn Decomposition',
        category: 'Financial',
        status: 'Completed',
        summary: 'In-depth fiscal review revealing a 34% expansion in ARR across Tier-1 enterprise accounts with net churn suppressed to 0.8%.',
        metrics: {
          arr: '$4,820,000',
          growthRate: '+34.2%',
          churn: '0.8%',
          ltvCac: '5.2x'
        },
        tags: ['Revenue', 'Q3', 'SaaS', 'EBITDA'],
        generatedBy: adminUser._id,
        authorName: adminUser.name,
        downloads: 87
      },
      {
        title: 'Cloud Infrastructure Throughput & Latency Audit',
        category: 'System',
        status: 'Completed',
        summary: 'Multi-region Kubernetes cluster benchmark highlighting sub-45ms p99 response times and zero unplanned downtime.',
        metrics: {
          uptime: '99.98%',
          p99Latency: '42ms',
          requestsServed: '184.2M',
          costPerMillion: '$0.14'
        },
        tags: ['DevOps', 'Kubernetes', 'P99', 'AWS'],
        generatedBy: analystUser._id,
        authorName: analystUser.name,
        downloads: 42
      },
      {
        title: 'Global Omnichannel Acquisition & CAC Analysis',
        category: 'Marketing',
        status: 'Completed',
        summary: 'Evaluation of paid search, inbound organic, and developer referral channels yielding a 28% decrease in blended CAC.',
        metrics: {
          blendedCAC: '$148',
          organicShare: '62%',
          conversions: '14,920',
          roas: '4.6x'
        },
        tags: ['Growth', 'Marketing', 'CAC', 'Conversions'],
        generatedBy: analystUser._id,
        authorName: analystUser.name,
        downloads: 35
      },
      {
        title: 'Core Logistics & Fulfillment Cycle Efficiency',
        category: 'Operational',
        status: 'Completed',
        summary: 'Streamlining cross-dock processing reduced median lead time from 18.4 hours to 9.2 hours across all North American hubs.',
        metrics: {
          medianLeadTime: '9.2 hrs',
          accuracyRate: '99.94%',
          throughputGain: '+48%',
          dispatchVolume: '94,200'
        },
        tags: ['SupplyChain', 'Logistics', 'Operations'],
        generatedBy: adminUser._id,
        authorName: adminUser.name,
        downloads: 29
      },
      {
        title: 'API Gateway Rate-Limit & Bot Anomaly Filter',
        category: 'System',
        status: 'Processing',
        summary: 'Continuous behavioral analysis evaluating edge rate limiting algorithms against distributed automated scrapers.',
        metrics: {
          blockedMalicious: '1.2M',
          falsePositiveRate: '0.001%',
          filterLatency: '1.8ms'
        },
        tags: ['Security', 'DDoS', 'WAF'],
        generatedBy: analystUser._id,
        authorName: analystUser.name,
        downloads: 12
      },
      {
        title: '2027 Strategic R&D Capital Allocation Proposal',
        category: 'Financial',
        status: 'Draft',
        summary: 'Projections on quantum encryption migration and automated synthetic data pipelines scheduled for next budget cycle.',
        metrics: {
          proposedCapex: '$1,200,000',
          expectedROI: '3.4x',
          paybackPeriod: '14 Months'
        },
        tags: ['Strategic', 'Budget', 'CapitalAllocation'],
        generatedBy: adminUser._id,
        authorName: adminUser.name,
        downloads: 4
      }
    ];

    await Report.insertMany(reports);

    console.log('[Seed] Inserting activities...');
    const activities = [
      {
        user: adminUser._id,
        userName: adminUser.name,
        action: 'Exported Financial Audit',
        details: 'Downloaded Q3 Enterprise Revenue decomposition in CSV format',
        type: 'info'
      },
      {
        user: analystUser._id,
        userName: analystUser.name,
        action: 'Completed System Benchmark',
        details: 'Latency and throughput validation published to executive dashboard',
        type: 'success'
      },
      {
        user: analystUser._id,
        userName: analystUser.name,
        action: 'Triggered Anomaly Scanner',
        details: 'Heuristic packet filtering initiated on edge node us-east-1',
        type: 'warning'
      },
      {
        user: adminUser._id,
        userName: adminUser.name,
        action: 'Updated User Roles',
        details: 'Elevated Sarah Connor to Senior Analytics Lead',
        type: 'info'
      }
    ];

    await Activity.insertMany(activities);

    console.log('[Seed] Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seed();
