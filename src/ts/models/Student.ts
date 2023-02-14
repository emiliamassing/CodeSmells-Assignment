class Student {
    name: string;
    handedInOnTime: boolean;
    passed: boolean;

    constructor(name: string, handedInOnTime: boolean, passed: boolean){
        this.name = name;
        this.handedInOnTime = handedInOnTime;
        this.passed = passed;
    };
};

export default Student;