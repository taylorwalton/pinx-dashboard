<template>
    <div class="activity-timeline">
      <div v-if="!activities.length" class="empty-state">
        <n-empty description="No activity yet." />
      </div>
      <div v-else class="timeline-container">
        <div v-for="(activity, index) in activities" :key="index" class="timeline-item">
          <div class="timeline-icon" :class="getIconClass(activity.type)">
            <Icon :name="getIconName(activity.type)" />
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-title">{{ activity.title }}</span>
              <span class="timeline-date">{{ formatDate(activity.timestamp) }}</span>
            </div>
            <div class="timeline-description">{{ activity.description }}</div>
            <div v-if="activity.metadata" class="timeline-metadata">
              <div v-for="(value, key) in activity.metadata" :key="key" class="metadata-item">
                <span class="metadata-key">{{ formatKey(key) }}:</span>
                <span class="metadata-value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import Icon from "@/components/common/Icon.vue";
  import { NEmpty } from "naive-ui";
  import dayjs from "@/utils/dayjs";
  
  export interface ActivityMetadata {
    [key: string]: string;
  }
  
  export interface Activity {
    id: number;
    type: 'login' | 'update' | 'security' | 'system';
    title: string;
    description: string;
    timestamp: string;
    metadata?: ActivityMetadata;
  }
  
  const props = defineProps<{
    activities: Activity[];
  }>();
  
  const getIconName = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return 'carbon:login';
      case 'update':
        return 'carbon:edit';
      case 'security':
        return 'carbon:security';
      case 'system':
        return 'carbon:notification';
      default:
        return 'carbon:activity';
    }
  };
  
  const getIconClass = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return 'icon-login';
      case 'update':
        return 'icon-update';
      case 'security':
        return 'icon-security';
      case 'system':
        return 'icon-system';
      default:
        return '';
    }
  };
  
  const formatDate = (timestamp: string) => {
    return dayjs(timestamp).format('MMM DD, YYYY [at] HH:mm');
  };
  
  const formatKey = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };
  </script>
  
  <style lang="scss" scoped>
  .activity-timeline {
    padding: 1rem 0;
  
    .timeline-container {
      position: relative;
  
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 14px;
        width: 2px;
        background-color: var(--border-color);
      }
    }
  
    .timeline-item {
      position: relative;
      display: flex;
      margin-bottom: 1.5rem;
      padding-left: 40px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  
    .timeline-icon {
      position: absolute;
      left: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--card-color);
      border-radius: 50%;
      border: 2px solid var(--border-color);
      z-index: 2;
  
      &.icon-login {
        color: #3498db;
        border-color: #3498db;
      }
  
      &.icon-update {
        color: #2ecc71;
        border-color: #2ecc71;
      }
  
      &.icon-security {
        color: #e74c3c;
        border-color: #e74c3c;
      }
  
      &.icon-system {
        color: #f39c12;
        border-color: #f39c12;
      }
    }
  
    .timeline-content {
      flex: 1;
      background-color: var(--color-hover);
      border-radius: 8px;
      padding: 1rem;
    }
  
    .timeline-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      align-items: center;
    }
  
    .timeline-title {
      font-weight: bold;
      font-size: 1rem;
    }
  
    .timeline-date {
      font-size: 0.85rem;
      color: var(--text-color-secondary);
    }
  
    .timeline-description {
      margin-bottom: 0.75rem;
    }
  
    .timeline-metadata {
      border-top: 1px solid var(--border-color);
      padding-top: 0.75rem;
      margin-top: 0.5rem;
  
      .metadata-item {
        display: flex;
        margin-bottom: 0.25rem;
  
        .metadata-key {
          width: 100px;
          font-weight: 500;
          color: var(--text-color-secondary);
        }
  
        .metadata-value {
          flex: 1;
        }
      }
    }
  }
  </style>