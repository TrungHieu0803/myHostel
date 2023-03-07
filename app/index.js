import React, {Component} from "react";
import {persistor, store} from "app/store";
import {StatusBar} from "react-native";
import {BaseColor} from "@config";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import App from "./navigation";
import internationalization from "./config/internationalization";

console.disableYellowBox = true;

export default class index extends Component {
    constructor(props) {
        super(props);

        internationalization.enableFallbacks()
        internationalization.setI18nConfig();
    }

    async componentDidMount() {
        StatusBar.setBackgroundColor(BaseColor.darkBlueColor, true);
    }

    render() {
        console.log('isRTL: ', internationalization.isRTL())
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}

