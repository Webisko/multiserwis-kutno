import React from 'react';
import type { Course, Student } from '../../types';
import { FinanceCenter } from '../finance/FinanceCenter';

interface ManagerFinanceProps {
	courses: Course[];
	students: Student[];
}

export const ManagerFinance: React.FC<ManagerFinanceProps> = ({ courses, students }) => {
	return <FinanceCenter role="manager" courses={courses} students={students} />;
};

