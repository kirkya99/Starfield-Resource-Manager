import researchJson from 'src/json/research.json'
import { Resource } from 'src/typescript/Resource'

export interface ResearchItem {
  name: string,
  category: string,
  resources: Map<string, number>,
  requirements: string[],
  skills: string[],
  unlocks: string[],
}

export function getResearchItems (): ResearchItem[] {
  return researchJson.map((item) => ({
    name: item.name,
    category: item.category,
    resources: new Map<string, number>(Object.entries(item.resources)),
    requirements: Object.keys(item.resources),
    skills: item.skills ? item.skills : [],
    unlocks: item.unlocks ? item.unlocks : []
  }))
}

export const columns:
  {
    name: string;
    label: string;
    field: string | ((row: Resource) => Resource);
    required?: boolean;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    sort?: ((a: Resource, b: Resource, rowA: Resource, rowB: Resource) => number);
    style: string;
  }[] =
  [
    {
      name: 'name',
      label: 'Research',
      field: 'Research',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 35%'
    },
    {
      name: 'category',
      label: 'Category',
      field: 'Category',
      required: false,
      align: 'left',
      sortable: true,
      sort: undefined,
      style: 'width: 35%'
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

export enum ResearchType {
  Existing,
  Custom
}

export const radioOptions = [
  { label: 'Existing research item', value: ResearchType.Existing },
  { label: 'Custom research item', value: ResearchType.Custom }
]
