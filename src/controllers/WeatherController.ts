import { Param, Body, Get, Post, Put, Delete, QueryParams, JsonController, QueryParam, Params } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi/build/decorators';
import { Service } from 'typedi';
import { ActivityResponse, CoordinateParameters, RainingResponse } from '../models';
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
    @Get('/whattodo')
    async getActivityInfo(@QueryParams() coords: CoordinateParameters): Promise<ActivityResponse | undefined> {
        return this.activityService.getCurrentActivity(coords);
    }
}
