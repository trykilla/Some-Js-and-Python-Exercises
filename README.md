# Singleton Pattern in TypeScript

The Singleton pattern is a design pattern that ensures a class has only one instance and provides a universal way to access that instance.

## Singleton Class

### Constructor
- The private constructor prevents direct instantiation of the class.

### Method

#### `static getInstance(): Singleton`
- Returns the sole instance of the class. If no instance exists, it creates one and returns it.

#### `logMessage(message: string): void`
- Prints a message to the console.

## Example Usage

```typescript
const firstInstance = Singleton.getInstance();
const secondInstance = Singleton.getInstance();

console.log("[!] Checking if both instances are the same...\n", firstInstance === secondInstance); // true

firstInstance.logMessage("Hello World from instance 1");
secondInstance.logMessage("Hello World from instance 2");
```

The `Singleton` pattern proves valuable when ensuring that only one instance of a class exists while providing a global means to access that instance.