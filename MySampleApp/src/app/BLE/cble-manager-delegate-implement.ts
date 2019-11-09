import { HomeComponent } from "../home/home.component";

export class CBLEManagerDelegateImplement extends NSObject implements CBCentralManagerDelegate {
    centralManagerConnectionEventDidOccurForPeripheral?(central: CBCentralManager, event: CBConnectionEvent, peripheral: CBPeripheral): void {
        throw new Error("Method not implemented.");
    }
    centralManagerDidConnectPeripheral?(central: CBCentralManager, peripheral: CBPeripheral): void {
        throw new Error("Method not implemented.");
    }
    centralManagerDidDisconnectPeripheralError?(central: CBCentralManager, peripheral: CBPeripheral, error: NSError): void {
        throw new Error("Method not implemented.");
    }
    centralManagerDidDiscoverPeripheralAdvertisementDataRSSI?(central: CBCentralManager, peripheral: CBPeripheral, advertisementData: NSDictionary<string, any>, RSSI: number): void {
        throw new Error("Method not implemented.");
    }
    centralManagerDidFailToConnectPeripheralError?(central: CBCentralManager, peripheral: CBPeripheral, error: NSError): void {
        throw new Error("Method not implemented.");
    }
    centralManagerDidUpdateANCSAuthorizationForPeripheral?(central: CBCentralManager, peripheral: CBPeripheral): void {
        throw new Error("Method not implemented.");
    }
    centralManagerDidUpdateState(central: CBCentralManager): void {
        this._owner.get().bluetoothStatus(central);
    }
    centralManagerWillRestoreState?(central: CBCentralManager, dict: NSDictionary<string, any>): void {
        throw new Error("Method not implemented.");
    }

    static ObjCProtocols = [CBCentralManagerDelegate] // define our native protocalls

    private _owner: WeakRef<HomeComponent>;

    static new(): CBLEManagerDelegateImplement {
        return <CBLEManagerDelegateImplement>super.new() // calls new() on the NSObject
    }

    static initWithOwner(owner: WeakRef<HomeComponent>) : CBLEManagerDelegateImplement {
        let delegate = <CBLEManagerDelegateImplement>CBLEManagerDelegateImplement.new();
        delegate._owner = owner;
        return delegate;
    }

}