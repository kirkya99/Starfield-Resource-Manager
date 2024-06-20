// src/types/Modification.ts
import modificationsJson from 'src/json/modifications.json'

export interface Modification {
  modification: string;
  type: string;
  slot: string;
  resources: Map<string, number>
}

export function getModifications (): Modification[] {
  return modificationsJson.map(item => ({
    modification: item.Modification,
    type: item.Type,
    slot: item.Slot,
    resources: new Map<string, number>(Object.entries(item.Resources))
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
      field: 'modification',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 45%'
    },
    {
      name: 'type',
      label: 'Type',
      field: 'type',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 25%'
    },
    {
      name: 'slot',
      label: 'Slot',
      field: 'tlot',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 25%'
    },
    {
      name: 'action',
      label: '',
      field: 'action',
      required: false,
      align: 'center',
      sortable: false,
      sort: undefined,
      style: 'width: 5%'
    }
  ]
