<template>
  <div>
    <div
      class="q-pa-md q-px-xl q-pt-xl q-mt-xl q-pb-xl q-mx-md"
      v-if="skeleton"
    >
      <q-card>
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton height="365px" square />

        <q-card-actions align="right" class="q-gutter-md">
          <q-skeleton type="QBtn" />
          <q-skeleton type="QBtn" />
        </q-card-actions>
      </q-card>
    </div>
    <div v-else>
      <div
        v-if="juegos.slug"
        class="
          q-pa-md q-px-xl q-pt-xl q-mt-xl q-pb-xl q-mx-md
          row
          items-start
          div-juego
          q-gutter-md
        "
      >
        <q-img
          class="div-juego-mobile"
          v-bind:src="`${juegos.imagen}`"
          width="308px"
          height="420px"
        />
        <q-card class="my-card my-card-juego-width">
          <q-card-section horizontal>
            <q-img
              class="col-5 div-juego-desktop"
              v-bind:src="`${juegos.imagen}`"
              width="300px"
              height="400px"
            />

            <q-card-section>
              <div class="text-h4 q-mb-md text-nombre-juego">
                {{ juegos.nombre }}
              </div>
              <q-btn
                class="q-btn-desarrolladora text-subtitle1"
                flat
                no-caps
                color="white"
                :label="`${juegos.desarrolladora.nombre}`"
                :to="{
                  name: 'juegos-desarrolladora',
                  params: { desarrolladora: juegos.desarrolladora.slug },
                }"
              />
              <div class="text-body2">{{ juegos.descripcion }}</div>
              <div class="q-mt-sm q-mb-xs">
                <q-btn
                  class="q-mt-sm q-mr-sm q-mb-sm"
                  v-for="genero in juegos.generos"
                  :key="`${genero.slug}`"
                  rounded
                  color="primary"
                  :size="`sm`"
                  :label="`${genero.nombre}`"
                  :to="{
                    name: 'juegos-genero',
                    params: { genero: genero.slug },
                  }"
                />
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions align="left" class="float-left">
            <q-icon
              class="float-left q-ml-md q-mt-sm q-mb-sm"
              name="event"
              style="font-size: 25px"
            />
            <div class="text-subtitle2 float-left q-ml-md">
              {{ juegos.fecha }}
            </div>
          </q-card-actions>
          <q-card-actions align="right" class="float-right">
            <q-btn
              v-if="this.$store.state.juegos.login"
              unelevated
              padding="xs"
              color="yellow-9"
              icon="edit"
              class="q-mr-sm q-mt-xs"
              style="font-size: 9.35px; margin-top: 8px"
              @click="fetchEditJuego(juegos.slug)"
            />
            <q-btn
              v-if="this.$store.state.juegos.login"
              unelevated
              padding="xs"
              color="red-9"
              icon="delete"
              class="q-mr-xs q-mt-xs"
              style="font-size: 9.35px; margin-top: 8px; margin-left: 0px"
              @click="deleteJuego = true"
            />
            <q-icon
              name="share"
              size="sm"
              color="positive"
              class="cursor-pointer q-pr-md q-pl-md q-mt-xs q-pt-xs"
              @click="shareViaWebShare"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div v-else>
        <juego-not-found></juego-not-found>
      </div>
    </div>
    <q-dialog v-model="deleteJuego" persistent>
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img
              style="width: 38px; height: 38px"
              :src="'/icons/favicon-38x38.png'"
            />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">JAVI-CC</span> JUEGOS
            API</q-toolbar-title
          >
        </q-toolbar>

        <q-card-section>
          ¿ Estás seguro de eliminar el juego <b>{{ juegos.nombre }}</b> ?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Sí"
            @click="fetchDeleteJuego(juegos.slug)"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import JuegoNotFound from "./JuegoNotFound.vue";

export default {
  components: {
    JuegoNotFound,
  },
  data() {
    return {
      confirm: true,
      skeleton: true,
      imagen : '',
      deleteJuego: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.skeleton = false;
    }, 1500);
    //this.juegos.imagen = this.juegos.imagen+'?t='+new Date().getTime()
  },
  props: {
    juegos: {
      //type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      _deleteJuego: "juegos/deleteJuego",
      _getJuego: "juegos/getJuego",
    }),
    shareViaWebShare() {
      navigator.share({
        title: this.juegos.nombre,
        text: this.juegos.descripcion,
        url: this.juegos.slug,
      });
    },
    fetchEditJuego(slug) {
      this._getJuego(slug).then(() => {
        this.$router.push({ name: "update", params: { slug: slug } });
      });
    },
    fetchDeleteJuego(slug) {
      this._deleteJuego(slug).then(() => {
        if (
          this.$store.state.juegos.delete === false &&
          this.$store.state.juegos.errorDelete === true
        ) {
          this.$q.notify({
            type: "negative",
            position: "top",
            icon: "warning",
            message: `No se ha podido eliminar el juego. Por favor intentelo más tarde`,
          });
        } else if (this.$store.state.juegos.delete === true) {
          this.$q.notify({
            type: "positive",
            position: "top",
            icon: "check_circle",
            message: `El juego ${this.juegos.nombre} se ha eliminado correctamente!`,
          });
        }
        this.$router.push({ name: "juegos" });
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.my-card-juego-width
  width: 98%
.div-juego
  margin-left: 0px
.div-juego-mobile
  display: none
.q-btn-desarrolladora
  &::v-deep
    .q-btn__wrapper
      padding: 0px
@media (max-width: 900px)
  .my-card-juego-width
    width: 100%
  .div-juego-desktop
    display: none
  .div-juego-mobile
    display: block
    margin: 0 auto
  .div-juego
    padding-left: 0px
    padding-right: 0px
    margin-left: 16px
    padding-top: 48px
  .my-card
    margin-left: 10px
    margin-right: 10px
    margin-bottom: 40px
  .text-nombre-juego
    font-size: 23px
    margin-bottom: 8px
</style>
