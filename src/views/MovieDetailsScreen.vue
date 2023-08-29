<template>
  <div class="details-content">
    <button class="back" @click="goBackHome">Regresar</button>
    <div class="movie" v-for="movie in searchResults" :key="movie.title">
      <h2>{{ movie.title }}</h2>
      <img :src="movie.poster" alt="" />
      <p>Fecha de lanzamiento.</p>
      <p>{{ movie.released }}</p>
      <p>Rotten Tomatoes.</p>
      <p>{{ movie.rating }}</p>
      <p>Resumen.</p>
      <p>{{ movie.plot }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResults: [],
    };
  },

  methods: {
    goBackHome() {
      this.$router.push({ path: "/" });
    },
  },

  created() {
    this.searchResults = JSON.parse(this.$route.query.results || "[]");
  },
};
</script>

<style scoped>
.back {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  margin-left: 10px;
  background-color: rgb(0, 110, 255);
  color: white;
  border-style: none;
  margin-top: 20px;
}

.back:hover {
  opacity: 0.6;
  cursor: pointer;
}

.movie {
  color: rgb(109, 109, 109);
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  gap: 20px 0;
}

.movie h2 {
  font-size: 30px;
  align-self: center;
}

.movie img {
  align-self: center;
  width: 70%;
}

.movie p:nth-child(2n + 1) {
  font-weight: bold;
  font-size: 20px;
}

.movie p:last-child {
  align-content: start;
  text-align: left;
}

@media (min-width: 768px) {
  .details-content {
    width: 40vw;
    margin: 0 auto;
  }

  .movie img {
    width: auto;
  }
}
</style>
