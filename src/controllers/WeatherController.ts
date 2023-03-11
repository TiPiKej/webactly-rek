import { Param, Body, Get, Post, Put, Delete, QueryParams, JsonController, QueryParam, Params } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi/build/decorators';
import { Service } from 'typedi';
import { CoordinateParameters, RainingResponse } from '../models';
import { WeatherService } from '../services';

@JsonController()
@Service()
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
    ) { }

    @OpenAPI({
        description: 'Check if is raining',
        parameters: [
            { name: "lat", example: 50.06143, in: "query", description: "Decimal degrees latitude" },
            { name: "lon", example: 19.93658, in: "query", description: "Decimal degrees longitude" }
        ]
    })
    @Get('/isitraining')
    async getAll(@QueryParams() coords: CoordinateParameters): Promise<RainingResponse | undefined> {
        return this.weatherService.getCurrentRainInfo(coords);
    }
}
