import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'neutral' | 'success' | 'error';
  /** Optional inline action (e.g. "Undo"). */
  actionLabel?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

/** Terse action confirmation; message mirrors the action verb ("Paused"). */
export function Toast(props: ToastProps): JSX.Element;
