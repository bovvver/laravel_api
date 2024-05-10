<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { startOfWeek, endOfWeek, subWeeks, format } from "date-fns";
import Dropdown from "../../dropdown/Dropdown.vue";
import DropdownItem from "../../dropdown/DropdownItem.vue";
import DropdownTrigger from "../../dropdown/DropdownTrigger.vue";
import FilterItem from "../filter/FilterItem.vue";

const filterItems = computed(() => {
  const today = new Date();

  const thisWeekStart = format(startOfWeek(today), "d MMM");
  const thisWeekEnd = format(endOfWeek(today), "d MMM");
  const lastWeekStart = format(startOfWeek(subWeeks(today, 1)), "d MMM");
  const lastWeekEnd = format(endOfWeek(subWeeks(today, 1)), "d MMM");

  return {
    today: "Today",
    yesterday: "Yesterday",
    thisweek: `This week (${thisWeekStart} - ${thisWeekEnd})`,
    lastweek: `Last week (${lastWeekStart} - ${lastWeekEnd})`,
    thismonth: "This month",
    lastmonth: "Last month",
  };
});

const emit = defineEmits(["update"]);

const activeFilterKey = ref("lastweek");

const router = useRouter();

const filter = (period) => {
  activeFilterKey.value = period;
  router.push({ name: "summary", query: { period } });

  emit("update", {
    text: activeFilter.value,
    period: activeFilterKey.value,
  });
};

onMounted(() => emit("update", activeFilter.value));

const activeFilter = computed(
  () => filterItems.value[activeFilterKey.value] || filterItems.value.thisweek
);
</script>

<template>
  <Dropdown>
    <template v-slot:trigger="{ toggleClass, toggle }">
      <DropdownTrigger
        class="btn btn-outline-secondary"
        :class="toggleClass"
        type="button"
        @click="toggle"
        >{{ activeFilter }}</DropdownTrigger
      >
    </template>
    <template v-slot:menu="{ toggle }">
      <DropdownItem
        v-for="(value, key) in filterItems"
        :key="key"
        href="#"
        @click.prevent="toggle(), filter(key)"
      >
        <FilterItem :text="value" :selected="key === activeFilterKey" />
      </DropdownItem>
    </template>
  </Dropdown>
</template>
