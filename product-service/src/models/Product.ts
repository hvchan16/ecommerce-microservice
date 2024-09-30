import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  userId!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true })
  description!: string;
}
