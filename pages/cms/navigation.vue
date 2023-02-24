<template>
  <div>
    <u-collection-manager v-bind="navigatorGroups.managerProps">
      <!-- pop up -->
      <template v-slot:create-modal="{ creating }">
        <u-input label="title" v-model="creating.title" />
        <u-select label="icon" :options="$etc.icons" v-model="creating.icon">
          <template v-slot:option="{ option }">
            <span>{{ option }}</span>
            <u-icon>{{ option }}</u-icon>
          </template>
        </u-select>
      </template>
      <template v-slot:update-modal="{ current, origin }">
        <u-input label="title" v-model="current.title" />
        <u-select label="icon" :options="$etc.icons" v-model="current.icon">
          <template v-slot:option="{ option }">
            <span>{{ option }}</span>
            <u-icon>{{ option }}</u-icon>
          </template>
        </u-select>
      </template>
    </u-collection-manager>
  </div>
</template>

<script>
import { limit, orderBy } from "@firebase/firestore";

export default {
  layout: "cms",
  async fetch() {
    try {
      await this.$store.dispatch("collection/gets", [
        {
          name: "NavigatorGroups",
          conditions: [
            orderBy("_created_at"),
            limit(this.navigatorGroups.pageSize),
          ],
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      navigatorGroups: {
        managerProps: {
          name: "NavigatorGroups",
          title: "Navigator's Group",
          filter: ["title"],
          model: (title = "", icon = "") => ({ title, icon }),
        },
        pageSize: 2,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
