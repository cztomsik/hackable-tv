//import * as cp from 'child_process'

// TODO: auto-download from https://ffbinaries.com/?
// TODO: SIGSTOP & SIGCONT can work as pause
// TODO: ffplay can be used to play from stdin too (pass 1 or - as source)
//  https://superuser.com/questions/322216/how-can-i-pipe-output-of-ffmpeg-to-ffplay

export const mediaPlayer = {
  paused: false,
  _proc: null,

  // TODO: rename later
  play(source) {
    if (this._proc) {
      this._proc.kill()
    }

    const args = [
      // TODO: opts to args
      '-nodisp',
      '-autoexit',

      source
    ]

    //const p = cp.spawn('ffplay', args, { stdio: ['pipe', 'ignore', 'ignore'] })

    //this._proc = p
  },
}

// prevent zombies
//process.on('exit', () => mediaPlayer._proc && mediaPlayer._proc.kill())
