import {ConnectionOptions, createConnection} from 'typeorm';

export async function dbInitializer(options:ConnectionOptions):Promise<any>{
    const connecction = await createConnection(options)
    .then(async connection=>{
        console.log('MongoDB Database connected');
    })
    .catch(error => console.log('error', error));

    return connecction;
}