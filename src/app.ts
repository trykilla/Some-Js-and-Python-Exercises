/*The point of singleton is to maintain only one instance of the class, if you try to do more instances, alwways 
it's going to be the same.*/ 

class Singleton {
    private static instance: Singleton | null = null;

    private constructor() {/*Doing this you can avoid to instance the class directly*/ }

    static getInstance(): Singleton {
        if (Singleton.instance === null) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    logMessage(message: string): void {
        console.log(message);
    }
}

const firstInstance = Singleton.getInstance();
const secondInstance = Singleton.getInstance();

console.log("[!] Checking if both instances are the same...\n", firstInstance === secondInstance); // true

firstInstance.logMessage("Hello World from instance 1");
secondInstance.logMessage("Hello World from instance 2");
