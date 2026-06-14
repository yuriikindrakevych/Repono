import * as React from 'react';

/**
 * License-as-artifact props — key, semver tag, live heartbeat.
 * @startingPoint section="Registry" subtitle="License as a physical artifact" viewport="440x260"
 */
export interface LicenseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Package this license unlocks (owner/name). */
  product?: string;
  plan?: string;
  /** Semver tag, rendered as the ochre version chip. */
  version?: string;
  /** The key itself — the hero of the artifact. */
  licenseKey?: string;
  /** Activation state; drives the heartbeat colour + pulse. */
  status?: 'active' | 'idle' | 'down';
  /** Heartbeat caption, e.g. "active · 12s ago". */
  heartbeatMeta?: string;
  /** Optional right-aligned mono meta (domain, seats). */
  meta?: string;
  onCopy?: (key: string) => void;
}

/** A license rendered as a physical artifact — the brand's other signature element. */
export function LicenseCard(props: LicenseCardProps): JSX.Element;
