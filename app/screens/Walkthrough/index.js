import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image, SelectRole } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import AsyncStorage from "@react-native-community/async-storage";


class Walkthrough extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            scrollEnabled: true,
            slide: [
                { key: 1, image: Images.trip2 },
                { key: 2, image: Images.trip1 },
                { key: 3, image: Images.trip3 },
                { key: 4, image: Images.trip4 }
            ],
            open: true,
            value: null,
            items: [
                { label: 'Chọn vai trò', value: 0 },
                { label: 'Chủ trọ', value: 1 },
                { label: 'Người tìm trọ', value: 2 }
            ]
        };
    }

    setOpen(open) {
        this.setState({
            open
        });
    }

    setValue(callback) {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    signIn = async () => {
        
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            //   webClientId: '232866063648-fepr9ld9pnsn8tnmpin5d6gpcq3ss7i9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            androidClientId: '232866063648-fepr9ld9pnsn8tnmpin5d6gpcq3ss7i9.apps.googleusercontent.com',
            offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            this.authentication();
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };


    async authentication() {
        console.log(process.env.BASE_URL);
        await AsyncStorage.setItem('Login', 'login');
        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(true, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Loading");
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        );
    }

    render() {
        const { navigation, actions } = this.props;
        console.log(this.props);
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <ScrollView
                    style={styles.contain}
                    scrollEnabled={this.state.scrollEnabled}
                    onContentSizeChange={(contentWidth, contentHeight) =>
                        this.setState({
                            scrollEnabled: Utils.scrollEnabled(
                                contentWidth,
                                contentHeight
                            )
                        })
                    }
                >
                    <View style={styles.wrapper}>
                        {/* Images Swiper */}
                        <Swiper
                            dotStyle={{
                                backgroundColor: BaseColor.textSecondaryColor
                            }}
                            activeDotColor={BaseColor.primaryColor}
                            paginationStyle={styles.contentPage}
                            removeClippedSubviews={false}
                        >
                            {this.state.slide.map((item, index) => {
                                return (
                                    <View style={styles.slide} key={item.key}>
                                        <Image
                                            source={item.image}
                                            style={styles.img}
                                        />
                                        <Text body1 style={styles.textSlide}>
                                            Picking your hostel
                                        </Text>
                                    </View>
                                );
                            })}
                        </Swiper>
                    </View>

                    <View>
                    <SelectRole

                            />
                    </View>

                    <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>

                        <LoginButton
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                this.authentication();
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() => console.log("logout.")} />

                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn} />



                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Walkthrough);
