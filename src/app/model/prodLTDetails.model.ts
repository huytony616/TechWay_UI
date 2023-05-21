export interface ProductDetail {
  id : number;
  cpu: string;
  core: number;
  thread: number;
  cpuSpeed: number;
  cpuMaxSpeed: number;
  cache: number;
  ram: number;
  typeRAM: string;
  busRAM: number;
  maxRAM: number;
  ssd: string;
  screenSize: number;
  displayResolution: string;
  hz: number;
  displayTechnologies: number[];
  graphicsCard: string;
  sound: string;
}
