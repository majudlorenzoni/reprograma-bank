import { DataSource } from 'typeorm';
import { Conta } from './domain/entities/conta.entity';
import { Cliente } from './domain/entities/cliente.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', 
  port: 5432,
  database: 'reprogramabank',
  username: 'reprograma8',
  password: 'repro',
  entities: [Conta, Cliente],
  synchronize: true, 
});

async function testConnection() {
  try {
    await AppDataSource.initialize();
    console.log('Banco de dados conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

testConnection();
