import React from 'react';
import { useAppSelector } from '../../store/hooks';
import ClassList from './ClassList';
import ClassDetail from './ClassDetail';

const ClassesPage: React.FC = () => {
  const { selectedClass } = useAppSelector(state => state.classes);

  return (
    <div>
      {selectedClass ? <ClassDetail /> : <ClassList />}
    </div>
  );
};

export default ClassesPage;