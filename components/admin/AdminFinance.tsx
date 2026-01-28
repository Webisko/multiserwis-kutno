import React from 'react';
import type { Course, Student } from '../../types';
import { FinanceCenter } from '../finance/FinanceCenter';

export const AdminFinance: React.FC<{ courses: Course[]; students: Student[] }> = ({ courses, students }) => {
  return <FinanceCenter role="admin" courses={courses} students={students} />;
};
