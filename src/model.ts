import { combine, createEvent, createStore, sample } from 'effector';
import { data } from './data';
// import { dataSmall } from './dataSmall'

export const createStudentFactory = (name: string, id: string) => {
  const $checked = createStore(false);
  const check = createEvent();
  const uncheck = createEvent();

  $checked.on(check, () => true);
  $checked.on(uncheck, () => false);

  return { name, id, $checked, check, uncheck };
};

export const createStageSubjectGroupFactory = (name: string, id: string, students: { name: string; id: string }[]) => {
  const studentsModel = students.map((student) => createStudentFactory(student.name, student.id));
  const allStudentsChecks = studentsModel.map((student) => student.$checked);
  const $checked = createStore(false);
  const $students = createStore(studentsModel);
  const $isAllStudentsChecks = combine(allStudentsChecks, (eee) => eee.every((rr) => rr));

  const toggle = createEvent();

  $checked.on(toggle, (checked) => !checked);

  sample({
    clock: toggle,
    source: $checked,
    target: allStudentsChecks,
  });

  sample({
    clock: $isAllStudentsChecks,
    target: $checked,
  });

  return {
    name,
    id,
    $checked,
    toggle,
    $students,
  };
};

export const $groups = createStore(
  data.map(({ id, name, students }) => createStageSubjectGroupFactory(name, id, students))
);
