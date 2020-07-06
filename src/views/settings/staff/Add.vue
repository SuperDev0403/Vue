<template>
    <Form :title="$t('Add_staff.main')" :userInfo ="userInfo"></Form>
</template>
<script>
import Form from "./Form";
export default {
  name: "Add",
  components: { Form },
  data() {
      return {
          userInfo: {
              userName: '',
              password: '',
              firstName: '',
              lastName: '',
          }
      }
  }
};
</script>