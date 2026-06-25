import {
  DynamicModule,
  Global,
  Module,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseProviders } from './database.provider';
import { databaseEntities } from './database.entities';

@Global()
@Module({})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private dataSource: DataSource) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('🚀 Database connected successfully!');
    } else {
      this.logger.error('❌ Database connection failed!');
    }
  }
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              database: configService.get<string>('database.database'),
              entities: databaseEntities,
              synchronize: configService.get<boolean>('database.synchronize'),
              logging: configService.get<boolean>('database.logging'),
              migrations: [__dirname + '/migration/*{.ts,.js}'],
              migrationsRun: true,
            };
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(databaseEntities),
      ],
      providers: databaseProviders,
      exports: [TypeOrmModule, ...databaseProviders],
    };
  }
}
