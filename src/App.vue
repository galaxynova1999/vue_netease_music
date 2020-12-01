<template>
  <Home />
</template>

<style scoped></style>
<script>
import { initialLocalData } from "@/api/exposed";
import Home from "@/views";
export default {
  components: { Home },
  created() {
    initialLocalData();
  },
};
</script>
