class F1Api {
    private apiUrl: string;


    constructor(apiUrl: string = "https://api.openf1.org/v1") {
        this.apiUrl = apiUrl;

    }

    private async fetchData(endpoint: string): Promise<any> {
        const urlWithEndpoint = `${this.apiUrl}/${endpoint}`;

        try {
            const response = await fetch(urlWithEndpoint);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }



    async getAllDrivers(session: string): Promise<any> {
        try {
            const driversResponse = await this.fetchData(session);

            return driversResponse;
        }
        catch (error) {
            throw error;
        }
    }


    async getDriversByPits(): Promise<any> {
        try {
            const pitsResponse = await this.fetchData("pit?session_key=latest");

            const pitDurations: { [driverNumber: string]: number } = {};

            pitsResponse.forEach((pit: any) => {
                const driverNumber = pit.driver_number;
                const pitDuration = pit.pit_duration;

                if (!pitDurations[driverNumber]) {
                    pitDurations[driverNumber] = 0;
                }

                pitDurations[driverNumber] += pitDuration;
            });


            return pitDurations;
        }
        catch (error) {
            throw error;
        }
    }

}

function processPitDurations(allDrivers: any[], pitDurations: { [driverNumber: string]: number }): void {
    const filteredDrivers = allDrivers.filter((driver) => {
        const driverNumber = driver.driver_number;
        const pitDuration = pitDurations[driverNumber];

        driver.pit_duration = pitDuration;

        return pitDuration !== undefined && pitDuration < 50;
    });

    console.log("Drivers with pit duration < 50s in latest session:");
    filteredDrivers.forEach((filteredDriver) => {
        console.log(`${filteredDriver.first_name} ${filteredDriver.last_name}`);
    });

}

function getFinnishDriversKK(allDrivers: any[]): any[] {
    const filteredDrivers = allDrivers.filter((driver) => {
        const firstName = driver.first_name || '';
        const lastName = driver.last_name || '';

        const kkInName = (firstName.toLowerCase().includes('kk') || lastName.toLowerCase().includes('kk'));
        return kkInName && driver.country_code === 'FIN';
    });

    return filteredDrivers;
}



const f1Api = new F1Api();

const spanishDrivers = f1Api.getAllDrivers("drivers?session_key=latest&country_code=ESP");

spanishDrivers.then((drivers) => {
    console.log(`Spanish drivers:`);
    drivers.forEach((driver: any) => {
        console.log(`${driver.first_name} ${driver.last_name}`);
    });
    console.log("\n");
});



const allDriversLastSessionPromise = f1Api.getAllDrivers("drivers?session_key=latest");
const pitDurationsPromise = f1Api.getDriversByPits();

Promise.all([allDriversLastSessionPromise, pitDurationsPromise])
    .then(([allDrivers, pitDurations]) => {
        processPitDurations(allDrivers, pitDurations);
    })
    .catch((error) => {
        console.error(error);
    });



const allDriversPromise = f1Api.getAllDrivers("drivers");

allDriversPromise
    .then((allDrivers: any[]) => {
        if (getFinnishDriversKK(allDrivers).length == 0) {
            console.log("\nNo Finnish drivers with KK in name this season");
        } else {
            console.log("\nFinnish drivers with KK in name:");
            getFinnishDriversKK(allDrivers).forEach((driver) => {
                console.log(`${driver.first_name} ${driver.last_name}`);
            });
        }
    });








