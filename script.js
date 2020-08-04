$(document).ready(function() {
  //track card number within deck
  let currentActiveCard = 0;

  //Card Array
  const deck = [];

  //store card data

  const cardData = [
    {
      question: "What is the leading cause of death world-wide?",
      answer: "Heart Disease and/or stroke"
    },
    {
      question: "How many people will develop a cancer in their lifetime?",
      answer: "Just under 1 out of every 2 people"
    },
    {
      question: "What are the three most common food allergies?",
      answer: "Milk, Eggs, and Nuts"
    }
  ];

  function createDeck() {
    cardData.forEach((data, index) => createCard(data, index));
  }
  createDeck();
  function createCard(data, index) {
    if (index === 0) {
      $(".card").addClass("active");
      $("#q").text(data.question);
      $("#a").text(data.answer);
    }
  }

  updateCurrentText();
  //show number of cards
  function updateCurrentText() {
    currentActiveCard = currentActiveCard + 1;
    $("#current").text(currentActiveCard + "/" + cardData.length);
  }
  function backsetCurrentText() {
    currentActiveCard = currentActiveCard - 1;
    $("#current").text(currentActiveCard + "/" + cardData.length);
  }

  //get cards from local storage
  function getDeckData() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? [] : cards;
  }

  //function to set the next card in the deck
  function setNextCard() {
    $(".card").addClass("active");
    index = currentActiveCard - 1;
    if (index >= cardData.length) {
      $("#q").text(cardData[0].question);
      $("#a").text(cardData[0].answer);
      currentActiveCard = 0;
      updateCurrentText();
    } else {
      $("#q").text(cardData[index].question);
      $("#a").text(cardData[index].answer);
    }
  }
  //function to go back to previous card in the deck
  function setPrevCard() {
    $(".card").addClass("active");
    index = currentActiveCard - 2;
    if (index < 0) {
      $("#q").text(cardData[0].question);
      $("#a").text(cardData[0].answer);
    } else {
      $("#q").text(cardData[index].question);
      $("#a").text(cardData[index].answer);
      backsetCurrentText();
    }
  }

  //card flip listener
  $(".card").click(() => {
    $(".card").toggleClass("show-answer");
  });

  //show add-container to make new card
  $("#show").click(function() {
    $(".add-container").addClass("show");
    $(".cards").hide();
  });

  //hide add-container to cancel new card creation
  $("#hide").click(function() {
    $(".add-container").removeClass("show");
    $(".cards").show();
  });

  //add a new card to array with add-card
  $("#add-card").click(function() {
    if ($("#question").val() === "" || $("#answer").val() === "") {
      alert("Please enter a question and answer");
    } else {
      const newCard = {
        question: $("#question").val(),
        answer: $("#answer").val()
      };
      cardData.push(newCard);
      updateCurrentText();
      console.log(cardData.length);
    }
    $("#question").val("");
    $("#answer").val("");
    $(".add-container").removeClass("show");
    $(".cards").show();
  });

  //Forward Button listener
  $("#next").click(() => {
    $(".cards").animate(
      {
        opacity: "0",
        right: "500px"
      },
      700,
      function() {
        $(".card").removeClass("active show-answer");
        updateCurrentText();
        setNextCard();
      }
    );
    $(".cards").animate(
      {
        right: "-500px"
      },
      300
    );
    $(".cards").animate(
      {
        right: "0px",
        opacity: "1"
      },
      700
    );
  });

  //Back button listener
  $("#prev").click(() => {
    $(".cards").animate(
      {
        opacity: "0",
        left: "500px"
      },
      700,
      function() {
        $(".card").removeClass("active show-answer");
        setPrevCard();
      }
    );
    $(".cards").animate(
      {
        left: "-500px"
      },
      300
    );
    $(".cards").animate(
      {
        left: "0px",
        opacity: "1"
      },
      700
    );
  });
  //delete deck button
  $("#trash").click(function() {
    localStorage.clear();
    window.location.reload();
  });
});
