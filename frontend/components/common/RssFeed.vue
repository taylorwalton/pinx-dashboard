<template>
    <n-card title="Security News" class="w-full">
      <n-spin v-if="loading" size="large" />
      <div v-else-if="error" class="mt-2">
        <n-alert type="error" title="Error">
          <p>{{ error }}</p>
        </n-alert>
      </div>
      <div v-else class="news-container">
        <div v-for="item in rssItems" :key="item.guid" class="news-item">
          <h3 class="text-lg font-bold">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
          </h3>
          <p class="text-sm text-gray-500 mt-1">{{ formatDate(item.pubDate) }}</p>
          <p class="mt-2">{{ stripHtml(item.description) }}</p>
        </div>
      </div>
    </n-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { NCard, NSpin, NAlert } from 'naive-ui'
  import dayjs from 'dayjs'
  
  interface RSSItem {
    title: string;
    link: string;
    guid: string;
    pubDate: string;
    description: string;
  }
  
  const props = defineProps({
    feedUrl: {
      type: String,
      required: true
    },
    maxItems: {
      type: Number,
      default: 5
    }
  })
  
  const rssItems = ref<RSSItem[]>([])
  const loading = ref(true)
  const error = ref('')
  
  function formatDate(dateStr: string) {
    return dayjs(dateStr).format('MMMM D, YYYY')
  }
  
  function stripHtml(html: string) {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
  
  onMounted(async () => {
    try {
      // Using a CORS proxy to fetch the RSS feed
      const proxyUrl = 'https://api.allorigins.win/raw?url='
      const response = await fetch(proxyUrl + encodeURIComponent(props.feedUrl))
      
      if (!response.ok) {
        throw new Error('Failed to fetch RSS feed')
      }
      
      const xmlText = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
      
      const items = xmlDoc.querySelectorAll('item')
      const parsedItems: RSSItem[] = []
      
      items.forEach((item, index) => {
        if (index < props.maxItems) {
          parsedItems.push({
            title: item.querySelector('title')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            guid: item.querySelector('guid')?.textContent || Math.random().toString(),
            pubDate: item.querySelector('pubDate')?.textContent || '',
            description: item.querySelector('description')?.textContent || ''
          })
        }
      })
      
      rssItems.value = parsedItems
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load RSS feed'
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .news-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .news-item {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .news-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .news-item a {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .news-item a:hover {
    text-decoration: underline;
  }
  </style>