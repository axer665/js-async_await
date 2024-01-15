import GameSavingLoader from "./classes/GameSavingLoader";

GameSavingLoader.load()
    .then(
        (saving) => {
            console.log(saving);
        },
        (error) => {
            console.log(error);
        },
    );