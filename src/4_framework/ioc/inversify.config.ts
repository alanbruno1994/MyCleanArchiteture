import container from "../../shared/ioc/container";
import { sequelize } from "../config/conectDataBase";
import { modelsModule } from "./modelsModule";
import { operatorModule } from "./operatorModule";
import { repositoryModule } from "./repositoryModule";
import { servicesModule } from "./servicesModule";
import { useCaseModule } from "./useCaseModule";

container.bind("sequelize").toConstantValue(sequelize);
container.load(servicesModule);
container.load(repositoryModule);
container.load(useCaseModule);
container.load(operatorModule);
container.load(modelsModule);
