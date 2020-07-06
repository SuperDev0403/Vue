<template>
  <div>
    <CCard>
      <CCardBody>
        <CDataTable
          :items="items"
          :fields="fields"
          table-filter
          items-per-page-select
          :items-per-page="10"
          hover
          sorter
          pagination
        >
          <template #order="{item, index}">
            <td>{{index + 1}}</td>
          </template>
          <template #image="{item, index}">
            <td class="image d-flex align-items-center">
              <img :src="images[index%2]" width="50px" alt="image" />
            </td>
          </template>
          <template #win_lose="{item}">
            <td class="text-centerx">
              <CBadge size="xl" :color="getColor(item.payout)">{{item.payout}}</CBadge>
            </td>
          </template>
          <template #start_time="{item}">
            <td>{{changeDateformat(item.start_time)}}</td>
          </template>
          <template #end_time="{item}">
            <td>{{changeDateformat(item.end_time)}}</td>
          </template>
          <template #category="{item}">
            <td>{{item.product}}</td>
          </template>
          <template #provider="{item}">
            <td>{{item.site}}</td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { changeDateformat } from "../functions";
import { gameList } from "../tableHeaders";
export default {
  name: "BetHIstory",
  props: ["items"],
  data() {
    return {
      fields: [],
      gameList,
      changeDateformat,
      images: [
        "https://assets.vegasslotsonline.com/vegasslotsonline.com/assets/uploads/games/pragmatic-play/images/888-gold.jpg",
        "https://assets.vegasslotsonline.com/vegasslotsonline.com/assets/uploads/games/wms/images/goldfish-slot-machine.jpg"
      ]
    };
  },
  methods: {
    getField: function() {
      for (let i = 0; i < this.gameList.length; i++) {
        let item = this.gameList[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
    },
    getColor(value) {
      if (value > 0) {
        return "success";
      } else if (value == 0) {
        return "warning";
      } else {
        return "danger";
      }
    }
  },
  mounted() {
    this.getField();
  }
};
</script>
<style lang="scss">
.gamelist-table {
  width: 100%;
  .image {
    width: 80px;
  }
  .name {
    width: auto;
  }
  td.opt {
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .opt {
    background-color: white !important;
    text-align: center;
    justify-content: center;
  }
}
.image img:hover {
  display: block;
  position: absolute;
  width: 160px;
  z-index: 500;
}
</style>