import React from 'react';
import type { Course, Student } from '../../types';
import { ReportsCenter } from '../reports/ReportsCenter';

export const AdminReports: React.FC<{ courses: Course[]; students: Student[] }> = ({ courses, students }) => {
  return <ReportsCenter role="admin" courses={courses} students={students} />;
};
