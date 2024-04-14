import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuoteText: "",
      QuoteAuthor: "",
    };
  }
  fetchQuotes = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const quotes = await response.json();
    return quotes;
  };

  getRandomQuote = async () => {
    const quotesArr = await this.fetchQuotes();
    const randomIndex = Math.floor(Math.random() * quotesArr.length);
    return quotesArr[randomIndex];
  };

  handleClick = async () => {
    const { text, author } = await this.getRandomQuote();
    this.setState({
      QuoteText: text,
      QuoteAuthor: author,
    });
  };

  render() {
    return (
      <>
        <div id="quote-box">
          <p id="text">{this.state.QuoteText}</p>
          <p id="author">{this.state.QuoteAuthor}</p>
          <button id="new-quote" onClick={this.handleClick.bind(this)}>
            New Quote
          </button>
          <a
            href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
            id="tweet-quote"
          ></a>
        </div>
      </>
    );
  }
}

export default App;
