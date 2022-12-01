import { Run } from "./activities/run";
import { Snowboarding } from "./activities/snowboarding";
import { VirtualRun } from "./activities/virtualRun";
import { Walk } from "./activities/walk";

export type Activities = Run | Snowboarding | Walk | VirtualRun;
