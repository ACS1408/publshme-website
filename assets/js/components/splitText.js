const splitText = () => {
  const splitTextSelect = document.querySelectorAll("[data-word-split]");
  splitTextSelect.forEach((splitText) => {
    const words = splitText.textContent.trim().split(" ");
    const html = words
      .map((word, wordIndex) => {
        const trimmedWord = word.trim();
        return trimmedWord === ""
          ? ""
          : `<span class="word" data-word="${trimmedWord}" style="--word-index:${wordIndex}">
             <span class="wordInner">${trimmedWord}</span>
           </span>
           <span class="whitespace"> </span>`;
      })
      .join("");
    splitText.innerHTML = html;
  });
  return
};

export default splitText;
