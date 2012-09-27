js-piano
========

A simple Javascript piano.

Features:

* 28 keys, A2-C5 chromatic.
* 16-bit, 44.1 KHz Steinway samples.
* Per-key sustain, plus a sustain pedal.
* 100% HTML/Javascript.

Known Issues:

* Key rollover. Basic USB keyboards have a physical limit of keys you can simultaneously play.
* Most audio mixers act strangely when many sounds are played simultaneously (around 10).
* Some audio mixers (e.g. Pulse Audio) are known to have bugs concerning HTML5 audio as of this writing.

Ogg-format audio samples are known to work in Firefox and Chrome.

Samples are provided by the University of Iowa's Electronic Music Studio:
http://theremin.music.uiowa.edu/MISpiano.html