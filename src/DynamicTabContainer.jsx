import { Component, createElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

const styles = StyleSheet.create({
    scene: {
        flex: 1
    }
});

const initialLayout = { width: Dimensions.get("window").width };

export class DynamicTabContainer extends Component {
    //_renderItem = ({ item /* , index*/ }) => this.props.content(item);
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    _renderSceneFunction(item) {
        return () => this.props.content(item);
    }

    render() {
        const loading = this.props.data.status === "loading";
        this.items = [];
        if (!loading) {
            this.items = this.props.data.items;
        }

        const routes = [];
        const scenes = {};

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            routes.push({
                key: i.toString(),
                title: this.props.labelAttribute(item).value
            });
            scenes[i.toString()] = this._renderSceneFunction(item);
        }
        const renderScene = SceneMap(scenes);

        return (
            /* <Carousel
                ref={c => {
                    this._carousel = c;
                }}
                data={this.items}
                renderItem={this._renderItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth - 20}
            />*/
            <TabView
                navigationState={{ index: this.state.index, routes }}
                renderScene={renderScene}
                onIndexChange={this._setIndex.bind(this)}
                initialLayout={initialLayout}
            />
        );
    }
    _setIndex(i) {
        this.setState({
            index: i
        });
    }
}
