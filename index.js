const bubble = document.getElementById('bubble')
const bubbleContent = document.getElementById('content')

import("./assets/data/data.js")
    .then(module => {
        const dataChuckNorris = module.dataChuckNorris
        document.getElementById('numberFact').textContent += dataChuckNorris.length.toLocaleString()

        let usedElements = [];

        function handleClick() {
            let randomElement;
            do {
                const randomIndex = Math.floor(Math.random() * dataChuckNorris.length)
                randomElement = dataChuckNorris[randomIndex]
            } while (usedElements.includes(randomElement))
            usedElements.push(randomElement);
            bubbleContent.textContent = randomElement;
        }

        bubble.addEventListener("click", handleClick)
    })
    .catch(error => {
        console.error("Error in file dataChuckNorris : ", error)
    });
