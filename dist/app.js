"use strict";
class Singleton {
    constructor() { }
    static getInstance() {
        if (Singleton.instance === null) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    logMessage(message) {
        console.log(message);
    }
}
Singleton.instance = null;
const firstInstance = Singleton.getInstance();
const secondInstance = Singleton.getInstance();
console.log("[!] Checking if both instances are the same...\n", firstInstance === secondInstance); // true
firstInstance.logMessage("Hello World from instance 1");
secondInstance.logMessage("Hello World from instance 2");
