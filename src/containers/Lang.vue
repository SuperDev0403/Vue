<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <CIcon name="cil-globe-alt" :height="40" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownItem @click="changeLang('En')">
      <CIcon :content="flagSet.cifGb" :height="15" />En
    </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem
      v-for="(item, index) in langs"
      :key="index"
      @click="changeLang(item)"
    >
      <CIcon :content="flagSet[`cif${item}`]" :height="15" />
      {{item}}
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import avatar from "../assets/img";
import { flagSet } from "@coreui/icons";
export default {
  name: "LanguageDropdown",
  data() {
    return {
      avatar,
      flagSet,
      itemsCount: 42
    };
  },
  computed: {
    langs() {
      return this.$i18n.availableLocales.filter(x =>x!='En');
    }
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
      this.$router.push({
        params: { lang: lang }
      });
      window.location.reload(true)
    },
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