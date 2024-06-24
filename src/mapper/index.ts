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
import mapper from 'json-mapper-json';

export async function convert(prefix: string, data: any, event?: any) {
  try {
    data.event = event || data.event;
    event = data.event.indexOf('message') >= 0 ? 'message' : data.event;

    const mappConfEvent = await config_event(prefix, event);
    const mappConfType = await config_type(prefix, event, data.type);

    Object.assign(mappConfEvent, mappConfType);

    // console.log('mappConfEvent', mappConfEvent);

    if (!mappConfEvent) return data;
    return await mapper(data, mappConfEvent);
  } catch (e) {
    return data;
  }
}

async function config_event(prefix: any, event: any) {
  try {
    const { default: mappConf } = await import(`./${prefix}${event}.js`);
    if (!mappConf) return undefined;
    return mappConf;
  } catch (e) {
    return undefined;
  }
}

async function config_type(prefix: any, event: any, type: any) {
  try {
    const { default: mappConf } = await import(
      `./${prefix}${event}-${type}.js`
    );
    if (!mappConf) return undefined;
    return mappConf;
  } catch (e) {
    return undefined;
  }
}
