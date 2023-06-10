const { app } = require("./app.js");

const { AddClientRoutes } = require("./Routes/Client.js");
const { AddUserRoutes } = require("./Routes/User.js");
const { AddProductRoutes } = require("./Routes/Products.js");
const { AddServiceRoutes } = require("./Routes/Services.js");
const { AddScheduleRoutes } = require("./Routes/Schedule.js");
const { AddExpensesRoutes } = require("./Routes/Expenses.js");

AddClientRoutes(app);
AddUserRoutes(app);
AddProductRoutes(app);
AddServiceRoutes(app);
AddScheduleRoutes(app);
AddExpensesRoutes(app);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
