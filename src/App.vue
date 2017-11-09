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
                <div>
                  <v-container fluid grid-list-sm text-xs-center>
                    <v-layout row justify-center>
                      <v-flex xs1 v-for="i in 10" :key="i">
                        <v-card tile hover>
                          <v-card-text>{{ i }}</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>

                    <v-layout row justify-center>
                      <v-flex xs1 v-for="i in 10" :key="i">
                          <v-card tile hover>
                              <v-card-text>
                                <v-badge v-show="i == 3" left>
                                  <span slot="badge">P</span>
                                </v-badge>

                                <span>{{ i }}</span>

                                <v-badge v-show="i == 3" right color="red">
                                  <span slot="badge">C</span>
                                </v-badge>

                              <span class="slot-number grey--text">{{ i }}</span>
                              </v-card-text>
                          </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
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
  export default {
    data () {
      return {
        clipped: false,
        title: 'Practica X: Productor - Consumidor',
      }
    }
  }
</script>

<style lang="scss">
  .slot-number {
    bottom: 0px;
    right: 5px;
    position: absolute;
  }
</style>
