import {Equation, OperationTypes} from "./types";

export function getRandomEquation(level: number, availableOperations: OperationTypes[]){
    const operationType = availableOperations[Math.floor(Math.random() * availableOperations.length)]

    switch (operationType) {
        case OperationTypes.ADDITION:
            return createAddition(level);
        case OperationTypes.SUBTRACTION:
            return createSubtraction(level);
        case OperationTypes.MULTIPLICATION:
            return createMultiplication(level);
        case OperationTypes.DIVISION:
            return createDivision(level);
        default:
            return createAddition(level);
    }
}

export function createAddition(level): Equation {

    let sum = Math.ceil(Math.random() * Math.pow(level, 1.8) + level + 15);

    let a = Math.ceil(Math.random() * (sum-1));
    let b = sum - a;

    return new Equation(`${a} + ${b}`, sum, "addition")
}

export function createSubtraction(level): Equation {

    let a = Math.floor(Math.random() * Math.pow(level+2, 1.4) + Math.pow(level, 1.1));

    let sum = a + Math.ceil(Math.random() * Math.pow(level+2, 1.3));

    let b = sum - a;

    return new Equation(`${sum} - ${b}`, a, "subtraction")
}

export function createMultiplication(level): Equation {

    const multiplierSum = 2 + level + Math.ceil(Math.random() * level / 2);
    const a = Math.max(Math.floor(Math.random() * (multiplierSum -3)), 2)
    const b = multiplierSum - a

    return new Equation(`${a} x ${b}`, a * b, "multiplication");
}

export function createDivision(level): Equation {
    const a = Math.floor(Math.random() * level/1.5+2);
    const b = Math.floor(Math.random() * level/1.5+2);
    const c = a * b;

    return new Equation(`${c} / ${b}`, a, "division");
}