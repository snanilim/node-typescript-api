import {Entity, Column, ObjectIdColumn, BaseEntity} from "typeorm";

@Entity()
export class Users extends BaseEntity{
    @ObjectIdColumn()
    _id: Number;

    @Column()
    name: String;

    @Column()
    isPublic: Boolean;
}

export const User = new Users();