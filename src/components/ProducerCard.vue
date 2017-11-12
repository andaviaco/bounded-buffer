<template lang="html">
  <v-card>
    <v-card-title primary-title>
      <h4>Productor</h4>

      <div>
        <v-chip outline color="primary">
          <v-icon left>info</v-icon> {{ status }}
        </v-chip>
      </div>
    </v-card-title>

    <v-card-text>
      <p v-for="log in logs">{{ log }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'producer-card',
  props: ['status', 'logs'],
}
</script>

<style lang="css">
</style>
