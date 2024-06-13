// src/types/Modification.ts
export interface Resources {
  [key: string]: number;
}

export interface Modification {
  Modification: string;
  Type: string;
  Slot: string;
  Resources: Resources;
}

// TODO: Add tracked modifications
