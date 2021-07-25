<template>
  <q-dialog v-model="confirm" persistent>
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
        La busqueda que has realizado no se han encontrado resultados!
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          exact
          to="/"
          flat
          label="Volver al inicio"
          no-caps
          color="primary"
          @click="fetchJuegos()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      confirm: true,
    };
  },
  methods: {
    ...mapActions({
      _fetchJuegos: "juegos/fetchJuegos",
    }),
    fetchJuegos() {
      this.search = "";
      this._fetchJuegos();
    },
  },
};
</script>
