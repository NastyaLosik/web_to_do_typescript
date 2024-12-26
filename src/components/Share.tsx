function Share(){
  const shareContainer = document.createElement("div");
  shareContainer.className = "share-container";
  shareContainer.innerHTML = `
        <div class="share-container-content">
            <div class="share-buttons">
                <button class="share-button"><img src="./src/icons/copy.svg"></button>
                <button class="vk-button"><img src="./src/icons/vk.svg"></button>
                <button class="telegram-button"><img src="./src/icons/telegram.svg"></button>
                <button class="whatsapp-button"><img src="./src/icons/whatsapp.svg"></button>
                <button class="facebook-button"><img src="./src/icons/facebook.svg"></button>
            </div>
        </div>`;
  document.body.appendChild(shareContainer);
};
export default Share;
