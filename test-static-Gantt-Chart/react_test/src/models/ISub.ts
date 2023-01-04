export interface Isub {
  id: number;
  title: string;
  period_start: string;
  period_end: string;
  sub?: Isub[];
  opened: boolean;
}
