import * as React from 'react';

export interface VersionChange {
  type: 'added' | 'fixed' | 'changed' | 'removed';
  text: string;
}
export interface Release {
  version: string;
  date: string;
  channel?: 'stable' | 'rc' | 'beta';
  summary: string;
  changes?: VersionChange[];
}

/**
 * Release history props. Hairlines encode structure; rows expand to a changelog.
 * @startingPoint section="Registry" subtitle="Release history with expandable changelog" viewport="700x320"
 */
export interface VersionTableProps extends React.HTMLAttributes<HTMLDivElement> {
  releases: Release[];
  /** Index of the row expanded on mount (default 0). Pass null for all closed. */
  defaultOpen?: number | null;
}

/** Release history. Hairlines encode the structure; rows expand to a changelog. */
export function VersionTable(props: VersionTableProps): JSX.Element;
