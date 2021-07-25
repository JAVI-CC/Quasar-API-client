<template>
  <div class="q-pb-xl">
    <q-card class="my-card my-card-add" style="margin: 0 auto" flat bordered>
        <q-img
          width="300px"
          height="400px"
          class="border-bottom"
          :src="imagen == '' ? `${imagenDefault}?t=${new Date().getTime()}` : `${imagen}`"
        />

        <q-card-section>
          <div class="row div-titulo-juego">
            <div class="col-11 q-mt-sm q-mb-xs q-pr-xs">
              <q-btn
                align="left"
                class="text-h6 q-btn-juego"
                flat
                no-caps
                :label=" nombre === '' || nombre === null ? '{ Nombre }' : `${nombre}` "
              />
            </div>
             <div class="col-1">
              <q-icon
                name="share"
                size="sm"
                color="positive"
                class="q-pr-md q-pr-mobile-none"
              />
            </div>
          </div>
          <q-btn
            class="q-btn-desarrolladora text-overline"
            flat
            no-caps
            color="white"
            :label=" desarrolladora === '' || desarrolladora === null ? '{ Desarrolladora }' : `${desarrolladora}` "
          />
          <div class="text-caption text-grey">
                 {{ descripcion === '' || descripcion === null ? '{ Descripción }' : `${descripcion}` | truncate(115) }}
          </div>

          <div class="q-mt-sm q-mb-xs">
            <q-btn
              class="q-mt-sm q-mr-sm q-mb-sm"
              v-if="generos.length"
              v-for="genero in generos"
              :key="genero"
              rounded
              color="primary"
              :size="`sm`"
              :label="`${genero}`"
            />
            
            <q-btn
              v-if="generos == null || generos.length <= 0"
              class="q-mt-sm q-mr-sm q-mb-sm"
              rounded
              color="primary"
              :size="`sm`"
              label="{ Generos }"
            />
          </div>
        </q-card-section>
        <div class="absolute-bottom border-top">
          <q-icon
            class="float-left q-ml-md q-mt-sm q-mb-sm"
            name="event"
            style="font-size: 21px"
          />
          <div class="float-left text-subtitle2 q-ml-md q-mt-sm row flex-start">
            {{ fecha === '' || fecha === null ? '{ Fecha }' : `${fecha}` }}
          </div>
        </div>
      </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props:{
      nombre: "",
      desarrolladora: "",
      descripcion: "",
      fecha: "",
      generos: [],
      imagen: "",
      imagenDefault: "",
  },
    filters: {
    truncate: function (data, num) {
      const reqdString = data.split("").slice(0, num).join("");
      return reqdString + "...";
    },
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
@import './src/assets/styles.sass'
</style>