<template>
  <div id="uploader">
    <form enctype="multipart/form-data" method="post" action="/files">
      <fieldset>
        <legend>File Upload</legend>
        <input type="file" name="wrekFiles" multiple />
        <input type="submit" value="Upload" />
      </fieldset>
    </form>
  </div>
</template>

<script>
  export default {};
</script>

<style>
</style>