import type { LucideIcon } from 'lucide-react';
import { Route, Package, Truck, Warehouse, HardHat, Layers } from 'lucide-react';

export type SolutionId =
  | 'autoLiability'
  | 'cargo'
  | 'physicalDamage'
  | 'generalLiability'
  | 'workersComp'
  | 'umbrella';

/**
 * Presentation metadata for the six lines. Copy lives in translations; the
 * `layout` key drives the asymmetric grid so no two neighbours share a shape.
 */
export const solutions: { id: SolutionId; icon: LucideIcon; layout: 'feature' | 'tall' | 'wide' | 'compact' }[] = [
  { id: 'autoLiability', icon: Route, layout: 'feature' },
  { id: 'cargo', icon: Package, layout: 'tall' },
  { id: 'physicalDamage', icon: Truck, layout: 'compact' },
  { id: 'generalLiability', icon: Warehouse, layout: 'wide' },
  { id: 'workersComp', icon: HardHat, layout: 'compact' },
  { id: 'umbrella', icon: Layers, layout: 'wide' },
];

export const solutionIds = solutions.map((s) => s.id);
