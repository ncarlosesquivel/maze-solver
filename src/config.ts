export interface Config {
  environment: string;
  port: number;
}

export const config: Config = {
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
};
