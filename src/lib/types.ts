import {getRandomEquation} from "./equations";

export class Curve {
    constructor(
        public label: string,
        public data: {x: number, y: number}[],
        public rgb: string = "rgb(0, 0, 0)",
    ){}
}

export class Equation {
    public constructor(public string: string, public answer: number, public operationType: string) {
    }
}

export class GameRecord {
    constructor(
        public maxLevel: number,
        public duration: number,
        public score: number,
        public date: Date,
        public equations: EquationRecord[]
    ){}
}

export class EquationRecord {
    constructor(
        public level: number,
        public equation,
        public points: number,
        public duration: number,
        public correct: boolean,
    ) {}
}

export enum Views {
    menu,
    game,
    trainingSetttings,
    training,
    stats,
    help,
}

export enum OperationTypes {
    ADDITION = 0,
    SUBTRACTION = 1,
    MULTIPLICATION = 2,
    DIVISION = 3,
}

export class EquationSettings {
    public equation: Equation = null

    setEquation(): Equation {
        this.equation = getRandomEquation(this.level, this.operationTypes)
        return this.equation
    }

    public constructor(
        public level = 1,
        public operationTypes: OperationTypes[] = [],
    ) {
        this.setEquation()
    }
}