import { Route } from '../models/route';
import * as bcrypt from 'bcryptjs';
import RouteRepository from '../schemas/route.schema';

/**
 * @class RouteService
 */
class RouteService {


    /**
     * @description Saves the route in the storage
     * @param {Route} route
     * @returns {Promise<Route>}
     */
    async save(route: Route): Promise<Route> {
        return (await new RouteRepository(route).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all routes from the storage
     * @returns {Promise<Route[]>}
     */
    async findAll(user): Promise<Route[]> {
        return await RouteRepository.find({}) as Route[];
    }

    async count(name) {
        return await RouteRepository.count({name: name});
    }

    /**
     * @description Compares encrypted and decrypted passwords
     * @param {string} candidatePassword
     * @param storedPassword
     * @returns {boolean}
     */
    comparePassword(candidatePassword: string, storedPassword): boolean {
        return bcrypt.compareSync(candidatePassword, storedPassword);
    }
    async deleteOneById(id: string): Promise<void> {
        return await RouteRepository.deleteOne({_id: id});
    }
}

export default new RouteService();
