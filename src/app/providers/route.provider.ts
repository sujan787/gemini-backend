
import apiRoutes from "../../routes/api.route";
import authMiddleware from "../middlewares/auth.middleware";
import AppProvider from "./app.provider";

class RouteProvider extends AppProvider {

    public boot() {
        this.app.use("/api", authMiddleware, apiRoutes);
    }
}

export default RouteProvider;