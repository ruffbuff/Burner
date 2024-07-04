// src/types/globals.d.ts

import { ExternalProvider, JsonRpcFetchFunc } from "ethers";

declare global {
    interface Window {
        ethereum: ExternalProvider | JsonRpcFetchFunc;
    }
}
