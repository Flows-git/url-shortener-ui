<template>
  <v-app>
    <v-app-bar app flat>
      <v-container>

      <v-avatar
          class="mr-4"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn to="/">URL Shortener</v-btn>
        <v-btn to="/find">Find URLs</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
    <NuxtPage />
    </v-main>
  </v-app>
</template>
