import React from 'react';
import type { Course, Student } from '../../types';
import { ReportsCenter } from '../reports/ReportsCenter';

export const GuardianReports: React.FC<{ courses: Course[]; students: Student[]; forcedCompany: string }> = ({
  courses,
  students,
  forcedCompany,
}) => {
  return <ReportsCenter role="guardian" courses={courses} students={students} forcedCompany={forcedCompany} />;
};
