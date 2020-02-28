declare module 'react-native-wifi-reborn' {
    export type WiFiObject = {
        SSID: string;
        BSSID: string;
        capabilities: string;
        frequency: number;
        level: number;
        timestamp: number;
    };

    export type Errors = Partial<{
        // The WIFI network is not currently in range.
        notInRange: boolean;
        // Could not add or update the network configuration.
        addOrUpdateFailed: boolean;
        // Disconnecting from the network failed. This is done as part of the connect flow
        disconnectFailed: boolean;
        // Could not connect to network
        connectNetworkFailed: boolean;
    }>;

    /**
     * Connects to a WiFi network. Rejects with an error if it couldn't connect.
     *
     * @param password `null` for open networks.
     * @param isWep Used on iOS. If `true`, the network is WEP Wi-Fi; otherwise it is a WPA or WPA2 personal Wi-Fi network.
     */
    export function connectToProtectedSSID(
        SSID: string,
        password: string,
        isWEP: boolean
    ): Promise<void>;

    export function getCurrentWifiSSID(): Promise<string>;

    //#region iOS only
    export function connectToSSID(SSID: string): Promise<void>;
    export function connectToSSIDPrefix(SSIDPrefix: string): Promise<void>;
    export function disconnectFromSSID(SSIDPrefix: string): Promise<void>;
    export function connectToProtectedSSIDPrefix(
        SSIDPrefix: string,
        password: string,
        isWEP: boolean
    ): Promise<void>;
    //#endregion

    //#region Android only
    /**
     * Returns a list of nearby WiFI networks.
     *
     * @param callback Called if the attempt is successful. It contains a stringified JSONArray of `WiFiObject` as parameter.
     * @param error Called if any error occurs during the attempt.
     * @example
     * WifiManager.loadWifiList(
            wifiList => {
                let wifiArray =  JSON.parse(wifiList);
                wifiArray.map((value, index) =>
                    console.log(`Wifi ${index  +  1} - ${value.SSID}`)
                );
            },
            error => console.log(error)
        );
     */
    export function loadWifiList(
        callback: (wifiList: string) => void,
        error: (err: string) => void
    ): void;
    /**
     * Similar to `loadWifiList` but it forcefully starts the WiFi scanning on android and in the callback fetches the list.
     */
    export function reScanAndLoadWifiList(
        callback: (wifiList: string) => void,
        error: (err: string) => void
    ): void;
    export function isEnabled(callback: (enabled: boolean) => void): void;
    export function setEnabled(enabled: boolean): void;
    /**
     * Indicates whether network connectivity exists and it is possible to establish connections.
     * @param Called when the network status is resolved.
     */
    export function connectionStatus(callback: (isConnected: boolean) => void): void;
    export function disconnect(): void;
    export function isRemoveWifiNetwork(SSID: string): Promise<void>;
    /**
     * Force wifi usage if the user needs to send requests via WiFi
     * if it does not have internet connection. Useful for IoT applications, when
     * the app needs to communicate and send requests to a device that have no
     * internet connection via WiFi.
     *
     * Receives a boolean to enable forceWifiUsage if true, and disable if false.
     * Is important to disable it when disconnecting from IoT device.
     */
    export function forceWifiUsage(force: boolean): Promise<void>;
    //#endregion
}
