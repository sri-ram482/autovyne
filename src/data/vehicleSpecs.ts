export interface VehicleAmenities {
  seats: number;
  luggage: number;
  doors: number;
  zeroToSixty: string; // e.g. "3.6s"
  horsePower: number; // e.g. 650
}

export interface VehicleRatingData {
  rating: number; // e.g. 4.3
  performance: number; // e.g. 5
  comfort: number; // e.g. 4
  design: number; // e.g. 4
}

export interface VehicleSpecification {
  id: number;
  slug: string;
  range: number; // e.g. 420 miles
  mpg: number; // e.g. 18 MPG
  story: string; // Car story for desktop
  storyMobile: string; // Car story for mobile
  maxSpeed: number; // e.g. 720 (HP)
  transmission: string; // e.g. "AUTOMATIC\n4 - SPEED"
  mileage: string; // e.g. "39,889"
  exteriorColor: string; // e.g. "BLACK"
  condition: string; // e.g. "EXCELLENT"
  driveTrain: string; // e.g. "RWD"
  engine: {
    numeric: string; // e.g. "v8 6.7L"
    suffix: string; // e.g. "SUPER CHARGER"
  };
  fuel: string; // e.g. "GASOLINE"
  descriptionWords: [string, string, string, string];
  amenities: VehicleAmenities;
  ratingData: VehicleRatingData;
}

export const VEHICLE_SPECIFICATIONS: Record<number, VehicleSpecification> = {
  // 1. Lamborghini Urus (Vehicle 1) — Matches exact Figma values
  1: {
    id: 1,
    slug: 'vehicle-1',
    range: 420,
    mpg: 18,
    story:
      'Express ride into 20th century with this stunning 1969 charger RT1. This is where the point meets the future rather quickly with a 720HP. To get you there.',
    storyMobile:
      'Express ride into 20th century with this stunning 1969 charger RT1. This is where the point meets the future rather quickly with a 720HP. To get you there.',
    maxSpeed: 720,
    transmission: 'AUTOMATIC\n4 - SPEED',
    mileage: '39,889',
    exteriorColor: 'BLACK',
    condition: 'EXCELLENT',
    driveTrain: 'RWD',
    engine: {
      numeric: 'v8 6.7L',
      suffix: 'SUPER CHARGER',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['POWER', 'LUXURY', 'PRESENCE', 'LIMITS'],
    amenities: {
      seats: 5,
      luggage: 4,
      doors: 4,
      zeroToSixty: '3.6s',
      horsePower: 650,
    },
    ratingData: {
      rating: 4.3,
      performance: 5,
      comfort: 4,
      design: 4,
    },
  },

  // 2. Mercedes AMG GT (Vehicle 2)
  2: {
    id: 2,
    slug: 'vehicle-2',
    range: 380,
    mpg: 20,
    story:
      'Sculpted for pure adrenaline and uncompromising track dominance. The AMG GT delivers handcrafted biturbo fury with razor-sharp road precision.',
    storyMobile:
      'Sculpted for pure adrenaline and track dominance with handcrafted biturbo fury and razor-sharp road precision.',
    maxSpeed: 577,
    transmission: 'AMG SPEEDSHIFT\n9 - SPEED',
    mileage: '14,250',
    exteriorColor: 'BRILLIANT\nBLUE',
    condition: 'PRISTINE',
    driveTrain: 'RWD',
    engine: {
      numeric: 'v8 4.0L',
      suffix: 'BITURBO',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['PERFORMANCE', 'PRECISION', 'ELEGANCE', 'SPEED'],
    amenities: {
      seats: 2,
      luggage: 2,
      doors: 2,
      zeroToSixty: '3.1s',
      horsePower: 577,
    },
    ratingData: {
      rating: 4.7,
      performance: 5,
      comfort: 4,
      design: 5,
    },
  },

  // 3. BMW M4 Competition (Vehicle 3)
  3: {
    id: 3,
    slug: 'vehicle-3',
    range: 410,
    mpg: 23,
    story:
      'Track-bred aggression balanced with everyday executive poise. Twin-turbo inline-six thrust channeled through intelligent performance engineering.',
    storyMobile:
      'Track-bred aggression balanced with executive poise. Twin-turbo inline-six thrust through intelligent M engineering.',
    maxSpeed: 503,
    transmission: 'M STEPTRONIC\n8 - SPEED',
    mileage: '21,400',
    exteriorColor: 'ISLE OF MAN\nGREEN',
    condition: 'EXCELLENT',
    driveTrain: 'AWD',
    engine: {
      numeric: 'I6 3.0L',
      suffix: 'M TWINPOWER TURBO',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['DOMINANCE', 'PRESTIGE', 'HERITAGE', 'ENGINEERING'],
    amenities: {
      seats: 4,
      luggage: 3,
      doors: 2,
      zeroToSixty: '3.8s',
      horsePower: 503,
    },
    ratingData: {
      rating: 4.6,
      performance: 5,
      comfort: 4,
      design: 5,
    },
  },

  // 4. Audi RS 7 (Vehicle 4)
  4: {
    id: 4,
    slug: 'vehicle-4',
    range: 440,
    mpg: 19,
    story:
      'Breathtaking widebody proportions concealing ferocious twin-turbo V8 output. Quattro all-wheel drive delivers explosive launch and total composure.',
    storyMobile:
      'Widebody proportions with ferocious twin-turbo V8 output. Quattro all-wheel drive delivers explosive launch and composure.',
    maxSpeed: 591,
    transmission: 'TIPTRONIC\n8 - SPEED',
    mileage: '18,800',
    exteriorColor: 'NARDO\nGREY',
    condition: 'FLAWLESS',
    driveTrain: 'AWD',
    engine: {
      numeric: 'v8 4.0L',
      suffix: 'TFSI TWIN-TURBO',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['INNOVATION', 'VELOCITY', 'EXCELLENCE', 'SOPHISTICATION'],
    amenities: {
      seats: 5,
      luggage: 4,
      doors: 4,
      zeroToSixty: '3.5s',
      horsePower: 591,
    },
    ratingData: {
      rating: 4.8,
      performance: 5,
      comfort: 5,
      design: 5,
    },
  },

  // 5. Range Rover Sport (Vehicle 5)
  5: {
    id: 5,
    slug: 'vehicle-5',
    range: 480,
    mpg: 22,
    story:
      'Commanding British luxury engineered to conquer any terrain. Dynamic air suspension blends serene highway cruising with effortless supercharged grit.',
    storyMobile:
      'Commanding British luxury to conquer any terrain with dynamic air suspension and effortless supercharged grit.',
    maxSpeed: 523,
    transmission: 'AUTOMATIC\n8 - SPEED',
    mileage: '27,300',
    exteriorColor: 'CARPATHIAN\nGREY',
    condition: 'EXCELLENT',
    driveTrain: '4WD',
    engine: {
      numeric: 'v8 4.4L',
      suffix: 'TWIN-TURBO',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['AUTHORITY', 'THRILL', 'CONTROL', 'CRAFTSMANSHIP'],
    amenities: {
      seats: 5,
      luggage: 5,
      doors: 4,
      zeroToSixty: '4.3s',
      horsePower: 523,
    },
    ratingData: {
      rating: 4.5,
      performance: 4,
      comfort: 5,
      design: 4,
    },
  },

  // 6. Maserati GranTurismo (Vehicle 6)
  6: {
    id: 6,
    slug: 'vehicle-6',
    range: 390,
    mpg: 21,
    story:
      'An Italian grand touring icon born from Formula 1 innovation. The Nettuno twin-turbo power unit creates an acoustic and mechanical masterpiece.',
    storyMobile:
      'An Italian grand touring icon born from F1 innovation with Nettuno twin-turbo power for an acoustic masterpiece.',
    maxSpeed: 542,
    transmission: 'AUTOMATIC\n8 - SPEED',
    mileage: '11,600',
    exteriorColor: 'GRIGIO\nLAVA',
    condition: 'MINT',
    driveTrain: 'AWD',
    engine: {
      numeric: 'v6 3.0L',
      suffix: 'NETTUNO TWIN-TURBO',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['ICONIC', 'DYNAMIC', 'REFINED', 'AGGRESSION'],
    amenities: {
      seats: 4,
      luggage: 2,
      doors: 2,
      zeroToSixty: '3.7s',
      horsePower: 542,
    },
    ratingData: {
      rating: 4.6,
      performance: 5,
      comfort: 4,
      design: 5,
    },
  },

  // 7. Porsche 911 Carrera (Vehicle 7)
  7: {
    id: 7,
    slug: 'vehicle-7',
    range: 460,
    mpg: 24,
    story:
      'The timeless definition of sports car engineering perfection. Rear-mounted boxer agility delivers instantaneous throttle response and pure driving bliss.',
    storyMobile:
      'The timeless definition of sports car perfection with rear-mounted boxer agility and instantaneous throttle response.',
    maxSpeed: 379,
    transmission: 'PDK DUAL-CLUTCH\n8 - SPEED',
    mileage: '9,450',
    exteriorColor: 'AGATE\nGREY',
    condition: 'PERFECT',
    driveTrain: 'RWD',
    engine: {
      numeric: 'BOXER 6 3.0L',
      suffix: 'TWIN-TURBO',
    },
    fuel: 'GASOLINE',
    descriptionWords: ['EXCLUSIVITY', 'ADRENALINE', 'AMBITION', 'LEGACY'],
    amenities: {
      seats: 4,
      luggage: 2,
      doors: 2,
      zeroToSixty: '3.5s',
      horsePower: 379,
    },
    ratingData: {
      rating: 4.9,
      performance: 5,
      comfort: 4,
      design: 5,
    },
  },
};
