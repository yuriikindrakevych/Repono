import * as React from 'react';

export interface TabItem { value: string; label: string; count?: number; }

/**
 * Section navigation props (the cabinet's tabs).
 * @startingPoint section="Navigation" subtitle="Section tabs with counts" viewport="700x120"
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Items as strings or {value,label,count}. */
  items: Array<string | TabItem>;
  /** Active tab value. */
  value: string;
  onChange?: (value: string) => void;
}

/** Section navigation (the cabinet's tabs). Accent underline indicator. */
export function Tabs(props: TabsProps): JSX.Element;
