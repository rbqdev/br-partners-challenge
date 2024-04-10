export enum CostumerType {
  PF = "PF",
  PJ = "PJ",
}

export type Costumer = {
  id: string;
  type: CostumerType;
  name: string;
  document: number;
  email: string;
  phone: number;
};
