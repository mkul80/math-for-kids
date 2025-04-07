export enum Operation {
  Addition = 'addition',
  Subtraction = 'subtraction',
  // Multiplication = 'multiplication',
  // Division = 'division',
}

export const getOperationSymbol = (operation: Operation): string => {
  const symbolMap: Record<Operation, string> = {
    [Operation.Addition]: '+',
    [Operation.Subtraction]: '-',
    // [Operation.Multiplication]: '×',
    // [Operation.Division]: '÷',
  };
  return symbolMap[operation];
};
