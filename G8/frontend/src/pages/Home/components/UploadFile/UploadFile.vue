<template>
  <div class='text-center'>
    <v-row>
      <v-btn>
        <span class="glyphicon glyphicon-file UploadFile my-2 mx-2 py-4 px-4" />
      </v-btn>
      <v-btn>
        <span class="glyphicon glyphicon-folder-close UploadFile my-2 mx-2 py-4 px-4" />
      </v-btn>
      <v-btn>
        <span class="glyphicon glyphicon-link UploadFile my-2 mx-2 py-4 px-4" />
      </v-btn>
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        toggle_exclusive: undefined,
      }
    },
  }
</script>
<style src="./UploadFile.scss" lang="scss" />