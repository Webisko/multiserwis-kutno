import React from 'react';
import type { Course, Student } from '../../types';
import { ReportsCenter } from '../reports/ReportsCenter';

export const ManagerReports: React.FC<{ courses: Course[]; students: Student[] }> = ({ courses, students }) => {
	return <ReportsCenter role="manager" courses={courses} students={students} />;
};

