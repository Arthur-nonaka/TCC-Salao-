const { db } = require("./Database.js");

//CODIGO DO USUARIO

async function getUserCode(email) {
  const [userCode] = await db.query(
    "SELECT usu_codigo FROM usuario WHERE usu_email = ?",
    [email]
  );
  return userCode[0].usu_codigo;
}

//CLIENTES QUERY

async function getClients(email) {
  const [rows] = await db.query(
    "SELECT cli_codigo As id,cli_nome,cli_telefone FROM cliente C, usuario U WHERE C.usu_codigo = U.usu_codigo AND usu_email = ?",
    [email]
  );
  return rows;
}
async function deleteClient(code) {
  await db.query("DELETE FROM cliente WHERE cli_codigo = ?", [code]);
}

async function editClient(name, fone, code) {
  await db.query(
    "UPDATE cliente SET cli_nome = ?, cli_telefone = ? WHERE cli_codigo = ?",
    [name, fone, code]
  );
}

async function verifyClientEqual(name, email) {
  const [rows] = await db.query(
    "SELECT * FROM cliente C, usuario U WHERE C.usu_codigo = U.usu_codigo && cli_nome = ? && usu_email = ?",
    [name, email]
  );
  if (rows.length === 0) {
    return false;
  } else {
    return true;
  }
}
async function registerClient(name, fone, userCode) {
  await db.query(
    "INSERT INTO cliente (cli_nome, cli_telefone, usu_codigo) VALUES (?, ?, ?)",
    [name, fone, userCode]
  );
}

// USUARIOS QUERY

async function getUserPassword(email) {
  const [password] = await db.query(
    "SELECT usu_senha FROM usuario WHERE usu_email = ?",
    [email]
  );
  return password[0].usu_senha;
}

async function verifyUserEqual(email) {
  const [rows] = await db.query("SELECT * FROM usuario WHERE usu_email = ?", [
    email,
  ]);
  if (rows.length === 0) {
    return false;
  } else {
    return true;
  }
}

async function registerUser(name, email, hash, salonName) {
  await db.query(
    "INSERT INTO usuario (usu_nome, usu_email, usu_senha, usu_nomeSalao) VALUES (?, ?, ?,?)",
    [name, email, hash, salonName]
  );
}

//PRODUTOS QUERY

async function getProducts(email) {
  const [rows] = await db.query(
    "SELECT pro_codigo As id,pro_nome,pro_preco,pro_quantidade FROM produto P, usuario U WHERE P.usu_codigo = U.usu_codigo AND usu_email = ?",
    [email]
  );
  return rows;
}

async function getProductAccordion(code) {
  const [rows] = await db.query(
    "SELECT pro_descricao FROM produto P, usuario U WHERE P.usu_codigo = U.usu_codigo AND pro_codigo = ?",
    [code]
  );
  return rows;
}

async function deleteProduct(code) {
  await db.query("DELETE FROM produto WHERE pro_codigo = ?", [code]);
}

async function editProduct(name, price, amount, code) {
  await db.query(
    "UPDATE produto SET pro_nome = ?, pro_preco = ?,pro_quantidade = ? WHERE pro_codigo = ?",
    [name, price, amount, code]
  );
}

async function registerProduct(name, price, amount, desc, email) {
  await db.query(
    `
    INSERT INTO 
    produto (pro_nome,pro_preco,pro_quantidade,pro_descricao,usu_codigo) 
    VALUES (?, ?, ?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ?))
    `,
    [name, price, amount, desc, email]
  );
}

//SERVIÇOS QUERY

async function getServices(email) {
  const [rows] = await db.query(
    "SELECT ser_codigo As id,ser_nome,ser_preco FROM servico S, usuario U WHERE S.usu_codigo = U.usu_codigo AND usu_email = ?",
    [email]
  );
  return rows;
}

async function getServiceAccordion(code) {
  const [rows] = await db.query(
    "SELECT ser_descricao FROM servico S, usuario U WHERE S.usu_codigo = U.usu_codigo AND ser_codigo = ?",
    [code]
  );
  return rows;
}

async function verifyServiceEqual(nome, email) {
  const [rows] = await db.query(
    "SELECT * FROM servico S, usuario U WHERE S.usu_codigo = U.usu_codigo && ser_nome = ? && usu_email = ?",
    [nome, email]
  );
  if (rows.length === 0) {
    return false;
  } else {
    return true;
  }
}

async function deleteService(code) {
  await db.query("DELETE FROM servico WHERE ser_codigo = ?", [code]);
}

async function editService(name, price, code) {
  await db.query(
    "UPDATE servico SET ser_nome = ?, ser_preco = ?  WHERE ser_codigo = ?",
    [name, price, code]
  );
}

async function registerService(nome, price, desc, email) {
  await db.query(
    `INSERT INTO 
    servico (ser_nome,ser_preco,ser_descricao,usu_codigo) 
    VALUES (?, ?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ?)) 
    `,
    [nome, price, desc, email]
  );
}

//AGENDA QUERY

async function getSchedule(email) {
  const [rows] = await db.query(
    `
    SELECT A.age_codigo, C.cli_nome, DATE_FORMAT(A.age_horario, '%H:%i') As age_horario, DATE_FORMAT(A.age_horarioTermino, '%H:%i')As age_horarioTermino, DATE_FORMAT(A.age_horario, '%d-%m-%Y')As age_date 
    FROM agenda A, usuario U, cliente C 
    WHERE A.usu_codigo = U.usu_codigo 
    AND usu_email = ? 
    AND A.cli_codigo = C.cli_codigo
    ORDER BY A.age_horario
    `,
    [email]
  );
  return rows;
}

async function getScheduleAccordion(code) {
  const [rows] = await db.query(
    "SELECT ser_nome,S.ser_codigo, ser_preco FROM servico S, agenda_servico AGS WHERE S.ser_codigo = AGS.ser_codigo AND AGS.age_codigo = ?",
    [code]
  );
  console.log(rows);
  return rows;
}

async function deleteSchedule(code) {
  await db.query("DELETE FROM agenda_servico WHERE age_codigo = ?", [code]);
  await db.query("DELETE FROM agenda WHERE age_codigo = ?", [code]);
}

async function registerSchedule(
  dateTime,
  dateTimeEnd,
  email,
  clientSelected,
  servicesSelected
) {
  await db.query(
    `INSERT INTO agenda (age_horario,age_horarioTermino,usu_codigo,cli_codigo) 
    VALUES (?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ? LIMIT 1), (SELECT cli_codigo FROM cliente WHERE cli_nome = ? LIMIT 1))
    `,
    [dateTime, dateTimeEnd, email, clientSelected]
  );

  servicesSelected.forEach(
    async (service) =>
      await db.query(
        `INSERT INTO agenda_servico (age_codigo, ser_codigo) 
        VALUES ((SELECT age_codigo FROM agenda A, usuario U WHERE A.usu_codigo = U.usu_codigo and usu_email = ? ORDER BY age_codigo DESC LIMIT 1), (SELECT ser_codigo FROM servico WHERE ser_nome = ?))`,
        [email, service]
      )
  );
}

async function verifyScheduleTime(dateTime, dateTimeEnd) {
  let [rows] = await db.query(
    "SELECT * FROM agenda WHERE ? >= NOW() AND ? < ?",
    [dateTime, dateTime, dateTimeEnd]
  );
  if (rows.length !== 0) {
    return true;
  } else {
    return false;
  }
}

async function verifyScheduleEqual(dateTime, dateTimeEnd, email) {
  let [between] = await db.query(
    `
			SELECT cli_nome
			FROM agenda A 
			JOIN usuario U ON A.usu_codigo = U.usu_codigo AND usu_email = ? 
			JOIN cliente C ON C.cli_codigo = A.cli_codigo
			WHERE (? between age_horario AND age_horarioTermino) OR (? BETWEEN age_horario AND age_horarioTermino)`,

    [email, dateTime, dateTimeEnd]
  );
  return between;
}

//DESPESAS QUERY

async function getExpenses(email) {
  const [rows] = await db.query(
    "SELECT des_codigo As id,des_descricao,des_valor,des_data FROM despesa D, usuario U WHERE D.usu_codigo = U.usu_codigo AND usu_email = ?",
    [email]
  );
  return rows;
}

async function deleteExpense(code) {
  await db.query("DELETE FROM despesa WHERE des_codigo = ?", [code]);
}

async function editExpense(desc, price, date, code) {
  await db.query(
    "UPDATE despesa SET des_descricao = ?, des_valor = ?, des_data = ? WHERE des_codigo = ?",
    [desc, price, date, code]
  );
}

async function registerExpense(desc, price, date, email) {
  await db.query(
    `INSERT INTO 
    despesa (des_descricao,des_valor,des_data,usu_codigo) 
    VALUES (?, ?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ?)) 
    `,
    [desc, price, date, email]
  );
}

//VENDA QUERY
async function getSale(email) {
  const [rows] = await db.query(
    `SELECT * FROM venda V, usuario U WHERE V.usu_codigo = U.usu_codigo AND usu_email = ?`,
    [email]
  );
  return rows;
}

async function getSaleMethod(email) {
  const [rows] = await db.query(
    `SELECT ven_formaPagamento As labels, COUNT(ven_formaPagamento)As series
    FROM venda V, usuario U WHERE V.usu_codigo = U.usu_codigo 
    AND usu_email = ? 
    GROUP BY ven_formaPagamento`,
    [email]
  );
  return rows;
}

async function getSaleServices(codes) {
  let codesUpdated = codes.map(code => {
    return code.ven_codigo;
  });
  const [rows] = await db.query(
    `SELECT (SELECT ser_nome FROM servico S WHERE VS.ser_codigo = S.ser_codigo ) As labels, COUNT(ser_codigo)As series
    FROM venda_servico VS
    WHERE ven_codigo IN (?)
    GROUP BY ser_codigo`,
    [codesUpdated]
  );
  return rows;
}

async function getSaleYearMonth(email, year, month) {
  const [rows] = await db.query(
    `SELECT ven_codigo
    FROM venda V, usuario U WHERE V.usu_codigo = U.usu_codigo 
    AND usu_email = ? 
    AND YEAR(ven_data) = ?
    AND MONTH(ven_data) = ?`,
    [email, year, month]
  );
  return rows;
}

async function getSaleQuantity(email,year) {
  const [rows] = await db.query(
    `SELECT 
    EXTRACT(YEAR FROM ven_data) AS year,
    EXTRACT(MONTH FROM ven_data) AS month,
    COUNT(ven_codigo) AS total_amount
    FROM venda V, usuario U WHERE V.usu_codigo = U.usu_codigo
    AND usu_email = ?  
    AND EXTRACT(YEAR FROM ven_data) = ?
    GROUP BY 
    EXTRACT(YEAR FROM ven_data),
    EXTRACT(MONTH FROM ven_data)
    ORDER BY 
    EXTRACT(YEAR FROM ven_data),
    EXTRACT(MONTH FROM ven_data);`,
    [email,year]
  );
  return rows;
}

async function getSaleInfo(schedule) {
  await db.query(`SELECT `);
}

async function registerSale(
  userCode,
  clientName,
  services,
  totalPrice,
  selectedValue,
  scheduleCode
) {
  var batata = await db.query(
    `INSERT INTO venda (cli_codigo, usu_codigo, ven_data, ven_valorTotal, ven_formaPagamento) 
  VALUES ((SELECT cli_codigo FROM cliente WHERE cli_nome = ? AND usu_codigo = ?), ?, NOW() , ?, ?)`,
    [clientName, userCode, userCode, totalPrice, selectedValue]
  );
  services.forEach(async (service) => {
    await db.query(`INSERT INTO venda_servico VALUES (?,?)`, [
      batata[0].insertId,
      service.ser_codigo,
    ]);
  });
  await db.query(
    `DELETE FROM agenda_servico
    WHERE age_codigo = ?`,
    [scheduleCode]
  );
  await db.query(
    `DELETE FROM agenda
    WHERE age_codigo = ?`,
    [scheduleCode]
  );
}

module.exports = {
  getUserPassword,
  verifyUserEqual,
  registerUser,
  getUserCode,

  getClients,
  deleteClient,
  editClient,
  verifyClientEqual,
  registerClient,

  getProducts,
  getProductAccordion,
  deleteProduct,
  editProduct,
  registerProduct,

  getServices,
  getServiceAccordion,
  deleteService,
  editService,
  registerService,
  verifyServiceEqual,

  getSchedule,
  getScheduleAccordion,
  deleteSchedule,
  registerSchedule,
  verifyScheduleTime,
  verifyScheduleEqual,

  getExpenses,
  deleteExpense,
  editExpense,
  registerExpense,

  getSaleInfo,
  registerSale,
  getSale,
  getSaleMethod,
  getSaleQuantity,
  getSaleServices,
  getSaleYearMonth
};
