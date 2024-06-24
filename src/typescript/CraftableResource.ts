import craftableResourcesJson from 'src/json/craftable_resources.json'
import { Modification } from 'src/typescript/Modification'

export interface CraftableResource {
  name: string,
  rarity: string,
  resources: Map<string, number>
}

export function getCraftableResources (): CraftableResource[] {
  return craftableResourcesJson.map(item => ({
    name: item.name,
    rarity: item.rarity,
    resources: new Map<string, number>(Object.entries(item.resources))
  }))
}

export function getCraftableResource (key: string): CraftableResource | undefined {
  return getCraftableResources().find(c => c.name === key)
}

export interface Column {
  name: string;
  label: string;
  field: string | ((row: Modification) => Modification);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: ((a: CraftableResource, b: CraftableResource, rowA: CraftableResource, rowB: CraftableResource) => number);
  style: string;
}

export const columns: Column[] =
  [
    {
      name: 'craftableResource',
      label: 'Craftable resource',
      field: 'name',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 70%'
    },
    {
      name: 'amount',
      label: 'Amount',
      field: 'amount',
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
