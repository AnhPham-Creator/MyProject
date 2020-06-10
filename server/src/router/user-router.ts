import Controller from '../controller/user-controller'
import { validatormiddleware } from '../middleware/validator.middleware'

export const Routes = (app: any): void => {

    let UserController = new Controller()

    app.route('/api/users')
        .get(UserController.init)
        .post(validatormiddleware, UserController.createUser)

    app.route('/api/users/:userId')
        .get(UserController.getUserDetail)
        .delete(UserController.deleteUser)
        .put(validatormiddleware, UserController.updateUser)

    app.route('/api/roles')
        .get(UserController.getRoles)

}