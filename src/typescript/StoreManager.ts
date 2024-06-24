import { useModificationListStore } from 'stores/modificationListStore'
import { useCraftableResourceListStore } from 'stores/craftableResourcesStore'
import { useShoppingListStore } from 'stores/shoppingListStore'
import { useUserStore } from 'stores/userStore'

export class StoreManager {
  public userStore = useUserStore()
  public modificationListStore = useModificationListStore()
  public craftableResourceListStore = useCraftableResourceListStore()
  public shoppingListStore = useShoppingListStore()
}
