# F1Api TypeScript Backend Framework

The F1Api TypeScript Backend Framework is a module designed to interact with the Formula 1 API, providing functionalities to retrieve data about drivers, pit durations, and additional features for data processing.

## Class: F1Api

### Constructor
- `apiUrl`: Base URL of the Formula 1 API, defaulting to "https://api.openf1.org/v1".

### Methods

#### `async getAllDrivers(session: string): Promise<any>`
Fetches data about all drivers in a specific session.

#### `async getDriversByPits(): Promise<any>`
Fetches pit durations for drivers in the latest session.

## Functions

#### `processPitDurations(allDrivers: any[], pitDurations: { [driverNumber: string]: number }): void``
Processes pit durations for drivers and logs those with durations less than 50 seconds in the latest session.

#### `getFinnishDriversKK(allDrivers: any[]): any[]`
Filters and returns Finnish drivers with 'KK' in either their first name or last name.

## Usage

To run the program just do *tsc* in the working directory and then *npm run run:app*