import app from './app';
import { AppDataSource } from './config/postgres';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Base de datos conectada");
        app.listen(6505, () => {
            console.log("Server activo en el puero 6505");
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }

}

main();