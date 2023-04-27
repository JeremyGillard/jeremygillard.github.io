<template lang="">
  <div class="contactButton">
    <a target="_blank" :href="url">
      <i :class="[type, id]"></i>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    id: String,
    url: String,
  },
};
</script>
<style scoped>
.contactButton {
  /* border: 1px solid black; */
  text-align: center;
  width: 24px;
  font-size: 24px;
}
a {
  color: #838383;
}

a:hover {
  color: #383838;
}
</style>
