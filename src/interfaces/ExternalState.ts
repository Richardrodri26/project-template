export interface IExternalState<T> {
  state: T;
  setter: (data: T) => void;
}
