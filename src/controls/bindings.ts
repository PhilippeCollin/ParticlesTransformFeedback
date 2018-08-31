import { KeyCodes } from "./keyboard/keycodes";
import { Action } from "./actions";

export const Bindings = new Map([
   [ KeyCodes.W, Action.MoveForward ],
   [ KeyCodes.A, Action.MoveLeft ],
   [ KeyCodes.S, Action.MoveBack ],
   [ KeyCodes.D, Action.MoveRight ],
   [ KeyCodes.Ctrl, Action.MoveDown ],
   [ KeyCodes.Space, Action.MoveUp ],
   [ KeyCodes.Q, Action.RollLeft ],
   [ KeyCodes.E, Action.RollRight ],
]);