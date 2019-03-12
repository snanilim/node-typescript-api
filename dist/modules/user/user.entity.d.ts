import { BaseEntity } from "typeorm";
export declare class Users extends BaseEntity {
    _id: Number;
    name: String;
    isPublic: Boolean;
}
export declare const User: Users;
