import * as dotenv from 'dotenv';
import "reflect-metadata";
import { createExpressServer, getMetadataArgsStorage, useContainer } from 'routing-controllers';
import { WeatherController } from './controllers/WeatherController';
import * as swaggerUi from 'swagger-ui-express'
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { Container } from 'typedi';

dotenv.config();

const port = process.env.PORT;
const routingControllersOptions = {
    controllers: [WeatherController],
    routePrefix: '/v1',
}

useContainer(Container);

const app = createExpressServer(routingControllersOptions);

const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
})

const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
        schemas: (schemas as any),
    },
    info: {
        title: 'Webactly Backend Assessment',
        version: '1.0.0',
    },
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// TODO dodac readme
