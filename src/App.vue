<template>
  <div id="q-app">
    <q-dialog v-model="alert" persistent>
        <q-card>
          <q-toolbar>
            <q-avatar>
              <img
                style="width: 38px; height: 38px"
                :src="'/icons/favicon-38x38.png'"
              />
            </q-avatar>

            <q-toolbar-title
              ><span class="text-weight-bold">IMPORTANTE !!!</span></q-toolbar-title
            >
          </q-toolbar>

          <q-card-section>
            Nueva versión disponible ahora con VUE 3
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" no-caps color="primary" v-close-popup />
            <q-btn flat label="Ir a la nueva versión" type="a" href="https://vue-api-client.vercel.app" no-caps color="orange-9" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      alert: true,
    };
  },
  created() {
    this.$q.dark.set(true);
  },
};
</script>
