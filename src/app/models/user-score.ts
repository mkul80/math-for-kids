type FixedLengthArray<T, L extends number> = [T, ...T[]] & { length: L };

export type UserScore = FixedLengthArray<number, 3>;
