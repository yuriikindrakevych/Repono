import * as React from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  /** Options as strings or {value,label}. Alternatively pass <option> children. */
  options?: Array<string | SelectOption>;
}

/** Native select in the Repono field shell with a custom chevron. */
export function Select(props: SelectProps): JSX.Element;
