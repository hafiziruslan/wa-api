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
import { FileTokenStore as fsTokenStore } from './FileTokenStore/FileTokenStore';

class FileTokenStore {
  declare client: any;
  constructor(client: any) {
    this.client = client;
  }
  tokenStore = new fsTokenStore({
    encodeFunction: (data) => {
      return this.encodeFunction(data, this.client.config);
    },
    decodeFunction: (text) => {
      return this.decodeFunction(text, this.client);
    },
  });

  public encodeFunction(data: any, config: any) {
    data.config = config;
    return JSON.stringify(data);
  }

  public async decodeFunction(text: string, client: any): Promise<string[]> {
    const object = JSON.parse(text);
    if (object.config && Object.keys(client.config).length === 0)
      client.config = object.config;
    if (object.webhook && Object.keys(client.config).length === 0)
      client.config.webhook = object.webhook;
    return object;
  }
}

export default FileTokenStore;
