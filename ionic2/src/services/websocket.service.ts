import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class WebsocketService {

  private connected: Promise<any>;

  constructor(config: ConfigService) {
    let socket: any = io.connect(config.websocketEndpoint);

    this.connected = new Promise((resolve, reject) => {
      socket.on('connect', () => resolve(socket));
    });
  }

  on(key: string, callback: ((any) => any)) {
    this.connected.then(socket => {
      socket.on(key, callback);
    });
  }

  emit(key: string, data: any) {
    this.connected.then(socket => {
      socket.emit(key, data);
    })
  }

}
