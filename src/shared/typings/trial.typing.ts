export interface ConditionsInfo {
  conditions: string[];
  keywords: string[];
}

export interface OrgStudyIdInfo {
  id: string;
}

export interface Organization {
  fullName: string;
  class: string;
}

export interface GeneralInfo {
  nctId: string;
  orgStudyIdInfo: OrgStudyIdInfo;
  organization: Organization;
  briefTitle: string;
  officialTitle: string;
  acronym: string;
}

type Location = {
  facility: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export interface StudyInfo {
  generalInfo: GeneralInfo;
  conditionsInfo: ConditionsInfo;
  status: string;
  locations: Location[];
}

export interface StudyInfoComplete extends StudyInfo {
  icdCodes: string[];
}
