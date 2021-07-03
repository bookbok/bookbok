import { State } from 'app/modules';
import 'react-redux';

declare module 'react-redux' {
  export interface DefaultRootState extends State {}
}
