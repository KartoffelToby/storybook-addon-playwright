import React, { memo, ComponentType } from 'react';
import { ControlProps } from '../../typings';
import { FormControl } from './FormControl';

const Control: React.FC<ControlProps & Partial<ComponentType>> = memo(
  (props) => {
    const {
      label,
      description,
      appendValueToTitle,
      onAppendValueToTitle,
      isRequired,
      value,
      defaultValue,
    } = props;

    return (
      <FormControl
        label={label}
        appendValueToTitle={appendValueToTitle}
        onAppendValueToTitle={onAppendValueToTitle}
        description={description}
        isRequired={isRequired}
        active={
          defaultValue !== value &&
          value !== undefined &&
          value !== '' &&
          value !== false
        }
      >
      </FormControl>
    );
  },
);

Control.displayName = 'Control';

export { Control };
