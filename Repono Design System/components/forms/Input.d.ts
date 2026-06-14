import * as React from 'react';

/**
 * Single-line text field props. Use `mono` for keys/domains.
 * @startingPoint section="Forms" subtitle="Inputs, select, checkbox & switch" viewport="700x360"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  label?: string;
  hint?: string;
  /** Error message; also paints the field red and sets aria-invalid. */
  error?: string;
  /** Leading slot — an icon or a literal like "https://". */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Monospace input — for keys, hashes, domains. */
  mono?: boolean;
  size?: 'md' | 'lg';
}

/** Single-line text field. Use `mono` for keys/domains. */
export function Input(props: InputProps): JSX.Element;
