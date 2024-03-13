function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        var offset = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - offset + 13) % 26 + offset);
    });
}
function rot47(str) {
    var allowedChars = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    return str.split('').map(function(c) {
        var index = allowedChars.indexOf(c);
        if (index !== -1) {
            return allowedChars[(index + 47) % allowedChars.length];
        } else {
            return c;
        }
    }).join('');
}

function caesarShift(text, shift) {
    return text.replace(/[a-zA-Z]/g, function(char) {
        var code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char;
    });
}

function enkripsi(input, metode) {
    if (metode === "rot13rot47") {
        var encryptedRot13 = rot13(input);
        var encryptedRot47 = rot47(encryptedRot13);
        return encryptedRot47;
    } else if (metode === "caesar3rot13") {
        var caesarEncrypted = caesarShift(input, 3);
        var rot13Encrypted = rot13(caesarEncrypted);
        return rot13Encrypted;
    }
}
function dekripsi(input, metode) {
    if (metode === "rot13rot47") {
        var decryptedRot47 = rot47(input);
        var decryptedRot13 = rot13(decryptedRot47);
        return decryptedRot13;
    } else if (metode === "caesar3rot13") {
        var rot13Decrypted = rot13(input);
        var caesarDecrypted = caesarShift(rot13Decrypted, 23); // 26 - 3
        return caesarDecrypted;
    }
}

function convert() {
    var metode = document.getElementById("metode").value;
    var aksi = document.getElementById("aksi").value;
    var inputText = document.getElementById("inputText").value.trim();
    var outputText = document.getElementById("outputText");

    if (aksi === "enkripsi") {
        var encryptedText = enkripsi(inputText, metode);
        outputText.value = encryptedText;
    } else {
        var decryptedText = dekripsi(inputText, metode);
        outputText.value = decryptedText;
    }
}