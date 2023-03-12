import { Get, QueryParams, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi/build/decorators';
import { Service } from 'typedi';
import { ActivityShortResponse, CoordinateParameters, RainingResponse } from '../models';
import { WeatherService } from '../services';
import ActivityService from '../services/activityService';

@JsonController()
@Service()
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
        private readonly activityService: ActivityService,
    ) { }

    @OpenAPI({
        description: 'Check if is raining',
        parameters: [
            { name: "lat", example: 50.06143, in: "query", description: "Decimal degrees latitude" },
            { name: "lon", example: 19.93658, in: "query", description: "Decimal degrees longitude" }
        ]
    })
    @ResponseSchema(RainingResponse)
    @Get('/isitraining')
    async getRainingInfo(@QueryParams() coords: CoordinateParameters): Promise<RainingResponse | undefined> {
        return this.weatherService.getRainInfo(coords);
    }

    @OpenAPI({
        description: 'Check what to do',
        parameters: [
            { name: "lat", example: 50.06143, in: "query", description: "Decimal degrees latitude" },
            { name: "lon", example: 19.93658, in: "query", description: "Decimal degrees longitude" }
        ]
    })
    @ResponseSchema(ActivityShortResponse)
    @Get('/whattodo')
    async getActivityInfo(@QueryParams() coords: CoordinateParameters): Promise<ActivityShortResponse | undefined> {
        return this.activityService.getCurrentActivity(coords);
    }
}
