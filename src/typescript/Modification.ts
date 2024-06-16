// src/types/Modification.ts
import modificationsJson from 'src/json/modifications.json'

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

export const Columns:
  {
    name: string;
    label: string;
    field: string | ((row: Modification) => Modification);
    required?: boolean;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    sort?: ((a: Modification, b: Modification, rowA: Modification, rowB: Modification) => number);
  }[] =
  [
    {
      name: 'modification',
      label: 'Modification',
      field: 'Modification',
      required: false,
      align: 'left',
      sortable: false,
      sort: undefined
    },
    {
      name: 'type',
      label: 'Type',
      field: 'Slot',
      required: false,
      align: 'left',
      sortable: false,
      sort: undefined
    },
    {
      name: 'slot',
      label: 'Slot',
      field: 'Slot',
      required: false,
      align: 'left',
      sortable: false,
      sort: undefined
    },
    {
      name: 'action',
      label: 'Action',
      field: 'Action',
      required: false,
      align: 'center',
      sortable: false,
      sort: undefined
    }
  ]
