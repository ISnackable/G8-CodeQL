<template>
  <div class='text-center'>
    <v-row>
      <v-btn @click="showModalUploadFolder" style="font-size:2vw">
        <span class="glyphicon glyphicon-folder-close" /><a> Upload Folder</a>
      </v-btn>
    </v-row>
    <b-modal ref="FolderUploadModal" hide-footer title="Upload Folder">
      <div class="d-block text-center my-5">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="js/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
        </form>
        
        <b-button class="mt-3 bg-danger" block @click="hideModalUploadFolder">Close</b-button>
      </div>
        <!--Insert File uploads styling here -->
    </b-modal>
  </div>
</template>

<script>
  import { upload } from './uploadservice.js';
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'app',
    data() {
      return {
        toggle_exclusive: undefined,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'multi-files'
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      showModalUploadFolder(){
        this.$refs['FolderUploadModal'].show()
      },
      hideModalUploadFolder(){
        this.$refs['FolderUploadModal'].hide()
      },
      submitModalUploadFolder(){
        //submit code
      },
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      }
    },
    mounted() {
      this.reset();
    },
  }

</script>

<style src="./UploadFolder.scss" lang="scss" />