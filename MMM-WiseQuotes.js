let data = {
    "quotes": [
        "When love is real, it finds a way.",
        "They will ignore you, until they need you.",
        "The less you care, the happier you will be.",
        "Who gossips to you, will gossip about you.",
        "Tomorrow never comes, it is always today.",
        "Wherever life plants you, bloom with grace.",
        "The best revenge is not to be like your enemy.",
        "You only need someone to accept you completely.",
        "There is no path to Happiness: Happiness is the path.",
        "Work out your own salvation. Don't depend on others.",
        "Only you can change your life. No one can do it for you.",
        "Stop looking for happiness in the same place you lost it.",
        "Sometimes you just have to let go and see what happens.",
        "True love and Real friends are two of the hardest things to find.",
        "Make sure you love yourself before you start to love someone else."
    ]
}

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