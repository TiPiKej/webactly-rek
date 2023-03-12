import axios from "axios";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { ActivityResponse, ActivityShortResponse, CoordinateParameters } from "../models";
import { activityUrl } from "./api-endpoints";
import WeatherService from "./weatherService";

@Service()
class ActivityService {
    constructor(
        private readonly weatherService: WeatherService,
    ) {}

    async fetchActivity(category: string): Promise<ActivityResponse> {
        try {
            const { data } = await axios.get(activityUrl(category));
            return data;
        } catch (error) {
            throw new NotFoundError("Couldn't fetch activity data");
        }
    }

    async getCurrentActivity(coords: CoordinateParameters): Promise<ActivityShortResponse | undefined> {
        const rainInfo = await this.weatherService.getRainInfo(coords);

        const categories: string[] = rainInfo.isRaining ? (
            [ "education", "cooking", "busywork", "music" ]
        ) : (
            [ "recreational", "social", "relaxation" ]
        )

        const { activity, type } = await this.fetchActivity(categories[this.random(0, categories.length)]);

        return { activity, type };
    }

    random(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
    }
}

export default ActivityService;
