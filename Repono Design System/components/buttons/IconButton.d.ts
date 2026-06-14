import * as React from 'react';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name — required; rendered as aria-label + title. */
  label: string;
  /** Inline SVG icon. */
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Show a hairline border + card background (use in toolbars). */
  bordered?: boolean;
}

/** Square icon-only control for toolbars, table rows and dismiss actions. */
export function IconButton(props: IconButtonProps): JSX.Element;
