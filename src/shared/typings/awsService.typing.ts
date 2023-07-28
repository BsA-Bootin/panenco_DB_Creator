export type Attribute = {
  Type: string;
  Score: number;
  RelationshipScore: number;
  Id: number;
  BeginOffset: number;
  EndOffset: number;
  Text: string;
  Traits: any[]; // You can replace 'any' with a specific type if needed
};

export type Trait = {
  Name: string;
  Score: number;
};

export type ICD10CMConcept = {
  Description: string;
  Code: string;
  Score: number;
};

export type MedicalCondition = {
  Id: number;
  Text: string;
  Category: string;
  Type: string;
  Score: number;
  BeginOffset: number;
  EndOffset: number;
  Attributes: Attribute[];
  Traits: Trait[];
  ICD10CMConcepts: ICD10CMConcept[];
};

export type MedicalConditions = [MedicalCondition];
