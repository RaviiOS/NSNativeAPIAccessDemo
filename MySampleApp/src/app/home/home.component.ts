import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { CBLEManagerDelegateImplement } from "../BLE/cble-manager-delegate-implement";
import { ItemService, Item } from "../BLE/item-service";
import { ItemEventData } from "tns-core-modules/ui/list-view";



@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
    
})
export class HomeComponent implements OnInit {
    centralManager: CBCentralManager;
    bleDelegte: CBLEManagerDelegateImplement;
    items: Array<Item>;

    constructor(private _itemService: ItemService) {
        // Use the component constructor to inject providers.
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
        // Init your component properties here.
        this.centralManager = CBCentralManager.new();
        this.bleDelegte = CBLEManagerDelegateImplement.initWithOwner(new WeakRef(this));
        this.centralManager = this.centralManager.initWithDelegateQueue(this.bleDelegte, null);
        console.log("Is scannng  ====> ",this.centralManager.state);

        // To get the dummy data
        this.items = this._itemService.getItems();
        console.log("***** Dummy Data ===>", this.items);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSearch() {
        console.log("**** Tap on on search button ****");
    }

    onItemTap(args: ItemEventData) {
        console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`);
    }

    
}
