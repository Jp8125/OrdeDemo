export interface OrderDetails {
    orderId: number,
    itemId: number,
    itemName: string,
    itemPrice: number,
    isAccepted: boolean,
    name?:string
}
