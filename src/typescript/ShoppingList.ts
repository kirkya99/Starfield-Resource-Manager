import { Modification } from 'src/typescript/Modification'

export interface Resource {
  resource: string,
  amount: number
}

export const addResources = (resources: Map<string, number>, shoppingList: Resource[]): Resource[] => {
  for (const [key, value] of resources) {
    const existingResource: Resource | undefined = shoppingList.find(item => item.resource === key)

    if (existingResource) {
      existingResource.amount += value
    } else {
      shoppingList.push({ resource: key, amount: value })
    }
  }

  return shoppingList
}

export const columns:
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
      name: 'resource',
      label: 'Resource',
      field: 'resource',
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
