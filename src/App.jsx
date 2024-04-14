import React from "react";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuoteText: "",
      QuoteAuthor: "",
      RandomColor: "#16a085",
    };
  }
  async componentDidMount() {
    const { text, author } = await this.getRandomQuote();
    this.setState({
      QuoteText: text,
      QuoteAuthor: author,
      RandomColor: this.state,
    });
  }

  getRandomColor = () => {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
    return `rgb(${red},${green},${blue})`;
  };

  transition = "all 1s";

  fetchQuotes = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        alert("Failed to fetch quotes");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return []; // Return an empty array in case of failure
    }
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
      RandomColor: this.getRandomColor(),
    });
  };

  render() {
    return (
      <div
        className="background"
        style={{
          backgroundColor: this.state.RandomColor,
          transition: this.transition,
        }}
      >
        <div id="quote-box">
          <div className="quote-content">
            <h2
              id="text"
              style={{
                color: this.state.RandomColor,
                transition: this.transition,
              }}
            >
              <FaQuoteLeft
                size="30"
                style={{ marginRight: "10px" }}
              ></FaQuoteLeft>
              {this.state.QuoteText}
              <FaQuoteRight
                size="30"
                style={{ marginLeft: "10px" }}
              ></FaQuoteRight>
            </h2>
            <h2
              id="author"
              style={{
                color: this.state.RandomColor,
                transition: this.transition,
              }}
            >
              - {this.state.QuoteAuthor}
            </h2>
            <div className="buttons">
              <a
                href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${
                  this.state.QuoteText + this.state.QuoteAuthor
                }`}
                id="tweet-quote"
                style={{
                  backgroundColor: this.state.RandomColor,
                  marginRight: "10px",
                  transition: this.transition,
                }}
              >
                <FaTwitter color="white"></FaTwitter>
              </a>
              <button
                style={{
                  backgroundColor: this.state.RandomColor,
                  transition: this.transition,
                }}
                id="new-quote"
                onClick={this.handleClick.bind(this)}
              >
                Change Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
