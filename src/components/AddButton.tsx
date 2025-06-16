import * as React from 'react';
import { Button } from 'react-native-paper';

type Props = {
  label: string;
  onPress: () => void;
  icon?: string;
  mode?: 'text' | 'outlined' | 'contained';
  style?: object;
  labelStyle?: object;
  isDisabled?: boolean;
};

const AddButton = ({label, onPress, icon, mode, style, labelStyle,isDisabled} : Props) => (
  <Button icon={icon} mode={mode} onPress={onPress} style={style} labelStyle={labelStyle} disabled={isDisabled}>
    {label}
  </Button>
);

export default AddButton;