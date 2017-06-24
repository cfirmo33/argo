import { Hyper } from "../../util";
import { OhlcChartTemplate } from "./ohlc-chart.template";

class OhlcChartElement extends Hyper {
    static get observedAttributes() {
        return ["data-data", "data-feed", "data-trades"];
    }

    constructor() {
        super();

        this.state = {
            instrument: this.dataset.instrument,
            granularity: this.dataset.granularity,
            data: "",
            feed: {},
            trades: []
        };
    }

    render() {
        return OhlcChartTemplate.update(this.hyper);
    }

    attributeChangedCallback(name) {
        this.state.instrument = this.dataset.instrument;
        this.state.granularity = this.dataset.granularity;
        this.state.data = this.dataset.data;
        this.state.feed = this.dataset.feed && JSON.parse(this.dataset.feed);
        if (this.state.feed && typeof this.state.feed.ask !== "string") {
            this.state.feed.ask = "";
        }
        if (this.state.feed && typeof this.state.feed.bid !== "string") {
            this.state.feed.bid = "";
        }

        if (name === "data-data") {
            OhlcChartTemplate.redrawData(this.state);
        }

        if (name === "data-feed") {
            OhlcChartTemplate.redrawFeed(this.state);
        }
    }

}
customElements.define("ohlc-chart", OhlcChartElement);
