<template>
  <div class="home">
    <MovieDetailsApp />
  </div>
</template>

<script>
// @ is an alias to /src
import MovieDetailsApp from "@/components/MovieDetailsApp.vue";

export default {
  name: "HomeScreen",
  components: {
    MovieDetailsApp,
  },
};
</script>
