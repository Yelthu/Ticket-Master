import { IsEmail, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(1, 100)
    username!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()
    password!: string;
}