export interface GeneralInfo {
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

export interface TrialInfo {
  nctId: string;
  orgStudyIdInfo: OrgStudyIdInfo;
  organization: Organization;
  briefTitle: string;
  officialTitle: string;
  acronym: string;
}

export interface StudyInfo {
  generalInfo: GeneralInfo;
  trialInfo: TrialInfo;
  status: string;
  locations: string[];
}

export interface aiStudyInfo extends StudyInfo {
  icd10Code: string;
}
