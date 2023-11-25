import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
 
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploadedFiles'),
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'george@123',
          database: 'enginenew',
          typeCast: function (field: any, next: any) {
            if (field.type == 'TINY' && field.length == 1) {
              return field.string() == '1'; // 1 = true, 0 = false
            }
            if (field.type === 'JSON') {
              return JSON.parse(field.string());
            }
            return next();
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
