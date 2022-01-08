/**
  Copyright 2012 Michael Morris-Pearce

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

(function () {

  /* Piano keyboard pitches. Names match sound files by ID attribute. */

  var keys = [
    'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3',
    'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4',
    'A4', 'Bb4', 'B4', 'C5'
  ];

  var notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

  /* Corresponding keyboard keycodes, in order w/ 'keys'. */
  /* QWERTY layout:
  /*   upper register: Q -> P, with 1-0 as black keys. */
  /*   lower register: Z -> M, , with A-L as black keys. */

  var codes = [
    90, 83, 88, 67, 70, 86, 71, 66, 78, 74, 77, 75,
    81, 50, 87, 69, 52, 82, 53, 84, 89, 55, 85, 56,
    73, 57, 79, 80
  ];
  
  var melodyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48]

  var pedal = 32; /* Keycode for sustain pedal. */
  var tonic = 'A2'; /* Lowest pitch. */

  /* Piano state. */

  var intervals = {};
  var depressed = {};

  /* Selectors */

  function pianoClass(name) {
    return '.piano-' + name;
  };

  function soundId(id) {
    return 'sound-' + id;
  };

  function sound(id) {
    var it = document.getElementById(soundId(id));
    return it;
  };

  /* Virtual piano keyboard events. */

  function keyup(code) {
    var offset = codes.indexOf(code);
    var k;
    if (offset >= 0) {
      k = keys.indexOf(tonic) + offset;
      return keys[k];
    }
  };

  function keydown(code) {
    return keyup(code);
  };

  function press(key) {
    var audio = sound(key);
    if (depressed[key]) {
      return;
    }
    clearInterval(intervals[key]);
    playAudio(audio)
    if (audio.readyState >= 2) {
      depressed[key] = true
    }
    $(pianoClass(key)).animate({
      'backgroundColor': '#88FFAA'
    }, 0);
  };

  function playAudio(audio) {
    if (audio) {
      audio.pause();
      audio.volume = 1.0;
      if (audio.readyState >= 2) {
        audio.currentTime = 0;
        audio.play();
      }
    }
 };

  /* Manually diminish the volume when the key is not sustained. */
  /* These values are hand-selected for a pleasant fade-out quality. */

  function fade(key) {
    var audio = sound(key);
    var stepfade = function () {
      if (audio) {
        if (audio.volume < 0.03) {
          kill(key)();
        } else {
          if (audio.volume > 0.2) {
            audio.volume = audio.volume * 0.95;
          } else {
            audio.volume = audio.volume - 0.01;
          }
        }
      }
    };
    return function () {
      clearInterval(intervals[key]);
      intervals[key] = setInterval(stepfade, 5);
    };
  };

  /* Bring a key to an immediate halt. */

  function kill(key) {
    var audio = sound(key);
    return function () {
      clearInterval(intervals[key]);
      if (audio) {
        audio.pause();
      }
      if (key.length > 2) {
        $(pianoClass(key)).animate({
          'backgroundColor': 'black'
        }, 300, 'easeOutExpo');
      } else {
        $(pianoClass(key)).animate({
          'backgroundColor': 'white'
        }, 300, 'easeOutExpo');
      }
    };
  };

  /* Simulate a gentle release, as opposed to hard stop. */

  var fadeout = true;

  /* Sustain pedal, toggled by user. */

  var sustaining = false;

  /* Register mouse event callbacks. */

  keys.forEach(function (key) {
    $(pianoClass(key)).mousedown(function () {
      $(pianoClass(key)).animate({
        'backgroundColor': '#88FFAA'
      }, 0);
      press(key);
    });
    if (fadeout) {
      $(pianoClass(key)).mouseup(function () {
        depressed[key] = false;
        if (!sustaining) {
          fade(key)();
        }
      });
    } else {
      $(pianoClass(key)).mouseup(function () {
        depressed[key] = false;
        if (!sustaining) {
          kill(key)();
        }
      });
    }
  });

  /* Register keyboard event callbacks. */

  $(document).keydown(function (event) {
    if (event.which === pedal) {
      sustaining = true;
      $(pianoClass('pedal')).addClass('piano-sustain');
    }
    index = melodyCodes.indexOf(event.which)
    if (index != -1 && melody) {
      note = melody[index]
      playMelody([note])
    } 
  });

  $(document).keyup(function (event) {
    if (event.which === pedal) {
      sustaining = false;
      $(pianoClass('pedal')).removeClass('piano-sustain');
      Object.keys(depressed).forEach(function (key) {
        if (!depressed[key]) {
          if (fadeout) {
            fade(key)();
          } else {
            kill(key)();
          }
        }
      });
    }
    if (keyup(event.which)) {
      depressed[keyup(event.which)] = false;
      if (!sustaining) {
        if (fadeout) {
          fade(keyup(event.which))();
        } else {
          kill(keyup(event.which))();
        }
      }
    }
  });

  $("#new-melody-button").click(function () {
    key = $("#keys option:selected").text()
    if (key == "random") {
      key = notes[getRandomNumber(11)] 
    }

    type = $("#scale option:selected").text()
    if (type == "random") {
      i = getRandomNumber(1)
      if (i == 0) {
        type = "min"
      } else {
        type = "maj"
      }
    }

    number = $("#number_of_notes option:selected").text()
    melody = generateMelody(key + "3", type, Number.parseInt(number))
    if ($("#show-key").is(":checked")) {
      printKey(key, type)
    }
    printMelody([])
    playMelody(melody.slice())
  });

  getRandomNumber = function(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max)
  };

  $("#play-melody-button").click(function() {
    if (!melody) {
      return
    }

    playMelody(melody.slice())
  });

  $("#play-scale-button").click(function() {
    if (!key || !type) {
      return
    }
    // start with octave in the middle, not too high
    scale = getKeyNotes(key + "3", type)
  
    playMelody(scale)
  });

  $("#show-melody").click(function() {
    if (!melody || !key) {
      return
    }
    printMelody(melody)
    printKey(key, type)
  });

  printMelody = function (melody) {
    text = melody.join(" ")
    $("#notes").text("Notes: " + text)
  };

  printKey = function(key, type) {
    text = key + " " + type
    $("#key").text("Key: " + text)
  };

  playMelody = function (m) {
    if (m.length == 0) {
      return
    }
    note = m[0]
    m.shift()
    var audio = sound(note)
    if (!audio) {
      return
    }
    
    audio.onended = function () {
      playMelody(m)
    }
    setTimeout(function () {
      audio.play()
      setTimeout(function () {
        audio.pause();
        audio.currentTime = 999999999;
      }, 800);
    }, 150)

  }

  generateMelody = function (key, type, length) {
    melody_notes = getKeyNotes(key, type)
    positions = getRandomPositions(length - 1)
    m= [key]
    positions.forEach(pos => {
      m.push(melody_notes[pos])
    })
    return m
  }

  getKeyNotes = function (key, type) {
    scheme = []
    if (type === "maj") {
      scheme = [2, 2, 1, 2, 2, 2, 1]
    } else if (type === "min") {
      scheme = [2, 1, 2, 2, 1, 2, 2]
    }
    return getNotesByPattern(key, scheme)
  };

  getNotesByPattern = function (key, pattern) {
    index = keys.indexOf(key)
    scale_notes = [key]
    pattern.forEach(step => {
      index = index + step
      scale_notes.push(keys[index])
    })
    return scale_notes
  };

  getRandomPositions = function (count) {
    min = Math.ceil(2);
    max = Math.floor(7);

    numbers = []
    while (numbers.length < count) {
      i = Math.floor(Math.random() * (max - min) + min);
      if (numbers.indexOf(i) == -1) {
        numbers.push(i)
      }
    }
    return numbers
  };

  notes.forEach(note => {
    $('<option>').val(note).text(note).appendTo("#keys")
  });
})();
