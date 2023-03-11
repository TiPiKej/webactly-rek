const excludeParts: ("current" | "minutely" | "hourly" | "daily" | "alerts")[] = [
    "minutely",
    "hourly",
    "daily",
    "alerts",
];

const unitsOfMeasurement: "standard" | "metric" | "imperial" = "metric";

const weatherUrl = (lat: number, lon: number, apiKey: string) => {
    const url = new URL("https://api.openweathermap.org/data/3.0/onecall");

    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lon.toString());
    url.searchParams.set("exclude", excludeParts.join(","));
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", unitsOfMeasurement);

    return url.toString();
}

export {
    weatherUrl,
};
