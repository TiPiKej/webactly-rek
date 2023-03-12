# Webactly Backend Assessment

## How to run

1. Install npm and node on your computer [link to NodeJS (npm is included)](https://nodejs.org/en/)
1. Install dependencies `npm i`
1. Run project `npm start`

## Documentation

Documentation is provided as Swagger format: availible at `/docs`

## Functionality

### Check if is raining

Available at `/v1/isitraining?lon={lon}&lat={lat}`
> `{lon}` replace by longitude decimal degrees, eg. `19.93658` \
> `{lat}` replace by latitude decimal degrees, eg. `50.06143`

Endpoint returns information if is raining right now at the specified coordinates

Type of returning data:
```json
{
  "isRaining": boolean,
  "hourRainingMm": number // optional, returning when "isRaining" is true
}
```

Data comes from [openweathermap.org](https://openweathermap.org/)

### Check what to do

Available at `/v1/whattodo?lon={lon}&lat={lat}`
> `{lon}` replace by longitude decimal degrees, eg. `19.93658` \
> `{lat}` replace by latitude decimal degrees, eg. `50.06143`

Endpoint returns activity based on whether it is raining right now at the specified coordinates

* If is raining - activity is from categories: `[ "education", "cooking", "busywork", "music" ]`
* If is not raining - activity is from categories: `[ "recreational", "social", "relaxation" ]`

Type of returning data:
```json
{
  "activity": string,
  "type": string
}
```

Data comes from [openweathermap.org](https://openweathermap.org/) and [boredapi.com](http://www.boredapi.com/)
