<template>
  <div class="home-content">
    <h2 class="title">App detalles de películas</h2>
    <p class="input-instructions">
      Por favor ingresa el título completo de la película.
    </p>
    <input class="input" v-model="searchQuery" placeholder="Buscar..." />
    <button type="submit" class="submit" @click="handleSearch">Buscar</button>

    <DialogSearchNotFound
      :visible="showDialog"
      :message="dialogMessage"
      @close="closeDialog"
    />
    <section>
      <MovieHistory
        :searchHistory="searchHistory"
        @clear-history-and-cache="clearHistoryAndCache"
      />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import MovieHistory from "./MovieHistory.vue";
import DialogSearchNotFound from "./DialogSearchNotFound.vue";

export default {
  name: "MovieDetailsApp",

  components: {
    MovieHistory,
    DialogSearchNotFound,
  },

  data() {
    return {
      searchQuery: "",
      searchResults: [],
      searchHistory: JSON.parse(localStorage.getItem("searchHistory") || "[]"),
      showDialog: false,
      dialogMessage: "",
    };
  },

  methods: {
    async handleSearch() {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?t=${this.searchQuery}&apikey=5249c43b`
        );

        const data = response.data;

        if (data.Title) {
          const movieInfo = {
            title: data.Title,
            poster: data.Poster,
            released: data.Released,
            rating: data.Ratings[1].Value,
            plot: data.Plot,
          };

          this.searchResults = [movieInfo];

          const existingMovie = this.searchHistory.find(
            (movie) => movie.title === movieInfo.title
          );

          if (!existingMovie) {
            this.searchHistory.unshift(movieInfo);
            localStorage.setItem(
              "searchHistory",
              JSON.stringify(this.searchHistory)
            );
          }

          this.$router.push({
            path: "/MovieDetailsScreen",
            query: { results: JSON.stringify(this.searchResults) },
          });
        } else {
          this.searchResults = [];
          this.showDialog = true;
          this.searchQuery = "";
          this.dialogMessage = `No se encontró ninguna película con el nombre "${this.searchQuery}" intenta con otro nombre.`;
        }
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      }
    },

    clearHistoryAndCache() {
      this.searchHistory = [];
      localStorage.clear();
    },

    closeDialog() {
      this.showDialog = false;
      this.dialogMessage = "";
    },
  },

  created() {
    this.searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
  },
};
</script>

<style scoped>
.home-content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  padding: 20px;
}
.title {
  font-size: 36px;
  color: rgb(109, 109, 109);
}
.input-instructions {
  color: rgb(109, 109, 109);
  font-size: 20px;
}

.input,
.submit {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border-block: 1px solid gray;
  color: rgb(109, 109, 109);
}

.submit {
  margin-left: 10px;
  background-color: rgb(0, 110, 255);
  color: white;
  border-style: none;
}

.submit:hover {
  opacity: 0.6;
  cursor: pointer;
}

@media (min-width: 768px) {
  .home-content {
    width: 40vw;
    margin: 0 auto;
  }
}
</style>
