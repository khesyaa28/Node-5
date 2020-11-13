const db = require("../../config/connection");

module.exports = {
  serviceAddUser: (data, callBack) => {
    db.query(
      `insert into regist(firstName, lastName, gender, email, password, number,id)
                values (?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, result) => {
        if (error) {
          return callBack(error);
        } else {
            return callBack(null, result);
        }
    }
    )
},
serviceGetUsers: callBack => {
    db.query(`select * from regist`, [], (err, results, fields) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, results);
      }
    });
  },
  serviceDeleteUser: (data, callBack) => {
    db.query(
      `select * from regist where id=?`,
      [data],
      (err, result) => {
        if (err) {
          callBack(err);
        }
        if (!result) {
          callBack(result);
          // console.log(result)
        } else {
          db.query(`delete from registration where id=?`, [data]);
          // console.log(results)
          return callBack(null, result[0]);
        }
      }
    );
  },
  serviceUpdateUser: (data, callBack) => {
    db.query(
      `update regist set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=? `,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
(err, results) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, results);
        }
      }
    );
  }
};
