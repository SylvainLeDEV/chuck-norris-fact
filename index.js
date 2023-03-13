const bubble = document.getElementById('bubble')
const bubbleContent = document.getElementById('content')

let usedElements = new Set();
import("./assets/data/data.js")
    .then(module => {
        const dataChuckNorris = module.dataChuckNorris
        document.getElementById('numberFact').textContent += dataChuckNorris.length.toLocaleString()

        function handleClick() {
            let randomElement;
            do {
                const randomIndex = Math.floor(Math.random() * dataChuckNorris.length)
                randomElement = dataChuckNorris[randomIndex]
            } while (usedElements.has(randomElement))
            usedElements.add(randomElement);
            if (usedElements.size > 200) {
                usedElements.delete(usedElements.values().next().value)
            }
            bubbleContent.textContent = randomElement;
        }
        bubble.addEventListener("click", handleClick)
    })
    .catch(error => {
        console.error("Error in file dataChuckNorris : ", error)
    });
