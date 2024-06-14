// src/types/Modification.ts
export interface Modification {
  Modification: string;
  Type: string;
  Slot: string;
  Resources: Map<string, number>
}

export const Columns = [
  {
    name: 'modification',
    required: true,
    label: 'Modification',
    align: 'left',
    field: 'Modification',
    sortable: true
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: 'Type',
    sortable: true
  },
  {
    name: 'slot',
    required: true,
    label: 'Slot',
    align: 'left',
    field: 'Slot',
    sortable: true
  }
]

// TODO: Add tracked modifications
