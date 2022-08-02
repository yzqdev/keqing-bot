import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Admin } from "./admin";
import { Status } from "./status";

const options: DataSourceOptions = {
    type:"sqlite",
    database: "my.db",
    logging: true,
    synchronize: true,
    entities: [Status],
};
 export const dataSource = new DataSource(options);
export function startDb(){
   
    dataSource.initialize().then(
        async (dataSource) => {
            
 
        },
        (error) => console.log("Cannot connect: ", error)
    );

}
