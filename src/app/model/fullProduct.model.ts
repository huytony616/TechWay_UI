export interface fullProduct {
  id: number;
  product: {
    id: number;
    productNo: string;
    name: string;
    images: string;
    price: number;
    available: boolean;
    category: {
      id: number;
      categoryNo: string;
      categoryName: string;
    };
    manufacturer: {
      id: number;
      manufacturerName: string;
    };
    color: {
      id: number;
      color: string;
    };
  };
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
  screenTechs: [
    {
      id: number;
      name: string;
    }
  ];
  screenCard: string;
  sound: string;
}
