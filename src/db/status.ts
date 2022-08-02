import {Entity,PrimaryColumn,Generated,Column, BaseEntity} from 'typeorm'
@Entity("keqing_status")
export class Status extends BaseEntity{
    @PrimaryColumn()
    @Generated()
    groupId: number  ;

    @Column()
    sleep:boolean

    
}
