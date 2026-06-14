import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Monospace label — use for package names, dependency specifiers. */
  mono?: boolean;
  /** Selected (filter) state — teal tint. */
  selected?: boolean;
  /** When provided, renders a remove affordance. */
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

/** Selectable / removable chip for compatibility, filters and dependencies. */
export function Tag(props: TagProps): JSX.Element;
