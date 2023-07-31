import { MedicalCondition, MedicalConditions } from '../../shared/typings/awsService.typing';
import { StudyInfo, StudyInfoComplete } from '../../shared/typings/trial.typing';
import * as fs from 'fs';

export class AIService {
  public addIcdCodes(studies: StudyInfo[]): StudyInfoComplete[] {
    let completeStudies: StudyInfoComplete[] = [];
    studies.forEach((study) => {
      const icdCodes: string[] = this.getIcdCodes(study);
      completeStudies.push({ ...study, icdCodes: icdCodes });
    });
    return completeStudies;
  }

  public getIcdCodes(study: StudyInfo): string[] {
    let icdCodes: string[] = [];
    study.conditionsInfo.conditions.forEach((condition) => {
      const processedCondition = this.preProcessConditions(condition);
      const outputMedicalConditions = this.requestMedicalConditions(processedCondition);
      if (outputMedicalConditions !== undefined) {
        outputMedicalConditions.forEach((medicalCondition) => {
          icdCodes.push(this.processMedicalCondition(medicalCondition));
        });
      } else {
        icdCodes.push('Condition has not been found');
      }
    });
    return icdCodes;
  }

  public processMedicalCondition(medicalCondition: MedicalCondition): string {
    const icdCode = medicalCondition.ICD10CMConcepts[0].Code;
    return icdCode.substring(0, icdCode.indexOf('.'));
  }

  public requestMedicalConditions(condition: string): MedicalConditions | undefined {
    const jsonString = fs.readFileSync('src/shared/information/cond_to_IDC_raw_BE_NL.json', 'utf-8');
    const jsonObject = JSON.parse(jsonString);
    try {
      return jsonObject[condition];
    } catch {
      return;
    }
  }

  public preProcessConditions(condition: string): string {
    return condition.toLowerCase().replace('(', ' ').replace(')', ' ').replace('\t', ' ').trim();
  }
}
