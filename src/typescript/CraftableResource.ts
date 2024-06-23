import craftableResourcesJson from 'src/json/craftable_resources.json'

export interface CraftableResource {
  name: string,
  rarity: string,
  resources: Map<string, number>
}

export function getCraftableResources (): CraftableResource[] {
  return craftableResourcesJson.map(item => ({
    name: item.name,
    rarity: item.rarity,
    resources: new Map<string, number>()
  }))
}

export function getCraftableResource (key: string): CraftableResource | undefined {
  return getCraftableResources().find(c => c.name === key)
}
