// src/types.json/Modification.ts
import modificationsJson from 'src/json/modifications.json'

export interface Modification {
  modification: string;
  type: string;
  slot: string;
  description: string;
  resources: Map<string, number>
}

export function getModifications (): Modification[] {
  return modificationsJson.map(item => ({
    modification: item.modification,
    type: item.type,
    slot: item.slot,
    description: item.description,
    resources: new Map<string, number>(Object.entries(item.resources))
  }))
}

export interface Columns {
  name: string;
  label: string;
  field: string | ((row: Modification) => Modification);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: ((a: Modification, b: Modification, rowA: Modification, rowB: Modification) => number);
  style: string;
}

export const columns: Columns[] =
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
      field: 'slot',
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

export enum ModificationType {
  Existing,
  Custom
}

export const radioOptions = [
  { label: 'Existing modification', value: ModificationType.Existing },
  { label: 'Custom modification', value: ModificationType.Custom }
]
