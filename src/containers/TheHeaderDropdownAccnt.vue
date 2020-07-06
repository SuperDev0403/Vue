<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img :src="avatar" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownItem>
      <CIcon name="cil-user" />{{$t('Header.profile')}}
    </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" />{{$t('Header.logout')}}
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import  avatar  from "../assets/img";
// import loadingImage from "@/assets/img/loading.gif";
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      avatar,
      itemsCount: 42
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/auth/login");
      });
    }
  }
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>