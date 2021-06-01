<template>
<div>
  <ul>
    <li
      v-for="(_, index) in elements"
      class="dot"
      :key="index"
      :class="{'dot-selected': currentElementIndex === index}"
    >

    <button
        class="indicator-btn"
        @click='showElement(index)'
        :disabled=" currentElementIndex === index"
      />
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "Indicators",
  props: { elements: Array, currentElementIndex: Number, showElement: Function }
};
</script>


<style src="../../components/Carousel/Indicators.scss" lang="scss" />