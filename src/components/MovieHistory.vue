<template>
  <div class="history-content">
    <h2 class="title">Historial de búsqueda:</h2>
    <div class="card-history" v-for="movie in searchHistory" :key="movie.title">
      <img class="poster" :src="movie.poster" alt="" />
      <div class="info">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.released }}</p>
        <p>Roten Tomatoes: {{ movie.rating }}</p>
        <button @click="goMovie(movie.title)">Más detalles</button>
      </div>
    </div>
    <button class="clear" @click="clearHistoryAndCache">
      Borrar historial y caché
    </button>
  </div>
</template>

<script>
export default {
  props: ["searchHistory"],
  methods: {
    clearHistoryAndCache() {
      localStorage.clear();
      this.$emit("clear-history-and-cache");
    },

    goMovie(movieTitle) {
      const selectedMovie = this.searchHistory.find(
        (movie) => movie.title === movieTitle
      );
      if (selectedMovie) {
        this.$router.push({
          path: "/MovieDetailsScreen",
          query: { results: JSON.stringify([selectedMovie]) },
        });
      }
    },
  },
};
</script>

<style scoped>
.history-content {
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}

.card-history {
  padding: 20px;
  border: 1px solid gray;
  display: flex;
}

.info {
  flex-grow: 1;
  align-self: center;
}

.info p {
  margin: 10px 0;
}
.card-history button {
  width: 50%;
  align-self: flex-end;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background-color: rgb(0, 110, 255);
  color: white;
  border-style: none;
}

.card-history button:hover {
  opacity: 0.6;
  cursor: pointer;
}
.title {
  font-size: 26px;
  color: rgb(109, 109, 109);
}

.poster {
  width: 25%;
  flex-grow: 1;
}

.clear {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  margin-left: 10px;
  background-color: white;
  background-color: rgb(255, 20, 20);
  color: white;
  border-style: none;
}

.clear:hover {
  opacity: 0.6;
  cursor: pointer;
}
</style>
