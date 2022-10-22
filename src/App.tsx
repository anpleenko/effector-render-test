import { ChangeEvent, FC, useCallback } from 'react';
import { useEvent, useList, useStore } from 'effector-react';
import { GroupProps, StudentProps } from './interfaces';
import { $groups } from './model';

const Student: FC<StudentProps> = ({ name, $checked, check, uncheck, id }) => {
  const checked = useStore($checked);
  const checkFx = useEvent(check);
  const uncheckFx = useEvent(uncheck);

  const handleClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        checkFx();
      } else {
        uncheckFx();
      }
    },
    [checkFx, uncheckFx]
  );

  return (
    <div className="ml-2">
      <input type="checkbox" checked={checked} onChange={handleClick} id={id} />
      <label htmlFor={id} className="ml-1">
        {name}
      </label>
    </div>
  );
};

const Group: FC<GroupProps> = ({ id, name, $checked, toggle, $students }) => {
  const checked = useStore($checked);
  const toggleFn = useEvent(toggle);
  const students = useList($students, (student) => <Student {...student} />);

  return (
    <div className="m-2">
      <input type="checkbox" checked={checked} onChange={toggleFn} id={id} />
      <label htmlFor={id} className="ml-1">
        {name}
      </label>
      {students}
    </div>
  );
};

export const App = () => {
  return useList($groups, (group) => <Group {...group} />);
};
