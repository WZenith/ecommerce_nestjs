import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Product } from "src/products/entities/product.entity";

import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SalesOrder } from "./sales_order.entity";

@Entity('sales_order_item')
export class SalesOrderItem {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>SalesOrder, salesOrder=>salesOrder.salesOrderItem,{eager:false})
    @Exclude({ toPlainOnly: true, toClassOnly: false })
    salesOrder: SalesOrder;

    @ManyToOne(()=>Product, product=>product.salesOrderItem,{lazy:false,eager:true})
    @Exclude({ toPlainOnly: true, toClassOnly: false })
    product: Product;

    @Column()
    quantity:number;

    @Column()
    amount:number;

    @ManyToOne(()=>User, user=>user.salesOrderItem,{eager:true})
    user: User;
}
