async function translate(input) {

    let text = input.trim();

    if (text == "") {
        document.querySelector("#translated_text").innerText =
            "Please enter some text.";
        return;
    }

    let chunks;

    if (text.length > 250) {
        chunks = divide_in_chunks(text);
    } else {
        chunks = [text];
    }

    let final_translation = "";

    for (let chunk of chunks) {

        try {

            let encoded_text = encodeURIComponent(chunk);

            let response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encoded_text}&langpair=en|hi`
            );

            let data = await response.json();

            console.log("Chunk:", chunk);
            console.log("Translation:", data.responseData.translatedText);

            final_translation +=
                data.responseData.translatedText + " ";

        } catch (error) {

            console.log("Error:", error);

            final_translation +=
                "[Translation failed for this part] ";
        }
    }

    let output = document.querySelector("#translated_text");

    output.innerText = final_translation.trim();
}


function divide_in_chunks(text) {

    let arr = [];

    let words = text.split(" ");

    let current = "";

    for (let word of words) {

        if ((current + " " + word).length > 250) {

            arr.push(current.trim());

            current = word;

        } else {

            current += " " + word;
        }
    }

    if (current.trim() !== "") {
        arr.push(current.trim());
    }

    return arr;
}


let button = document.querySelector("#btn");

button.onclick = () => {

    let inp_box = document.querySelector("#text_to_translate");

    let t = inp_box.value;

    translate(t);
};