import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { HomeComponent } from "./home/home.component";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    centralManager: CBCentralManager;
    bleDelegte: CBLEManagerDelegateImplement;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
        this.centralManager = CBCentralManager.new();
        this.bleDelegte = CBLEManagerDelegateImplement.initWithOwner(new WeakRef(this));
        this.centralManager = this.centralManager.initWithDelegateQueue(this.bleDelegte, null);
        console.log("Is scannng  ====> ",this.centralManager.state);
    }

    bluetoothStatus(central: CBCentralManager) {
            switch (central.state) {
                case CBManagerState.PoweredOff:
                        console.log("Discovered BLE State PoweredOff ===>", central.state);
                case CBManagerState.PoweredOn:
                        console.log("Discovered BLE State PoweredOn ===>", central.state);
                case CBManagerState.Resetting:
                        console.log("Discovered BLE State Resetting ===>", central.state);
                case CBManagerState.Unauthorized:
                        console.log("Discovered BLE State Unauthorized  ===>", central.state);
                case CBManagerState.Unknown:
                        console.log("Discovered BLE State Unknown ===>", central.state);
                case CBManagerState.Unsupported:
                        console.log("Discovered BLE State Unsupported fromcomponent ===>", central.state);
        
            }
    }
    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}


class CBLEManagerDelegateImplement extends NSObject implements CBCentralManagerDelegate {
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

    private _owner: WeakRef<AppComponent>;

    static new(): CBLEManagerDelegateImplement {
        return <CBLEManagerDelegateImplement>super.new() // calls new() on the NSObject
    }

    static initWithOwner(owner: WeakRef<AppComponent>) : CBLEManagerDelegateImplement {
        let delegate = <CBLEManagerDelegateImplement>CBLEManagerDelegateImplement.new();
        delegate._owner = owner;
        return delegate;
    }

}
