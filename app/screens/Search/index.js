import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, ScrollView, FlatList, Switch } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    BookingTime
} from "@components";
import Modal from "react-native-modal";
import styles from "./styles";
import internationalization from "../../config/internationalization";
import { TabView, TabBar } from "react-native-tab-view";
import { UserData, HotelData } from "@data";
import { HotelItem, Tag } from "@components";
import RangeSlider from "rn-range-slider";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            checkinTime: "",
            checkoutTime: "",
            keyword: "",
            adult: 1,
            children: 1,
            night: 1,
            modalVisible: false,
            loading: false,
            index: 0,
            routes: [
                { key: "price", title: "Tổng quát" },
                { key: "facility", title: "Tiện ích xung quanh" },
                { key: "amenity", title: "Tiện ích trọ" },
                { key: "capacity", title: "Sức chứa" }
            ]
        };
    }

    openModal(modal) {
        this.setState({
            modalVisible: modal
        });
    }

    //#region 
    setValue(mode, value) {
        const { adult, children, night } = this.state;
        switch (value) {
            case "adult":
                if (mode == "up") {
                    this.setState({ adult: adult + 1 });
                } else {
                    this.setState({ adult: adult - 1 > 0 ? adult - 1 : 0 });
                }
                break;
            case "children":
                if (mode == "up") {
                    this.setState({ children: children + 1 });
                } else {
                    this.setState({
                        children: children - 1 > 0 ? children - 1 : 0
                    });
                }
                break;
            case "night":
                if (mode == "up") {
                    this.setState({ night: night + 1 });
                } else {
                    this.setState({
                        night: night - 1 > 0 ? night - 1 : 0
                    });
                }
                break;
        }
    }

    renderModal() {
        const isRTL = internationalization.isRTL();
        const { adult, children, night } = this.state;
        return (
            <View>
                <Modal
                    isVisible={this.state.modalVisible === "quest"}
                    onSwipeComplete={() =>
                        this.setState({ modalVisible: false })
                    }
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        <View style={!isRTL ? styles.contentActionModalBottom : styles.contentActionModalBottomRTL}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ modalVisible: false })
                                }
                            >
                                <Text body1>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ modalVisible: false })
                                }
                            >
                                <Text body1 primaryColor>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={!isRTL ? styles.lineRow : styles.lineRowRTL}>
                            <View>
                                <Text body1
                                    style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                                >Adults</Text>
                                <Text caption1 grayColor
                                    style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                                >
                                    16+ years
                                </Text>
                            </View>
                            <View style={styles.iconRight}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setValue("down", "adult")
                                    }
                                >
                                    <Icon
                                        name="minus-circle"
                                        size={24}
                                        color={BaseColor.grayColor}
                                    />
                                </TouchableOpacity>
                                <Text title1>{adult}</Text>
                                <TouchableOpacity
                                    onPress={() => this.setValue("up", "adult")}
                                >
                                    <Icon
                                        name="plus-circle"
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={!isRTL ? styles.lineRow : styles.lineRowRTL}>
                            <View>
                                <Text body1
                                    style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                                >Children</Text>
                                <Text caption1 grayColor
                                    style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                                >
                                    2-11 years
                                </Text>
                            </View>
                            <View style={styles.iconRight}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setValue("down", "children")
                                    }
                                >
                                    <Icon
                                        name="minus-circle"
                                        size={24}
                                        color={BaseColor.grayColor}
                                    />
                                </TouchableOpacity>
                                <Text title1>{children}</Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setValue("up", "children")
                                    }
                                >
                                    <Icon
                                        name="plus-circle"
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.modalVisible === "duration"}
                    onSwipeComplete={() =>
                        this.setState({ modalVisible: false })
                    }
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        <View style={!isRTL ? styles.contentActionModalBottom : styles.contentActionModalBottomRTL}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ modalVisible: false })
                                }
                            >
                                <Text body1>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ modalVisible: false })
                                }
                            >
                                <Text body1 primaryColor>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[!isRTL ? styles.lineRow : styles.lineRowRTL, { marginBottom: 40 }]}>
                            <View>
                                <Text body1
                                    style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                                >Duration</Text>
                                <Text caption1 grayColor
                                    style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                                >
                                    Night
                                </Text>
                            </View>
                            <View style={styles.iconRight}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setValue("down", "night")
                                    }
                                >
                                    <Icon
                                        name="minus-circle"
                                        size={24}
                                        color={BaseColor.grayColor}
                                    />
                                </TouchableOpacity>
                                <Text title1>{night}</Text>
                                <TouchableOpacity
                                    onPress={() => this.setValue("up", "night")}
                                >
                                    <Icon
                                        name="plus-circle"
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    //#endregion

    _handleIndexChange = index =>
        this.setState({
            index
        });

    // Customize UI tab bar
    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            inactiveColor={BaseColor.grayColor}
            activeColor={BaseColor.textPrimaryColor}
            renderLabel={({ route, focused, color }) => (
                <View style={{ flex: 1, width: 200, alignItems: "center" }}>
                    <Text headline semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );

    // Render correct screen container when tab is activated
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "price":
                return (
                    <Price
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "facility":
                return (
                    <ProfileTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "amenity":
                return (
                    <SettingTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "capacity":
                return (
                    <ActivityTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
        }
    };
    render() {
        const isRTL = internationalization.isRTL();
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                {this.renderModal()}
                <Header
                    isRTL={isRTL}
                    title="Search"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="times"
                                size={20}
                                color={BaseColor.primaryColor}
                                style={!isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <ScrollView style={{ padding: 20, flex: 1 }}>
                    <TextInput
                        style={[BaseStyle.textInput, !isRTL ? { textAlign: 'left' } : { textAlign: 'right' }]}
                        onChangeText={text => this.setState({ keyword: text })}
                        autoCorrect={false}
                        placeholder="Tìm kiếm theo quận, huyện, tên đường..."
                        placeholderTextColor={BaseColor.grayColor}
                        value={this.state.keyword}
                        selectionColor={BaseColor.primaryColor}
                    />
                    <View>
                        <TabView
                            lazy
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                    </View>


                </ScrollView>
                <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                    <Button
                        full
                        onPress={() => {
                            this.setState({ loading: true }, () => {
                                setTimeout(() => {
                                    navigation.navigate("Hotel");
                                    this.setState({ loading: false });
                                }, 500);
                            });
                        }}
                        loading={this.state.loading}
                    >
                        Tìm kiếm
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}


class Price extends Component {
    constructor(props) {
        super();
        this.state = {
            hotels: HotelData,
            scrollEnabled: true,
            priceBegin: 1,
            priceEnd: 20,
            night: 1,
            modalVisible: false
        };
    }

    renderModal() {
        const { night } = this.state;
        return (
            <View>
                <Modal
                    isVisible={this.state.modalVisible}
                    onSwipeComplete={() =>
                        this.setState({ modalVisible: false })
                    }
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        <View >
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ modalVisible: false })
                                }
                            >
                                <Text body1 primaryColor>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View >

                            <View style={styles.iconRight}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setValue("down")
                                    }
                                >
                                    <Icon
                                        name="minus-circle"
                                        size={24}
                                        color={BaseColor.grayColor}
                                    />
                                </TouchableOpacity>
                                <Text title1>{night}</Text>
                                <TouchableOpacity
                                    onPress={() => this.setValue("up")}
                                >
                                    <Icon
                                        name="plus-circle"
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    openModal() {
        this.setState({
            modalVisible: true
        });
    }

    setValue(mode) {
        const { night } = this.state;

        if (mode == "up") {
            this.setState({ night: night + 1 });
        } else {
            this.setState({
                night: night - 1 > 0 ? night - 1 : 0
            });
        }

    }


    render() {
        const { scrollEnabled, priceBegin, priceEnd, night } = this.state;


        return (
            <View style={{ padding: 20 }}>
                {this.renderModal()}
                <View style={styles.contentRange}>
                    <Text caption1 grayColor>
                        1M
                    </Text>
                    <Text caption1 grayColor>
                        20M
                    </Text>
                </View>
                <RangeSlider
                    style={{
                        width: "100%",
                        height: 40
                    }}
                    thumbRadius={12}
                    lineWidth={5}
                    gravity={"center"}
                    labelStyle="none"
                    min={1}
                    max={20}
                    step={0.5}
                    selectionColor={BaseColor.primaryColor}
                    blankColor={BaseColor.textSecondaryColor}
                    onValueChanged={(low, high, fromUser) => {
                        this.setState({
                            priceBegin: low,
                            priceEnd: high
                        });
                    }}
                    onTouchStart={() => {
                        this.setState({
                            scrollEnabled: false
                        });
                    }}
                    onTouchEnd={() => {
                        this.setState({
                            scrollEnabled: true
                        });
                    }}
                />
                <View style={styles.contentResultRange}>
                    <Text caption1>Khoảng giá</Text>
                    <Text caption1>
                        {priceBegin.toFixed(1)}M - {priceEnd.toFixed(1)}M
                    </Text>
                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity
                        style={styles.duration}
                        onPress={() => this.openModal()}
                    >
                        <Text
                            caption1
                            grayColor
                        // style={[!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }, { marginBottom: 5 }]}
                        >
                            Số người tối đa
                        </Text>
                        <Text body1 semibold
                        // style={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                        >
                            {night} người
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


class ProfileTab extends Component {
    constructor(props) {
        super();
        this.state = {
            reminders: false,
            facilities: [
                { id: "1", name: "Chợ", checked: false },
                { id: "2", name: "Siêu thị", checked: true },
                { id: "3", name: "Bãi đỗ xe", checked: false },
                { id: "4", name: "Bệnh viện", checked: false },
                { id: "5", name: "Quán ăn", checked: false }
            ]
        };
    }

    onSelectFacilities(select) {
        this.setState({
            facilities: this.state.facilities.map(item => {
                if (item.name == select.name) {
                    if (item.checked) {
                        return {
                            ...item,
                            checked: false
                        };
                    } else {
                        return {
                            ...item,
                            checked: true
                        };
                    }
                } else {
                    return {
                        ...item
                    };
                }
            })
        });
    }


    render() {
        const { navigation } = this.props;
        const { facilities } = this.state;
        return (
            <View style={{ padding: 20 }}>
                <View style={styles.contentList}>
                    <FlatList
                        horizontal={false}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        data={facilities}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                            <Tag
                                style={{ marginLeft: 20, width: 80, marginBottom: 10 }}
                                outline={!item.checked}
                                onPress={() =>
                                    this.onSelectFacilities(item)
                                }
                            >
                                {item.name}
                            </Tag>
                        )}
                    />
                </View>
            </View>
        );
    }
}



class SettingTab extends Component {
    constructor(props) {
        super();
        this.state = {

            amenities: [
                { id: "1", name: "WC", icon: "toilet", checked: false },
                { id: "2", name: "Chỗ để xe", icon: "motocycle", checked: true },
                { id: "3", name: "Cửa sổ", icon: "window", checked: false },
                { id: "4", name: "Bảo vệ", icon: "security", checked: true },
                { id: "5", name: "Internet", icon: "internet", checked: false },
                { id: "6", name: "Không chung chủ", icon: "key", checked: false },
                { id: "7", name: "Điều hòa", icon: "air-conditioner", checked: false },
                { id: "8", name: "Bếp", icon: "cooking", checked: false },
                { id: "9", name: "Máy giặt", icon: "cooking", checked: false },
                { id: "10", name: "Tủ lạnh", icon: "fridge", checked: false },
                { id: "11", name: "Giường", icon: "bed", checked: false },
                { id: "12", name: "Tivi", icon: "televison", checked: false },
                { id: "13", name: "Pets", icon: "pet", checked: false },
            ]
        };
    }

    onSelectFacilities(select) {
        this.setState({
            amenities: this.state.amenities.map(item => {
                if (item.name == select.name) {
                    if (item.checked) {
                        return {
                            ...item,
                            checked: false
                        };
                    } else {
                        return {
                            ...item,
                            checked: true
                        };
                    }
                } else {
                    return {
                        ...item
                    };
                }
            })
        });
    }


    render() {
        const { navigation } = this.props;
        const { amenities } = this.state;
        return (
            <View style={{ padding: 10 }}>
                <View style={styles.contentList}>
                    <FlatList
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        data={amenities}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                            <Tag
                                style={{ marginLeft: 10, width: 85, marginBottom: 10 }}
                                outline={!item.checked}
                                onPress={() =>
                                    this.onSelectFacilities(item)
                                }
                            >
                                <Icon
                                    name={item.icon}
                                    size={20}
                                    color={BaseColor.primaryColor}

                                />
                                {item.name}
                            </Tag>
                        )}
                    />
                </View>
            </View>
        );
    }
}

/**
 * @description Show when tab Activity activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class ActivityTab extends Component {
    render() {
        return <View style={{ padding: 20 }} />;
    }
}
