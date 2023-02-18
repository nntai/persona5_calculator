<template>
  <ag-grid-vue
    class="ag-theme-alpine flex-1"
    :class="isDark ? 'ag-theme-dark' : ''"
    :column-defs="columnDefs.value"
    :get-row-class="getRowClass"
    :row-data="data"
    :default-col-def="defaultColDef"
    row-selection="multiple"
    animate-rows="true"
    @first-data-rendered="onFirstDataRendered"
    @grid-ready="onGridReady"
  />
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { FullPersonaData, PersonaData } from '~/calculators/data';

import { FirstDataRenderedEvent, RowClassParams } from 'ag-grid-community/main';
import { AgGridVue } from 'ag-grid-vue3';  // the AG Grid Vue Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const STRONG_PERCENT = 0.6;

const props = withDefaults(defineProps<{
  personas?: FullPersonaData[]
  highlightBestPersonaStatAtLevel: number,
  highlightBestPersonaStatAtTheirLevel: boolean,

}>(), {
  personas: () => [],
  highlightBestPersonaStatAtLevel: () => 1,
  highlightBestPersonaStatAtTheirLevel: () => false,
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


const anyPersonaStatHigherThan = (persona: PersonaData, min: number) => statChildrenCols.some(stat => Number(persona[stat] || 0) >= min);
const handleHighlightBestPersonasLevel = (personas: FullPersonaData[]) => {
  if (props.highlightBestPersonaStatAtLevel) {
    return props.personas
      .filter(({ level }) => level <= props.highlightBestPersonaStatAtLevel)
      .filter(persona => anyPersonaStatHigherThan(persona, STRONG_PERCENT * props.highlightBestPersonaStatAtLevel));
  }
  return personas;
};

const data = computed(() => {
  const highlightedBestPersonasLevel = handleHighlightBestPersonasLevel(props.personas);
  return highlightedBestPersonasLevel;
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
                return props.highlightBestPersonaStatAtLevel && value >= STRONG_PERCENT * props.highlightBestPersonaStatAtLevel;
              },
              'c-red-500': ({ value, data }) => {
                return props.highlightBestPersonaStatAtTheirLevel && value >= (STRONG_PERCENT + 0.15) * data.level;
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

const getRowClass = ({ data }: RowClassParams<PersonaData>) => {
  // const { highlightBestPersonaStatAtTheirLevel } = props;
  // if (highlightBestPersonaStatAtTheirLevel && data) {
  //   return anyPersonaStatHigherThan(data, (STRONG_PERCENT + 0.15) * data.level) ? 'bg-orange' : '';
  // }
  return '';
};

const onFirstDataRendered = (params: FirstDataRenderedEvent<any>) => {
  const { columnApi } = params;
  if (isSmallScreen && columnApi !== null) {
    const allColumnIds = (columnApi.getColumns() || []).map(column => column.getId());
    columnApi.autoSizeColumns(allColumnIds, false);
  }
};

let gridApi = null;
const onGridReady = (params) => {
  gridApi = params.api;
};

watch(() => props.highlightBestPersonaStatAtTheirLevel, () => {
  if (gridApi) {
    gridApi.refreshCells();
  }
});

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
}
.ag-root ::-webkit-scrollbar {
  background-color: #0E1520F6;
}
</style>