import { KEY_CODES } from "./keyboard/keycodes";
import { Action } from "./actions";

export const BINDINGS = new Map([
  [KEY_CODES.W, Action.MoveForward],
  [KEY_CODES.A, Action.MoveLeft],
  [KEY_CODES.S, Action.MoveBack],
  [KEY_CODES.D, Action.MoveRight],
  [KEY_CODES.Shift, Action.MoveDown],
  [KEY_CODES.Space, Action.MoveUp],
  [KEY_CODES.Q, Action.RollLeft],
  [KEY_CODES.E, Action.RollRight]
]);
