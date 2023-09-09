import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserStatus } from "./user-status.enum";

import { SalesOrderItem } from "src/sales_order_item/entities/sales_order_item.entity";
import { SalesOrder } from "src/sales_order_item/entities/sales_order.entity";

@Entity('user')
export class User{

    @PrimaryGeneratedColumn()
    id:string;

    @Column({})
    username:string;

    @Column({})
    email:string;

    @Column()
    password:string;

    @Column()
    status:UserStatus;

    @OneToMany(()=>SalesOrder, salesOrder => salesOrder.user , {eager:false})
    salesOrder: SalesOrder[];

    @OneToMany(()=>SalesOrderItem, salesOrderItem=>salesOrderItem.user,{eager:false})
    salesOrderItem: SalesOrderItem;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

}