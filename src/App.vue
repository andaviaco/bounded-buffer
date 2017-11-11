<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <main>
      <v-content>
        <v-container fluid>
          <v-layout column align-center>
            <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
          </v-layout>
        </v-container>

        <v-container fluid>
          <v-layout>
            <v-flex xs12>
              <v-card>
                <v-card-title primary-title>
                  <h3>Contenedor</h3>
                  <v-chip outline :color="agentColor">
                    <v-icon left>info</v-icon> {{buffer.currentAgent || 'disponible'}}
                    </v-chip>
                </v-card-title>

                <v-card-text>
                  <v-btn
                    absolute
                    dark
                    fab
                    top
                    right
                    color="blue"
                    @click="handleStartClick"
                    >
                    <v-icon>play_arrow</v-icon>
                  </v-btn>
                  <container
                    :buffer="buffer.data"
                    :consumerPos="buffer.consumerIndex"
                    :producerPos="buffer.producerIndex"
                  ></container>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs6>
              <producer-card></producer-card>
            </v-flex>

            <v-flex xs6>
              <v-card>
                  <v-card-title primary-title>
                    <h4>Consumidor</h4>
                    <v-chip outline color="red">
                      <v-icon left>info</v-icon> Trabajando
                    </v-chip>
                  </v-card-title>

                  <v-card-text>
                    <p>[00:00:00] durmiendo</p>
                  </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

      </v-content>
    </main>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Container from './components/Container';
  import ProducerCard from './components/ProducerCard';

  import Buffer from './models/Buffer';
  import Producer from './models/Producer';
  import Consumer from './models/Consumer';

  import { setRandomTimeout, getRandomIntInclusive } from './util';
  import { BUFFER_SIZE, BUFFER_AGENTS_COLORS } from './const';


  const buffer = new Buffer(BUFFER_SIZE);
  const producer = new Producer(buffer);
  const consumer = new Consumer(buffer);

  export default {
    data () {
      return {
        title: 'Practica X: Productor - Consumidor',
        buffer: buffer,
        producerPos: buffer.producerIndex,
      };
    },
    computed: {
      agentColor() {
        return BUFFER_AGENTS_COLORS[this.buffer.currentAgent];
      }
    },
    methods: {
      handleStartClick() {
        this.producerTimeout = setRandomTimeout(this.wakeProducerUp);
        this.consumerTimeout = setRandomTimeout(this.wakeConsumerUp);
      },
      async wakeProducerUp() {
        await producer.randProduct();
        this.producerTimeout = setRandomTimeout(this.wakeProducerUp);
      },
      async wakeConsumerUp() {
        await consumer.randConsume(this.consumerTimeout);
        this.consumerTimeout = setRandomTimeout(this.wakeConsumerUp);
      },
    },
    components: {
      Container,
      ProducerCard,
    },
  }
</script>

<style lang="scss">
</style>
