# Hackable TV
![hackable-tv](https://user-images.githubusercontent.com/3526922/74057963-4ad47f00-49e5-11ea-9e0d-b39c98f5fe1b.gif)

A hobby project to explore if it is possible to do a platform like [Kodi](https://github.com/xbmc/xbmc) or [Android TV](https://en.wikipedia.org/wiki/Android_TV) which is:

  - written in javascript so anybody can read it & even make changes to the core
  - extensible with 3rd party apps, written in **[React](https://reactjs.org/)** & other libraries you're used to
  - fast enough to run fluently on Raspberry Pi and other cheap low-end devices

## Performance
The whole project is based around [graffiti](https://github.com/cztomsik/graffiti), a web-like GUI toolkit with minimal overhead. Unlike what you might expect, there is actually **no web browser** involved and so it can be very efficient.

## Try it
```
# BTW: it works on macos too, just brew install respective deps

# you might need
sudo apt install ffmpeg        # for radio
sudo apt install dosbox unzip  # for iarchive

git clone https://github.com/cztomsik/hackable-tv
cd hackable-tv
npm i
npm run dev
```

## Controls
- arrows, `Enter` & `Esc` for navigation
- `h` for quickly going to Home

## Status
Early PoC, feel free to open feature requests, ask questions and/or discuss the overall design, nothing is set in stone yet.

- [x] home with "app" selection
- [x] basic navigation
- [x] play internet radios
- [x] animations
- [x] mouse support
- [ ] now playing at Home
- [ ] ?
- [ ] manage samba, ssh, vnc
- [ ] real video player instead of spawning ffplay
- [ ] app packaging/loading
- [ ] consider translations?
- [ ] lots of other things

## Custom extensions
Right now, you need to literally fork it & hack whatever you want. In future, I'd like to have some "app" extension model but that's still far away now. Be prepared for weird issues, some things might not work at all so just take it easy :-)
