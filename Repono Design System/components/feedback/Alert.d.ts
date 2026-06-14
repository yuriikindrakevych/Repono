import * as React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'info' | 'warn' | 'error';
  /** Inline SVG icon. */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  /** Explanation — what happened and how to fix it. */
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Inline banner for screen-level states (payment failed, update available). */
export function Alert(props: AlertProps): JSX.Element;
