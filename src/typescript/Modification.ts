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
    style: string;
  }[] =
  [
    {
      name: 'modification',
      label: 'Modification',
      field: 'Modification',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 45%'
    },
    {
      name: 'type',
      label: 'Type',
      field: 'Type',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 25%'
    },
    {
      name: 'slot',
      label: 'Slot',
      field: 'Slot',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 25%'
    },
    {
      name: 'action',
      label: '',
      field: 'Action',
      required: false,
      align: 'center',
      sortable: false,
      sort: undefined,
      style: 'width: 5%'
    }
  ]
