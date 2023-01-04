interface I_row {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
  child: I_row[];
}

interface changedRows {
  changed: I_row[];
  current: I_row;
}

export type { I_row, changedRows };
