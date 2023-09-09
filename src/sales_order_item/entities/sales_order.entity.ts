import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./order-status.enum";
import { User } from "src/auth/user.entity";
import { SalesOrderItem } from "src/sales_order_item/entities/sales_order_item.entity";


@Entity('sales_order')
export class SalesOrder {

    @PrimaryGeneratedColumn()
    sales_order_id: number;

    @ManyToOne(()=>User, user => user.salesOrder, {eager: true})
    user: User;

    @PrimaryGeneratedColumn()
    order_number: number;

    @OneToMany(()=>SalesOrderItem, salesOrderItem=>salesOrderItem.salesOrder, {eager:true})
    salesOrderItem: SalesOrderItem[];

    @Column({default: 'New Order' })
    order_status: OrderStatus;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @Column()
    grand_Total: number;
}
