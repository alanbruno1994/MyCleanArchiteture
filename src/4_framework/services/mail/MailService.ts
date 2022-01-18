import { IMailService, Input } from "../../../2_business/services";
import { Result } from "../../../shared/Result";
import nodemailer from "nodemailer";
import edge from "edge.js";
import path from "path";
import { SuccessShared } from "../../../2_business/module/success/shared/successShared";
require("dotenv").config();

export class MailService implements IMailService {
  private readonly transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    // @ts-ignore
    port: +process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async send(input: Input): Promise<Result> {
    edge.mount(path.join(__dirname, "..", "mail", "views"));
    const html = await edge.render(input.templateHTML, input.payload);
    await this.transport.sendMail({
      from: process.env.fromEmail,
      to: input.to,
      subject: input.subject,
      html,
    });
    return SuccessShared.successService();
  }
}
