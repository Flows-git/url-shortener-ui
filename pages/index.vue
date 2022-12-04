<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <div class="text-h4 text-center pb-4">URL Shortener Service</div>
            <v-text-field v-model="newUrl.url" label="paste your URL here" placeholder="https://..."></v-text-field>
            <v-text-field v-model="newUrl.user" label="Username (to manage your short URLs)" />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="generateShortUrl" :disabled="(!newUrl.url?.length || !newUrl.user?.length)">Generate Short URL</v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-if="shortUrl" class="mt-4">
          <v-card-title>Your Short URL:</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <a :href="`http://192.168.2.33:8080/${shortUrl.id}`" target="_blank">http://192.168.2.33:8080/{{ shortUrl.id }}</a>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ shortUrl.url }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { URL } from '../interfaces/URL'

const newUrl = ref<Partial<URL>>({
  user: '',
  url: '',
})

const shortUrl = ref<URL | null>();

async function generateShortUrl() {
  const { error, data } = await useLazyFetch<URL>(() => `/api/generate-url`, {
    method: 'POST',
    body: { ...newUrl.value },
    keepalive: false
  })
  if (error.value) {
    console.error('FAIL!')
  } else {
    shortUrl.value = data.value
    newUrl.value.url = ''
  }
}
</script>