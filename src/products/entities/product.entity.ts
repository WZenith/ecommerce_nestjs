import { Exclude } from "class-transformer";
import { SalesOrderItem } from "src/sales_order_item/entities/sales_order_item.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    product_name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_in_rupees: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
    
    @OneToMany(()=>SalesOrderItem, salesOrderItem => salesOrderItem.product, {eager:false})
    salesOrderItem : SalesOrderItem[];

}
