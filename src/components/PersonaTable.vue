<template>
  <ag-grid-vue
    class="ag-theme-alpine flex-1"
    :column-defs="columnDefs.value"
    :row-data="personas"
    :default-col-def="defaultColDef"
    row-selection="multiple"
    animate-rows="true"
  />
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { FullPersonaData } from '~/calculators/data';

import { AgGridVue } from 'ag-grid-vue3';  // the AG Grid Vue Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

withDefaults(defineProps<{
  personas?: FullPersonaData[]
}>(), {
  personas: () => [],
});

const statChildrenCols = ['strength', 'magic', 'endurance', 'agility', 'luck'];
const resistChildrenCols = ['physical', 'gun', 'fire', 'ice', 'electric', 'wind', 'psychic', 'nuclear', 'bless', 'curse'];


const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};
const columnDefs = reactive({
     value: [
        {
          headerName: 'Persona',
          children: [
            { headerName: 'Level', field: 'level' },
            { headerName: 'Name', field: 'name' },
            { headerName: 'Arcana', field: 'arcana' },
          ]
        },
        {
          headerName: 'Stat',
          children: statChildrenCols.map(stat => ({
            field: stat,
            columnGroupShow: 'closed',
          })),
        },
        {
          headerName: 'Resist',
          children: resistChildrenCols.map((resist) => ({
            field: resist,
            cellClassRules: {
              'c-indigo-500': ({ value }) => value === 'rs',
              'c-green-500': ({ value }) => value === 'ab',
              'c-red-500': ({ value }) => value === 'wk',
              'c-black-500': ({ value }) => value === 'rp',
              'c-gray-500': ({ value }) => value === 'nu',
            },
            columnGroupShow: 'closed',
          }))
        }
      ],
   });

</script>
<style lang="scss" scoped>
.ag-theme-alpine {
  --ag-cell-horizontal-padding: 4px;
}
</style>