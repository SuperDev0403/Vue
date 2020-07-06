<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    class="sidebar-custom"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <h2>ADMIN CONSOLE</h2>
    </CSidebarBrand>
    <userInfo />
    <CDropdownDivider />
    <CRenderFunction flat :content-to-render="navBar" />
  </CSidebar>
</template>

<script>
import nav from "./_nav";
import userInfo from "./userInfo";
export default {
  name: "TheSidebar",
  components: { userInfo },
  nav,
  computed: {
    navBar() {
      let navs = this.$options.nav;
      let agentDetail = JSON.parse(localStorage.getItem("agentDetail"));
      if (!agentDetail.userLevel) {
        let { components } = agentDetail;
        let index = [];
        for (let i = 0; i < navs[0]["_children"].length; i++) {
          let originName = navs[0]["_children"][i].name;
          let haveName = false;
          for (let j = 0; j < components.length; j++) {
            let component = components[j];
            let { name } = component;
            if (name == originName && component.value!='invisible') {
              haveName = true;
              break;
            }
          }
          if (!haveName) {
            index.push(i);
          }
        }
        for (let i = 0; i < index.length; i++) {
          navs[0]["_children"].splice(index[i] - i, 1);
        }
        let options = navs[0]["_children"];
        for (let i = 0; i < options.length; i++) {
          if ( navs[0]["_children"][i].name) {
            navs[0]["_children"][i].name = this.$i18n.t(
              `${options[i]["name"]}.nav`
            );
          }
          if (navs[0]["_children"][i]["_children"]) {
            navs[0]["_children"][i]["_children"][0] = this.$i18n.t(
              `${options[i]["_children"][0]}`
            );
          }
          let { items } = options[i];
          if (items) {
            for (let j = 0; j < items.length; j++) {
              if (navs[0]["_children"][i]["items"][j].name) {
                navs[0]["_children"][i]["items"][j].name =  this.$i18n.t(
                  `${options[i]["items"][j]["name"]}.nav`
                );
              }
            }
          }
        }
      } else {
        if (agentDetail.userLevel != "admin") {
          let { components } = agentDetail;
          for (let i = 0; i < components.length; i++) {
            let component = components[i];
            if (component.value == "invisible") {
              let name = component.name.replace(" ", "_");
              for (let j = 0; j < navs[0]["_children"].length; j++) {
                if (navs[0]["_children"][j].name == name) {
                  navs[0]["_children"].splice(j, 1);
                }
              }
            }
          }
          let options = navs[0]["_children"];
          for (let i = 0; i < options.length; i++) {
            if (navs[0]["_children"][i].name) {
              navs[0]["_children"][i].name = this.$i18n.t(
                `${options[i]["name"]}.nav`
              );
            }
            if (navs[0]["_children"][i]["_children"]) {
              navs[0]["_children"][i]["_children"][0] = this.$i18n.t(
                `${options[i]["_children"][0]}`
              );
            }
            let { items } = options[i];
            if (items) {
              for (let j = 0; j < items.length; j++) {
                if (navs[0]["_children"][i]["items"][j].name) {
                  navs[0]["_children"][i]["items"][j].name = this.$i18n.t(
                    `${options[i]["items"][j]["name"]}.nav`
                  );
                }
              }
            }
          }
        } else {
          let options = navs[0]["_children"];
          for (let i = 0; i < options.length; i++) {
            if (navs[0]["_children"][i].name) {
              navs[0]["_children"][i].name = this.$i18n.t(
                `${options[i]["name"]}.nav`
              );
            }
            if (navs[0]["_children"][i]["_children"]) {
              navs[0]["_children"][i]["_children"][0] = this.$i18n.t(
                `${options[i]["_children"][0]}`
              );
            }
            let { items } = options[i];
            if (items) {
              for (let j = 0; j < items.length; j++) {
                if (navs[0]["_children"][i]["items"][j].name) {
                  navs[0]["_children"][i]["items"][j].name = this.$i18n.t(
                    `${options[i]["items"][j]["name"]}.nav`
                  );
                }
              }
            }
          }
        }
      }
      return navs;
    },
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    }
  }
};
</script>
<style lang="css">
.sidebar-custom {
  background-color: rgba(200, 84, 84, 0.801);
}
</style>
