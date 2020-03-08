import { Plat } from "./plat";

export class Restaurant {
  id: number;
  nom: string;
  Latitude: number;
  Description: String;
  Longitude: number;
  plats: Plat[];
  dailies: Plat[];
}
