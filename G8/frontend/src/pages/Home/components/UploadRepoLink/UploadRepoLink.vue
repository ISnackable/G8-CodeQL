<template>
  <div class='text-center'>
    <v-row>
      <div lg='4'>
      <v-btn @click="showModalRepoLinkUpload" class="py-4 px-4">
        <span class="glyphicon glyphicon-link" /><a>Repository Link</a>
      </v-btn>
      </div>
    </v-row>

    <b-modal ref="RepoLinkUpload" hide-footer title="Insert Repo Link">
      <div class="d-block text-center my-5">
        <h3>Repository Link</h3>
        <input v-model="value" type="text" class="form-control" placeholder="https://github.com/you/HelloWorld.git">
        <b-button class="mt-3 bg-success" block @click="submitModalRepoLinkUpload">Submit</b-button>
        <b-button class="mt-3 bg-danger" block @click="hideModalRepoLinkUpload">Close</b-button>
      </div>
        <!--Insert File uploads styling here -->
    </b-modal>
  </div>
</template>

<script>
  export default {
    methods:{
      showModalRepoLinkUpload(){
        this.$refs['RepoLinkUpload'].show()
      },
      hideModalRepoLinkUpload(){
        this.$refs['RepoLinkUpload'].hide()
      },
      submitModalRepoLinkUpload(){
        //submit code
      },
    },
    data () {
      return {
        toggle_exclusive: undefined,
        file1:null,
      }
    },
  }
</script>
<!--<style src="./UploadRepoLink.scss" lang="scss" />-->