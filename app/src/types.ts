import type { restaurantStatusList,dietList } from "./constants"

export type Dish = {
id:string
name:string
status:Status
}
export type Restaurant ={
id:string
name:string
address:string
website:string
status:Status

}
// tuple
// this is being accessed by index so [number] here is not an actual number
type Status = typeof restaurantStatusList[number] 

type Diet = typeof dietList[number]