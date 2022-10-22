import { Event, Store } from 'effector';

export interface GroupProps {
  name: string;
  id: string;
  $checked: Store<boolean>;
  toggle: Event<void>;
  $students: Store<StudentProps[]>;
}

export interface StudentProps {
  name: string;
  id: string;
  $checked: Store<boolean>;
  check: Event<void>;
  uncheck: Event<void>;
}

export interface Group {
  id: string;
  name: string;
  students: Student[];
}

export interface Student {
  id: string;
  name: string;
}
