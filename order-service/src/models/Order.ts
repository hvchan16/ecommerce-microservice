import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerName!: string;

  @Column()
  userId!: number;

  @Column()
  deliveryLocation!: string;

  @Column({ type: "decimal", nullable: true })
  shippingCost?: number;

  @Column({ nullable: true })
  shippingStatus?: string;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItem[];
}
