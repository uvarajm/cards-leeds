import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSpa,
  faTree,
  faDiamond,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Deck = () => {
  const [cards, setCards] = useState([]);
  const deckOfCards = [];
  const [drawnCards, setDrawnCards] = useState([]);
  const symbols = [faTree, faSpa, faHeart, faDiamond];
  const numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
  ];

  /* Creating the Deck of Cards */
  symbols.map((item, index) =>
    numbers.map((num, i) =>
      deckOfCards.push({
        id: index + i,
        symbols: item,
        number: num,
        className: index,
      })
    )
  );

  useEffect(() => {
    setCards(deckOfCards);
  }, []);

  const removeClick = (index) => {
    const selectedCard = cards.splice(index, 1);
    setDrawnCards((card) => [...card, selectedCard[0]]);
  };
  const [sortedCards, setSortedCards] = useState([]);
  const [shuffleCards, setShuffleCards] = useState([]);

  /* Below useEffect used to re-render the component whenever sort (drawn by user) or shuffle (deck of cards) functionality invoked */
  useEffect(() => {
    if (sortedCards.length > 0) setDrawnCards(sortedCards);
    if (shuffleCards.length > 0) setCards(shuffleCards);
  }, [sortedCards, shuffleCards]);

  /* Shuffle the deck of cards */
  const shuffleCardsClick = () => {
    const shuffleValue = cards.sort(() => Math.random() - 0.5);
    setShuffleCards(shuffleValue);
  };

  const sortCards = (a,b)=>{
    if(a.className !== b.className) {
      return a.className - b.className
    }
    return a.number-b.number

  }
  /* Sort the drawn cards based on symbols and numbers  */
  const sortSelectedCard = () => {
    const sortedCards = drawnCards.sort(sortCards);
    setSortedCards(sortedCards);
  };

  const displayCardNum = (number)=>{
    if (number === 11) return 'J'
    if (number === 12) return 'Q'
    if (number === 13) return 'K'
    if (number === 1) return 'A'
    return number
  }
  return (
    <div className="deck">
      <button className="button" onClick={shuffleCardsClick}>Shuffle Card</button>
      <div className="containerDeck">
        {cards.length > 0 &&
          cards?.map((card, index) => (
            <div className="card" onClick={() => removeClick(index)}>
              <div classname="container">
                <h4>
                  <b>
                    {displayCardNum(card.number)}{" "}
                    <span className={`ico-${card.className}`}>
                      {" "}
                      <FontAwesomeIcon icon={card.symbols} />
                    </span>
                  </b>
                </h4>
              </div>
            </div>
          ))}
      </div>
      <button className="button" onClick={sortSelectedCard}>Sort</button>
      {drawnCards.length > 0 && (
        <div className="containerDeck">
          {drawnCards.length > 0 &&
            drawnCards?.map((card, index) => (
              <div className="card">
                <div classname="container">
                  <h4>
                    <b>
                      {displayCardNum(card.number)}{" "}
                      <span className={`ico-${card.className}`}>
                        {" "}
                        <FontAwesomeIcon icon={card.symbols} />
                      </span>
                    </b>
                  </h4>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Deck;
