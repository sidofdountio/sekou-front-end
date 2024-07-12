import { DataState } from "./enumeration/dataState";

/**
 * Author       : sidof <br>
 *  LinkedIn    :  <a href="https://www.linkedin.com/in/sidof-dountio/">sidofDountio</a> <br>
 *  Since       : 11/07/2024  <br>
 *   Version    : v1.0.0
 */
export interface  AppState <T>{
  dataState: DataState;
  appData?: T;
  error?: string;
}
