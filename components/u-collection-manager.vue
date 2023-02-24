<template>
  <div class="u-collection-manager">
    <div class="controller">
      <div class="actions">
        <button class="button" @click="openCreateModal">create</button>
        <button class="button" :disabled="selectedIds.length === 0">
          removes({{ selectedIds.length }})
        </button>
      </div>
      <div class="finder">
        <u-input
          label="search"
          class="input-group--row"
          v-model="filterValue"
        />
      </div>
    </div>
    <div class="table-container">
      <table class="table">
        <thead>
          <th>
            <input
              type="checkbox"
              @click="
                if (selectedIds.length === items.length) {
                  selectedIds = [];
                } else {
                  selectedIds = items.map((i) => i.id);
                }
              "
              :checked="selectedIds.length === items.length"
            />
          </th>
          <th>id</th>
          <slot name="table-head"></slot>
          <th>created</th>
          <th>updated</th>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            @click="openUpdateModal(item)"
          >
            <td>
              <input
                type="checkbox"
                @click.stop="
                  selectedIds.includes(item.id)
                    ? selectedIds.splice(selectedIds.indexOf(item.id), 1)
                    : selectedIds.push(item.id)
                "
                :checked="selectedIds.includes(item.id)"
              />
            </td>
            <td>#{{ item.id.substr(0, 4) }}</td>
            <slot name="table-head"></slot>
            <td>{{ $etc.convertTimestamp(item.created.at) }}</td>
            <td>{{ $etc.convertTimestamp(item.updated.at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- pop up -->
    <u-modal class="create-modal editor-modal" ref="create-modal">
      <u-form :heading="['create', title]" @submit="create">
        <template #main>
          <slot name="create-modal" v-bind="{ creating }"></slot>
        </template>
      </u-form>
    </u-modal>
    <u-modal class="update-modal editor-modal" ref="update-modal">
      <u-form :heading="['update', title]">
        <template #main>
          <slot name="update-modal" v-bind="updating"></slot>
        </template>
        <template #footer>
          <button class="button">reset</button>
          <button class="button" type="submit">confirm</button>
        </template>
      </u-form>
    </u-modal>
  </div>
</template>

<script>
import { Timestamp } from "@firebase/firestore";
import { uuidv4 } from "@firebase/util";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    model: {
      type: Function,
      required: true,
    },
    // data fetcher
    loadSize: {
      type: Number,
      default: 10,
    },
    // data processor
    filter: {
      type: Array,
      required: true,
    },
    sort: {
      type: String,
      default: "__created_at",
    },
    sortOrder: {
      type: String,
      default: "desc",
    },
    modifier: {
      type: Function,
      default: (item) => item,
    },
  },
  data() {
    return {
      filterValue: "",
      creating: this.model(),
      updating: {
        current: {},
        origin: {},
      },
      selectedIds: [],
    };
  },
  computed: {
    items() {
      return this.$store.state.collection[this.name];
    },
  },
  methods: {
    openCreateModal() {
      this.$refs["create-modal"].$el.classList.add("active");
    },
    openUpdateModal(item) {
      console.log(item);
      this.updating.current = JSON.parse(JSON.stringify(item));
      this.updating.origin = JSON.parse(JSON.stringify(item));
      this.$refs["update-modal"].$el.classList.add("active");
    },
    //CRUD
    async create() {
      try {
        let timestamp = Timestamp.now();
        let item = {
          ...this.creating,
          id: uuidv4(),
          created: {
            at: timestamp,
            by: this.$store.state.user.name || "system",
          },
          _created_at: `${timestamp.seconds} ${timestamp.nanoseconds}`,
          updated: {
            at: timestamp,
            by: this.$store.state.user.name || "system",
          },
        };
        await this.$store.dispatch("collection/create", {
          name: this.name,
          item: item,
        });

        alert("complete");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.u-collection-manager {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .controller {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    flex-wrap: wrap;
    .actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      button {
        height: max-content;
      }
    }
    .finder {
    }
  }
  .table {
    button.icon-checkbox {
    }
  }
}
</style>
