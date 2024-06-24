/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Whatsapp } from '@wppconnect-team/wppconnect';
import { Socket } from 'socket.io';
import { Logger } from 'winston';

import { ServerOptions } from '../ServerOptions';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      client: Whatsapp & { urlcode: string; status: string };
      logger: Logger;
      session: string;
      token?: string;
      io: Socket;
      serverOptions: ServerOptions;
    }
  }
}
