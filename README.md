# 🎮 DS Anywhere

DS Anywhere allows you to emulate a Nintendo DS directly inside your web browser using [Emscripten](https://emscripten.org/)'s
LLVM WebAssembly compiler. The project contains a fork of the [melonDS](https://github.com/melonds-emu/melonds) emulator, a
bridge SDK to connect the WebAssembly to the frontend using TypeScript bindings, and a TypeScript Preact/Vite frontend that
provides the User Interface for the emulator. It also contains a suite of CI/CD tools to manage deploying changes automatically
to GitHub Pages.

Emulators usually use a lot of low-level memory logic to achieve fast runtimes and compatibility across many different types of
ROMs. However, using this comes at the cost of untrusted ROMs or players being able to potentially execute arbitrary code on the
host machines if they discover vulnerabilities in the core emulator. DS Anywhere allows you to run a ROM directly inside your 
web browser without having to worry about potential security issues affecting your main computer, since it limits the scope of
potential access to a single webpage rather than your entire machine.

**[Try it out!](https://brxxn.github.io/ds-anywhere)**

## 🚧 Development notice

Please note that DS Anywhere is still under development and is very much a Work-In-Progress project. Many features
are unstable or incomplete.

This emulator should *only* be used to emulate legally acquired ROM and BIOS files. This emulator should not be used to violate
or evade software copyright restrictions. Additionally, please be careful not to share ROM and BIOS files with anyone else
unless you are legally authorized to do so. To ensure copyright protections are not violated, the gitignore file should
prevent any `*.nds` files from being committed to this repository. Contributors are also encouraged to also manually ensure they
do not unknowingly distribute copyrighted files by reviewing commits before they push them. Contributers who attempt to push
copyrighted files will be banned from the repository.

Additionally, this project is a *personal project*, meaning active development and contributions should *not* be expected. I
also do not accept funding of any type through any channel for this project, but code contributions and pull requests are 
welcome!

## To-do List

This list is incomplete, but it contains a few goals I would like to get done on this project in the future.

- **Build instructions**: To let other people build the project, they'd likely want some build instructions as well as a guide
for how to use `./buildtools.py`.
- **Controller support**: While using a controller is already supported, being able to change bindings in the UI would help,
especially for controllers that have different buttons than the default is configured to (such as XY/AB being swapped).
- **Documentation**: More documentation is definitely needed, since many things are unclear or do not work as labeled. Some
refactoring may also be needed as well.
- **Savefile Backup**: There is currently no way to backup save files or load from a previous save file. This needs to be
implemented, since currently the browser can evict our IndexedDB storage of savefiles at any time (and likely will arbitrarily
kick us out given the amount of data we use).
- **Cheat code support**: Many people use cheat codes to improve performance on games or bypass bugs caused by the emulator, so
having the ability to support cheat codes for these players would be nice.
- **Multiplayer Support**: Multiplayer requires extremely low latency (most games expect ~5ms response times) in order to work,
but it's worth a shot to enable multiplayer support anyways. It likely will not work for reliable multiplayer gaming, but it may
work to allow data transfers or ROMs that support connections that aren't as fast. To do this, we will need a protocol that runs
over WebSocket connections.
- **Themes**: The frontend UI has support for many different themes, but I haven't built a setting to change them yet, as it 
would require I test each theme to ensure everything works. There are also some parts of the UI that are incorrectly colored
on certain themes.