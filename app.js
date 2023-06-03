let random_word = "";

$(document).ready(() => {
  Random_Word();
});

$(document).on("keypress", (element) => {
  if (element.which == 13 && $(".my-word").val().length == 5) {
    let value = $(".my-word").val();
    Check_Word(value);
  }
  if (element.which == 13 && $(".my-word").val().length !== 5) {
    alert("Tahmin 5 harften oluşmalı !!!");
    $(".my-word").val("");
  }
});

$(document).on("click", ".reset", () => {
  Random_Word();
  $(".word-box").text("");
  $(".wrongs").html("");
  $(".my-word").val("");
  $(".my-word").css({ "pointer-events": "" });
});

function Random_Word() {
  random_values = [
    "çanta",
    "tahta",
    "çekiç",
    "radyo",
    "kağıt",
    "sehpa",
    "dolap",
    "kalem",
    "kazak",
    "hırka",
    "ceket",
    "kemer",
    "fular",
    "yılan",
    "köpek",
    "domuz",
    "kumru",
    "akrep",
    "serçe",
    "vazıh",
    "fakir",
    "asabi",
    "ferah",
    "güzel",
    "biber",
    "helva",
    "gazoz",
    "hurma",
    "salça",
    "sonra",
    "kayıt",
    "satır",
    "mısra",
    "roman",
  ];
  // let x = random_values.map((char) => char.toLowerCase());
  let random = Math.floor(Math.random() * random_values.length);
  random_word = random_values[random];
  console.log(random_word);
}

function Check_Word(value) {
  if (value == random_word) {
    Word_Correct(value);
  } else {
    Word_Wrong(value, random_word);
    setTimeout(() => {
      $(".my-word").val("");
    }, 100);
  }
}

function Word_Correct() {
  for (let index = 0; index < random_word.length; index++) {
    $(".word-box").eq(index).html(random_word[index]);
  }
  $(".my-word").css({ "pointer-events": "none" });
}

function Word_Wrong(wrong_text, random_text) {
  let same_char = [];
  let close_char = [];
  for (let index = 0; index < wrong_text.length; index++) {
    let x = random_text.indexOf(wrong_text[index]);
    if (x == -1) {
      continue;
    }
    if (x == index) {
      same_char.push(index);
    } else {
      close_char.push(index);
    }

    // for (let j = 0; j < random_text.length; j++) {
    //   if (wrong_text[index] == random_text[j] && index == j) {
    //     same_char.push(index);
    //   } else if (wrong_text[index] == random_text[j] && index !== j) {
    //     close_char.push(index);
    //   }
    // }
  }

  let wrong_text_with_color = [];
  for (let index = 0; index < wrong_text.length; index++) {
    if (same_char.includes(index)) {
      wrong_text_with_color.push(`<span class="same-index-word">${wrong_text[index]}</span>`);
    } else if (close_char.includes(index)) {
      wrong_text_with_color.push(`<span class="close-index-word">${wrong_text[index]}</span>`);
    } else {
      wrong_text_with_color.push(wrong_text[index]);
    }
  }

  let inner_html = `<div class="wrong-word">
        ${wrong_text_with_color.join("")}
      </div>`;
  $(".wrongs").append(inner_html);

  if (same_char.length <= 4) {
    Correct_Words_Box(same_char);
  }

  // if (same_char.length == 5) {
  //   Word_Correct();
  // }
}

function Correct_Words_Box(correct_index) {
  for (let index = 0; index < correct_index.length; index++) {
    $(".word-box").eq(correct_index[index]).html(random_word[correct_index[index]]);
  }

  // for (let index = 0; index < random_word.length; index++) {

  //   if (correct_index.includes(index)) {
  //     // console.log(random_word[index]);
  //     $(".word-box").eq(index).html(random_word[index]);
  //   }
  // }
}
