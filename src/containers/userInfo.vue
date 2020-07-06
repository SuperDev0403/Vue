<template>
  <div class="user-info">
    <div class="user-info">
      <h4 class="user-name">{{user.userName}}</h4>
      <h4 class="full-name">{{user.firstName}} {{user.lastName}}</h4>
      <p class="role">{{user.userLevel}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "userInfo",
  data: () => {
    return {
    };
  },
  computed: {
    user() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  }
};
</script>
<style lang="css">
.user-info {
  margin-top: 5px;
  text-align: center;
}
.user-name {
  font-weight: 300;
  font-size: 20px;
  text-transform: uppercase;
}
.role {
  font-weight: 900;
  font-size: 10px;
  text-transform: uppercase;
}
</style>