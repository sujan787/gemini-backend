import { Express } from "express";
import ProviderInterface from "../interfaces/provider.interface";

abstract class AppProvider implements ProviderInterface {
    constructor(public app: Express) {
    }

    abstract boot(): void
}

export default AppProvider;