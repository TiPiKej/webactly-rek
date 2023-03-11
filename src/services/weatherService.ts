import axios from "axios";
import { Service } from "typedi";
import { CoordinateParameters, RainingResponse, WeatherResponse } from "../models";
import { weatherUrl } from './api-endpoints';

@Service()
class WeatherService {
    private readonly apiKey: string;

    constructor() {
        this.apiKey = process.env.OPEN_WEATHER_API_KEY;
    }

    async getCurrentWeather(coords: CoordinateParameters): Promise<WeatherResponse | undefined> {
        try {
            const { data } = await axios.get(weatherUrl(coords.lat, coords.lon, this.apiKey));
            return data;
        } catch (error) {
            console.log("error: ", error)
            if (axios.isAxiosError(error)) {
                // handleAxiosError(error);
                console.log('axios error')
            } else {
                // handleUnexpectedError(error);
                console.log('unexpected error')
            }
        }

        return;
    }

    async getCurrentRainInfo(coords: CoordinateParameters): Promise<RainingResponse | undefined> {
        const data = await this.getCurrentWeather(coords);
        const { rain } = data.current;

        if (!rain) return {
            isRaining: false,
        }

        return {
            isRaining: true,
            hourRainingMm: rain["1h"],
        }
    }
}

export default WeatherService;
