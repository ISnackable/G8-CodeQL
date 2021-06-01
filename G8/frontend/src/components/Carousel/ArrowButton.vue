  
<template>
<div>
  <button class="btn">
    <img
      class="icon"
      :src="require(`@/assets/svg/${arrowType}.svg`)"
      :alt="arrowType + ' arrow'"
    >
  </button>
</div>
</template>
<script>
export default {
  name: "ArrowButton",
  props: { arrowType: String }
};
</script>


<style src="../../components/Carousel/ArrowButton.scss" lang="scss" />