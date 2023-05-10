export interface fullProductE {
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
  screenTech: {
    id: number;
    name: string;
  };
  screenResolution: string;
  screenWidth: number;
  maxLight: string;
  glass: string;
  backCameraResolution: string;
  frontCameraResolution: string;
  flash: number;
  backCameraFeatures: [
    {
      id: number;
      name: string;
    }
  ];
  frontCameraFeatures: [
    {
      id: number;
      name: string;
    }
  ];
  os: string;
  cpu: string;
  cpuSpeed: string;
  gpu: string;
  ram: number;
  rom: number;
  romUseable: number;
  contacts: string;
  mobileNetwork: string;
  sim: string;
  bluetooth: string;
  port: string;
  jackPhone: string;
  pinCapacity: number;
  pinType: string;
  maxChargingSupport: number;
  advancedSecurities: [
    {
      id: number;
      name: string;
    }
  ];
  specialFeatures: [
    {
      id: number;
      name: string;
    }
  ];
  design: string;
  material: string;
  dimensionAndWeight: string;
}
