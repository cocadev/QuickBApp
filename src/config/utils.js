export default class UtilService {

    static membership(check) {

        let results = null
        if (check == 3) { results = 'VIP' } 
        if (check == 2) { results = 'Premium' }
        if (check == 1) { results = 'Básico' }

        return results
    }    
}