import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// To add validators to validate the schema
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;
}
