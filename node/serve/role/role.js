const con = require('../../db/db');
let role_list = 'select * from role_list';

class RoleService {
   async findAll() {
        let senddata = []
       let resdata = await con.query(role_list, (err, result) => { 
            console.log(1)
            if(err){
                console.log(err.message);
            }
            else {
                return result
            }
       })
       console.log(resdata)
        console.log(2)
        return senddata
    }
}
module.exports = new RoleService()