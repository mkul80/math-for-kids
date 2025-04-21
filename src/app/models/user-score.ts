type FixedLengthArray<T, L extends number> = [T, ...T[]] & { length: L };

type UserScore = FixedLengthArray<number, 3>;
