import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { dataSourceOptions } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './resources/auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './resources/user/user.module';
import { DepartmentModule } from './resources/department/department.module';
import { SubdepartmentModule } from './resources/subdepartment/subdepartment.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/config/database/schema.gql'),
      playground: true,
      csrfPrevention: false,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    CoreModule,
    UserModule,
    DepartmentModule,
    SubdepartmentModule,
  ],
})
export class AppModule {}
