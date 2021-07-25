<template>
  <div class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        403
      </div>

      <div class="text-h2" style="opacity:.4">
        Acceso denegado
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="dark"
        unelevated
        to="/"
        label="Volver al inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error403'
}
</script>
