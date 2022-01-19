import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import { SuccessShared } from "../../2_business/module/success/shared/successShared";
import { IUploadFile } from "../../2_business/services";
import { Result } from "../../shared/Result";
import { injectable } from "inversify";

@injectable()
export class UploadFile implements IUploadFile {
  async upload(file: any): Promise<Result> {
    try {
      // @ts-ignore
      const archive = file;
      const name = Date.now() + ".png";
      archive.mv("./uploads/" + name);
      return SuccessShared.successService({ name });
    } catch (error) {
      console.log(error);
      return ErrosShared.errorNotUpload();
    }
  }
}
