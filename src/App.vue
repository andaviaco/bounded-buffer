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
                  <v-chip outline color="secondary">Disponible</v-chip>
                </v-card-title>

                <container :buffer="buffer" consumerPos="3" producerPos="4"></container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs6>
              <v-card>
                <v-card-title primary-title>
                  <h4>Productor</h4>

                  <div>
                    <v-chip outline color="primary">
                      <v-icon left>fa-fee</v-icon> Dormido
                    </v-chip>
                  </div>
                </v-card-title>

                <v-card-text>
                  <p>[00:00:00] durmiendo</p>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs6>
              <v-card>
                  <v-card-title primary-title>
                    <h4>Consumidor</h4>
                    <v-chip outline color="red">
                      <v-icon left>fa-fee</v-icon> Trabajando
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

  import Buffer from './models/Buffer';
  import Producer from './models/Producer';

  import { BUFFER_SIZE } from './const';


  const buffer = new Buffer(BUFFER_SIZE);
  const producer = new Producer();

  export default {
    data () {
      return {
        title: 'Practica X: Productor - Consumidor',
        buffer: buffer.data,
      }
    },
    components: {
      Container,
    },
  }
</script>

<style lang="scss">
</style>
