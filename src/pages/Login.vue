<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <layout></layout>
      <login></login>
    </q-layout>
  </div>
</template>

<script>
import Layout from "src/layouts/Layout.vue";
import Login from "src/components/auth/Login.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Layout,
    Login,
  },
};
</script>
