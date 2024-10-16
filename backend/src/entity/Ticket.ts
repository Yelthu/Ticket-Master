import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @Length(1, 100)
    title!: string

    @Column()
    @Length(1, 100)
    description!: string
}