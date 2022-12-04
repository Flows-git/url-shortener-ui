<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-text-field v-model="username" label="Add Username to find your short URLs" hide-details />
      </v-card-text>
      <v-card-actions class="justify-end" @click="findShortUrls">
        <v-btn>Search URLs</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>
        Short URLs Result
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="url of shortUrls">
            <v-list-item>
              <v-list-item-title>
                <a :href="`http://192.168.2.33:8080/${url.id}`" target="_blank">http://192.168.2.33:8080/{{ url.id }}</a>
              </v-list-item-title>
              <v-list-item-subtitle>{{ url.url }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn color="grey-lighten-1" icon="mdi-chart-line" variant="text" @click="getUrlStatistic(url)"></v-btn>
                <v-btn color="grey-lighten-1" icon="mdi-trash-can" variant="text" @click="deleteShortUrl(url)"></v-btn>
              </template>
            </v-list-item>
            <v-divider />
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>

  <v-dialog v-model="showStatisticDialog" scrollable width="800">
    <v-card>
      <v-card-title>
        <div class="d-flex align-center justify-space-between">
          <span>Statistic</span>
          <v-btn color="grey-lighten-1" icon="mdi-close" variant="text" @click="showStatisticDialog = false"></v-btn>
        </div>
        <div class="text-h5"><b>Total Calls:</b> {{ statistic?.totalCalls }}</div>
        <div class="text-h5"><b>Last Calls:</b> {{ statistic?.lastCall }}</div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="data of statistic?.data">
            <v-list-item>
              <div><b>Date:</b> {{ data.createdAt }}</div>
              <div><b>user-agent:</b> {{ data.userAgent }}</div>
              <div><b>Referrer:</b> {{ data.referrer || '-' }}</div>
            </v-list-item>
            <v-divider />
          </template>
        </v-list>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { URL } from '~~/interfaces/URL';

const username = ref();

const shortUrls = ref<URL[]>([]);

const statistic = ref();
const showStatisticDialog = computed({
  get: () => !!statistic.value,
  set: (v) => {
    if (!v) {
      statistic.value = undefined
    }
  }
})

async function findShortUrls() {
  const { error, data } = await useLazyFetch<any[]>(() => `/api/find-user-urls`, { method: 'POST', body: { user: username.value }, })
  if (error.value) {
    console.error('FAIL!', error.value)
  } else {
    shortUrls.value = data.value || []
  }
}

async function deleteShortUrl(url: URL) {
  const { error, data } = await useLazyFetch<any[]>(() => `/api/delete-url`, { method: 'POST', body: { ...url }, })
  if (error.value) {
    console.error('FAIL!', error.value)
  } else {
    findShortUrls()
  }
}

async function getUrlStatistic(url: URL) {
  const { error, data } = await useLazyFetch<any[]>(() => `/api/get-url-statistic`, { method: 'POST', body: { ...url }, })
  statistic.value = data.value as any
}
</script>

