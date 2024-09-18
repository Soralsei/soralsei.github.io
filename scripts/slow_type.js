const message0 = "// hi ! my name is kohio,"
const message1 = "// an M2 student at University of Bordeaux,";
const message2 = "// and i'm an aspiring embedded systems programmer ! ";

const messages = [message0, message1, message2];
var blockVisible = true;
var currentDiv;

const typingPromises = (message, timeout) =>
    [...message].map(
        (_, i) =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(message.substring(0, i + 1));
                }, timeout * i);
            })
    );

async function slow_type() {
    let presentation = document.getElementById('presentation');

    for (let i = 0; i < messages.length; i++) {
        currentDiv = document.createElement("div");
        let promises = typingPromises(messages[i], 80);
        presentation.appendChild(currentDiv);
        currentDiv.setAttribute("data-after", "\u{023D0}");

        promises.forEach(promise => {
            promise.then(portion => {
                let text = `${portion}`;
                currentDiv.replaceChildren(document.createTextNode(text));
            });
        });
        await Promise.all(promises);
        currentDiv.setAttribute("data-after", "");
    }
}

slow_type();
setInterval(() => {
    if (blockVisible) {
        currentDiv.setAttribute("data-after", "\u{023D0}");
    } else {
        currentDiv.setAttribute("data-after", "");
    }
    blockVisible = !blockVisible;
}, 500);
