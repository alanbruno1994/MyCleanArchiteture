import { ContainerModule, interfaces } from "inversify";
import {
  ICryptService,
  ICryptServiceSymbol,
} from "../../2_business/services/cryptService";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../2_business/services/uniqueIdentefierService";
import { CryptService } from "../services/CryptService";
import { UniqueIdentifierService } from "../services/UniqueIdentifierService";

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICryptService>(ICryptServiceSymbol).to(CryptService);
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceSymbol).to(
    UniqueIdentifierService
  );
});
