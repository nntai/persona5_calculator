<template>
  <ag-grid-vue
    class="ag-theme-alpine flex-1"
    :class="isDark ? 'ag-theme-dark' : ''"
    :column-defs="columnDefs.value"
    :row-data="data"
    :default-col-def="defaultColDef"
    row-selection="multiple"
    animate-rows="true"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { FullPersonaData } from '~/calculators/data';

import { FirstDataRenderedEvent } from 'ag-grid-community/main';
import { AgGridVue } from 'ag-grid-vue3';  // the AG Grid Vue Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const STRONG_PERCENT = 0.6;

const props = withDefaults(defineProps<{
  personas?: FullPersonaData[]
  highlightBestPersonasLevel: number,
}>(), {
  personas: () => [],
  highlightBestPersonasLevel: () => 1,
});

const isDark = useDark();

const statChildrenCols = ['strength', 'magic', 'endurance', 'agility', 'luck'];
const resistChildrenCols = ['physical', 'gun', 'fire', 'ice', 'electric', 'wind', 'psychic', 'nuclear', 'bless', 'curse'];
const isSmallScreen = window.innerWidth <= 768;

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};
const numericDef = {
  type: 'numericColumn', filter: 'agNumberColumnFilter'
};

const data = computed(() => {
  if (props.highlightBestPersonasLevel) {
    return props.personas
      .filter(({ level }) => level <= props.highlightBestPersonasLevel)
      .filter(persona => statChildrenCols.some(stat => Number(persona[stat] || 0) >= STRONG_PERCENT * props.highlightBestPersonasLevel));
  }
  return props.personas;
});

const columnDefs = reactive({
     value: [
        { headerName: 'Level', field: 'level', ...numericDef, pinned: isSmallScreen ? null : 'left', width: 1, sort: 'asc' },
        {
          headerName: 'Persona',
          width: 3,
          children: [
            { headerName: 'Name', field: 'name', sortable: false, pinned: isSmallScreen ? null : 'left',},
            { headerName: 'Arcana', field: 'arcana', sortable: false, pinned: isSmallScreen ? null : 'left', },
          ]
        },
        {
          headerName: 'Stat',
          children: statChildrenCols.map(stat => ({
            width: 1,
            field: stat,
            columnGroupShow: 'closed',
            ...numericDef,
            cellClassRules: {
              'c-green-500': ({ value }) => {
                return props.highlightBestPersonasLevel && value >= STRONG_PERCENT * props.highlightBestPersonasLevel;
              },
            }
          })),
        },
        {
          headerName: 'Resist',
          children: resistChildrenCols.map((resist) => ({
            field: resist,
            width: 2,
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

const onFirstDataRendered = (params: FirstDataRenderedEvent<any>) => {
  const { api, columnApi } = params;
  if (isSmallScreen && columnApi !== null) {
    const allColumnIds = (columnApi.getColumns() || []).map(column => column.getId());
    columnApi.autoSizeColumns(allColumnIds, false);
  }
};

</script>
<style lang="scss" scoped>
.ag-theme-alpine {
  --ag-cell-horizontal-padding: 4px;
}
.ag-theme-dark {
    --ag-foreground-color: r#EAEFF6FF;
    --ag-background-color: #0E1520F6;
    --ag-header-foreground-color: #7C99C6FF;
    --ag-header-background-color: #070B10F4;
    --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
    --ag-header-column-resize-handle-color: rgb(126, 46, 132);

    // --arc-palette-foregroundSecondary:#7C99C6FF;
    // --arc-palette-foregroundPrimary:#EAEFF6FF;
    // --arc-palette-maxContrastColor:#EAEFF6FF;
    // --arc-background-simple-color:#2D4468FF;
    // --arc-palette-backgroundExtra:#070B10F4;
    // --arc-palette-hover:#6577917A;
    // --arc-palette-subtitle:#787B7EF9;
    // --arc-palette-focus:#556885CE;
    // --arc-palette-title:#DEE2E7F4;
    // --arc-palette-minContrastColor:#2D4468FF;
    // --arc-palette-background:#0E1520F6;
    // --arc-palette-foregroundTertiary:#2D4468FF;
    // --arc-palette-cutoutColor:#2D4468FF;
}
.ag-root ::-webkit-scrollbar {
  background-color: #0E1520F6;
}
</style>