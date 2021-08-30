/**
 * MMM Wise Quotes
 */

// let data = {
//    "quotes": [
//        "When love is real, it finds a way."
//    ]
//}

Module.register("MMM-WiseQuotes", {
    defaults: {
        fetchInterval: 10 * 1000
    },
    getStyles() {
        return [
            this.file('styles.css')
        ]
    },
    quote: null,
    notificationReceived(notification, payload, sender) {
        if (notification === 'MODULE_DOM_CREATED') {
            this.getQuote();
            setInterval(() => {
                this.getQuote();
            }, this.config.fetchInterval);
        }
    },
    getDom() {
        const wrapper = document.createElement("div");
        if (this.quote === null) {
            wrapper.innerHTML = "Only you can change your life. No one can do it for you. So fix the API!!";
            return wrapper;
        }
        this.setupHTMLStructure(wrapper);
        return wrapper;
    },
    setupHTMLStructure(wrapper) {
        const quote = document.createElement("h1");
        quote.className = "bright medium light fadeInQuote";
        quote.innerHTML = this.quote.quote;
        wrapper.appendChild(quote);
    },
    getQuote() {
        /**
         * This was used for hard-coded data. No longer used now.
         */
         // let totalLength = data.quotes.length;
         // let rand = Math.floor((Math.random() * totalLength));
         // this.quote = data.quotes[rand];
         // this.updateDom();


        fetch(`http://quotes-server.ddns.net:3001/api/v1/quotes/random`).then((response) => {
            response.json().then((quote) => {
                this.quote = quote;
                this.updateDom();
            });
        });
    }
});
