// src/types/Modification.ts
import modificationsJson from 'src/data/modifications.json'

export interface Modification {
  Modification: string;
  Type: string;
  Slot: string;
  Resources: Map<string, number>
}

export function getModifications (): Modification[] {
  return modificationsJson.map(item => ({
    Modification: item.Modification,
    Type: item.Type,
    Slot: item.Slot,
    Resources: new Map<string, number>(Object.entries(item.Resources))
  }))
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
