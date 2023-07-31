import mockdate from 'mockdate';
import { addDays, addHours } from 'date-fns';
export const setFixtureDate = (daysOffset = 0) =>
  mockdate.set(addDays(new Date('2022-01-07T12:00:00.000Z'), daysOffset));

export const setFixtureDateHours = (hoursOffset = 0) =>
  mockdate.set(addHours(new Date('2022-01-07T12:00:00.000Z'), hoursOffset));
