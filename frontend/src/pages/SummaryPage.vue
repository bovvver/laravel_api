<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>
              Summary
              <small class="text-muted fs-4">{{ selectedFilter.text }}</small>
            </h1>
            <SummaryFilter @update="setSelectedFilter" />
          </div>
          <div v-for="(tasks, description) in summaries" :key="description">
            <Summaries :tasks="tasks" :description="description" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useSummaryStore } from "../stores/summary";
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import Summaries from "../components/summaries/Summaries.vue";
import SummaryFilter from "../components/summaries/filter/SummaryFilter.vue";

const store = useSummaryStore();
const { summaries } = storeToRefs(store);
const { fetchTasksSummary } = store;
const selectedFilter = reactive({
  period: "",
  text: "",
});

const setSelectedFilter = (event) => Object.assign(selectedFilter, event);

onMounted(async () => {
  await fetchTasksSummary();
});

watch(
  () => selectedFilter.period,
  async (period) => {
    await fetchTasksSummary({ period });
  }
);
</script>
