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
  id: 'id',
  type: 'kind',
  phone: {
    path: 'id.user',
    formatting: (value: any) => {
      return value.split('@')[0];
    },
  },
  author: {
    path: 'contact',
    formatting: (value: any) => {
      return value.isMyContact ? value.formattedName : value.pushname;
    },
  },
  timestamp: 't',
};
