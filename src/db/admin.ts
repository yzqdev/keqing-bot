import { Entity, PrimaryColumn, Generated, Column, BaseEntity } from "typeorm";
@Entity("keqing_admin")
export class Admin extends BaseEntity{
  @PrimaryColumn()
  @Generated()
  id:string
  @Column()
  groupId: number|string;

  @Column()
  userId:number
  @Column()
  username:string
}
