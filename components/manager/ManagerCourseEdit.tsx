import type { Course } from '../../types';
import { CourseEditPage } from '../panel/CourseEditPage';

interface ManagerCourseEditProps {
	course: Course | null;
	onBack: () => void;
	onSave: (course: Course) => void;
	onDelete: (courseId: string) => void;
	onPreview: (courseId: string) => void;
	intent?: 'create' | 'edit';
}

export const ManagerCourseEdit: React.FC<ManagerCourseEditProps> = ({
	course,
	onBack,
	onSave,
	onDelete,
	onPreview,
	intent
}) => {
	return (
		<CourseEditPage
			course={course}
			onBack={onBack}
			onSave={onSave}
			onPreview={onPreview}
			onDelete={onDelete}
			mode="manager"
			intent={intent}
		/>
	);
};

