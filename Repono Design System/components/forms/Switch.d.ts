import * as React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/** Binary toggle for settings like auto-update. Track turns teal when on. */
export function Switch(props: SwitchProps): JSX.Element;
