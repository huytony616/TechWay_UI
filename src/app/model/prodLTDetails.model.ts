export interface ProductDetail {
  id : number;
  cpu: string;
  core: number;
  thread: number;
  cpuSpeed: number;
  cpuMaxSpeed: number;
  cache: number;
  ram: number;
  type: string;
  busRAM: number;
  maxRAM: number;
  ssd: string;
  screenWidth: number;
  screenResolution: string;
  hz: number;
  screenTechs: number[];
  screenCard: string;
  sound: string;
}
