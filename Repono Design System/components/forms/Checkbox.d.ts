import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: string;
}

/** Square checkbox; teal fill when checked. Pairs label + optional description. */
export function Checkbox(props: CheckboxProps): JSX.Element;
