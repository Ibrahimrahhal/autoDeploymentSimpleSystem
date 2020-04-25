
declare module 'diskdb' {
     class DiskDB {
        connect(path:string , collections:string[]): boolean | DiskDB;
        loadCollections(collections: string[]): boolean | DiskDB;
    }

    class Collection{
        _parse():Array<any>;
        find(query:string):Array<any>;
        findOne(query:string):any;
        save(data:any):any;
        update(query:string, data:any, options:any):any;
        remove(query:string, multi:boolean):boolean;
        count():number;
    }
    export default DiskDB;
}

