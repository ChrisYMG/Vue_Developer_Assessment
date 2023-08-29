<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog-content">
      <p>{{ message }}</p>
      <button @click="closeDialog">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    message: String,
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-overlay button {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  margin-left: 10px;
  background-color: white;
  background-color: rgb(255, 20, 20);
  color: white;
  border-style: none;
  margin-top: 20px;
}

.dialog-overlay button:hover {
  opacity: 0.6;
  cursor: pointer;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
