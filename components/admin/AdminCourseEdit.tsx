import type { Course } from '../../types';
import { CourseEditPage } from '../panel/CourseEditPage';

interface AdminCourseEditProps {
  course: Course | null;
  onBack: () => void;
  onSave: (course: Course) => void;
  onPreview: (courseId: string) => void;
  intent?: 'create' | 'edit';
}

export const AdminCourseEdit: React.FC<AdminCourseEditProps> = ({ course, onBack, onSave, onPreview, intent }) => {
  return (
    <CourseEditPage
      course={course}
      onBack={onBack}
      onSave={onSave}
      onPreview={onPreview}
      mode="admin"
      intent={intent}
    />
  );
};
