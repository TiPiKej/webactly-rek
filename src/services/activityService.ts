import axios from "axios";
import { Service } from "typedi";
import { ActivityResponse, CoordinateParameters } from "../models";
import { activityUrl } from "./api-endpoints";
import WeatherService from "./weatherService";

@Service()
class ActivityService {
    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    async getCurrentActivity(coords: CoordinateParameters): Promise<ActivityResponse | undefined> {
        const rainInfo = await this.weatherService.getRainInfo(coords);

        const categories: string[] = rainInfo.isRaining ? (
            [ "education", "cooking", "busywork", "music" ]
        ) : (
            [ "recreational", "social", "relaxation" ]
        )

        const drawnCategory = categories[this.random(0, categories.length)]
        console.log(drawnCategory)

        try {
            const { data } = await axios.get(activityUrl(drawnCategory));
            return data;
        } catch (error) {
            console.log("error: ", error)
            // TODO obsluga bledow
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

    random(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
    }
}

export default ActivityService;
