import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { readEnvFile } from './utils/readFileEnv'
interface env {
  PORT?: string
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const env: env = readEnvFile(
    process.cwd() + `/.${process.env.NODE_ENV || 'development'}.env`,
  )
  const port = env.PORT || 3664
  await app.listen(port)
}
bootstrap()
