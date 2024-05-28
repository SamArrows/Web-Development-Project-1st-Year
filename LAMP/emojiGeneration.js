function generateEmoji(skinFilePath, eyesFilePath, mouthFilePath){
    var container = document.createElement('div');
    container.classList.add('parent');
    container.id = 'emoji';

    var skin = document.createElement('img');
    skin.id = 'skinLayer';
    skin.classList.add('background');
    skin.src = "\./emoji_assets/skin/" + skinFilePath;

    var eyes = document.createElement('img');
    eyes.id = 'eyeLayer';
    eyes.classList.add('foreground');
    eyes.src = "\./emoji_assets/eyes/" + eyesFilePath;

    var mouth = document.createElement('img');
    mouth.id = 'mouthLayer';
    mouth.classList.add('foreground');
    mouth.src = "\./emoji_assets/mouth/" + mouthFilePath;

    container.appendChild(skin);
    container.appendChild(eyes);
    container.appendChild(mouth);

    return container;
}