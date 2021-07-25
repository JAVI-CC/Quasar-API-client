<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <layout></layout>
        <form-add></form-add>
    </q-layout>
  </div>
</template>

<script>
import Layout from "src/layouts/Layout.vue";
import FormAdd from 'src/components/juegos/FormAdd.vue';

export default {
  components: {
    Layout,
    FormAdd,
  },
  data() {
    return {};
  },
  mounted() {
    if(this.$store.state.juegos.login === false ) {
      this.$router.push({ path: "/error/forbidden" })
    }
  },
  methods: {
  },
  computed: {
  },
};
</script>
