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
/*
 * This file is part of WPPConnect.
 *
 * WPPConnect is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * WPPConnect is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with WPPConnect.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Session token of WhatsApp to authenticate the web interface
 * ```typescript
 * // Example of SessionToken
 * {
 *   WABrowserId: '"UnXjH....."',
 *   WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
 *   WAToken1: '"0i8...."',
 *   WAToken2: '"1@lPpzwC...."',
 * }
 * ```
 */
export interface SessionToken {
  WABrowserId: string;
  WAToken1: string;
  WAToken2: string;
  WASecretBundle: string;
}

export interface TokenStore<T extends SessionToken = SessionToken> {
  /**
   * Return the session data if exists
   * @param sessionName Name of session
   */
  getToken(sessionName: string): Promise<T | undefined> | T | undefined;

  /**
   * Store the session token data
   * @param sessionName Name of session
   * @param tokenData Session token data
   */
  setToken(
    sessionName: string,
    tokenData: T | null,
  ): Promise<boolean> | boolean;

  /**
   * Remove the session
   * @param sessionName Name of session
   * @returns Token was removed
   */
  removeToken(sessionName: string): Promise<boolean> | boolean;

  /**
   * A liste of avaliable sessions
   */
  listTokens(): Promise<string[]> | string[];
}
