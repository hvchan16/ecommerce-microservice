import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;
}
