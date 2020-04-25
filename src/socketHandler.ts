import SocketIO, { Socket } from 'socket.io';
import { Server } from 'http';
import { Subject, Observable } from 'rxjs';

export default class SocketHandler{
    private io:SocketIO.Server;
    private socketSubscribers:Socket[] = [];
    private trackedEventsTable:any = { };
    private static socket:SocketHandler;

    private constructor(app:Server){
            this.io = SocketIO(app);
            this.io.on("connection", (socket:Socket)=>{
                this.socketSubscribers.push(socket);
                
                Object.keys(this.trackedEventsTable).forEach((EventName:string)=>{
                    socket.on(EventName as any, (data)=>{
                        this.trackedEventsTable[EventName].next(data);
                    });
                });
                socket.on("disconnect", (data)=>{
                    this.socketSubscribers.splice(this.socketSubscribers.indexOf(socket), 1);
                });
            });

    }
    
    public static initSocket(app:Server):void{
        if(this.socket)
        throw new Error("Already Initialized");
        this.socket = new SocketHandler(app);
    }

    public static getSocket():SocketHandler{
        if(!this.socket)
        throw new Error("Not Initialized");
        return this.socket;
    }

    public subsribteToEvent(EventName:string):Observable<any>{

        if(this.trackedEventsTable[EventName])
            return this.trackedEventsTable[EventName];

        let eventObservable = new Subject();
        this.socketSubscribers.forEach((socket:Socket)=>{
            socket.on(EventName as any, (data)=>{
                eventObservable.next(data);
            });
        })

        this.trackedEventsTable[EventName] = eventObservable;
        return eventObservable as Observable<any>;
    }

    public emitEvent(EventName:String, EventData:any):void{
        this.io.emit(EventName as any, EventData );
    }
}