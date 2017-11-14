<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <main
      tabindex="-1"
      @keyup.esc="handlePauseKey"
    >
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
              <producer-card
                :status="producer.status"
                :logs="producerLogs"
              ></producer-card>
            </v-flex>

            <v-flex xs6>
              <consumer-card
                :status="consumer.status"
                :logs="consumerLogs"
              ></consumer-card>
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
  import ConsumerCard from './components/ConsumerCard';

  import Buffer from './models/Buffer';
  import Producer from './models/Producer';
  import Consumer from './models/Consumer';

  import {
    setRandomTimeout,
    getRandomIntInclusive,
    formateLogMessage,
  } from './util';
  import { BUFFER_SIZE, BUFFER_AGENTS_COLORS } from './const';


  const buffer = new Buffer(BUFFER_SIZE);
  const producer = new Producer(buffer);
  const consumer = new Consumer(buffer);

  export default {
    data () {
      return {
        title: 'Practica X: Productor - Consumidor',
        buffer: buffer,
        producer: producer,
        consumer: consumer,
        producerPos: buffer.producerIndex,
        producerLogs: [],
        consumerLogs: [],
        producerTimeout: null,
        consumerTimeout: null,
      };
    },
    computed: {
      agentColor() {
        return BUFFER_AGENTS_COLORS[this.buffer.currentAgent];
      }
    },
    methods: {
      handleStartClick() {
        clearTimeout(this.producerTimeout);
        clearTimeout(this.consumerTimeout);

        this.producerTimeout = setRandomTimeout(this.wakeProducerUp);
        this.consumerTimeout = setRandomTimeout(this.wakeConsumerUp);

        this.registerLogs();
      },
      async wakeProducerUp() {
        await producer.randProduct();
        this.producerTimeout = setRandomTimeout(this.wakeProducerUp);
      },
      async wakeConsumerUp() {
        await consumer.randConsume(this.consumerTimeout);
        this.consumerTimeout = setRandomTimeout(this.wakeConsumerUp);
      },

      registerLogs() {
        this.producer.on('work', () => this.producerLogs.push(formateLogMessage('Trabajando')))
        this.producer.on('sleep', () => this.producerLogs.push(formateLogMessage('Durmiendo')))
        this.producer.on('wakeUp', () => this.producerLogs.push(formateLogMessage('Despertando')))

        this.consumer.on('work', () => this.consumerLogs.push(formateLogMessage('Trabajando')))
        this.consumer.on('sleep', () => this.consumerLogs.push(formateLogMessage('Durmiendo')))
        this.consumer.on('wakeUp', () => this.consumerLogs.push(formateLogMessage('Despertando')))
      },
      unregisterLogs() {
        this.producer.removeAllListeners();
        this.consumer.removeAllListeners();
      },
      handlePauseKey() {
        console.log('PAUSE');
        clearTimeout(this.producerTimeout);
        clearTimeout(this.consumerTimeout);

        this.buffer.stop();
        this.producerLogs.push('PAUSA');
        this.consumerLogs.push('PAUSA');

        this.unregisterLogs();
      },
    },
    components: {
      Container,
      ProducerCard,
      ConsumerCard,
    },
  }
</script>

<style lang="scss">
</style>
