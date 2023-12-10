export abstract class IEnvRepository {
  abstract getAppPort(): number;
  abstract getNodeEnv(): string;
}
