export interface ConfigOption<T> {
  value: T;
  labelKey: string;
}

export interface Step<T> {
  options: ConfigOption<T>[];
  labelKey: string;
}

export interface Config {
  steps: Step<any>[];
}
