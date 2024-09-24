import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerName!: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];
}
