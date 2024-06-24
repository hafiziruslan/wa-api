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
export default {
  number: 'wid.user',
  connected: 'connected',
  phone: {
    path: 'phone',
    nested: {
      wa_version: {
        path: 'wa_version',
      },
      mcc: {
        path: 'mcc',
      },
      mnc: {
        path: 'mnc',
      },
      os_version: {
        path: 'os_version',
      },
      device_manufacturer: {
        path: 'device_manufacturer',
      },
      device_model: {
        path: 'device_model',
      },
      os_build_number: {
        path: 'os_build_number',
      },
    },
  },
  platform: 'platform',
  locales: 'locales',
  battery: 'battery',
  plugged: 'plugged',
  pushname: 'pushname',
};
