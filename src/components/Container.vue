<template lang="html">
  <div>
    <v-container fluid grid-list-sm text-xs-center>
      <v-layout row justify-center v-for='(row, i) in rows' :key="i">
        <v-flex xs1 v-for="(slot, j) in row" :key="slot.oindex">
            <v-card tile hover>
                <v-card-text>
                  <v-badge v-show="producerPos && slot.oindex == producerPos" left>
                    <span slot="badge">P</span>
                  </v-badge>

                  <span>{{ slot.payload }}</span>

                  <v-badge v-show="consumerPos && slot.oindex == consumerPos" right color="red">
                    <span slot="badge">C</span>
                  </v-badge>

                  <span class="slot-number grey--text">{{ slot.oindex }}</span>
                </v-card-text>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'container',
  props: ['buffer', 'consumerPos', 'producerPos'],
  computed: {
    rows() {
      const rows = [];
      const chunkSize = 10;
      const indexedBuffer = this.buffer.map((data, i) => ({...data, oindex: i}));

      for (let i = 0; i < indexedBuffer.length; i += chunkSize) {
          rows.push(indexedBuffer.slice(i, i + chunkSize));
      }

      return rows;
    },
  },
}
</script>

<style lang="scss">
  .slot-number {
    bottom: 0px;
    right: 5px;
    position: absolute;
  }
</style>
