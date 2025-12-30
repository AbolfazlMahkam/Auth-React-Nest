import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: (configService.get<string>('DB_TYPE') || 'postgres') as any,
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
  username: configService.get<string>('DB_USERNAME') || 'postgres',
  password: configService.get<string>('DB_PASSWORD') || '',
  database: configService.get<string>('DB_DATABASE') || 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
