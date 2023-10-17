/* eslint-disable react/react-in-jsx-scope */
import { Icon } from '@ui-kitten/components';
import { Colors } from '../../constants';

export const AddIcon = (props: any) => (
  <Icon
    {...props}
    name="plus"
    fill={Colors.default.white}
    height="40"
    width="40"
  />
);

export const BackIcon = (props: any) => (
  <Icon
    {...props}
    name="arrow-back-outline"
    fill={Colors.default.primary}
    height="24"
    width="24"
  />
);

export const CalenderIcon = (props: any) => (
  <Icon
    {...props}
    name="calendar-outline"
    fill={Colors.default.primary}
    height="25"
    width="25"
  />
);

export const TrashIcon = (props: any) => (
  <Icon
    {...props}
    name="trash-outline"
    fill={Colors.default.red}
    height="25"
    width="25"
  />
);
