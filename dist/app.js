"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class F1Api {
    constructor(apiUrl = "https://api.openf1.org/v1") {
        this.apiUrl = apiUrl;
    }
    fetchData(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlWithEndpoint = `${this.apiUrl}/${endpoint}`;
            try {
                const response = yield fetch(urlWithEndpoint);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                console.error("Error fetching data: ", error);
                throw error;
            }
        });
    }
    getAllDrivers(session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driversResponse = yield this.fetchData(session);
                return driversResponse;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getDriversByPits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pitsResponse = yield this.fetchData("pit?session_key=latest");
                const pitDurations = {};
                pitsResponse.forEach((pit) => {
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
        });
    }
}
function processPitDurations(allDrivers, pitDurations) {
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
function getFinnishDriversKK(allDrivers) {
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
    drivers.forEach((driver) => {
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
    .then((allDrivers) => {
    if (getFinnishDriversKK(allDrivers).length == 0) {
        console.log("\nNo Finnish drivers with KK in name this season");
    }
    else {
        console.log("\nFinnish drivers with KK in name:");
        getFinnishDriversKK(allDrivers).forEach((driver) => {
            console.log(`${driver.first_name} ${driver.last_name}`);
        });
    }
});
