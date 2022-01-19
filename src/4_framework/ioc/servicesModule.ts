import { ContainerModule, interfaces } from "inversify";
import { IUploadFile, IUploadFileSymbol } from "../../2_business/services";
import {
  ICryptService,
  ICryptServiceSymbol,
} from "../../2_business/services/cryptService";
import {
  ITokenService,
  ITokenServiceSymbol,
} from "../../2_business/services/tokenService";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../2_business/services/uniqueIdentefierService";
import { CryptService } from "../services/CryptService";
import { TokenService } from "../services/TokenService";
import { UniqueIdentifierService } from "../services/UniqueIdentifierService";
import { UploadFile } from "../services/UploadFileService";

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICryptService>(ICryptServiceSymbol).to(CryptService);
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceSymbol).to(
    UniqueIdentifierService
  );
  bind<ITokenService>(ITokenServiceSymbol).to(TokenService);
  bind<IUploadFile>(IUploadFileSymbol).to(UploadFile);
});
