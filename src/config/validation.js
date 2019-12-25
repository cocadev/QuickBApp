import { showMessage } from "react-native-flash-message";

export default class ValidationService {

    static register_busca(category, subcat, agregar, location) {

        let errors = null
        if (!location) { errors = 'Location is null' }
        if (!agregar) { errors = 'Agregar is null' }
        if (!subcat) { errors = 'Subcat is null' }
        if (!category) { errors = 'Category is null' }

        if(errors){
            showMessage({
                message: "Fail",
                description: errors,
                type: "danger",
                icon: "danger",
            });
            return true
        }else {
            return false
        }
    }

    static register_subcat(category) {

        let errors = null
        if (!category) { errors = 'Please select category' }

        if(errors){
            showMessage({
                message: "Fail",
                description: errors,
                type: "danger",
                icon: "danger",
            });
            return true
        }else {
            return false
        }
    }

    static register_agregar(nombre, horarios, time, dirección, telefono) {

        let errors = null
        if (!telefono) { errors = 'Please select telefono' }
        if (!dirección) { errors = 'Please select dirección' }
        if (!time) { errors = 'Please select time' }
        if (!horarios) { errors = 'Please select horarios' }
        if (!nombre) { errors = 'Please select nombre' }

        if(errors){
            showMessage({
                message: "Fail",
                description: errors,
                type: "danger",
                icon: "danger",
            });
            return true
        }else {
            return false
        }
    }

    static register_verification(nombre, apellido, género, dirección, estado, municipio, telefónico, email, curp) {

        let errors = null
        if (!curp) { errors = 'Please select curp' }
        if (!email) { errors = 'Please select email' }
        if (!telefónico) { errors = 'Please select telefónico' }
        if (!municipio) { errors = 'Please select municipio' }
        if (!dirección) { errors = 'Please select dirección' }
        if (!estado) { errors = 'Please select estado' }
        if (!apellido) { errors = 'Please select apellido' }
        if (!nombre) { errors = 'Please select nombre' }

        if(errors){
            showMessage({
                message: "Fail",
                description: errors,
                type: "danger",
                icon: "danger",
            });
            return true
        }else {
            return false
        }
    }

    static register_payment(check) {

        let errors = null
        if (check == 0) { errors = 'Please select payment gateway' }

        if(errors){
            showMessage({
                message: "Fail",
                description: errors,
                type: "danger",
                icon: "danger",
            });
            return true
        }else {
            return false
        }
    }

    

    


    
}